#!/bin/sh

xrandr --dpi 260 &
xbindkeys
xset s noblank
xset s off -b -dpms
setterm -blank 1 -powerdown 0
xrdb "/home/jp/.Xresources"
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/jp/.Xmodmap"
udisksctl mount -b "$(findfs LABEL=backups)" &
(udisksctl mount -b "$(findfs LABEL=sdxc)"; sleep 5; pcmanfm /sdxc /sdxc/papers /sdxc/work) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 10; transmission-remote -tall -s) &
pavucontrol &
pan &
stjerm &
transgui &
compton -b
env GDK_SCALE=0.25 /usr/lib/notify-osd/notify-osd &
hsetroot -fill "/home/jp/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
dbus-update-activation-environment --systemd DISPLAY
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK
xscreensaver &
