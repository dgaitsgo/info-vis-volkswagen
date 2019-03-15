FROM node:10

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 6000

CMD ["npm", "start"]
