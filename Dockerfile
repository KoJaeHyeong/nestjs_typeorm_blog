FROM node:18

WORKDIR /app/

COPY package*.json .
COPY . .

RUN rm -rf node_modules
RUN npm install
# RUN npm update


RUN npm run build

# CMD node dist/src/main.js
CMD npm run dev