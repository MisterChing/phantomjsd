#!/bin/bash
#supervisor command
cd `dirname $0`
while true; do
    sh `pwd`/start.sh > /dev/null
done
cd - > /dev/null
