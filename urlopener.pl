use strict; use warnings;

weechat::register('urlopener', 'Nei <anti.teamidiot.de>', '0.1', 'GPL3', 'open urls in browser', 'stop_urlopener', '') || return;
weechat::hook_signal('urlopen', 'urlopen_action', '');

init_urlopener();

sub urlopen_action {
	my (undef, undef, $url) = @_;
	my @cmd;
	if ($ENV{'DISPLAY'}) {
		@cmd = ('xdg-open', $url);
	}
	elsif ($ENV{'TMUX'}) {
		@cmd = ('tmux', 'neww', "exec w3m \Q$url");
	}
	elsif ($ENV{'STY'}) {
		@cmd = ('screen', 'w3m', $url);
	}
	system { $cmd[0] } @cmd;
	weechat::WEECHAT_RC_OK
}

sub init_urlopener {
	weechat::WEECHAT_RC_OK
}

sub stop_urlopener {
	weechat::WEECHAT_RC_OK
}
