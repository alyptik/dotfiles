#!/bin/perl

use strict;
use warnings;

print join(" ",
	map { s|\((\s)|$1|gr; }
	map { s|\s+| |gr; }
	join(" ",
	map { s|^.*\sT\s*(.*)$|$1\(| && $_ if /\bT\s[^_]/m; }
	map { split /\n/, `nm -D $_`; }
	keys %{{map { $_ => 1; }
	map { s|^.*$|/lib64/lib$&.so|r; } @ARGV}})) . "\n";
