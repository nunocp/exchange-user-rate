FROM node:16-bullseye

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
EXPOSE 3000

ENV NODE_ENV=development
RUN npm install
RUN npx prisma generate
CMD ["npm", "run", "dev"]