#!/bin/bash

perllibpath="/usr/lib/perl5/vendor_perl/"
perllocallibpath="/usr/lib/perl5/site_perl/"

getmodule() {
	local path=$1
	local file=$2
	echo $file | sed \
		 -e "s|^${path}auto/||" \
		 -e "s|^$path||" \
		 -e 's|/|::|g' \
		 -e 's|.so$||' \
		 -e 's|\(.*\)::.*$|\1|'
}

testmodule() {
	local module=$1
	local prefix=$2
	local output=$(perl -M"$module" -e1 2>&1)
	local ret=$?
	if (($ret != 0)); then
		echo $file >> "$tmpdir/${prefix}raw.txt"
		echo "$module" >> "$tmpdir/${prefix}perl-modules.txt"
	elif grep -q "perl: symbol lookup error:" <<< $output; then
		sed -n 's|perl: symbol lookup error: \(.*\): undefined symbol: .*|\1|p' <<< $output >> "$tmpdir/${prefix}raw.txt"
		echo "$module" >> "$tmpdir/${prefix}perl-modules.txt"
	elif grep -q "Perl API version .* of .* does not match .*" <<< $output; then
		echo $file >> "$tmpdir/${prefix}raw.txt"
		echo "$module" >> "$tmpdir/${prefix}perl-modules.txt"
	fi
}

tmpdir=$(mktemp -d /tmp/find-broken-perl-package.XXXXXXXX)
touch $tmpdir/{local-,}{raw,perl-modules}.txt

find "$perllibpath" -name "*.so" |
	while read file; do
		module=$(getmodule "$perllibpath" "$file")
		testmodule "$module" ""
	done

if [[ -d $perllocallibpath ]]; then
	find "$perllocallibpath" -name "*.so" |
		while read file; do
			module=$(getmodule "$perllocallibpath" "$file")
			testmodule "$module" "local-"
		done
fi

pacman -Qqo $(<"$tmpdir/raw.txt") | sort -u >"$tmpdir/pacman.txt"
module-to-dist.pl <"$tmpdir/perl-modules.txt" >"$tmpdir/perl-dists.txt"
module-to-dist.pl <"$tmpdir/local-perl-modules.txt" >"$tmpdir/local-perl-dists.txt"

echo "results are in \"$tmpdir\""
echo " - {local-,}raw.txt is a list of files that caused errors"
echo " - pacman.txt is a list of packages that need to be rebuilt. Those are likely AUR packages"
echo " - local-perl-dists.txt is a list of cpan distributions installed to site_perl. Use cpan to rebuild them"
echo ""
echo "additional files:"
echo " - {local-,}perl-modules.txt is a list of cpan modules that caused errors"
echo " - perl-dists.txt is a list of cpan distributions that caused errors"
