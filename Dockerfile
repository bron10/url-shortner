#From
FROM node:10.23.0-slim

# set working directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# copy files
COPY . .

ENV PORT=3000
EXPOSE 3000
RUN npm test
# start app
CMD ["npm", "start"]