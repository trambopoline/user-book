#!/bin/bash

green='\033[0;32m'
lightBlue='\033[0;34m'
noColor='\033[0m'
usernameWithForwardSlash=""
machineip=$(docker-machine ip)

if [[ $1 == '--username' || $1 == '-u' ]]
then
    username=$2
    usernameWithForwardSlash="${username}/"
    printf "\n${green}Running Docker project using username '${username}'...${noColor}\n\n"
elif [[ $1 == '--help' ]]
then
    printf '\nUsage:\tdocker-run [-u, --username]\n
      \tOptional username is prepended to docker friendly build name.'
    exit 1
else
    printf "\n${green}Running Docker project...${noColor}\n"
fi

# book
docker run -p 3002:3002 -d ${usernameWithForwardSlash}user-book/book &

# user
docker run -p 3001:3001 -d ${usernameWithForwardSlash}user-book/user &

# gateway
docker run -p 3000:3000 -d ${usernameWithForwardSlash}user-book/gateway &

# web
docker run -p 8080:8080 -d ${usernameWithForwardSlash}user-book/web &

printf "\n${lightBlue}Project should be running and viewable under either
http://localhost:8080
or
http://${machineip}:8080
${noColor}\n\n"
