#!/usr/bin/perl --
#~
#~
#~
#!/usr/bin/perl --
use strict;
use warnings;
use PPI;
use PPI::HTML;
use Term::ANSIColor;
#use Win32::Console::ANSI;
Lightup( @ARGV , __FILE__ );
exit( 0 );

sub Lightup {
    return Pod::Perldoc::ToTermPPIHTML->new->parse_from_file( shift );
}

package Pod::Perldoc::ToTermPPIHTML;

use parent qw/ Pod::Perldoc::ToTerm /;
sub parse_from_file {
    my $self = shift;
    no warnings 'redefine';
    local *Pod::Text::cmd_verbatim = *my_cmd_verbatim; ## necessity ## typing
    $self->SUPER::parse_from_file( @_ );
}
sub my_cmd_verbatim {
    my ($self, $attrs, $text) = @_;
    $self->item if defined $$self{ITEM};
    return if $text =~ /^\s*$/;
    $text =~ s/^(\n*)([ \t]*\S+)/$1 . (' ' x $$self{MARGIN}) . $2/gme;
    $text = join '', _colorado( $text) ;
    $text =~ s/\s*$/\n\n/;
    $self->output( $text );
    return '';
}


sub _colorado {
    use PPI;
    use PPI::HTML;
    use Term::ANSIColor qw/ colored color /;
#~ my %scite = (
#~     comment  => [ q{SCE_PL_COMMENTLINE}, q{007F00}, q{}, ], ##  Comment
#~     double  => [ q{SCE_PL_HERE_QQ}, q{7F007F}, q{feeffe}, ], ##  Here-doc (double quoted, qq)
#~     double  => [ q{SCE_PL_STRING_QQ}, q{7F007F}, q{}, ], ##  qq = Double quoted string ; interpolate
#~     double  => [ q{SCE_PL_STRING}, q{7F007F}, q{}, ], ##  Double quoted string
#~     interpolate  => [ q{SCE_PL_STRING_QQ}, q{7F007F}, q{}, ], ##  qq = Double quoted string ; interpolate
#~     keyword  => [ q{SCE_PL_WORD}, q{00007F}, q{}, ], ##  Keyword
#~     line_number  => [ q{SCE_PL_COMMENTLINE}, q{007F00}, q{}, ], ##  Comment
#~     line_number  => [ q{SCE_PL_DATASECTION}, q{600000}, q{FFF0D8}, ], ##  Data Section: __DATA__ or __END__ at beginning of line
#~     line_number  => [ q{SCE_PL_POD}, q{004000}, q{E0FFE0}, ], ##  POD: = at beginning of line
#~     literal  => [ q{SCE_PL_STRING_Q}, q{7F007F}, q{}, ], ##  Single quoted string, generic, literal
#~     match  => [ q{SCE_PL_FORMAT_IDENT}, q{C000C0}, q{}, ], ##  format identifier
#~     match  => [ q{SCE_PL_FORMAT}, q{C000C0}, q{FFF0FF}, ], ##  format body
#~     number  => [ q{SCE_PL_NUMBER}, q{007F7F}, q{}, ], ##  Number
#~     operator  => [ q{SCE_PL_OPERATOR}, q{000000}, q{}, ], ##  Operators
#~     pod  => [ q{SCE_PL_POD_VERB}, q{004000}, q{C0FFC0}, ], ##  POD: verbatim paragraphs
#~     pod  => [ q{SCE_PL_POD}, q{004000}, q{E0FFE0}, ], ##  POD: = at beginning of line
#~     regex  => [ q{SCE_PL_REGEX}, q{000000}, q{A0FFA0}, ], ##  Regex: /re/ or m{re}
#~     regex  => [ q{SCE_PL_REGSUBST}, q{000000}, q{F0E080}, ], ##  Substitution: s/re/ore/
#~     regex  => [ q{SCE_PL_STRING_QR}, q{000000}, q{A0FFA0}, ], ##  qr = Regex
#~     single  => [ q{SCE_PL_CHARACTER}, q{7F007F}, q{}, ], ##  Single quoted string
#~     single  => [ q{SCE_PL_HERE_Q}, q{7F007F}, q{feeffe}, ], ##  Here-doc (single quoted, q)
#~     single  => [ q{SCE_PL_STRING_Q}, q{7F007F}, q{}, ], ##  Single quoted string, generic, literal
#~     substitute  => [ q{SCE_PL_REGSUBST}, q{000000}, q{F0E080}, ], ##  Substitution: s/re/ore/
#~     substitute  => [ q{SCE_PL_SUB_PROTOTYPE}, q{000000}, q{}, ], ##  subroutine prototype
#~     words  => [ q{SCE_PL_WORD}, q{00007F}, q{}, ], ##  Keyword
#~ );
    our %color = (


#~ 		# Standard token classes
#~ 		pod           => '#008080',
#~ 		comment       => '#008080',
#~ 		operator      => '#DD7700',
#~ 		single        => '#999999',
#~ 		double        => '#999999',
#~ 		literal       => '#999999',
#~ 		interpolate   => '#999999',
#~ 		words         => '#999999',
#~ 		regex         => '#9900FF',
#~ 		match         => '#9900FF',
#~ 		substitute    => '#9900FF',
#~ 		transliterate => '#9900FF',
#~ 		number        => '#990000',
#~ 		magic         => '#0099FF',
#~ 		cast          => '#339999',

#~ 		# Special classes
#~ 		pragma        => '#990000',
#~ 		keyword       => '#0000FF',
#~ 		core          => '#FF0000',
#~ 		line_number   => '#666666',

        pod       => 'green on_white',
        comment   => 'green on_white',
        pragma    => 'blue  on_white',
        core      => 'blue  on_white',
        keyword   => 'blue  on_white',
        symbol    => 'red   on_white',
        word      => 'black on_white',
        structure => 'black on_white',
        operator  => 'black on_white',
        default   => 'black on_white',
    );

    sub rado {
        my( $colo, $text ) = @_;
        $colo = $color{$colo}  || $color{default} ;
        return colored( [ $colo ], $text );
    }

    use PPI::HTML::Fragment;
    no warnings 'redefine';
    local *PPI::HTML::Fragment::html = sub {
        my $self = shift;
        my $html = $self->string;
        if( my $color = $self->css ){
            return rado( $color,   $html );
        } else {
            return rado( 'default', $html );
        }
    };


    my $Document = PPI::Document->new( \$_[0] );
    my $Highlight = PPI::HTML->new( line_numbers => 0 , page => 0 );
    return join '', color($color{default}), $Highlight->html( $Document );
}
__END__
