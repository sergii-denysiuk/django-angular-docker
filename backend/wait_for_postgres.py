import time
import psycopg2


conn_string = "host='db' dbname='postgres' user='postgres' password=''"
while True:
    try:
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        print("Connected!\n")
        break
    except:
        print("Postgres is unavailable - sleeping")
        time.sleep(1)
