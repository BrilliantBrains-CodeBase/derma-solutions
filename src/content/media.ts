/**
 * The clinic's press coverage — every placement the PR agency has reported,
 * newest first.
 *
 * Hand-authored, unlike src/content/blog/ and src/content/treatments/: these are
 * outbound links to other publications, so there is no capture or copy doc to
 * generate them from. Source: the agency's "Neo Follicle Media Coverage Report"
 * (May–August 2026), 27 placements. The URLs are the report's own link targets.
 *
 * Add new coverage by appending an entry: the position in this array does not
 * matter. The page puts coverage with a `snapshot` first and orders each half
 * newest first — see src/sections/media/MediaGrid.tsx.
 *
 * Two conventions worth knowing:
 *
 *  - A syndicated story is ONE entry. The June press release was picked up by
 *    ten outlets with the same headline; the wire original (ANI) carries the
 *    entry and the rest sit in `alsoIn`. Ten near-identical cards would be the
 *    page's whole first screen and would say less than one card does.
 *  - Print coverage has no `url`. It carries a `snapshot` of the page instead,
 *    imported by scripts/import-media-images.ts from content/media/.
 */

export type MediaType =
  | 'Authored Article'
  | 'Expert Interview'
  | 'Expert Commentary'
  | 'Feature'
  | 'Press Coverage'
  | 'Podcast'
  | 'Print Edition'

/** The filter groups on the page, in the order the chips run. */
export type MediaGroup = 'articles' | 'commentary' | 'press' | 'print'

export interface MediaItem {
  /** Stable key — also the id of the card's heading. */
  id: string
  /** ISO date, as the agency's report gives it. */
  date: string
  publication: string
  type: MediaType
  title: string
  /** Absolute, external. Absent only where the coverage is print. */
  url?: string
  /** Shown as a quiet note; three placements are not in English. */
  language?: 'Hindi' | 'Kannada'
  /** Other outlets that ran the same syndicated story. */
  alsoIn?: readonly { publication: string; url: string }[]
  /** A scanned page, for coverage with no live link. */
  snapshot?: { src: string; thumb: string; alt: string; caption: string }
}

/** Which filter chip an item answers to. */
export const mediaGroup = (item: MediaItem): MediaGroup => {
  switch (item.type) {
    case 'Authored Article':
      return 'articles'
    case 'Expert Interview':
    case 'Expert Commentary':
    case 'Feature':
      return 'commentary'
    case 'Press Coverage':
      return 'press'
    case 'Podcast':
    case 'Print Edition':
      return 'print'
  }
}

export const mediaFilters: readonly { id: MediaGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'articles', label: 'Articles' },
  { id: 'commentary', label: 'Interviews & Commentary' },
  { id: 'press', label: 'Press' },
  { id: 'print', label: 'Print & Broadcast' },
]

