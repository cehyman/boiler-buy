import psycopg2

class Accounts:
    def addAccount(username, password, email):
        conn = psycopg2.connect(
        host="boilerbuy-pgsql.postgres.database.azure.com",
        database="boilerbuy",
        user="user",
        password="password")
        
        cur = conn.cursor()
        # cur.execute("SELECT * FROM accounts WHERE username='?';", username)
        # cur.execute("SELECT * FROM accounts WHERE username='jc';")
        results = cur.fetchall()
        print(results)
        if len(results) > 0:
            print("Username already taken.")
            return
        cur.execute("SELECT * FROM accounts WHERE email='?';", email)
        results = cur.fetchall()
        print(results)
        if len(results) > 0:
            print("Email is linked to an account already.")
            return
        # cur.execute("INSERT INTO accounts (username, password, email) VALUES('?','?','?');", (username, password, email))
        cur.execute("INSERT INTO accounts (username, password, email) VALUES('jc','pass!','jc@gmail.com');", (username, password, email))
        if conn is not None:
            conn.close()
            print('Database connection closed.')

    if __name__ == '__main__':
        addAccount('jc', 'pass!', 'jc@gmail.com')