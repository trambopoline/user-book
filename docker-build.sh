#!/bin/bash

green='\033[0;32m'
noColor='\033[0m'
usernameWithForwardSlash=""

if [[ $1 == '--username' || $1 == '-u' ]]
then
    username=$2
    usernameWithForwardSlash="${username}/"
    printf "\n${green}Building Docker project using username '${username}'...${noColor}\n\n"
elif [[ $1 == '--help' ]]
then
    printf '\nUsage:\tdocker-build [-u, --username]\n
      \tOptional username is prepended to docker friendly build name.'
    exit 1
else
    printf "\n${green}Building Docker project...${noColor}\n"
fi

# book
docker build -t ${usernameWithForwardSlash}user-book/book book/ &

# user
docker build -t ${usernameWithForwardSlash}user-book/user user/ &

# gateway
docker build -t ${usernameWithForwardSlash}user-book/gateway gateway/ &

# web
docker build -t ${usernameWithForwardSlash}user-book/web web/ &

exit 1
