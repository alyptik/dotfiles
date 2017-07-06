#!/usr/bin/env bash

for i in $(pacman -Qqm); do
  if pacman -Qql $i | xargs readelf -d 2>/dev/null | grep -q libstdc++.so.6; then
    echo $i;
  fi;
done
