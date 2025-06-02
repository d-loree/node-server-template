FROM node:20-alpine

WORKDIR /src
COPY . .

RUN npm ci
CMD ["npm", "start"]
