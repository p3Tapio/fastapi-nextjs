import sqlite3
from sqlite3 import Error


def create():
    conn = None
    try:
        conn = sqlite3.connect("app.test.db")
    except Error as e:
        print(e)

    finally:
        if conn:
            conn.close()
