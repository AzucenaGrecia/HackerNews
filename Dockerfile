FROM node:12

WORKDIR /server_app

COPY package*.json ./

RUN npm install

# COPY /models .
# COPY /routes .
# COPY .env .
# COPY .gitignore .
# COPY server.js .
EXPOSE 5000
COPY . . 

CMD ["npm", "start"]