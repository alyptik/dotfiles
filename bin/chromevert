#!/bin/bash

find . -maxdepth 1 -name "*.flv*" -print0 | \
while IFS= read -r -d '' file ; do
 chromecastize.sh --mp4 "${file}"
 rm "${file}"'.bak'
done

#find "${tdir}" -maxdepth 1 -name "*.flv*" -name "*.bak*" -exec rm -v {} \;

 #cp "${newfile}" /tmp/ctemp.flv
 #cdir=${PWD}
 #cd /tmp
 #sudo chromecastize.sh --mp4 ctemp.flv
 #cp /tmp/ctemp.flv.mp4 "${newfile}.mp4"
 #cd "${cdir}"

#find . -name "*bak*" -exec rm -v {} \;

#[[ "${file}" == *flv* && "${file}" != *bak* ]] || continue
 #newfile=$(printf "%b" "${file}" | sed "s_\(.*\.flv$\)_\1.bak_")
 #newfile=$(printf '%q' "${file}")  
#for file in ${PWD}/* ; do
#[[ "${file}" == *bak* ]] || continue
# $newfile
#done
