#!/bin/bash
cd `dirname $0`
declare -i exists_num
exists_num=$(ps -ef | grep phantomjs | grep -v grep | grep serverd.js | wc -l)
if [ $exists_num -gt 0 ]; then
    ps -ef | grep phantomjs | grep -v grep | grep serverd.js | awk '{print $2}' | xargs kill -9
fi
cd - > /dev/null
