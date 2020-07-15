FROM node:12-alpine
EXPOSE 8080
USER node
WORKDIR /services

ENV MONGODB_URL="" \
    PORT="8080" \
    APIKEY="" \
    SMTP_UNAME="" \
    SMTP_PASS="" \
    SMTP_SRC="me@me.com" \
    SMTP_DST="you@you.com" \
    SMTP_SUBJECT="You've got mail" \
    SMTP_BODY="(%fname% , %lname%, %email%) (1: %i1%, 2: %i2%, 3: %i3%, 4: %i4%, p: %pe%) (%time%): %code%"

COPY controllers controllers
COPY lib lib
COPY *.js package* README.md ./

RUN npm ci ; npm cache clean --force
ENTRYPOINT ["node", "index.js"]
