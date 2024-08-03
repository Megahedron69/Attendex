import psycopg2
from faker import Faker
import uuid
import random
import os
from dotenv import load_dotenv

# Initialize Faker
fake = Faker()
load_dotenv()


# Database connection function
def get_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
    )


# Fetch user data from auth table
def fetch_users():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, email FROM auth.users")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users


# Helper functions
def generate_organisation_data(num_orgs):
    return [
        {
            "org_id": str(uuid.uuid4()),
            "org_name": fake.company(),
            "org_logo": fake.image_url(),
        }
        for _ in range(num_orgs)
    ]


def generate_employee_data(users, org_ids):
    return [
        {
            "employee_id": user_id,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email_id": email,
            "gender": fake.random_element(["male", "female"]),
            "age": fake.random_int(min=20, max=60),
            "org_id": random.choice(org_ids),
            "start_date": fake.date_time_this_decade(),
            "end_date": fake.future_datetime(end_date="+30d"),
            "job_title": fake.job(),
            "contact": fake.phone_number()[:10],  # Adjusted length
            "profile_picture": fake.image_url(),
        }
        for user_id, email in users
    ]


def generate_admin_data(users, org_ids):
    return [
        {
            "admin_id": user_id,
            "org_id": random.choice(org_ids),
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "designation": fake.job(),
            "documents": [fake.file_path() for _ in range(2)],
        }
        for user_id, email in users
    ]


def generate_attendance_details(employee_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "employee_id": employee_id,
            "date": fake.date_this_month(),
            "status": "Recorded",
        }
        for employee_id in employee_ids
    ]


def generate_leave_types():
    leave_types_enum = ["SL", "PTO", "UL", "ML", "Holiday"]
    return [{"id": str(uuid.uuid4()), "name": lt} for lt in leave_types_enum]


def generate_leave_requests(employee_ids, admin_ids, leave_type_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "employee_id": employee_id,
            "start_date": fake.date_this_year(),
            "end_date": fake.future_datetime(end_date="+6d"),
            "duration": random.randint(1, 10),
            "approval_manager": (
                random.choice(admin_ids) if random.random() > 0.5 else None
            ),
            "leave_type_id": random.choice(leave_type_ids),
            "status": random.choice(["Approved", "Rejected", "Pending", "Revoked"]),
            "comments": fake.text(),
            "approval_comments": fake.text(),
            "request_date": fake.date_time_this_year(),
        }
        for employee_id in employee_ids
    ]


def generate_conversations(employee_ids, admin_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "employee_id": employee_id,
            "admin_id": random.choice(admin_ids),
            "bot_id": "5000",
            "message": fake.text(),
            "timestamp": fake.date_time_this_year(),
        }
        for employee_id in employee_ids
    ]


def generate_messages(employee_ids, admin_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "sender_id": employee_id,
            "receiver_id": random.choice(admin_ids),
            "message": fake.text(),
            "timestamp": fake.date_time_this_year(),
        }
        for employee_id in employee_ids
    ]


def generate_cards(employee_ids):
    return [
        {
            "card_id": str(uuid.uuid4()),
            "employee_id": employee_id,
            "card_data_base64": fake.uuid4(),
        }
        for employee_id in employee_ids
    ]


def generate_attendance_records(employee_ids, card_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "employee_id": employee_id,
            "date": fake.date_this_year(),
            "time": fake.date_time_this_year(),
            "method": random.choice(["NFC", "GEOLOCATION", "BIOMETRIC", "QRCODE"]),
            "status": "Recorded",
            "lat": fake.latitude(),
            "long": fake.longitude(),
            "card_id": random.choice(card_ids) if random.random() > 0.5 else None,
        }
        for employee_id in employee_ids
    ]


def generate_header_stats():
    return [
        {
            "id": str(uuid.uuid4()),
            "total_attendance_today": random.randint(0, 100),
            "total_leaves_today": random.randint(0, 100),
            "new_employees_today": random.randint(0, 10),
            "new_leave_requests_today": random.randint(0, 10),
        }
    ]


