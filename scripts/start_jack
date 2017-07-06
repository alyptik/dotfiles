#!/bin/bash

jack_control start
sudo schedtool -R -p 20 $(pidof jackdbus)
jack_control eps realtime true
jack_control ds alsa
#jack_control dps device hw:PCH
jack_control dps device hw:4
jack_control dps rate 48000
## Sets JACK to use 2 periods. 2 is right for motherboard, PCI, PCI-X, etc.; 3 for USB 
#jack_control dps nperiods 2
jack_control dps nperiods 3
jack_control dps period 512
sleep 10
/usr/bin/a2jmidid -e &
sleep 10
qjackctl &
sleep 10
qmidiroute ~/All2MIDI1.qmr &
sleep 10
yoshimi -S &
sleep 10
