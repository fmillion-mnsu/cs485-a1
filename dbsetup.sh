#!/bin/bash

# Database Seeder Script for Dev Containers

# Place the database seed script in //src/script.sql.

set -e

echo "Seeding MySQL database from /src/script.sql."

service mariadb start
sleep 5 # give mysql a bit to start

echo "Running seed script, please wait..."
cat /src/script.sql | mysql -u root
echo "Database seed completed."

service mariadb stop
sleep 2

exit 0
