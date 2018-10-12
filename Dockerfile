FROM node:10.11
EXPOSE 8080

RUN apt-get update ; apt-get install -y unzip

RUN mkdir services ;\
    cd services ;\
    wget --quiet https://github.com/McFizh/rekrypeli_backend/archive/master.zip ;\
    unzip master.zip ;\
    cd rekrypeli-master; mv * .. ; mv .[a-z]* .. ; cd .. ; rmdir rekrypeli-master

RUN cd /services ; npm ci

CMD cd /services ; node index.js
