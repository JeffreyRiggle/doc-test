FROM node

COPY . .

RUN npm install @11ty/eleventy -g
RUN npm install