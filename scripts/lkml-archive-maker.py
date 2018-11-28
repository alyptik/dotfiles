#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# LKML archive collator and sanitizer
#
# The purpose of this script is to make a complete LKML archive by
# collecting individual archives from kernel developers. It uses a
# list of known IDs to locate messages we don't already have in the
# archive, and sanitizes the headers to remove as much private
# information as possible. It also makes sure to consider messages
# that have LKML's x-mailing-list header, so you can aim it at your
# main inbox if you do not have LKML messages sorted out already.
#
# Example usage:
#   lkml-archive-maker.py -s mail/lists/* -i known-msgids.list -e lkml-export
#
# The results will be written out into lkml-export in the YYYY-MM.mbx format.
# You can review these files to make sure the script did the right thing.
#
# Please tar up the export directory and send it over to konstantin@linuxfoundation.org.
#
# Author:  Konstantin Ryabitsev <konstantin@linuxfoundation.org>
# License: GPL-3.0
#

from __future__ import (absolute_import,
                        division,
                        print_function,
                        unicode_literals)

import os
import sys
import mailbox
import email.utils

# Remove headers that are likely to be either of the following:
# - violating the privacy of the person donating the logs
# - useless for archiving
# - useless in general
#
# header names must be lowercase
TRIMHDRS = ('delivered-to', 'status', 'precedence', 'x-sender', 'x-status', 'x-uid', 
            'x-from_', 'x-keywords', 'x-authentication-warning', 'x-received',
            'x-spam-checker-version', 'x-spam-level', 'x-spam-status', 'x-scanned-by',
            'x-virus-scanned', 'x-virus-status', 'x-mimedefang-filter',
            'dkim-signature', 'x-google-dkim-signature', 'x-gm-message-state',
            'received-spf')

XMAILINGLIST = 'linux-kernel@vger.kernel.org'


def main(sources, outdir, msgids, lkmlonly):
    outboxes = {}
    writecount = {}
    seenids = []
    knownset = set(msgids)

    for sourcefile in sources:
        sys.stdout.write('Opening %s...' % sourcefile)
        sys.stdout.flush()
        inbox = mailbox.mbox(sourcefile)
        total = len(inbox)
        sys.stdout.write('%s messages\n' % total)
        sys.stdout.flush()

        counter = 0
        skipped = 0
        dupmsgid = 0
        nomsgid = 0
        notlkml = 0

        for msg in inbox:
            counter += 1
            sys.stdout.write('  %s/%s (%s skipped: %s dupmsgid, %s nomsgid, %s notlkml)\r' % 
                             (counter, total, skipped, dupmsgid, nomsgid, notlkml))
            sys.stdout.flush()

            msgid = msg['message-id']
            if msgid is None:
                # Huh, no message-id? Most likely, FOLDER-INTERNAL DATA marker or some other
                # system message.
                skipped += 1
                nomsgid += 1
                continue
            if msgid in knownset:
                # Duplicate Message-ID, either because we already have it in the known-ids,
                # or because the inbox has messages with same IDs. There is no fix for the
                # latter condition, so we just assume they got delivered multiple times and
                # use the first one found.
                skipped += 1
                dupmsgid += 1
                continue

            # Remove headers in the TRIMHDRS list and any Received:
            # lines that do not have "by vger.kernel.org" in them
            # we also use the date received by vger as our indicator
            # which mailbox this should go into
            newhdrs = []
            recvtime = None
            is_lkml = False
            for hdrname, hdrval in msg._headers:
                if hdrname.lower() not in TRIMHDRS:
                    if hdrname == 'Received':
                        try:
                            if hdrval.find('by vger.kernel.org') >= 0:
                                if recvtime is None:
                                    recvtime = email.utils.parsedate_tz(hdrval.split(';')[-1].strip())
                                newhdrs.append((hdrname, hdrval))
                        except UnicodeDecodeError:
                            # probably not a vger header if it's got unicode crud in it
                            pass
                    else:
                        newhdrs.append((hdrname, hdrval))
                        if hdrname.lower() == 'x-mailing-list' and hdrval.strip() == XMAILINGLIST:
                            is_lkml = True

            if lkmlonly and not is_lkml:
                skipped += 1
                notlkml += 1
                continue

            msg._headers = newhdrs

            msgdate = recvtime
            if msgdate is None:
                # fine, use the date in the message, even if it's bogus
                msgdate = email.utils.parsedate_tz(msg['Date'])

            mboxname = '%04d-%02d.mbx' % (msgdate[0], msgdate[1])

            # do we have this mbox open already?
            if mboxname in outboxes:
                outbox = outboxes[mboxname]
                writecount[mboxname] += 1
            else:
                outbox = mailbox.mbox('%s/%s' % (outdir, mboxname))
                outboxes[mboxname] = outbox
                writecount[mboxname] = 1

            outbox.add(msg)
            seenids.append(msgid)
            knownset.add(msgid)

        inbox.close()
        sys.stdout.write('  %s/%s (%s skipped: %s dupmsgid, %s nomsgid, %s notlkml)\n' % 
                         (counter, total, skipped, dupmsgid, nomsgid, notlkml))

    allboxes = outboxes.keys()
    allboxes.sort()

    if len(allboxes):
        print()
        print('Summary')
        for mboxname in allboxes:
            print('  %s: %s new (%s total)' %
                  (os.path.join(outdir, mboxname), writecount[mboxname], len(outboxes[mboxname])))
            outboxes[mboxname].close()
        return seenids
    else:
        print('No new messages found.')
        return None


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(
        description="Make a mbox of LKML messages we haven't yet archived",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument('-sourcembox', required=True, nargs='+',
                        help='Source mbox with your archives in it, can be multiple')
    parser.add_argument('-exportdir', required=True,
                        help='Export dir where to put sanitized archives')
    parser.add_argument('-idlist', default=None,
                        help='File with known Message-IDs (one per line)')
    parser.add_argument('-lkmlonly', default=True, action='store_true',
                        help='Only consider messages with LKML list IDs')

    args = parser.parse_args()

    if args.idlist:
        fh = open(args.idlist, 'r')
        msgids = fh.read().splitlines()
        fh.close()
        print('Loaded %s message-ids from "%s"' % (len(msgids), args.idlist))
    else:
        msgids = []

    if not os.path.isdir(args.exportdir):
        os.mkdir(args.exportdir)

    newids = main(args.sourcembox, args.exportdir, msgids, args.lkmlonly)

    if newids is None:
        sys.exit(0)

    new_idlist = msgids + newids
    print('Wrote %s msgids into %s (%s new)' % (len(new_idlist), args.idlist, len(newids)))
    fh = open(args.idlist, 'w')
    fh.write('\n'.join(new_idlist))
    fh.close()