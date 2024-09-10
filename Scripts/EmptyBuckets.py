from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
# Initialize Supabase client
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_ANON_KEY")
supabase_client = create_client(url, key)


def empty_bucket(bucket_name):
    # List all files in the bucket
    files = supabase_client.storage.from_(bucket_name).list()

    # Check if there's an error in listing files
    if isinstance(files, dict) and "error" in files:
        print(f"Error listing files: {files['error']['message']}")
        return

    # Iterate over the files and delete each one
    for file in files:
        file_path = file["name"]
        response = supabase_client.storage.from_(bucket_name).remove([file_path])

        # Check for errors in the response
        if isinstance(response, list) and len(response) == 0:
            print(f"Deleted: {file_path}")
        elif isinstance(response, dict) and "error" in response:
            print(f"Error deleting {file_path}: {response['error']['message']}")
        else:
            print(f"Unexpected response when deleting {file_path}: {response}")

    # Recursively check for remaining files and delete them
    remaining_files = supabase_client.storage.from_(bucket_name).list()
    if isinstance(remaining_files, list) and remaining_files:
        empty_bucket(bucket_name)


if __name__ == "__main__":
    empty_bucket("Avatars")
