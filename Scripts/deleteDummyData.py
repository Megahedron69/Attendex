import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def allPublicData():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
        )
        cur = conn.cursor()
        fetchPublicTablesQry = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE' AND table_name!='profiles';
        """
        cur.execute(fetchPublicTablesQry)
        tables = cur.fetchall()
        for table in tables:
            truncateQuery = f"TRUNCATE TABLE {table[0]} CASCADE;"
            cur.execute(truncateQuery)
        conn.commit()
        print("All data except profiles deleted")
    except Exception as error:
        print("Error while deleting data:", error)
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


allPublicData()
