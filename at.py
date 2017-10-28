#!/bin/python2

import weechat as w
import re

SCRIPT_NAME    = "at"
SCRIPT_AUTHOR  = "KrokodileGlue <KrokodileGlue@outlook.com>"
SCRIPT_VERSION = "0.1"
SCRIPT_LICENSE = "MIT"
SCRIPT_DESC    = "A script that replaces `@nick` with `nick:` in all messages."

# registration function
w.register(
        SCRIPT_NAME,
        SCRIPT_AUTHOR,
        SCRIPT_VERSION,
        SCRIPT_LICENSE,
        SCRIPT_DESC,
        "" , ""
)

# the main callback function
def at_cb(data, modifier, modifier_data, string):
        try:
                nick, msg = string.split('\t')
        except ValueError, e:
                return string

        if re.match('^@[^\s]+', msg):
                m = re.match('^@([^\s]+)(.*)', msg)
                return nick + "\t" + m.group(1) + ":" + m.group(2)
        else:
                return string

w.hook_modifier("weechat_print", "at_cb", "")
