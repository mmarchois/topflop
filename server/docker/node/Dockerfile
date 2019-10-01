FROM node:latest

WORKDIR /var/www

EXPOSE 3000

RUN npm install -g typeorm
RUN echo "Europe/Paris" > /etc/timezone
RUN TZ=Europe/Paris

CMD [ "npm", "run", "start:dev" ]
