#!/usr/bin/perl -w

my $version = 'greybot 2016-12-13';

use strict;
use warnings;
use POE qw(Component::IRC Component::IRC::Plugin::Connector);
use DBI;

# Copyright (C) 2010 Greg Wooledge <greg@wooledge.org>
# This work is free. You can redistribute it and/or modify it under the
# terms of the Do What The Fuck You Want To Public License, Version 2,
# as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.

$| = 1;
my $nick = 'lolyzen';
my $irc = POE::Component::IRC->spawn(
    nick =>     $nick,
    ircname =>  'the bot that is grey',
    server =>   'irc.freenode.net',
) or die "# Could not connect: $!";
my $firstchannel = '#chee-fanclub';

my (%faq, @faqkeys, %pf, @pfkeys, %channels);
my $ALIAS_DEPTH = 4;

# Stats database: track hits for factoids and FAQ searches.

my $need_tables = 0;
$need_tables = 1 unless -f "stats.db";
# Connection creates the file, so we had to check for it first.
my $dbh = DBI->connect("dbi:SQLite:dbname=stats.db","","");
if ($need_tables) {
    my $sth = $dbh->prepare(q{
	create table factoids ( factoid text, hits integer )
    });
    $sth->execute();
    $sth = $dbh->prepare(q{
	create table faqs ( search text, hits integer )
    });
    $sth->execute();
    $sth = $dbh->prepare(q{
	create table faqpages ( page text, hits integer )
    });
    $sth->execute();
}

### Start POE black magic stuff --v
POE::Session->create(
    package_states => [
        main => [ qw(_default _start irc_001 irc_public irc_msg irc_invite
                     irc_kick irc_ctcp_action irc_notice irc_disconnected
		     irc_error irc_socketerr) ],
    ],
    heap => { irc => $irc },
);

$poe_kernel->run();

sub _start {
    my $heap = $_[HEAP];
    my $irc = $heap->{irc};
    $irc->yield( register => qw(001 public msg invite kick ctcp_action notice
				disconnected error socketerr) );
    $heap->{connector} = POE::Component::IRC::Plugin::Connector->new();
    $irc->plugin_add( 'Connector' => $heap->{connector} );
    $irc->yield( connect => { } );
    return;
}

