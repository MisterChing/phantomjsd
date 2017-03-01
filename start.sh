#/bin/bash
cd `dirname $0`
declare -i exists_num
if [ -f `pwd`/etc/servers.config ]; then
    for line in $(cat `pwd`/etc/servers.config); do
        server=$(echo $line | cut -d ":" -f 1)
        port=$(echo $line | cut -d ":" -f 2)
        exists_num=$(ps -ef | grep phantomjs | grep -v grep | grep ${server}:${port} | wc -l)
        if [ $exists_num == 1 ]; then
            echo "${server}:${port} is aready running!"
            continue
        fi
        nohup `pwd`/bin/phantomjs `pwd`/bin/serverd.js ${server}:${port} > /dev/null 2>&1 &
        if [ $? == 0 ]; then
            echo "${server}:${port} is start ok!"
        else
            echo "${server}:${port} starting error!"
        fi
    done
else
    echo 'server config file is not exists!'
fi
cd - > /dev/null
