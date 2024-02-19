#!/bin/bash
: ${PREFIX:=~/src/nabin-info/asski.git}
: ${ASSKIS:=${PREFIX}/scripts}
cd "${ASSKIS}"

{ 
    while read -e -r line ; do 
        E=$(\ls -1 asski.* | sort -R | sed -n 1p)
        #tput cuu1
        echo "$line" | $E
    done  
} 