export const mediaItems: readonly MediaItem[] = [
  {
    id: 'onlymyhealth-crocodile-dung',
    date: '2026-08-06',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Crocodile dung on the face: what the ancient Greeks used for glowing skin',
    url: 'https://www.onlymyhealth.com/crocodile-dung-on-face-ancient-greeks-used-for-glowing-skin-12977849365',
  },
  {
    id: 'happiest-health-ai-skincare',
    date: '2026-08-04',
    publication: 'Happiest Health',
    type: 'Print Edition',
    title: "Aiming for a 'clear' verdict: a dermatologist reviews an AI skin analysis",
    snapshot: {
      src: '/images/media/happiest-health-august-2026.jpg',
      thumb: '/images/media/happiest-health-august-2026-thumb.jpg',
      alt: "Happiest Health magazine page in which Dr. Sandeep Mahapatra annotates an AI skin analysis, noting that skin type, hydration, pores and pigmentation cannot be judged from a single photograph.",
      caption: 'Happiest Health, August 2026, p.74 — digital and print editions',
    },
  },
  {
    id: 'onlymyhealth-hair-breakage',
    date: '2026-07-31',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Hair breakage vs hair loss: a dermatologist explains the difference',
    url: 'https://www.onlymyhealth.com/hair-breakage-vs-hair-loss-dermatologist-explains-difference-and-how-to-tell-them-apart-12977848657',
  },
  {
    id: 'onlymyhealth-monsoon-hair-fall',
    date: '2026-07-31',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Does hair fall increase in the monsoon? Expert tips to protect your hair',
    url: 'https://www.onlymyhealth.com/does-hair-fall-increase-in-monsoon-expert-tips-to-protect-hair-12977848823',
  },
  {
    id: 'onlymyhealth-rosemary-oil',
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Can applying rosemary oil promote hair regrowth? A dermatologist explains',
    url: 'https://www.onlymyhealth.com/can-applying-rosemary-oil-promote-hair-regrowth-dermatologist-explains-12977848659',
  },
  {
    id: 'onlymyhealth-tanning-soaps',
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Do tanning-removal soaps really work? An expert explains who should avoid them',
    url: 'https://www.onlymyhealth.com/do-tanning-removal-soaps-really-work-expert-explains-who-should-avoid-them-12977848642',
  },
  {
    // TODO(pr): the agency's report lists this under Dr. Sandeep, but the piece
    // quotes an oncologist and the subject is not dermatology. Published here on
    // the client's instruction — confirm the attribution with the agency, and
    // remove this entry if it is a reporting error.
    id: 'onlymyhealth-cancer-treatment-age',
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Does cancer treatment differ by age? An oncologist explains',
    url: 'https://www.onlymyhealth.com/does-cancer-treatment-differ-by-age-explains-oncologist-12977848843',
  },
  {
    id: 'onlymyhealth-postpartum-minoxidil',
    date: '2026-07-29',
    publication: 'OnlyMyHealth',
    type: 'Expert Commentary',
    title: 'Minoxidil for postpartum hair loss: a dermatologist on the timeline and the alternatives',
    url: 'https://www.onlymyhealth.com/minoxidil-for-postpartum-hair-loss-dermatologist-shares-timeline-and-alternative-12977849211',
  },
  {
    id: 'femina-ceramides',
    date: '2026-07-14',
    publication: 'Femina',
    type: 'Expert Interview',
    title: 'Why ceramides deserve a spot in your skincare routine if you have active breakouts',
    url: 'https://www.femina.in/beauty/skin/why-ceramides-deserve-a-spot-in-your-skincare-routine-if-you-have-active-breakouts-290706.html',
  },
  {
    id: 'docthub-doctors-day',
    date: '2026-07-07',
    publication: 'Docthub',
    type: 'Feature',
    title: "Doctors' Day: more than restoring hair, we restore hope",
    url: 'https://news.docthub.com/doctors-day-more-than-restoring-hair-we-restore-hope-N2018',
  },
  {
    id: 'thehealthsite-diabetes-transplant',
    date: '2026-07-07',
    publication: 'TheHealthSite',
    type: 'Expert Commentary',
    title: 'Can patients with diabetes and high blood pressure undergo a hair transplant?',
    url: 'https://www.thehealthsite.com/hindi/diseases-conditions/can-patients-with-diabetes-and-high-blood-pressure-undergo-a-hair-transplant-in-hindi-1331986/',
    language: 'Hindi',
  },
  {
    id: 'news18-distilled-water-myth',
    date: '2026-06-30',
    publication: 'News18',
    type: 'Authored Article',
    title: 'Can distilled water cause hair fall? A hair transplant surgeon busts the viral hair-care myth',
    url: 'https://www.news18.com/lifestyle/beauty/can-distilled-water-cause-hair-fall-a-hair-transplant-surgeon-busts-the-viral-hair-care-myth-10181023.html',
  },
  {
    id: 'ani-10000-transplants',
    date: '2026-06-22',
    publication: 'ANI',
    type: 'Press Coverage',
    title: 'Bengaluru sees rising demand for hair restoration as Neo Follicle crosses 10,000 hair transplants',
    url: 'https://aninews.in/news/business/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants20260622120723/',
    alsoIn: [
      { publication: 'The Tribune', url: 'https://www.tribuneindia.com/news/business/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants/' },
      { publication: 'ThePrint', url: 'https://theprint.in/ani-press-releases/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants/2966415/' },
      { publication: 'Business Standard', url: 'https://www.business-standard.com/content/press-releases-ani/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10-000-hair-transplants-126062200400_1.html' },
      { publication: 'Latestly', url: 'https://www.latestly.com/agency-news/business-news-bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants-7484437.html' },
      { publication: 'Medicircle', url: 'https://medicircle.in/neo-follicle-hair-transplant-crosses-10000-hair-transplant-procedures-and-60000-advanced-tricho-treatments' },
      { publication: 'Editorji', url: 'https://www.editorji.com/business-news/hair-solutions-in-bengaluru-neo-follicles-impact-1782110733809' },
      { publication: 'BigNewsNetwork', url: 'https://www.bignewsnetwork.com/news/279139005/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants' },
      { publication: 'Newswav', url: 'https://newswav.com/article/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10-0-A2606_rFYMHl' },
      { publication: 'East Coast American News', url: 'https://www.eastcoastamericannews.com/news/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants20260622120718/' },
    ],
  },
  {
    id: 'esanje-tricho-treatments',
    date: '2026-06-20',
    publication: 'ಈ ಸಂಜೆ (eSanje)',
    type: 'Print Edition',
    title: 'ಕೂದಲು ಕಸಿ: ಟ್ರೈಕೋ ಚಿಕಿತ್ಸೆ ಮೈಲುಗಲ್ಲು — a milestone in hair transplant and tricho treatment',
    language: 'Kannada',
    snapshot: {
      src: '/images/media/esanje-june-2026.jpg',
      thumb: '/images/media/esanje-june-2026-thumb.jpg',
      alt: 'Clipping from the Kannada daily eSanje reporting that Neo Follicle has completed more than 10,000 hair transplant procedures, beside a photograph of Dr. Sandeep Mahapatra treating a patient.',
      caption: 'eSanje, Bengaluru edition, 20 June 2026, p.9',
    },
  },
  {
    id: 'talradio-hair-skin-confidence',
    date: '2026-06-01',
    publication: 'TALRadio',
    type: 'Podcast',
    title: 'Hair, skin and confidence',
    url: 'https://podcasts.apple.com/in/podcast/talradio/id1536694804?i=1000770572022',
  },
  {
    id: 'thehealthsite-summer-scalp',
    date: '2026-05-29',
    publication: 'TheHealthSite',
    type: 'Authored Article',
    title: 'Summer sunlight damages not only the skin but the scalp — and what to do about it',
    url: 'https://www.thehealthsite.com/hindi/beauty/summer-sunlight-can-damage-not-only-the-skin-but-also-the-scalp-know-what-to-do-in-hindi-1326866/',
    language: 'Hindi',
  },
  {
    id: 'sugermint-transplant-technologies',
    date: '2026-05-28',
    publication: 'Sugermint',
    type: 'Authored Article',
    title: 'Modern hair transplant technologies',
    url: 'https://sugermint.com/modern-hair-transplant-technologies/',
  },
  {
    id: 'pharmabiz-hair-restoration',
    date: '2026-05-23',
    publication: 'PharmaBiz',
    type: 'Authored Article',
    title: 'Modern hair restoration and transplant technologies',
    url: 'https://pharmabiz.com/NewsDetails.aspx?aid=186080&sid=1',
  },
]
