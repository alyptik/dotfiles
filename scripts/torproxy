#!/bin/sh

### set variables
#your internal interface
_int_if="eth0"

#the UID that Tor runs as (varies from system to system)
_tor_uid="109"

#Tor's TransPort
_trans_port="9040"

#Tor's DNSPort
_dns_port="5353"

#Tor's VirtualAddrNetworkIPv4
_virt_addr="10.192.0.0/10"

#LAN destinations that shouldn't be routed through Tor
_non_tor="127.0.0.0/8 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16"

### Don't lock yourself out after the flush
#iptables -P INPUT ACCEPT
#iptables -P OUTPUT ACCEPT

### flush iptables
iptables -F
iptables -t nat -F

### set iptables *nat
#nat .onion addresses
iptables -t nat -A OUTPUT -d $_virt_addr -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j REDIRECT --to-ports $_trans_port

#nat dns requests to Tor
iptables -t nat -A OUTPUT -d 127.0.0.1/32 -p udp -m udp --dport 53 -j REDIRECT --to-ports $_dns_port

#don't nat the Tor process, the loopback, or the local network
iptables -t nat -A OUTPUT -m owner --uid-owner $_tor_uid -j RETURN
iptables -t nat -A OUTPUT -o lo -j RETURN
iptables -t nat -A OUTPUT -d 10.0.0.0/8 -j RETURN
iptables -t nat -A OUTPUT -d 127.0.0.0/8 -j RETURN
iptables -t nat -A OUTPUT -d 172.16.0.0/12 -j RETURN
iptables -t nat -A OUTPUT -d 192.168.0.0/16 -j RETURN

#redirect whatever fell thru to Tor's TransPort
iptables -t nat -A OUTPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j REDIRECT --to-ports $_trans_port

### set iptables *filter
#*filter INPUT
iptables -A INPUT -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT

#Don't forget to grant yourself ssh access for remote machines before the DROP.
#iptables -A INPUT -i $_int_if -p tcp --dport 22 -m state --state NEW -j ACCEPT

iptables -A INPUT -j DROP

#*filter FORWARD
iptables -A FORWARD -j DROP

#*filter OUTPUT
#possible leak fix. See warning.
iptables -A OUTPUT -m state --state INVALID -j DROP

iptables -A OUTPUT -m state --state ESTABLISHED -j ACCEPT

#allow only the Tor process output
iptables -o $_int_if -A OUTPUT -m owner --uid-owner $_tor_uid -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -m state --state NEW -j ACCEPT

#allow loopback output
iptables -A OUTPUT -d 127.0.0.1/32 -o lo -j ACCEPT

#tor transproxy magic
iptables -A OUTPUT -d 127.0.0.1/32 -p tcp -m tcp --dport $_trans_port --tcp-flags FIN,SYN,RST,ACK SYN -j ACCEPT

#allow access to lan hosts in $_non_tor
#these 3 lines can be ommited
for _lan in $_non_tor; do
 iptables -A OUTPUT -d $_lan -j ACCEPT
done

#Log & Drop everything else.
iptables -A OUTPUT -j LOG --log-prefix "Dropped OUTPUT packet: " --log-level 7 --log-uid
iptables -A OUTPUT -j DROP

#Set default policies to DROP
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

