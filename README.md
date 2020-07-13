# hapi.js backend server for rekrypeli

This is backend application for recruiting game used in one student recruiting fair. REST api
accepts scores from frontend application, and stores them to database / sends them to predefined
email address via sendgrid.

## Dockerized version

Edit dockerfile, and set environment variables. Then run the following commands:

docker build -t backend:latest .

docker run -p 8080:8080 backend:latest

## Local installation

Copy .env.example file to .env file, change settings and start with:

npm run start

## Requirements / usage

Note. Application requires node.js version >= 12 and optionally mongodb database.

Backend application has two endpoints:

POST /api/scores

^- This is for storing scores / sending them via email

GET /api/scores

^- This lists stored scores, if APIKEY token is set (.env file / dockerfile)