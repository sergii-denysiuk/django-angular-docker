#!/bin/bash
python3 /wait_for_postgres.py               # Wait for postgres
python3 manage.py migrate --noinput         # Apply database migrations
python3 manage.py collectstatic --noinput   # Collect static files
python3 manage.py runserver 0.0.0.0:8000    # Run server
