#!/bin/bash

#printf "$(sed 's/#\[fg=\([a-z]*\)[^\[]*\]/\1/g; s/default/\\033[37m/g; s/red/\\033[31m/g; s/yellow/\\033[33m/g; s/blue/\\033[35m/g; s/cyan/\\033[36m/; s/|.*$//; s/green/\\033[32m/g' <(rainbarf)) \\033[0m"
printf $(rainbarf | sed 's/#\[fg=\([a-z]*\)[^\[]*\]/\1/g; s/|.*/ /; s/[a-z]*//g' | cut -b-63)
