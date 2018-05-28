#!/bin/bash

green='\033[0;32m'
noColor='\033[0m'

printf "\n${green}Startup script initiating...${noColor}\n"
bookPath='./book'
userPath='./user'
gatewayPath='./gateway'
webPath='./web'

# If there's no arguments, bail
if [[ $1 == '-d' ]]
then
    echo 'Running in development mode'
    startCommand='run dev'
elif [[ $1 == '-p' ]]
then
    echo 'Running in production mode'
    startCommand='start'
else
    echo "Please specify either development ( ' -d ' ) or production ( ' -p ' ) environment"
    exit 1
fi

# book
npm ${startCommand} --prefix ${bookPath} &

# user
npm ${startCommand} --prefix ${userPath} &

# gateway
npm ${startCommand} --prefix ${gatewayPath} &

# web
npm ${startCommand} --prefix ${webPath}


