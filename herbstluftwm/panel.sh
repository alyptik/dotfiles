#!/usr/bin/env bash

hc() { "${herbstclient_command[@]:-herbstclient}" "$@" ;}
monitor=${1:-0}
geometry=( $(herbstclient monitor_rect "$monitor") )
if [ -z "$geometry" ] ;then
	echo "Invalid monitor $monitor"
	exit 1
fi
# geometry has the format W H X Y
x=${geometry[0]}
y=${geometry[1]}
panel_width=${geometry[2]}
panel_height=16
bgcolor=$(hc get frame_border_normal_color)
selbg=$(hc get window_border_active_color)
selfg='#101010'
# font="xft:FiraCode-Light:pixelsize=18:antialias=true:hinting=false"
# font="-*-fixed-medium-*-*-*-12-*-*-*-*-*-*-*"
# font="-*-fixed-medium-*-*-*-20-*-*-*-*-*-*-*"
font="-*-terminus-medium-*-*-*-20-*-*-*-*-*-*-*"
# font="-*-terminus-medium-r-normal--20-*-*-*-*-*-*-*"
dzenfont="xft:Fira Code:style=Light:pixelsize=20:antialias=true:hinting=false"
# dzenfont="$font"

####
# Try to find textwidth binary.
# In e.g. Ubuntu, this is named dzen2-textwidth.
if which textwidth &> /dev/null ; then
	textwidth="textwidth";
elif which dzen2-textwidth &> /dev/null ; then
	textwidth="dzen2-textwidth";
else
	echo "This script requires the textwidth tool of the dzen2 project."
	exit 1
fi
####
# true if we are using the svn version of dzen2
# depending on version/distribution, this seems to have version strings like
# "dzen-" or "dzen-x.x.x-svn"
if dzen2 -v 2>&1 | head -n 1 | grep -q '^dzen-\([^,]*-svn\|\),'; then
	dzen2_svn="true"
else
	dzen2_svn=""
fi

if awk -Wv 2>/dev/null | head -1 | grep -q '^mawk'; then
	# mawk needs "-W interactive" to line-buffer stdout correctly
	# http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=593504
	uniq_linebuffered() {
	  awk -W interactive '$0 != l { print ; l=$0 ; fflush(); }' "$@"
	}
else
	# other awk versions (e.g. gawk) issue a warning with "-W interactive", so
	# we don't want to use it there.
	uniq_linebuffered() {
	  awk '$0 != l { print ; l=$0 ; fflush(); }' "$@"
	}
fi

hc pad "$monitor" "$panel_height"
pkill -9 dzen2
pkill -f 'python3.*imap'
systemctl restart mpdscribble@alyptik.service mpd

