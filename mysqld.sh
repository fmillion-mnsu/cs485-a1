#!/bin/bash

chown -R mysql /var/lib/mysql

if [ ! -f /var/lib/mysql/.configured ]; then

    # We must first install the root database files if they don't already exist.
    echo "Installing database tables"
    mysql_install_db

fi

# do chown again to fix newly created files.
chown -R mysql /var/lib/mysql

/usr/bin/mysqld_safe --skip-syslog &

if [ ! -f /var/lib/mysql/.configured ]; then

    echo "Waiting for MySQL..."

    # Check if MySQL server is ready to receive connections
    timeout 30 bash -c "while ! mysqladmin ping -h localhost --silent; do sleep 1; done" || {
        echo "MySQL did not start up successfully. Check the logs."
        exit 1
    }

    echo "MySQL server is ready to accept connections."
    echo "Seeding MySQL database from /src/script.sql."

    # Run the seed script
    echo "Running seed script, please wait..."
    cat /src/script.sql | mysql -u root
    echo "Database seed completed. Database is ready to use."

    touch /var/lib/mysql/.configured

else

    echo "Database already seeded. Database is ready to use."

fi

# Stop script function
stop_script() {
    mysqladmin -u root shutdown
    exit 0
}

# Wait for supervisor to stop script
trap stop_script SIGINT SIGTERM

# infinite loop, script will interrupt and stop on sigterm/sigint
while true
do
    sleep 1
done
