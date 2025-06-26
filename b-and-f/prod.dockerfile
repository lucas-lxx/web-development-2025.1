FROM node:23

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend .

ENTRYPOINT ["npm"]