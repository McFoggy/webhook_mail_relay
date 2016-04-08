FROM mhart/alpine-node:4

MAINTAINER Matthieu Brouillard <matthieu@brouillard.fr>

ENV SMTP_HOST=fakeserver
ENV SMTP_PORT=25
# ENV SMTP_USER=bob
# ENV SMTP_PASSWORD=bobthebuilder
ENV SMTP_FROM=bobthebuilder@fakeserver.com
ENV SMTP_TO=nobody@fakeserver.com
ENV TEST_ONLY=false

WORKDIR /server

ADD package.json .
RUN npm install

ADD index.js .

EXPOSE 8080
CMD ["node", "index.js"]