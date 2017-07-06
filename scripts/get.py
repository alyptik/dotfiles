#! /usr/bin/env python3

import json, sys
import re

data = list(map(lambda x:json.loads(x)["d"].split("je.api(", 2)[2].rsplit(');</script>', 1)[0], filter(lambda x:"data-async-context" in x, sys.stdin.read().split("/*\"\"*/"))))
data = data[0]
data = data.replace(r'\x22', r'\"')
data = re.sub(r'\\x(?P<code>[0-9a-f][0-9a-f])', lambda x:chr(int(x.group('code'), 16)), data)
data = data.replace('"is":_loc', '"is": null').replace('"ss":_ss', '"ss": null')
data = json.loads(data)
print(data['h'])
