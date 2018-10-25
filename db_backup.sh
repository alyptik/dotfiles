#!/bin/bash

THISDIR=$(dirname $(readlink -f "$0"))

mysqldump --single-transaction --flush-logs --master-data=2 --all-databases \
 | gzip > $THISDIR/db_backup.gz
#echo 'purge master logs before date_sub(now(), interval 7 day);' | mysql
