#!/bin/sh

	#sudo truncate -s 0 /tmp/nohup.out
	#( cd /tmp; sudo nohup cpuled console -c nfn -i -f; sudo chmod 777 /tmp/nohup.out )
        #/bin/sudo cpuled console -c nfn -i -f &>/tmp/nohup.out
	#/bin/sudo rm -f /tmp/nohup.out
	if [[ "$EUID" != 0 ]]; then
		#exit 1
		echo "rerunning as root..."
		exec sudo "$0"
	else
		cpuledpids=$(pgrep -x cpuled | paste -s -d ' ')
		#[[ -z $(pgrep -x cpuled) ]] || {
		[[ -z "$cpuledpids" ]] || {
			echo "sending SIGHUP to \"$cpuledpids\"..."
			#sudo killall cpuled
			sudo kill "$cpuledpids"; }
		[[ ! -r /tmp/cpuled.pid ]] || rm -f /tmp/cpuled.pid
		#(cd /tmp; nohup cpuled console -c nfn)
		#(cd /tmp; coproc cpuled console -c nfn)
		#coproc cpuled console -c nfn &>/dev/tty
		#pushd /tmp
		2>&1 nohup cpuled console -f -c nfn
		#popd
		printf '%s\n' "$$" > /tmp/cpuled.pid
		#echo "$COPROC_PID" >|/tmp/cpuled.pid
		#coproc cpuled console -c nfn {NAME1}>/dev/tty
		exit 0
	fi

