# FROM nginx

# RUN "npm start"

# COPY dist /usr/share/nginx/html
# COPY nginx.conf /usr/share/nginx/html

FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

