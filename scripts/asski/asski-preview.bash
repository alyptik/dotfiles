#!/bin/bash
: ${PREFIX:=~/src/nabin-info/asski.git}
: ${ASSKIS:=${PREFIX}/scripts}
cd "${ASSKIS}" 

read -r msg

for a in $(ls -1 asski.* | sort -V) ; do
  printf '%s:\t' "$a"
  ${a} <<< "$msg"
done
printf '\n'

