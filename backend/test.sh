#!/bin/bash
python3 /wait_for_postgres.py           # Wait for postgres
python3 manage.py migrate --noinput     # Apply database migrations
python3 manage.py test                  # Run tests
