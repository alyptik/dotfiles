#!/usr/bin/env bash

hc() { "${herbstclient_command[@]:-herbstclient}" "$@" ;}
monitor=${1:-0}
geometry=( $(hc monitor_rect "$monitor") )
if [ -z "$geometry" ] ;then
	printf '%s\n' "Invalid monitor $monitor" >&2
	exit 1
fi
# geometry has the format W H X Y
x=${geometry[0]}
y=${geometry[1]}
panel_width=${geometry[2]}
panel_height=32
bgcolor=$(hc get frame_border_normal_color)
selbg=$(hc get window_border_active_color)
selfg='#101010'
font="-*-terminus-*-*-*-32-*-*-*-*-*-*-*"
# dzenfont="xft:Source Code Pro:pixelsize=30:antialias=true:hinting=false"
dzenfont="xft:Fira Code:style=Light:pixelsize=30:antialias=true:hinting=false"

####
# Try to find textwidth binary.
# In e.g. Ubuntu, this is named dzen2-textwidth.
if which textwidth &> /dev/null ; then
	textwidth="textwidth";
elif which dzen2-textwidth &> /dev/null ; then
	textwidth="dzen2-textwidth";
else
	printf '%s\n' "This script requires the textwidth tool of the dzen2 project." >&2
	exit 1
fi

####
# true if we are using the svn version of dzen2
# depending on version/distribution, this seems to have version strings like
# "dzen-" or "dzen-x.x.x-svn"
unset dzen2_svn
if dzen2 -v 2>&1 | head -n 1 | grep -q '^dzen-\([^,]*-svn\|\),'; then
	dzen2_svn="true"
fi

uniq_linebuffered() { awk '$0 != l {print; fflush(); l=$0}'; }

# watch for pulseaudio volume changes
pa_vol() { pactl subscribe | grep --line-buffered sink | sed -u "s/.*/volume\t^fg(#909090)" && sleep 2; }

hc pad "$monitor" "$panel_height"
pkill -9 dzen2
pkill -9 pactl
pkill -9 mpc
pkill -9 -f 'python3.*imap'
# systemctl restart mpdscribble@jp.service mpd
systemctl restart mpdscribble@jp.service
systemctl restart --user mpd

