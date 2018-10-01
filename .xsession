#!/bin/sh

xrandr --dpi 260 &
# xrandr --output LVDS-1 --brightness 1.5 &
xbindkeys
xset s noblank
xset s off -b -dpms
setterm -blank 1 -powerdown 0
xrdb "/home/jp/.Xresources"
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/jp/.Xmodmap"
stjerm &
transgui &
pavucontrol &
compton -b
/usr/lib/notify-osd/notify-osd &
udisksctl mount -b "$(findfs LABEL=backups)" &
(udisksctl mount -b "$(findfs LABEL=microSDXC)"; sleep 2; pcmanfm /sdxc /sdxc/papers) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 1; transmission-remote -tall -s) &
dbus-update-activation-environment --systemd DISPLAY
# xsetroot -cursor_name left_ptr
hsetroot -fill "/home/jp/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK

xscreensaver &
