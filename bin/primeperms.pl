#!/bin/perl

use strict;
use warnings;

sub permp {
	my @a = @_;
	my @chars = (substr($a[0],0,1), substr($a[0],1,1), substr($a[0],2,1), substr($a[0],3,1));
	for (@a) {
		my $cur = $_;
		for (@chars) {
			return 0 unless ($cur =~ /$_/);
		}
	}
	return 1;
}

sub primep {
    my $number = shift;
    my $d = 2;
    my $sqrt = sqrt $number;
    while(1) {
        if ($number%$d == 0) {
            return 0;
        }
        if ($d < $sqrt) {
            $d++;
        } else {
            return 1;
        }
    }
}

my $inc=3330;
my $i=1000;
my @arr = ($i, $i + $inc, $i + (2 * $inc));

while ($i < 10000) {
	if (permp(@arr) && primep($arr[0]) && primep($arr[1]) && primep($arr[2]) && $arr[0] != 1487) {
		goto END;
	}
	$i++;
	@arr = ($i, $i + $inc, $i + (2 * $inc));
}

END:
print join("", @arr) . "\n" if ($i < 10000);
