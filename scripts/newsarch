
#!/bin/bash

# 1. rm ./out/*
# 2. cd ./wiki
# 3. sed s/Lua/$lang/g ../rstta.sh > ./rstta.sh
# 4. for i in ./*; do ./rstta.sh $i; done
# 5. cd ../; cat ./out/* >> ./RosettaCodeByLang/$lang

toparse="$1"

getstart() 
{ 
  export tmp1="../work/rstta.tmp1"
  tail -n +"$(grep -n 'id="Lua' "$toparse" | cut -d : -f 1)" "$toparse" > "$tmp1"
}

trimend()
{
  export tmp2="../work/rstta.tmp2"
  export tmp3="../work/rstta.tmp3"
  local offset="$(( $(cat "$tmp2"|wc -l) - 1 ))"
  head -n "$(grep -n '<h2>' "$tmp1" | sed -n '2,2s/:.*$//p')" "$tmp1" > "$tmp2"
  head -n "$offset" "$tmp2" > "$tmp3"
}

replacename()
{
    local section="$(basename "$toparse")"
    # Format is />...</>...: $section</ the >< are required
    sed "1,1s/>Lua</>Lua: $section</" "$tmp3" > ../out/"$toparse"
}

getstart 2>/dev/null
trimend 2>/dev/null
replacename 2>/dev/null
