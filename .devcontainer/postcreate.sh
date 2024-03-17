#!/bin/bash

# install MySQL
apt -y update && apt -y install mariadb-server

# Seed database
./dbsetup.sh

