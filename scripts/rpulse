#1/bin/sh

pulseaudio --check && {
	pulseaudio --kill
	sleep 1
	pulseaudio --start --realtime
} || {
	pulseaudio --start --realtime
}
