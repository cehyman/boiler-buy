import psycopg2
class Database:
    
    def initializeAccountsTable():
        conn = psycopg2.connect(
        host="boilerbuy-pgsql.postgres.database.azure.com",
        database="listings",
        user="user",
        password="password")

        cur = conn.cursor()
        cur.execute('CREATE TABLE IF NOT EXISTS Accounts (username VARCHAR(50) PRIMARY KEY, password VARCHAR(50) NOT NULL, email VARCHAR(200) NOT NULL);')
        
        if conn is not None:
            conn.close()
            print('Database connection closed.')
    
    if __name__ == '__main__':
        initializeAccountsTable()