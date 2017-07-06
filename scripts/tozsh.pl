#!/usr/bin/env perl

#
# exceedingly ugly hack to convert bashprompt themes to zshprompt themes
# (bashprompt is at http://bash.current.nu/)
#
# Adam Spiers <adam@spiers.net>

use strict;

my @colours = qw/grey red green yellow blue magenta cyan white/;

my @codes = ();
my %boldp;
my $out = '';

print "# Converted to zsh prompt theme by bash2zshprompt, written by <adam\@spiers.net>\n";

my $seen_fn = 0;
my $seen_fn_end = 0;
while (<>) {
  # Ugh
  if (! $seen_fn) {
    s/^\s*function (\w+) {\s*$/prompt_$1_setup () {\n/ and $seen_fn = $1;
  }
  # UGH
  elsif (! $seen_fn_end && $seen_fn) {
    s/^\s*/  /;
    s/^\s*}\s*$/\n  precmd () { setopt promptsubst }\n  preexec () { }\n}\n/ and $seen_fn_end++;
  }

  s/\\\[/%{/g;
  s/\\\]/%}/g;

  s/\\033/\\e/g;
  s/\\e\[([0-9;]+)m/split_codes($1)/eg;
  s/\\e\[((\d?)(\d))m/color()/eg;

  s/(?<!\\)\\u/%n/g;
  s/(?<!\\)\\h/%m/g;
  s/(?<!\\)\\t/%t/g;
  s/(?<!\\)\\d/%D{%a %b %d}/g;
  s/(?<!\\)\\?\$\(date\s+\+([^)]+)\)/%D{$1}/g;
  s/(?<!\\)\\!/%!/g;
  s/(?<!\\)\\#/%!/g; # hmmm
  s/(?<!\\)\\n/\$prompt_newline/g;
  s/(?<!\\)\\s/\$SHELL/g;
  s/(?<!\\)\\v/\$ZSH_VERSION[1]/g;
  s/(?<!\\)\\V/\${ZSH_VERSION%%-*}/g;
  s/(?<!\\)\\w/%~/g;
  s/(?<!\\)\\W/%1~/g;
  s/(?<!\\)\\\$(?!\()/%\#/g;

  s/(?<!\\)\\0?(\d{3})/push @codes, $1; "\$char_$1"/eg;

  s/%}%{//g;

  $out .= $_;
}

# Must be a better way of doing this
print <<EOF if @codes;

for code in @codes; do
  local varname=char_\$code
  : \${(P)varname=\$(echo -n "\\\\0\$code")}
done

EOF

print $out;

print qq!\nprompt_${seen_fn}_setup "\$@"\n! if $seen_fn;

exit 0;

sub color {
  my @p = ($1, $2, $3);

  my $fgbg = (($p[1] eq '3') ? 'fg' :
              ($p[1] eq '4') ? 'bg' :
              '???');

  $boldp{$fgbg} ||= '';

  if ($p[0] =~ /^0?0$/) {
    $boldp{$fgbg} = '';
    return '$reset_color';
  }
  
  if ($p[0] =~ /^0?1$/) {
    $boldp{$fgbg} = 'bold_';
    return '$bold_color';
  }

  return '$' .
         "${fgbg}$boldp{$fgbg}\[" .
         $colours[$p[2]] .
         ']';
}

sub split_codes {
  join '', (map { "\\e\[${_}m" } (split m!;!, $_[0]));
}
