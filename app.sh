#!/bin/bash

echo "Waiting for MySQL..."

timeout 60 bash -c "while ! mysqladmin ping -h localhost --silent; do sleep 1; done" || {
    echo "MySQL did not start up successfully. Check the logs."
    exit 1
}

echo "MySQL is ready. Launching application..."
echo

python3 /app/setupEnv.py /usr/share/nginx/html/config.js
sleep 5

exec python3 /app/webapp.py -H 0.0.0.0
