#!/bin/bash

green='\033[0;32m'
noColor='\033[0m'

printf "\n${green}Installation script starting...${noColor}\n"
bookPath='./book'
userPath='./user'
gatewayPath='./gateway'
webPath='./web'

# book
cd ${bookPath} && npm install && cd .. &

# user
cd ${userPath} && npm install && cd .. &

# gateway
cd ${gatewayPath} && npm install && cd .. &

# web
cd ${webPath} && npm install && cd ..


