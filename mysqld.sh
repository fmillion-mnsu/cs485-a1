#!/bin/bash

# Start script (that would ordinarily have been entered into supervisor config file)
/usr/bin/mysqld_safe &

# Stop script
stop_script() {
    mysqladmin -u root shutdown
    exit 0
}
# Wait for supervisor to stop script
trap stop_script SIGINT SIGTERM

while true
do
    sleep 1
done
