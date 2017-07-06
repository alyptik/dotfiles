#!/bin/bash

# List the X compose sequences available to generate the specified character.
# I.E. the keyboard key sequence to enter after the compose (multi) key or
# a dead key is pressed.
#
# This version has been heavily modified by me (David the H.).  It is now
# bash-specific, reduces the need for external tools (only grep is needed),
# and can handle multiple inputs.
#
# Original script info follows.  For the original version, go here:
# http://www.pixelbeat.org/docs/xkeyboard/
#
# Author:
#    P@draigBrady.com
# Notes:
#    GTK+ apps use a different but broadly similar input method
#    to X by default. Personally I tell GTK+ to use the X one by
#    adding `export GTK_IM_MODULE=xim` to /etc/profile
# Changes:
#    V0.1, 09 Sep 2005, Initial release
#    V0.2, 04 May 2007, Added support for ubuntu
#

if [[ -z $* ]]; then
	echo "Usage: ${0##*/} 'character(s)'" >&2
	echo "Multiple characters are supported." >&2
	echo "They don't need to be space-separated." >&2
	exit 1
fi

if [[ $LANG =~ (.*)[.]UTF.*8 ]]; then

	lang="${BASH_REMATCH[1]}"
	codeset=UTF-8

else

	echo "Sorry, only UTF-8 is supported at present" >&2
	exit 1
	#could try and normalise codeset, and get char with printf %q
	#but would not be general enough I think.

fi

dir=/usr/share/X11/locale #ubuntu

if [[ ! -d "$dir" ]]; then

	dir=/usr/X11R6/lib/X11/locale #redhat/debian

fi

if [[ ! -f "$dir/locale.dir" ]]; then

	echo "Sorry, couldn't find your X windows locale data" >&2
	exit 1

fi

page="$( grep -m1 "${lang}.${codeset}$" <$dir/locale.dir )"
page=${page%%/*}

file="$dir/$page/Compose"

while read -n 1 character; do

	[[ -z $character ]] && continue
	echo "combinations found for [$character]"
	grep -F "\"$character\"" "$file"
	echo

done <<<"$@"

exit 0
