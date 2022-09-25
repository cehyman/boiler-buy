import psycopg2
class Accounts:
    def __init__(account, username, password, email):
        account.username = username
        account.password = password
        account.email = email
    
    def connectDB():
        conn = psycopg2.connect(
        host="boilerbuy-pgsql.postgres.database.azure.com",
        database="listings",
        user="user",
        password="password")

        cur = conn.cursor()
        cur.execute('INSERT INTO Accounts (username, password, email) VALUES("joe","hello","hello@gmail.com");')
        cur.execute('SELECT * FROM Accounts;')
        results = cur.fetchall()
        print(results)
        if conn is not None:
            conn.close()
            print('Database connection closed.')

    if __name__ == '__main__':
        connectDB()
    