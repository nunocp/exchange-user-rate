FROM node:16-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001

ENV NODE_ENV=development
CMD ["npm", "run", "dev"]