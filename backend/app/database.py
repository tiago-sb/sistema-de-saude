import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgres://neondb_owner:R4SCsT0KHmvf@ep-curly-hat-a6dxpmar-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require"

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except psycopg2.OperationalError as e:
        print("Erro operacional ao conectar ao banco de dados:", e)
        raise
    except psycopg2.DatabaseError as e:
        print("Erro de banco de dados ao conectar ao banco de dados:", e)
        raise


def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    try:
        with open(f"{path}/sql/create_tables.sql", "r", encoding="utf-8") as sql_file:
            script = sql_file.read()
            cursor.execute(script)
            conn.commit()
            print("Tabelas criadas com sucesso.")
    except psycopg2.OperationalError as e:
        conn.rollback()
        print(f"Erro operacional ao criar tabelas: {e}")
    except psycopg2.DatabaseError as e:
        conn.rollback()
        print(f"Erro de banco de dados ao criar tabelas: {e}")
    except Exception as e:
        conn.rollback()
        print(f"Erro ao criar tabelas: {e}")
    finally:
        cursor.close()
        conn.close()
