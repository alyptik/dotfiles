#!/bin/sh

### set variables
#destinations you don't want routed through Tor
_non_tor="192.168.1.0/24 192.168.0.0/24"

#the UID that Tor runs as (varies from system to system)
_tor_uid="109"

#Tor's TransPort
_trans_port="9040"

#your internal interface
_int_if="eth0"

### flush iptables
iptables -F
iptables -t nat -F

### set iptables *nat
iptables -t nat -A OUTPUT -o lo -j RETURN
iptables -t nat -A OUTPUT -m owner --uid-owner $_tor_uid -j RETURN
iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 53

#allow clearnet access for hosts in $_non_tor
for _clearnet in $_non_tor; do
   iptables -t nat -A OUTPUT -d $_clearnet -j RETURN
   iptables -t nat -A PREROUTING -i $_int_if -d $_clearnet -j RETURN
done

#redirect all other pre-routing and output to Tor
iptables -t nat -A OUTPUT -p tcp --syn -j REDIRECT --to-ports $_trans_port
iptables -t nat -A PREROUTING -i $_int_if -p udp --dport 53 -j REDIRECT --to-ports 53
iptables -t nat -A PREROUTING -i $_int_if -p tcp --syn -j REDIRECT --to-ports $_trans_port

### set iptables *filter
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#allow clearnet access for hosts in $_non_tor
for _clearnet in $_non_tor 127.0.0.0/8; do
 iptables -A OUTPUT -d $_clearnet -j ACCEPT
done

#allow only Tor output
iptables -A OUTPUT -m owner --uid-owner $_tor_uid -j ACCEPT
iptables -A OUTPUT -j REJECT
