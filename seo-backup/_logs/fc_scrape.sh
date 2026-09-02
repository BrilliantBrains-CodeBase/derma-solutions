#!/bin/zsh
# Firecrawl markdown pass. Concurrency 2 (account limit). Fresh content only (--max-age 0).
B=/Users/d1/dermasolution/seo-backup
mkdir -p $B/02-markdown $B/_logs/fc-json
i=0; total=$(wc -l < $B/00-site-level/urls-master.txt | tr -d ' ')
while read -r u; do
  [ -z "$u" ] && continue
  i=$((i+1))
  s=$(echo "$u" | sed 's|https://dermasolutions.co.in/||; s|/$||; s|/|__|g')
  [ -z "$s" ] && s="_homepage"
  if [ -s "$B/02-markdown/$s.md" ]; then echo "[$i/$total] SKIP $s"; continue; fi
  firecrawl scrape "$u" -f markdown,links,images --max-age 0 --json -o "$B/_logs/fc-json/$s.json" >/dev/null 2>>"$B/_logs/fc_errors.log"
  if [ -s "$B/_logs/fc-json/$s.json" ]; then
    python3 -c "
import json,sys
d=json.load(open('$B/_logs/fc-json/$s.json')); d=d.get('data',d)
open('$B/02-markdown/$s.md','w',encoding='utf-8').write(d.get('markdown','') or '')
print('[$i/$total] $s  md=%d links=%d imgs=%d' % (len(d.get('markdown') or ''), len(d.get('links') or []), len(d.get('images') or [])))
" 2>/dev/null || echo "[$i/$total] PARSE-FAIL $s"
  else
    echo "[$i/$total] FAIL $s"
  fi
done < $B/00-site-level/urls-master.txt
echo "FC-DONE. markdown files: $(ls $B/02-markdown/*.md 2>/dev/null | wc -l | tr -d ' ')"
