from asyncirc import irc
#import asyncirc from irc
import asyncirc.plugins.sasl
import asyncio
import configparser
import time
import sys

config = configparser.ConfigParser(interpolation=None)
config.read('config.ini')

network = config["DEFAULT"]["network"]
server = config[network]["server"]
port = config[network]["port"]
nick = config[network]['nick']
password = config[network]['password']


conn = irc.connect(server, port, use_ssl=True)
conn.register(nick, nick, nick)
asyncirc.plugins.sasl.auth(bot_nick, bot_password)

nicks_to_renew = []
nick_to_try = ""

@conn.on("irc-001")
def query_for_nicks(message):
    print("Querying NickServ for list of nicks")
    conn.say("NickServ", "info")

@conn.on("private-notice")
def extract_nicks(message, user, target, text):
    if message.source != "NickServ!NickServ@services.":
        print("Notice from user {}: {}".format(user.user, text))
        return

    if text.startswith("Nicks"):
        global nicks_to_renew
        nicks = text.split(":", 1)[1].strip()
        nicks_to_renew += [nick for nick in nicks.split()
                                if  nick != bot_nick]
        print("Added `{}' to list of nicks".format(nicks))

    elif "End of Info" in text:
        # Run the first renew try at the end of the nickserv info
        renew_next()

@conn.on("irc-nick")
def renew_next(message=""):
    # Sleep 5 seconds before trying to renew a nick, due to nick changing rate limiting
    time.sleep(5)

    try:
        global nick_to_try
        nick_to_try = nicks_to_renew.pop()
    except IndexError:
        # Exit when we have no more nicks to renew
        print("All nicks renewed. Exiting...")
        conn.anything("QUIT :Done...")
        sys.exit(0)

    print("Trying to renew nick `{}'".format(nick_to_try))
    conn.writeln("NICK {}".format(nick_to_try))


@conn.on("irc-433")
def nick_in_use(message):
    print("Nickname `{}' is already in use. Skipping...".format(nick_to_try))
    renew_next()


@conn.on("irc-437")
def nick_unavailable(message):
    print("Nick `{}' is marked temporarily unavailable, releasing it...".format(nick_to_try))
    conn.say("NickServ", "RELEASE {}".format(nick_to_try))

    print("Retrying renew of `{}'".format(nick_to_try))
    global nicks_to_renew
    nicks_to_renew.append(nick_to_try)
    renew_next()


@conn.on("irc-438")
def nick_change_ratelimit(message):
    global nicks_to_renew
    nicks_to_renew.append(nick_to_try)

    print("Nick changing was rate limited, waiting 20 seconds")
    time.sleep(20)
    print("Nick changing resuming")
    renew_next()

if __name__ == '__main__':
    asyncio.get_event_loop().run_forever()
