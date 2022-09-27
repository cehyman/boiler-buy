from Accounts import *
import psycopg2

def test_addAccount():
        Accounts.addAccount("boilerBuyTest","password123","bb@gmail.com")
        conn = psycopg2.connect(
        host="boilerbuy-pgsql.postgres.database.azure.com",
        database="listings",
        user="user",
        password="password")
        cur = conn.cursor()
        cur.execute("SELECT * FROM accounts where username='boilerBuyTest'")
        results = cur.fetchall()
        print(results)
        expected = ["boilerBuyTest", "password123", "bb@gmail.com"]
        if conn is not None:
            conn.close()
            print('Database connection closed.')
        assert results == expected