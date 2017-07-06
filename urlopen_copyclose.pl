use strict; use warnings;

weechat::register('urlopen_copyclose', 'Nei <anti.teamidiot.de>', '0.0', 'GPL3', 'closes copywin when url is opened', '', '') || return;
weechat::hook_signal('urlopen', 'urlopen_action', '');

sub urlopen_action {
	weechat::command(weechat::current_buffer(), '/copywin **q');
	weechat::WEECHAT_RC_OK
}