def generate_organisation_stats(org_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "org_id": org_id,
            "time_frame": random.choice(["daily", "weekly", "monthly", "yearly"]),
            "leave_requests": random.randint(0, 100),
            "attendance_percentage": random.uniform(50.0, 100.0),
        }
        for org_id in org_ids
    ]


def generate_logs():
    return [
        {
            "id": str(uuid.uuid4()),
            "person_name": fake.name(),
            "log_type": random.choice(["Markit", "ReqLeave"]),
            "log_details": fake.text(),
            "time_of_log": fake.date_time_this_year(),
        }
        for _ in range(100)
    ]


def generate_organisation_details(org_ids, employee_ids, admin_data):
    admin_org_map = {admin["org_id"]: admin["first_name"] for admin in admin_data}
    return [
        {
            "org_id": org_id,
            "org_name": fake.company(),
            "org_logo": fake.image_url(),
            "number_of_employees": random.randint(10, 100),
            "top3_employees": random.sample(employee_ids, 3),
            "worst3_employees": random.sample(employee_ids, 3),
            "org_admin_name": admin_org_map.get(org_id, fake.name()),
        }
        for org_id in org_ids
    ]


def generate_aggregated_data(employee_ids):
    return [
        {
            "id": str(uuid.uuid4()),
            "time_frame": random.choice(["daily", "weekly", "monthly", "yearly"]),
            "employee_id": employee_id,
            "total_attendance": random.uniform(0.0, 100.0),
            "total_leaves": random.uniform(0.0, 100.0),
            "total_requests": random.uniform(0.0, 100.0),
            "total_absences": random.uniform(0.0, 100.0),
            "start_date": fake.date_this_year(),
            "end_date": fake.date_this_year(),
        }
        for employee_id in employee_ids
    ]


def insert_data(table_name, data):
    if not data:
        print(f"No data to insert into {table_name}")
        return

    keys = data[0].keys()
    columns = ", ".join(keys)
    values = ", ".join(["%s" for _ in keys])
    query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"

    conn = get_connection()
    cur = conn.cursor()

    for item in data:
        try:
            cur.execute(query, tuple(item.values()))
        except psycopg2.Error as e:
            print(f"Error inserting into {table_name}: {e}")

    conn.commit()
    cur.close()
    conn.close()


# Main script
users = fetch_users()

# Separate users into admin and regular users
admin_users = users[:8]
regular_users = users[8:]

# Generate data
organisations = generate_organisation_data(5)
org_ids = [org["org_id"] for org in organisations]

employee_data = generate_employee_data(regular_users, org_ids)
employee_ids = [emp["employee_id"] for emp in employee_data]

admin_data = generate_admin_data(admin_users, org_ids)
admin_ids = [adm["admin_id"] for adm in admin_data]

attendance_details = generate_attendance_details(employee_ids)
leave_types = generate_leave_types()
leave_type_ids = [lt["id"] for lt in leave_types]

leave_requests = generate_leave_requests(employee_ids, admin_ids, leave_type_ids)
conversations = generate_conversations(employee_ids, admin_ids)
messages = generate_messages(employee_ids, admin_ids)
cards = generate_cards(employee_ids)
card_ids = [card["card_id"] for card in cards]

attendance_records = generate_attendance_records(employee_ids, card_ids)
header_stats = generate_header_stats()
organisation_stats = generate_organisation_stats(org_ids)
logs = generate_logs()
organisation_details = generate_organisation_details(org_ids, employee_ids, admin_data)
aggregated_data = generate_aggregated_data(employee_ids)

# Insert data into tables
insert_data("organisation", organisations)
insert_data("employee", employee_data)
insert_data("admin", admin_data)
insert_data("attendance_details", attendance_details)
insert_data("leave_types", leave_types)
insert_data("leave_requests", leave_requests)
insert_data("conversations", conversations)
insert_data("messages", messages)
insert_data("cards", cards)
insert_data("attendance_records", attendance_records)
insert_data("header_stats", header_stats)
insert_data("organisation_stats", organisation_stats)
insert_data("logs", logs)
insert_data("organisation_details", organisation_details)
insert_data("aggregated_data", aggregated_data)

print("Data insertion completed.")
