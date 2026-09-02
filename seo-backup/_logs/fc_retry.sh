#!/bin/zsh
B=/Users/d1/dermasolution/seo-backup
missing=0; done_c=0
while read -r u; do
  [ -z "$u" ] && continue
  s=$(echo "$u" | sed 's|https://dermasolutions.co.in/||; s|/$||; s|/|__|g'); [ -z "$s" ] && s="_homepage"
  [ -s "$B/02-markdown/$s.md" ] && continue
  missing=$((missing+1))
  for attempt in 1 2 3 4; do
    firecrawl scrape "$u" -f markdown,links,images --max-age 0 --json -o "$B/_logs/fc-json/$s.json" >/dev/null 2>>"$B/_logs/fc_retry_errors.log"
    if [ -s "$B/_logs/fc-json/$s.json" ] && python3 -c "
import json,sys
d=json.load(open('$B/_logs/fc-json/$s.json')); d=d.get('data',d)
m=d.get('markdown') or ''
sys.exit(0 if len(m)>500 else 1)
open('','w')" 2>/dev/null; then :; fi
    if [ -s "$B/_logs/fc-json/$s.json" ]; then
      if python3 -c "
import json,sys
d=json.load(open('$B/_logs/fc-json/$s.json')); d=d.get('data',d)
m=d.get('markdown') or ''
if len(m)<500: sys.exit(1)
open('$B/02-markdown/$s.md','w',encoding='utf-8').write(m)
print('OK $s md=%d' % len(m))
" 2>/dev/null; then done_c=$((done_c+1)); break; fi
    fi
    echo "  retry $attempt failed for $s, backing off"
    sleep 15
  done
  sleep 8
done < $B/00-site-level/urls-master.txt
echo "RETRY-DONE missing_at_start=$missing recovered=$done_c total_md=$(ls $B/02-markdown/*.md|wc -l|tr -d ' ')"
