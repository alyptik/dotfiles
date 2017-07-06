#!/bin/python3

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

def loop_table4(table2, limit):
    table4 = {}

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
                            if len(table4[hash]) > limit:
                                return table4[hash]

def main():
    table2 = {}
    
    for i in range(34, 2000):
        for j in range(34, 59):
            str = chr(i) + chr(j)
            hash = hhash(str)
            if hash in table2:
                table2[hash].append(str)
            else:
                table2[hash] = [str]

    collisions = loop_table4(table2, 15)
    txt_file = open('collisions.txt', 'w', encoding="utf-8")
    txt_file.write("\n".join(collisions))

if __name__ == "__main__":
    main()
