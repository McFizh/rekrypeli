FROM node:10.12
EXPOSE 8080

RUN apt-get update ; apt-get install -y unzip

WORKDIR /services

RUN wget --quiet https://github.com/McFizh/rekrypeli_backend/archive/master.zip ;\
    unzip master.zip ;\
    cd rekrypeli_backend-master; mv * .. ; mv .[a-z]* .. ; cd .. ; rmdir rekrypeli_backend-master

RUN npm ci

CMD node index.js
