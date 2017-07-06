# -*- coding: utf-8 -*-
"""
Created on Sun Jun 11 00:52:44 2017

@aauthor: gebruiker
"""

def hhash(s):
    h = 0
    for k in s:
        h = 23*h + ord(k)
    return h

def main():
    table2 = {}
    table4 = {}
    range_min = 34
    #range_max = 1114112
    range_max = 4000
    # http://www.utf8-chartable.de/unicode-utf8-table.pl?utf8=dec
    for i in range(range_min, range_max):
        for j in range(34, 59):
            str = chr(i) + chr(j)
            hash = hhash(str)
            if hash in table2:
                table2[hash].append(str)
            else:
                table2[hash] = [str]
    for i, k in table2.items():
        if len(k) > 1:
            for l in k:
                for m, n in table2.items():
                    if len(n) > 1:
                        for o in n:
                            str = l + o
                            hash = hhash(str)
                            if hash in table4:
                                table4[hash].append(str)
                            else:
                                table4[hash] = [str]
    txt_file = open('collisions.txt', 'w', encoding="utf-8")
    for i, k in table4.items():
        if len(k) > 4:
            print(k)
            break

if __name__ == "__main__":
    main()
