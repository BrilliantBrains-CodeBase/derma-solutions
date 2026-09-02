# llms.txt / llm.txt status

Checked: 2026-09-02T04:48:09Z

- `/llms.txt` -> HTTP **404**
- `/llm.txt` -> HTTP **404**
- `/ai.txt` -> HTTP **404**
- `/.well-known/llms.txt` -> HTTP **404**

**Finding:** the site publishes no LLM-facing manifest. Nothing to preserve here.
This is an *opportunity* for the new build, not a regression to replicate.
