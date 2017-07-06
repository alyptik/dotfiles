#!/bin/sh

#RAM=`cat /proc/meminfo | grep "MemFree" | awk -F" " '{print $2}'`
#RAM=`free -h | grep "Mem:" | awk '{print $3 "/" $2}' | sed 's/\([GM]\)/\1iB/g'`
RAM=`free -h --gibi | grep "Mem:" | awk '{print $3 "/" $2}'`

#SWAP=`cat /proc/meminfo | grep "SwapFree" | awk -F" " '{print $2}'`
#SWAP=`free -h | grep "Swap:" | awk '{print $3 "/" $2}' | sed 's/\([GM]\)/\1iB/g'`
SWAP=`free -h --gibi | grep "Swap:" | awk '{print $3 "/" $2}'`

printf '%s' "RAM-${RAM} Swap-${SWAP}"
