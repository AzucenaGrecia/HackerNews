FROM node:12

WORKDIR /client_app

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "start"]