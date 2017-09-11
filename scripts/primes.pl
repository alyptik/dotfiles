#!/bin/perl

my %hash;

sub div {
	my $num = shift;
	my $big = shift;
	my $key = join ',', ($num, $big);
	return $hash{$key} if exists $hash{$key};
	return $hash{$key} = $big % $num;
}

sub prime {
	my $big = shift;
	return 0 if ($big == 0 || $big == 1);
	for (reverse 2 .. sqrt $big) {
		if (div($_, $big) == 0) {
			return prime($_) unless (prime($big / $_) == 0);
		}
	}
	return 1 if ($big % 2 == 0);
	return $big;
}

print prime $ARGV[0];

