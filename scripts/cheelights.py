#!/bin/python3

import socket
import os
chee = socket.create_connection((socket.gethostbyname("police.computer"), 17000))
import random
for i in range(1, 100):
        thiscolor = random.getrandbits(24)
        colorstr = "#{:x}".format(thiscolor)
        print(colorstr)
        chee.send(colorstr.encode("ascii"))
chee.close()
