FROM timbru31/java-node:21-jre-iron
# FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build


CMD [ "npm", "run", "dev"]