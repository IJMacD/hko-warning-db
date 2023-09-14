#!/bin/sh

echo "HTTP/1.1 200 OK";
echo "Content-Type: application/json";
echo "Cache-Control: max-age=86400";
echo "";

/app/fetch_data.sh