sub _default {
    my ($event, $args) = @_[ARG0 .. $#_];
    my @output = ( "$event: " );

    for my $arg (@$args) {
        if ( ref $arg eq 'ARRAY' ) {
            push ( @output, '[' . join(', ', @$arg ) . ']' );
        } else {
            push ( @output, "'$arg'" );
        }
    }
    print join ' ', @output, "\n";
    return 0;
}
### End POE black magic stuff --^

# IRC event handler subroutines

sub irc_001 {
    my $sender = $_[SENDER];
    my $irc = $sender->get_heap();
    print "# Connected to ", $irc->server_name(), "\n";

    my $password;
    if (open PASS, "<password") {
        print "# Identifying to nickserv\n";
        $password = <PASS>;
        chomp($password);
        $irc->yield( nickserv => "identify $password" );
        close PASS;
    }

    print "# Joining $firstchannel\n";
    $irc->yield( join => $firstchannel );
    return;
}

sub irc_public {
    my ($sender, $who, $where, $what) = @_[SENDER, ARG0 .. ARG2];
    my $nick = ( split /!/, $who )[0];
    my $channel = $where->[0];

    print "<$nick> $what\n";
    if ($what =~ /^!pf/i) {
        cmd_pf($sender, $nick, $what, $channel);
    } elsif ($what eq '!date') {
        cmd_date($sender, $channel);
    } elsif ($what eq '!version') {
        cmd_version($sender, $channel);
    } elsif ($what =~ /^!learn/i) {
        cmd_learn($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!forget/i) {
        cmd_forget($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!metaurl/i) {
        cmd_metaurl($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!meta/i) {
        cmd_meta($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!factstats/i) {
	cmd_factstats($sender, $channel);
    } elsif ($what =~ /^!faqstats/i) {
	cmd_faqstats($sender, $channel);
    } elsif ($what =~ /^!faqpages/i) {
	cmd_faqpages($sender, $channel);
    } elsif ($what =~ /^!faq/i) {
        cmd_faq($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!searchkeys/i) {
	cmd_searchkeys($sender, $nick, $what, $channel);
    } elsif ($what =~ /^!/) {
        cmd_recall($sender, $nick, $what, $channel);
    }
    return;
}

# learn and forget are intentionally omitted here.
sub irc_msg {
    my ($sender, $who, $rcpts, $what) = @_[SENDER, ARG0 .. ARG2];
    my $nick = ( split /!/, $who )[0];

    print "*$nick* $what\n";
    if ($what =~ /^!?pf/i) {
        cmd_pf($sender, $nick, $what, $nick);
    } elsif ($what =~ /^!?date$/i) {
        cmd_date($sender, $nick);
    } elsif ($what =~ /^!?version$/i) {
        cmd_version($sender, $nick);
    } elsif ($what =~ /^!?metaurl/i) {
        cmd_metaurl($sender, $nick, $what, $nick);
    } elsif ($what =~ /^!?meta/i) {
        cmd_meta($sender, $nick, $what, $nick);
    } elsif ($what =~ /^!?factstats$/i) {
	cmd_factstats($sender, $nick);
    } elsif ($what =~ /^!?faqstats$/i) {
	cmd_faqstats($sender, $nick);
    } elsif ($what =~ /^!?faqpages$/i) {
	cmd_faqpages($sender, $nick);
    } elsif ($what =~ /^!?faq/i) {
        cmd_faq($sender, $nick, $what, $nick);
    } elsif ($what =~ /^!?searchkeys/i) {
	cmd_searchkeys($sender, $nick, $what, $nick);
    } else {
        cmd_recall($sender, $nick, $what, $nick);
    }
    return;
}

sub irc_invite {
    my ($sender, $who, $channel) = @_[SENDER, ARG0, ARG1];
    my $irc = $sender->get_heap();
    my $nick = ( split /!/, $who )[0];

    print "~ Invited to $channel by $nick\n";
    read_channels();
    if (defined($channels{$channel})) {
        print "# Joining $channel\n";
        $irc->yield( join => $channel );
    }
    return;
}

sub irc_kick {
    my ($sender, $kicker, $channel, $victim, $why) = @_[SENDER, ARG0 .. ARG3];
    my $nick = ( split /!/, $kicker )[0];

    print "~ $victim kicked from $channel by $nick ($why)\n";
    return;
}

sub irc_ctcp_action {
    my ($sender, $who, $where, $what) = @_[SENDER, ARG0 .. ARG2];
    my $nick = ( split /!/, $who )[0];
    my $channel = $where->[0];

    print "* $nick $what\n";
    return;
}

sub irc_notice {
    my ($sender, $who, $where, $what) = @_[SENDER, ARG0 .. ARG2];
    my $nick = ( split /!/, $who )[0];
    my $channel = $where->[0];

    print "*$nick* $what\n";
    return;
}

sub irc_disconnected {
    my ($server) = $_[ARG0];
    print "# Lost connection to server $server\n";
    sleep 5;
    print "# Exiting\n";
    exit 1;
}

sub irc_error {
    my ($err) = $_[ARG0];
    print "# Server error occurred: $err\n";
    sleep 5;
    print "# Exiting\n";
    exit 1;
}

sub irc_socketerr {
    my ($err) = $_[ARG0];
    print "# Socket error occurred: $err\n";
    sleep 5;
    print "# Exiting\n";
    exit 1;
}

# Subroutines that implement commands, etc.

sub read_channels {
    %channels = ();
    if (!open(CHAN, "<channels")) {
        print "# Can't open channels file: $!\n";
        return;
    }
    while (<CHAN>) { chomp; $channels{$_} = 1; }
    close CHAN;
}

# Example syntax:
# faq27
# !faq 27
# faq spaces
# faq 2>&1 >newbie
# faq 1 > newbie

# To allow FAQ keys with > in them, there must be a space before ">" in the
# "redirect to a person" syntax.

# The $where argument should be a scalar, ready to hand off to
# this funny $irc->yield( privmsg => $where => ... ) thing.

sub cmd_faq {
    my ($sender, $nick, $what, $where) = @_;
    my $irc = $sender->get_heap();
    my $search = $what;
    my $answer = "";
    my ($rcpt, $key);

    # Parse the request.  Remove leading "!faq " stuff, then look for a
    # redirection.
    $search =~ s/^!?faq *//i;
    if ($search =~ / >/) {
        $rcpt = $search;
        $search =~ s/ +>.*$//;
        $rcpt =~ s/^.* > *//;
    } else {
        undef $rcpt;
    }

    read_faq();

    # First, check for "!faq 27".
    $key = 'faq' . $search;
    if (defined($faq{$key})) {
        $answer = 'http://mywiki.wooledge.org/BashFAQ/' .
            sprintf("%03d", $search) . " -- $faq{$key}";
	update_faqstats($search);
	update_faqpages($search);

    # It wasn't a faq index number, so do a plain string search.
    } else {
        foreach $key (@faqkeys) {
            if ($faq{$key} =~ /\Q$search/i) {
                my $n = $key;
                $n =~ s/^faq//;
                $answer = 'http://mywiki.wooledge.org/BashFAQ/' .
                    sprintf("%03d", $n) . " -- $faq{$key}";
		update_faqstats($search);
		update_faqpages($n);
                last;
            }
        }
    }

    if ($answer eq "") {
        $answer = "$nick: No matches found at http://mywiki.wooledge.org/BashFAQ";
    } elsif (defined($rcpt)) {
        $answer = "$rcpt: $answer";
    }

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

# Read the FAQ (flattened single file version) into a hash indexed by the
# FAQ's anchors ("faq1" etc.).  Hash value is the question text which
# is expected to be on the line immediately following the anchor.
sub read_faq {
    %faq = ();
    @faqkeys = ();
    my ($line, $nextline);
    if (!open FAQ, "<BashFAQ") {
        print "### Couldn't read BashFAQ: $!\n";
        return;
    }
    while (<FAQ>) {
        if (/<<Anchor\(faq\d+\)/) {
            $_ =~ s/\r?\n//;
            $line = $_;
            $line =~ s/^.*<<Anchor\(//;		# trim <<Anchor(
            $line =~ s/\)>>.*$//;		# trim )>>
	    while (1) {
        	$nextline = <FAQ>;
		$nextline =~ s/\r?\n//;
		last if eof;
		# If it's blank, try again.
		next if ($nextline eq "");
		last;
	    }
            $nextline =~ s/^=* *//;		# trim leading ==
            $nextline =~ s/ *=*\r*$//;		# trim trailing ==
            $faq{$line} = $nextline;
            push @faqkeys, $line;
        }
    }
    close FAQ;
}

sub cmd_pf {
    my ($sender, $nick, $what, $where) = @_;
    my $irc = $sender->get_heap();
    my $search = $what;
    my $answer = "";
    my ($rcpt, $key);

    # Remove leading "!pf " stuff, then look for a redirection.
    $search =~ s/^!?pf *//i;
    if ($search =~ / >/) {
        $rcpt = $search;
        $search =~ s/ +>.*$//;
        $rcpt =~ s/^.* > *//;
        $rcpt =~ s/ *$//;
    } else {
        undef $rcpt;
    }

    read_pf();

    # First, check for "!pf 27" notation.
    $key = 'pf' . $search;
    if (defined($pf{$key})) {
        $answer = 'http://mywiki.wooledge.org/BashPitfalls#' . $key .
            " -- Don't do this! -- $pf{$key}";

    # Otherwise, search for the argument as a string.
    } else {
        foreach $key (@pfkeys) {
            if ($pf{$key} =~ /\Q$search/i) {
                $answer = 'http://mywiki.wooledge.org/BashPitfalls#' .
                    $key . " -- Don't do this! -- $pf{$key}";
                last;
            }
        }
    }

    if ($answer eq "") {
        $answer = "$nick: No matches found at http://mywiki.wooledge.org/BashPitfalls";
    } elsif (defined($rcpt)) {
        $answer = "$rcpt: $answer";
    }

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub read_pf {
    %pf = ();
    @pfkeys = ();
    my ($line, $nextline);
    if (!open PF, "<BashPitfalls") {
        print "### Couldn't read BashPitfalls: $!\n";
        return;
    }
    while (<PF>) {
        if (/<<Anchor/) {
            $_ =~ s/\r?\n//;
            $line = $_;
            $line =~ s/^.*<<Anchor\(//;		# trim <<Anchor(
            $line =~ s/\)>>.*$//;		# trim )>>
	    while (1) {
        	$nextline = <PF>;
        	$nextline =~ s/\r?\n//;
		last if eof;
		next if ($nextline eq "");
		last;
	    }
            $nextline =~ s/^=* *//;		# trim leading ==
            $nextline =~ s/ *=*\r*$//;		# trim trailing ==
            $pf{$line} = $nextline;
            push @pfkeys, $line;
        }
    }
    close PF;
}

sub cmd_date {
    my ($sender, $where) = @_;
    my $irc = $sender->get_heap();

    my $answer = gmtime;
    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_version {
    my ($sender, $where) = @_;
    my $irc = $sender->get_heap();

    print "->$where $version\n";
    $irc->yield( privmsg => $where => $version );
}

# Expected syntax:
#  !learn key value ....
# learn is not allowed in privmsg -- must be public.

sub cmd_learn {
    my ($sender, $nick, $what, $channel) = @_;
    my $irc = $sender->get_heap();
    my (@words, $answer);

    @words = split(' ', $what);
    if (!defined($words[2])) {
        print "->$channel usage: !learn key value...\n";
        $irc->yield( privmsg => $channel => 'usage: !learn key value...' );
        return;
    }

    # Lower-case the key before we do anything else.
    $words[1] = lc($words[1]);

    # Keys MUST NOT contain slashes.
    $words[1] =~ s#/##g;

    # If the key was all slashes, abort.
    if ($words[1] eq "") {
        $answer = "After removing slashes, your key was empty.  Sorry.";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }

    # If the key is a directory name, abort.
    if (-d "factoids/$words[1]") {
        $answer = "Sorry, $words[1] is a directory.  I can't do that.";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }

    if (open(LEARN, "<factoids/$words[1]")) {
        $answer = "$words[1] is already defined: ";
        $answer .= <LEARN>;
        close LEARN;
        chomp $answer;
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }
    if (!open(LEARN, ">factoids/$words[1]")) {
        $answer = "Error: failed to open factoids/$words[1] ($!)";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }
    if (!open(META, ">>meta/$words[1]")) {
        $answer = "Error: failed to open meta/$words[1] ($!)";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        close LEARN;
        return;
    }

    # Phew!  We've got all we need now.
    shift @words;
    shift @words;
    print LEARN join(' ', @words);
    close LEARN;
    print META "$nick " . time . " learn " . join(' ', @words) . "\n";
    close META;
    print "->$channel OK, $nick\n";
    $irc->yield( privmsg => $channel => "OK, $nick" );
}

# forget must also be done in public.  No secret mass deletions.
sub cmd_forget {
    my ($sender, $nick, $what, $channel) = @_;
    my $irc = $sender->get_heap();
    my (@words, $arg, $answer);

    @words = split(' ', $what);
    if (!defined($words[1])) {
        print "->$channel usage: !forget key\n";
        $irc->yield( privmsg => $channel => 'usage: !forget key' );
        return;
    }

    $arg = lc($words[1]);
    $arg =~ s#/##g;
    if (!open(RECALL, "<factoids/$arg")) {
        $answer = "I don't know what $arg is";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }
    close RECALL;
    if (!open(META, ">>meta/$arg")) {
        $answer = "Error: failed to open meta/$arg ($!)";
        print "->$channel $answer\n";
        $irc->yield( privmsg => $channel => $answer );
        return;
    }
    print META "$nick " . time . " forget\n";
    close META;
    unlink "factoids/$arg";
    $answer = "OK, $nick";
    print "->$channel $answer\n";
    $irc->yield( privmsg => $channel => $answer );
}

# Factoid lookup.  Example syntax:
# pe
# !pe
# variable variable
# >() > greycat

sub cmd_recall {
    my ($sender, $nick, $what, $where) = @_;
    my ($answer, $rcpt);

    # Parse argument, removing leading ! if any, and looking for a redirect.
    $what =~ s/^!?//;
    if ($what =~ / >/) {
        $rcpt = $what;
        $what =~ s/ +>.*$//;
        $rcpt =~ s/^.* > *//;
        $rcpt =~ s/ *$//;
    } else {
        undef $rcpt;
    }

    # Get the answer from the files
    $answer = recall_lookup($what, $ALIAS_DEPTH);
    return unless defined($answer);
    update_factstats($what);

    if (defined($rcpt)) {
        $answer = "$rcpt: $answer";
    }
    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

# Recall data from the factoid DB, following redirects up to a given depth
sub recall_lookup {
    my ($arg, $depth) = @_;
    my $answer;
    return unless ($depth > 0);

    $arg = lc($arg);
    $arg =~ s#/##g;

    # Don't open directories, sockets, etc.  Prevents oddness on "!.", etc.
    return unless -f "factoids/$arg";

    if (open(RECALL, "<factoids/$arg")) {
        $answer = <RECALL>;
        close RECALL;
        if ($answer =~ s/^#redirect +//i) {
            return recall_lookup($answer, $depth - 1);
        }
        return $answer;
    }
    return;
}

sub update_factstats {
    my ($what) = @_;
    my $sth = $dbh->prepare(q{
	select hits from factoids where factoid = ?
    });
    $sth->execute($what);
    my $hits;
    my $use_insert = 0;
    ($hits) = $sth->fetchrow_array;
    if (!defined($hits)) { $hits = 0; $use_insert = 1; }
    $hits++;

    if ($use_insert) {
	$sth = $dbh->prepare(q{
	    insert into factoids (factoid, hits) values (?, ?)
	});
	$sth->execute($what, $hits);
    } else {
	$sth = $dbh->prepare(q{
	    update factoids set hits = ? where factoid = ?
	});
	$sth->execute($hits, $what);
    }
}

sub update_faqstats {
    my ($what) = @_;
    my $sth = $dbh->prepare(q{
	select hits from faqs where search = ?
    });
    $sth->execute($what);
    my $hits;
    my $use_insert = 0;
    ($hits) = $sth->fetchrow_array;
    if (!defined($hits)) { $hits = 0; $use_insert = 1; }
    $hits++;

    if ($use_insert) {
	$sth = $dbh->prepare(q{
	    insert into faqs (search, hits) values (?, ?)
	});
	$sth->execute($what, $hits);
    } else {
	$sth = $dbh->prepare(q{
	    update faqs set hits = ? where search = ?
	});
	$sth->execute($hits, $what);
    }
}

sub update_faqpages {
    my ($what) = @_;
    my $sth = $dbh->prepare(q{
	select hits from faqpages where page = ?
    });
    $sth->execute($what);
    my $hits;
    my $use_insert = 0;
    ($hits) = $sth->fetchrow_array;
    if (!defined($hits)) { $hits = 0; $use_insert = 1; }
    $hits++;

    if ($use_insert) {
	$sth = $dbh->prepare(q{
	    insert into faqpages (page, hits) values (?, ?)
	});
	$sth->execute($what, $hits);
    } else {
	$sth = $dbh->prepare(q{
	    update faqpages set hits = ? where page = ?
	});
	$sth->execute($hits, $what);
    }
}

sub cmd_meta {
    my ($sender, $nick, $what, $where) = @_;
    my $answer;

    $what =~ s/^!?meta *//i;
    $what = lc($what);
    $what =~ s#/##g;
    if (!open(META, "<meta/$what")) {
        $answer = "I have no record of $what";
        print "->$where $answer\n";
        $irc->yield( privmsg => $where => $answer );
        return;
    }
    # Get the last line.
    while (<META>) { chomp; $answer = $_; }
    close META;
    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_metaurl {
    my ($sender, $nick, $what, $where) = @_;
    my $answer;

    $what =~ s/^!?metaurl *//i;
    $what = lc($what);
    $what =~ s#/##g;
    if (! -e "meta/$what") {
	$answer = "I have no record of $what";
	print "->$where $answer\n";
	$irc->yield( privmsg => $where => $answer );
	return;
    }
    $answer = "http://wooledge.org/~greybot/meta/$what";
    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_factstats {
    my ($sender, $where) = @_;
    my $irc = $sender->get_heap();

    my $sth = $dbh->prepare(q{
	select factoid, hits from factoids
	order by hits desc
    });
    $sth->execute();

    my $i = 10;
    my @row;
    my $answer = "Top factoids: ";

    while (@row = $sth->fetchrow_array) {
	$answer .= "$row[0] ($row[1]), ";
	last if (--$i == 0);
    }
    $answer =~ s/, $//;

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_faqstats {
    my ($sender, $where) = @_;
    my $irc = $sender->get_heap();

    my $sth = $dbh->prepare(q{
	select search, hits from faqs
	order by hits desc
    });
    $sth->execute();

    my $i = 10;
    my @row;
    my $answer = "Top FAQ searches: ";

    while (@row = $sth->fetchrow_array) {
	$answer .= "$row[0] ($row[1]), ";
	last if (--$i == 0);
    }
    $answer =~ s/, $//;

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_faqpages {
    my ($sender, $where) = @_;
    my $irc = $sender->get_heap();

    my $sth = $dbh->prepare(q{
	select page, hits from faqpages
	order by hits desc
    });
    $sth->execute();

    my $i = 10;
    my @row;
    my $answer = "Top FAQ pages: ";

    while (@row = $sth->fetchrow_array) {
	$answer .= "$row[0] ($row[1]), ";
	last if (--$i == 0);
    }
    $answer =~ s/, $//;

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}

sub cmd_searchkeys {
    my ($sender, $nick, $what, $where) = @_;
    my $irc = $sender->get_heap();
    my $answer = "$nick: ";
    my @found;

    # Remove "searchkeys" and leading ! if present.
    $what =~ s/^!?searchkeys\s*//;

    # Find matching factoids.
    opendir(my $dirh, "factoids");
    @found = sort grep { /\Q$what/i } readdir($dirh);

    my $matches = $#found + 1;
    # Limit to 20 matches.
    if ($#found >= 20) {
	$#found = 19;
	push(@found, '...');
    }

    # Generate answer.
    if ($matches >= 1) {
	$answer .= "$matches matches found: ". join(', ', @found);
    } else {
	$answer .= "no matches";
    }
    closedir $dirh;

    print "->$where $answer\n";
    $irc->yield( privmsg => $where => $answer );
}
