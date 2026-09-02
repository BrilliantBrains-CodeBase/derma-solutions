#!/bin/zsh
# Step 3 - Firecrawl content pass.
# The account limit is 10 requests/minute (NOT the 2-job concurrency figure --
# that is a separate cap). We pace at 7s and retry with backoff on rate-limit.
# Idempotent: any URL whose .md already exists is skipped, so re-running after
# an interruption costs nothing.
B=/Users/d1/dermasolution/theme-reference
mkdir -p $B/02-content $B/_logs/fc-json
PACE=${PACE:-7}
i=0; ok=0; fail=0
total=$(wc -l < $B/00-inventory/urls-master.txt | tr -d ' ')

while read -r u; do
  [ -z "$u" ] && continue
  i=$((i+1))
  s=$(echo "$u" | sed 's|https://demo.awaikenthemes.com/glowix/||; s|^?elementskit_template=|tpl__|; s|/$||; s|/|__|g')
  [ -z "$s" ] && s="_homepage"
  if [ -s "$B/02-content/$s.md" ]; then echo "[$i/$total] SKIP $s"; continue; fi

  got=0
  for attempt in 1 2 3; do
    firecrawl scrape "$u" -f markdown,links,images --max-age 0 --json \
      -o "$B/_logs/fc-json/$s.json" >/dev/null 2>>"$B/_logs/fc_errors.log"
    if [ -s "$B/_logs/fc-json/$s.json" ]; then
      if python3 -c "
import json,sys
d=json.load(open('$B/_logs/fc-json/$s.json')); d=d.get('data',d)
md=d.get('markdown') or ''
if not md.strip(): sys.exit(2)
open('$B/02-content/$s.md','w',encoding='utf-8').write(md)
print('[$i/$total] $s  md=%d links=%d imgs=%d' % (len(md), len(d.get('links') or []), len(d.get('images') or [])))
" 2>/dev/null; then got=1; ok=$((ok+1)); break; fi
    fi
    back=$((attempt * 20))
    echo "[$i/$total] retry $attempt/3 $s (backoff ${back}s)"
    sleep $back
  done
  [ $got -eq 0 ] && { echo "[$i/$total] FAIL $s"; fail=$((fail+1)); }
  sleep $PACE
done < $B/00-inventory/urls-master.txt

echo "FC-DONE ok=$ok fail=$fail  markdown files: $(ls $B/02-content/*.md 2>/dev/null | wc -l | tr -d ' ')/$total"
