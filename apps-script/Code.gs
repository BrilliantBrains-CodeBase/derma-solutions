/**
 * Derma Solutions — lead capture web app.
 *
 * Receives every appointment form on the site (src/components/AppointmentForm.tsx,
 * used on the homepage, /about-us/ and /book-appointment/), appends one row per
 * lead to a Google Sheet and emails the clinic.
 *
 * The site POSTs application/x-www-form-urlencoded with fetch(..., { mode:
 * 'no-cors' }), so the browser never sees this script's response. A failure here
 * is invisible to the visitor — which is why every failure path emails
 * NOTIFY_EMAILS rather than only logging.
 *
 * Deploy steps: apps-script/README.md. This file is the source of truth; the
 * copy in the Apps Script editor is pasted from it.
 */

const CONFIG = {
  /** The ID in the sheet's URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit */
  SHEET_ID: 'PASTE_SHEET_ID_HERE',
  SHEET_NAME: 'Leads',
  /** Comma-separated. Every new lead, and every failure, is sent here. */
  NOTIFY_EMAILS: 'PASTE_EMAILS_HERE',
  TIMEZONE: 'Asia/Kolkata',
};

/**
 * Sheet columns, in order: [header, request parameter]. The parameter names are
 * the form's `name` attributes (homeAppointment in src/config/site.ts) plus the
 * attribution values AppointmentForm adds to the POST body. Add a column by
 * appending here — existing rows keep their positions.
 */
const COLUMNS = [
  ['Timestamp', null],
  ['First name', 'first-name'],
  ['Last name', 'last-name'],
  ['Phone', 'phone'],
  ['Email', 'email'],
  ['Preferred date', 'date'],
  ['Doctor', 'choosedoctor'],
  ['Consent', 'consent'],
  ['Form', 'form'],
  ['Page URL', 'page'],
  ['Referrer', 'referrer'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
];

function doPost(e) {
  const params = (e && e.parameter) || {};

  try {
    // Honeypot: a hidden field no person fills in. Answer as if it worked, so a
    // bot has nothing to learn from.
    if (params.website) return json({ ok: true });

    // The site validates the phone before sending; this catches direct POSTs.
    if (!isPhone(params.phone)) return json({ ok: false, error: 'invalid phone' });

    const now = new Date();
    const row = COLUMNS.map(([, key]) =>
      key === null
        ? Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
        : safeCell(params[key]),
    );

    const sheet = getSheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notifyLead(params, sheet);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    notifyFailure(err, params);
    return json({ ok: false, error: String(err) });
  }
}

/** Health check: open the /exec URL in a browser and expect "ok". */
function doGet() {
  return ContentService.createTextOutput('ok');
}

/**
 * Run once from the editor (Run ▸ testDoPost). It triggers the authorisation
 * prompt for Sheets and Mail, and leaves a test row to delete afterwards.
 */
function testDoPost() {
  doPost({
    parameter: {
      'first-name': 'Test',
      'last-name': 'Lead',
      phone: '+91 98765 43210',
      email: 'test@example.com',
      date: '2026-10-01',
      choosedoctor: 'No preference',
      consent: 'yes',
      form: 'test',
      page: 'https://dermasolutions.co.in/book-appointment/',
    },
  });
}

/* -------------------------------------------------------------------------- */

function getSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

function notifyLead(params, sheet) {
  const name = [params['first-name'], params['last-name']].filter(Boolean).join(' ');
  const subject =
    'New appointment request — ' +
    name +
    ' (' + (params.choosedoctor || 'No preference') + ', ' + (params.date || 'no date') + ')';

  const rows = COLUMNS.filter(([, key]) => key && params[key])
    .map(([header, key]) => '<tr><td style="padding:4px 12px 4px 0;color:#666">' + escapeHtml(header) +
      '</td><td style="padding:4px 0">' + escapeHtml(params[key]) + '</td></tr>')
    .join('');

  const options = {
    htmlBody:
      '<p>A new appointment request came in from the website.</p>' +
      '<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' + rows + '</table>' +
      '<p><a href="' + sheet.getParent().getUrl() + '">Open the leads sheet</a></p>',
  };
  if (params.email) options.replyTo = params.email;

  MailApp.sendEmail(CONFIG.NOTIFY_EMAILS, subject, 'New appointment request from ' + name, options);
}

function notifyFailure(err, params) {
  try {
    MailApp.sendEmail(
      CONFIG.NOTIFY_EMAILS,
      'Website lead FAILED to save — call back manually',
      'The lead form script hit an error, so this lead is NOT in the sheet.\n\n' +
        'Error: ' + err + '\n\n' +
        'Submitted values:\n' + JSON.stringify(params, null, 2),
    );
  } catch (mailErr) {
    console.error(mailErr);
  }
}

/** Mirrors isPhone() in AppointmentForm.tsx: ten digits once +91 / 0 is stripped. */
function isPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.replace(/^(?:0|91)/, '').length === 10;
}

/**
 * A value starting with = + - @ is read by Sheets as a formula. The leading
 * apostrophe stores it as text instead, so a submitted value cannot run as a
 * formula in the clinic's sheet.
 */
function safeCell(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 1000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
