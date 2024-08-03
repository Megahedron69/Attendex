import random
import psycopg2
from faker import Faker
import uuid
import os
from dotenv import load_dotenv

load_dotenv()
# Initialize Faker
fake = Faker()

# Database connection
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
)
cur = conn.cursor()


# Helper function to create users
def create_user(email, password, is_admin, is_superadmin):
    cur.execute(
        "SELECT public.create_user(%s, %s, %s, %s)",
        (email, password, is_admin, is_superadmin),
    )


# Generate users
for i in range(100):
    email = fake.email()
    password = "k@RTicjoshi13"  # or generate a random password
    is_admin = False
    is_superadmin = False

    if i < 7:
        is_admin = True
    elif i == 7:
        is_superadmin = True

    create_user(email, password, is_admin, is_superadmin)

# Commit and close
conn.commit()
cur.close()
conn.close()
