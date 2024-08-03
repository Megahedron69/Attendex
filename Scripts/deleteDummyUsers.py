import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()


def delete_users_except():
    try:
        # Connect to your PostgreSQL database
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
        )

        # Open a cursor to perform database operations
        cur = conn.cursor()

        # Fetch the user IDs for the specified emails
        fetch_ids_query = """
        SELECT id FROM auth.users
        WHERE email IN ('johndoe@gmail.com', 'karticjoshi68@gmail.com');
        """
        cur.execute(fetch_ids_query)
        result = cur.fetchall()

        # Extract the user IDs
        user_ids_to_keep = [row[0] for row in result]

        # Create a placeholder string for the user IDs
        placeholders = ", ".join(["%s"] * len(user_ids_to_keep))

        # SQL query to delete users except the specified ones
        delete_query = f"""
        DELETE FROM auth.users
        WHERE id NOT IN ({placeholders});
        """

        # Execute the delete query with the user IDs to keep
        cur.execute(delete_query, user_ids_to_keep)

        # Commit the transaction
        conn.commit()

        # Close the cursor and connection
        cur.close()
        conn.close()

        print(
            "Users deleted successfully except johndoe@gmail.com and karticjoshi68@gmail.com"
        )

    except Exception as error:
        print("Error while deleting users:", error)


# Run the function
delete_users_except()
