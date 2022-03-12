#!/bin/sh
C_GREEN='\033[0;32m'

set -e

printf "${C_GREEN}> Waiting for Postgres to finish initializing...\n"

while ! curl http://db:5432/ 2>&1 | grep '52'
do
  sleep 10
  printf "${C_GREEN}."
done

printf "${C_GREEN}> Postgres is initialized\n"

yarn prisma migrate dev || true

