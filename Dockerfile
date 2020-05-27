# IMAGE 1: setup node
# FROM node:alpine
FROM alpine

RUN apk update \
    && apk add nodejs \
    && apk add npm
#create app folder insde container
RUN mkdir /opt/app
# make it the working directory
WORKDIR /opt/app
# copying this whole folder inside
COPY . ./

# installing dependencies
RUN npm install

# exposing port currently not working
EXPOSE 5000

CMD ["npm", "start"]

# commands:
# docker image build -t socketapi .
# docker container run --rm --name socket -p 5001:5000 socketapi
# docker container stop socket