{
	### Event generator ###
	# based on different input data (mpc, date, hlwm hooks, ...)
	# this generates events, formed like this:
	#   <eventname>\t<data> [...]
	# e.g.
	#   date    ^fg(#efefef)18:33^fg(#909090), 2013-10-^fg(#efefef)29

	unset childpids
	declare -a childpids
	imapcounter & childpids+=($!)
	# mpc idleloop player & childpids+=($!)
	pa_vol & childpids+=($!)

	while :; do
		unset icon
		curbat="$(</sys/class/power_supply/BAT0/capacity)"
		curtemp="$(</sys/devices/virtual/thermal/thermal_zone0/temp)"
		curvol="$(pacmd dump-volumes | sed -ne '1 s/[^%]* \([0-9][0-9]*%\) .*/\1/p')"
		# no match means laptop is connected to AC
		if [ "$(</sys/class/power_supply/BAT0/status)" != Discharging ]; then
			icon=⚇
		fi
		printf '%s\n' $'temp\t^fg(#909090)'"$((curtemp / 1000))° C"
		printf '%s\n' $'bat\t^fg(#efefef)'"$curbat% ${icon:-⚡}"
		printf '%s\n' $'volume\t^fg(#909090)'"$curvol  ♪"
		printf '%s\n' $'np\t'"$(mpc current)"
		df -h / | awk $'NR == 2 {print "disk\t^fg(#efefef)", $6, "-", $4}'
		date +$'date\t^fg(#efefef)%a %R %Z ^fg(#909090)%Y-%m-%d'
	done > >(uniq_linebuffered) & childpids+=($!)

	# main idle loop
	hc --idle

	# cleanup stale background jobs
	kill -9 "${childpids[@]}"
} 2>/dev/null | {
	unset bat date disk imap tags temp volume
	visible=1

	while :; do
		### Output ###
		# This part prints dzen data based on the _previous_ data handling run,
		# and then waits for the next event to happen.
		bordercolor="#26221C"
		separator="^bg()^fg($selbg)|"

		IFS=$'\t' read -ra tags < <(hc tag_status "$monitor")

		# draw tags
		for i in "${tags[@]}"; do
			case "${i:0:1}" in
			'#')
				printf '%s' "^bg($selbg)^fg($selfg)";;
			'+')
				printf '%s' "^bg(#9CA668)^fg(#141414)";;
			':')
				printf '%s' "^bg()^fg(#ffffff)";;
			'!')
				printf '%s' "^bg(#FF0675)^fg(#141414)";;
			*)
				printf '%s' "^bg()^fg(#ababab)";;
			esac

			# clickable tags if using SVN dzen
			if [ -z "$dzen2_svn" ]; then
				# non-clickable tags if using older dzen
				printf '%s' " ${i:1} "
				continue
			fi

			printf '%s' "^ca(1,\"${herbstclient_command[*]:-herbstclient}\" "
			printf '%s' "focus_monitor \"$monitor\" && "
			printf '%s' "\"${herbstclient_command[*]:-herbstclient}\" "
			printf '%s' "use \"${i:1}\") ${i:1} ^ca()"
		done
		printf '%s' "$separator"
		printf '%s' "^bg()^fg() ${windowtitle//^/^^}"
		# small adjustments
		# right="$np ^fg() $separator ^bg() $disk ^fg()"
		right="$np $separator ^bg() $volume ^fg() $separator ^bg() $disk ^fg()"
		right="$right $separator ^bg() $imap ^fg() $separator ^bg() $temp ^fg()"
		right="$right $separator ^bg() $date ^fg() $separator ^bg() $bat ^fg()"
		right="$right $separator ^bg() "
		right_text_only=$(<<<"$right" sed 's/\^[^(]*([^)]*)//g')
		# get width of right aligned text.. and add some space..
		width=$("$textwidth" "$font" "$right_text_only    ")
		printf '%s\n' "^pa($(($panel_width - $width)))$right"

		### Data handling ###
		# This part handles the events generated in the event loop, and sets
		# internal variables based on them. The event and its arguments are
		# read into the array cmd, then action is taken depending on the event
		# name.
		# "Special" events (quit_panel/togglehidepanel/reload) are also handled
		# here.

		# wait for next event
		IFS=$'\t' read -ra cmd || break
		# find out event origin
		case "${cmd[0]}" in
		tag*)
			IFS=$'\t' read -ra tags < <(hc tag_status "$monitor");;
		disk)
			disk="${cmd[*]:1}";;
		imap)
			imap="${cmd[*]:1}";;
		temp)
			temp="${cmd[*]:1}";;
		np|player)
			# empty string check
			np_str="${cmd[*]:1}"
			np="${np_str:+"^fg() $separator ^bg() ^fg(#efefef)$np_str"}";;
		volume)
			volume="${cmd[*]:1}";;
		date)
			date="${cmd[*]:1}";;
		bat)
			bat="${cmd[*]:1}";;
		quit_panel)
			exit;;
		togglehidepanel)
			if (( !visible )); then
				visible=1
				hc pad "$monitor" "$panel_height"
			else
				visible=0
				currentmonidx="$(hc list_monitors | sed -n '/\[FOCUS\]$/s/:.*//p')"
				if [ "${cmd[1]}" != current ] && [ "${cmd[1]}" != "$monitor" ] && [ "$currentmonidx" != "$monitor" ]; then
					hc pad "$monitor" "$panel_height"
					continue
				fi
				hc pad "$monitor" 0
			fi
			printf '%s\n' "^togglehide()";;
		reload)
			exit;;
		focus_changed|window_title_changed|*)
			windowtitle="${cmd[*]:2}";;
		esac
	done

	### dzen2 ###
	# After the data is gathered and processed, the output of the previous block
	# gets piped to dzen2.

} 2> /dev/null | dzen2 -w "$panel_width" -x "$x" -y "$y" -fn "$dzenfont" -h "$panel_height" \
	-e 'button3=;button4=exec:herbstclient use_index -1;button5=exec:herbstclient use_index +1' \
	-ta l -bg "$bgcolor" -fg '#efefef'
