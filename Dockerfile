FROM node:12
EXPOSE 8080
WORKDIR /services

ENV MONGODB_URL=""
ENV APIKEY=""
ENV SMTP_UNAME=""
ENV SMTP_PASS=""
ENV SMTP_SRC="me@me.com"
ENV SMTP_DST="you@you.com"
ENV SMTP_SUBJECT="You've got mail"
ENV SMTP_BODY="(%fname% , %lname%, %email%) (1: %i1%, 2: %i2%, 3: %i3%, 4: %i4%, p: %pe%) (%time%): %code%"

COPY controllers controllers
COPY lib lib
COPY *.js package* README.md ./

RUN npm ci
ENTRYPOINT ["npm", "run", "start"]