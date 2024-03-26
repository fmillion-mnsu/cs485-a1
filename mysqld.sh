#!/bin/bash

chown -R mysql /var/lib/mysql

/usr/bin/mysqld_safe &

if [ ! -f /var/lib/mysql/.configured ]; then

    echo "Seeding MySQL database from /src/script.sql."

    sleep 5 # give mysql a bit to start

    echo "Running seed script, please wait..."
    cat script.sql | mysql -u root
    echo "Database seed completed."

    touch /var/lib/mysql/.configured

else

    echo "Database already seeded."

fi

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
