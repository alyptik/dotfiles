#!/bin/bash

{ [[ ! $(pgrep kwin_x11) ]] && \
	/usr/bin/kwin_x11 & disown || \
	/usr/bin/kwin_x11 --replace & disown
[[ ! $(pgrep plasmashell) ]] || killall plasmashell
/usr/bin/plasmashell --shut-up & disown; } >/dev/null 2>&1

