import weechat
from os.path import exists
import time
import requests

SCRIPT_NAME    = "paste"
SCRIPT_AUTHOR  = "KrokodileGlue <KrokodileGlue@outlook.com>"
SCRIPT_VERSION = "0.1"
SCRIPT_LICENSE = "MIT"
SCRIPT_DESC    = "A script that uploads the contents of the current buffer to sprunge.us"

# Registration
weechat.register(
    SCRIPT_NAME,
    SCRIPT_AUTHOR,
    SCRIPT_VERSION,
    SCRIPT_LICENSE,
    SCRIPT_DESC,
    "" , ""
)

def uncolor(text):
    return weechat.string_remove_color(text, '')

def paste(data, buffer, args):
    text = ''

    infolist = weechat.infolist_get('buffer_lines', buffer, '')
    while weechat.infolist_next(infolist):
        text = text + ('%s <%s> %s\n' %(\
                                weechat.infolist_time(infolist, 'date'),
                                uncolor(weechat.infolist_string(infolist, 'prefix')),
                                uncolor(weechat.infolist_string(infolist, 'message')),
        ))
    weechat.infolist_free(infolist)
    data = {'sprunge': text}

    response = requests.post('http://sprunge.us', data)
    weechat.prnt('', response.content)

    return weechat.WEECHAT_RC_OK

hook = weechat.hook_command("paste", "Upload the current buffer to sprunge.us",
                            "",
                            "description of arguments",
                            "",
                            "paste", "")