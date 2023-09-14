FROM alpine AS build
WORKDIR /src
RUN apk add --update build-base git
RUN git clone https://github.com/IJMacD/csvdb.git
RUN cd csvdb && make

FROM sebp/lighttpd
WORKDIR /app
RUN apk add --update curl
COPY ./lighttpd/lighttpd.conf /etc/lighttpd/
COPY --from=build /src/csvdb/release/csvdb /usr/local/bin/
COPY data/fetch_data.sh /app/
COPY lighttpd/index.sh /var/www/html/