
# base image
FROM node:18-alpine
RUN apk add --update nodejs

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build
CMD ["npm", "run", "server"]