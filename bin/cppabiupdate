#!/bin/bash

while read pkg; do
    mapfile -t files < <(pacman -Qlq $pkg | grep -v /$)
    grep -Fq libstdc++.so.6 "${files[@]}" <&- 2>/dev/null && echo $pkg
done < <(pacman -Qmq)
