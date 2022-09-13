FROM    node:slim
RUN     mkdir /api; mkdir /api/sqsapisvc
WORKDIR /api
COPY    ./package.json /api/
RUN     npm install express body-parser; npm install npm-run-all; npm install aws-sdk dotenv
COPY    ./index.js sqsapisvc/
EXPOSE 8081
CMD     [ "npm", "start" ]