{
	### Event generator ###
	# based on different input data (mpc, date, hlwm hooks, ...) this generates events, formed like this:
	#   <eventname>\t<data> [...]
	# e.g.
	#   date    ^fg(#efefef)18:33^fg(#909090), 2013-10-^fg(#efefef)29

	# mpc idleloop player &
	imapcounter &
	while :; do
		curtemp="$(</sys/devices/platform/coretemp.0/hwmon/hwmon1/temp2_input)"
		# "date" output is checked once a second, but an event is only
		# generated if the output changed compared to the previous run.
		# date +$'date\t^fg(#efefef)%H:%M^fg(#909090), %Y-%m-^fg(#efefef)%d'
		echo $'np\t^fg(#909090)'"$(mpc current)"
		df -Th / | perl -alne 'print "disk\t^fg(#efefef)$F[6] - $F[4]" unless $. == 1' &
		echo $'temp\t^fg(#909090)'"$((curtemp / 1000))° C"
		date +$'date\t^fg(#efefef)%a %R %Z ^fg(#909090)%Y-%m-%d'
		childpid=$!
	done > >(uniq_linebuffered) &
	hc --idle
	kill "$childpid"
} 2> /dev/null | {
	IFS=$'\t' read -ra tags <<< "$(hc tag_status $monitor)"
	visible=true
	date=""
	disk=""
	temp=""
	imap=""

	while :; do
		### Output ###
		# This part prints dzen data based on the _previous_ data handling run,
		# and then waits for the next event to happen.

		bordercolor="#26221C"
		separator="^bg()^fg($selbg)|"
		# draw tags
		for i in "${tags[@]}" ; do
			case ${i:0:1} in
				'#')
					echo -n "^bg($selbg)^fg($selfg)"
					;;
				'+')
					echo -n "^bg(#9CA668)^fg(#141414)"
					;;
				':')
					echo -n "^bg()^fg(#ffffff)"
					;;
				'!')
					echo -n "^bg(#FF0675)^fg(#141414)"
					;;
				*)
					echo -n "^bg()^fg(#ababab)"
					;;
			esac
			if [ ! -z "$dzen2_svn" ] ; then
				# clickable tags if using SVN dzen
				echo -n "^ca(1,\"${herbstclient_command[@]:-herbstclient}\" "
				echo -n "focus_monitor \"$monitor\" && "
				echo -n "\"${herbstclient_command[@]:-herbstclient}\" "
				echo -n "use \"${i:1}\") ${i:1} ^ca()"
			else
				# non-clickable tags if using older dzen
				echo -n " ${i:1} "
			fi
		done
		echo -n "$separator"
		echo -n "^bg()^fg() ${windowtitle//^/^^}"
		# small adjustments
		right="^fg() $separator ^bg() $np ^fg() $separator ^bg() $disk ^fg()"
		right="$right $separator ^bg() $imap ^fg() $separator ^bg() $temp ^fg()"
		right="$right $separator ^bg() $date ^fg() $separator"
		right_text_only=$(echo -n "$right" | sed 's.\^[^(]*([^)]*)..g')
		# get width of right aligned text.. and add some space..
		width=$($textwidth "$font" "$right_text_only    ")
		echo -n "^pa($(($panel_width - $width)))$right"
		echo

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
				#echo "resetting tags" >&2
				IFS=$'\t' read -ra tags <<< "$(hc tag_status $monitor)"
				;;
			disk)
				#echo "resetting date" >&2
				disk="${cmd[@]:1}"
				;;
			imap)
				imap="${cmd[@]:1}"
				# echo "resetting imap" >&2
				;;
			temp)
				#echo "resetting temp" >&2
				temp="${cmd[@]:1}"
				;;
			np|player)
				#echo "resetting np" >&2
				np="${cmd[@]:1}"
				# np="^fg(#909090)$(mpc current)"
				;;
			date)
				#echo "resetting date" >&2
				date="${cmd[@]:1}"
				;;
			quit_panel)
				exit
				;;
			togglehidepanel)
				currentmonidx=$(hc list_monitors | sed -n '/\[FOCUS\]$/s/:.*//p')
				if [ "${cmd[1]}" -ne "$monitor" ]; then
					continue
				fi
				if [ "${cmd[1]}" = "current" ] && [ "$currentmonidx" -ne "$monitor" ] ; then
					continue
				fi
				echo "^togglehide()"
				if $visible ; then
					visible=false
					hc pad $monitor 0
				else
					visible=true
					hc pad $monitor $panel_height
				fi
				;;
			reload)
				exit
				;;
			focus_changed|window_title_changed)
				windowtitle="${cmd[*]:2}"
				;;
			esac
	done

	### dzen2 ###
	# After the data is gathered and processed, the output of the previous block
	# gets piped to dzen2.

} 2> /dev/null | dzen2 -w $panel_width -x $x -y $y -fn "$dzenfont" -h $panel_height \
	-e 'button3=;button4=exec:herbstclient use_index -1;button5=exec:herbstclient use_index +1' \
	-ta l -bg "$bgcolor" -fg '#efefef'
