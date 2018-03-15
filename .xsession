#!/bin/sh

# feh --bg-scale "/home/alyptik/wallpapers/fifths.png"
# feh --bg-scale "/home/alyptik/wallpapers/modes.png"
# hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint '#ebdbb2'
# hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint '#b8a990'
# xsetroot -mod 16 16 -fg '#343d46' -bg '#2b303b'
# tail -f "${HOME}/.weechat/pipe" | dzen2 -sa c -w 2175 -dock -fn "xft:FuraCode Nerd Font-Light:pixelsize=18:antialias=true:hinting=true" &
# urxvt -kuake-hotkey F10 &
# urxvtcd -kuake-hotkey F10 &
# scpuled &

xbindkeys &
xset s noblank &
xset s off -b -dpms &
setterm -blank 1 -powerdown 0 &
xsetroot -cursor_name left_ptr
xrdb "/home/alyptik/.Xresources"
# compton -cCGfF -b -i .85
compton -b
hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/alyptik/.Xmodmap"
# stjerm -k F12 -ah false -o 90 -b none -w 95% -h 90% -ar -tf true -tp bottom -fn "FuraCode Nerd Font" &
# stjerm -k F12 -ah false -o 95 -b none -w 95% -h 90% -ar -tf true -tp bottom -fn "Source Code Pro Light 9" &
stjerm -k F12 -ah false -o 90 -b none -w 85% -h 80% -ar -tf true -tp bottom -fn "SauceCodePro Nerd Font Light" &
hilites &
transgui &
udisksctl mount -b "$(findfs LABEL=vm)" &
(udisksctl mount -b "$(findfs LABEL=microSDXC)" && pcmanfm /media/microSDXC) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)" && transmission-remote -tall -s) &
xrandr --dpi 216 &
# eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh 2>/dev/null)
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK
