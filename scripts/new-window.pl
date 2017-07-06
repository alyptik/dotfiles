#!/usr/bin/env perl

use strict;
use warnings;
use Cwd;

# Opening a new window.
# Fixed version of script from
# http://lists.schmorp.de/pipermail/rxvt-unicode/2012q3/001609.html
# by José Romildo Malaquias <malaquias at gmail.com>
# References: man 3 urxvtperl
# Debugging:   urxvt --perl-lib ${HOME}/.urxvt -pe new-window
# Example config: URxvt.keysym.Control-Shift-N: perl:new-window

sub new_window
{
    my ($self) = @_;
    my $ccwd = readlink("/proc/".$self->{child_pid}."/cwd");
    new urxvt::term $self->env, $urxvt::RXVTNAME, -cd => $ccwd;
}

sub on_child_start {
    my ($self,$pid) = @_;

    $self->{child_pid} = $pid;  # keep for later determining our shells
                                # CWD for relative path names
    ()
}


sub on_user_command
{
    my ($self, $cmd) = @_;

    if ($cmd eq "new-window") {
        new_window($self);
    }
}
