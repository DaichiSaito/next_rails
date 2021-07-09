FROM node:14.15.3

WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update -y && \
  apt-get upgrade -y

COPY . /app
