CREATE TABLE "auth" (
  "id" uuid PRIMARY KEY,
  "aud" varchar,
  "role" varchar,
  "email" varchar,
  "email_confirmed_at" timestamp,
  "phone" varchar,
  "phone_confirmed_at" timestamp,
  "confirmed_at" timestamp,
  "last_sign_in_at" timestamp,
  "provider" varchar,
  "providers" varchar[],
  "user_level" integer,
  "claims_admin" boolean,
  "user_metadata" jsonb,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_anonymous" boolean
);

CREATE TABLE "employee" (
  "employee_id" uuid PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email_id" varchar UNIQUE,
  "gender" gender_type,
  "age" int,
  "org_id" uuid,
  "start_date" timestamp,
  "end_date" timestamp,
  "job_title" text,
  "contact" varchar,
  "profile_picture" text
);

CREATE TABLE "admin" (
  "admin_id" uuid PRIMARY KEY,
  "org_id" uuid,
  "first_name" varchar,
  "last_name" varchar,
  "designation" varchar,
  "documents" text[]
);

CREATE TABLE "organisation" (
  "org_id" uuid PRIMARY KEY,
  "org_name" text,
  "org_logo" text
);

CREATE TABLE "attendance_details" (
  "id" uuid PRIMARY KEY,
  "employee_id" uuid,
  "date" date,
  "status" status_type
);

CREATE TABLE "leave_types" (
  "id" uuid PRIMARY KEY,
  "name" leave_type
);

CREATE TABLE "leave_requests" (
  "id" uuid PRIMARY KEY,
  "employee_id" uuid,
  "start_date" date,
  "end_date" date,
  "duration" int,
  "approval_manager" uuid,
  "leave_type_id" uuid,
  "status" leave_status_type,
  "comments" text,
  "approval_comments" text,
  "request_date" timestamp
);

CREATE TABLE "conversations" (
  "id" uuid PRIMARY KEY,
  "employee_id" uuid,
  "admin_id" uuid,
  "bot_id" varchar DEFAULT '5000',
  "message" text,
  "timestamp" timestamp
);

CREATE TABLE "messages" (
  "id" uuid PRIMARY KEY,
  "sender_id" uuid,
  "receiver_id" uuid,
  "message" text,
  "timestamp" timestamp
);

CREATE TABLE "cards" (
  "card_id" uuid PRIMARY KEY,
  "employee_id" uuid,
  "card_data_base64" text UNIQUE
);

CREATE TABLE "attendance_records" (
  "id" uuid PRIMARY KEY,
  "employee_id" uuid,
  "date" date,
  "time" timestamp,
  "method" method_type,
  "status" status_type,
  "lat" float,
  "long" float,
  "card_id" uuid
);

CREATE TABLE "header_stats" (
  "id" uuid PRIMARY KEY,
  "total_attendance_today" int,
  "total_leaves_today" int,
  "new_employees_today" int,
  "new_leave_requests_today" int
);

CREATE TABLE "organisation_stats" (
  "id" uuid PRIMARY KEY,
  "org_id" uuid,
  "time_frame" time_frame_type,
  "leave_requests" int,
  "attendance_percentage" float
);

CREATE TABLE "logs" (
  "id" uuid PRIMARY KEY,
  "person_name" varchar,
  "log_type" log_type,
  "log_details" text,
  "time_of_log" timestamp
);

CREATE TABLE "organisation_details" (
  "org_id" uuid PRIMARY KEY,
  "org_name" text,
  "org_logo" text,
  "number_of_employees" int,
  "top3_employees" text[],
  "worst3_employees" text[],
  "org_admin_name" varchar
);

CREATE TABLE "aggregated_data" (
  "id" uuid PRIMARY KEY,
  "time_frame" time_frame_type,
  "employee_id" uuid,
  "total_attendance" float,
  "total_leaves" float,
  "total_requests" float,
  "total_absences" float,
  "start_date" date,
  "end_date" date
);

COMMENT ON COLUMN "auth"."user_level" IS '300 for superadmin, 200 for organisation admin';

COMMENT ON COLUMN "employee"."gender" IS 'either male or female';

COMMENT ON COLUMN "employee"."contact" IS 'look into bucket';

COMMENT ON COLUMN "employee"."profile_picture" IS 'look into bucket';

COMMENT ON COLUMN "admin"."documents" IS 'look into bucket';

COMMENT ON COLUMN "organisation"."org_logo" IS 'look into bucket';

COMMENT ON COLUMN "attendance_details"."status" IS 'Absent, Present, Unpaid Leave, Paid Leave, Sick Leave, Maternity Leave, Holiday';

COMMENT ON COLUMN "leave_requests"."duration" IS 'must be >= 1';

COMMENT ON COLUMN "leave_requests"."approval_manager" IS 'set null on delete';

COMMENT ON COLUMN "leave_requests"."status" IS 'Pending, Rejected, Approved';

COMMENT ON COLUMN "attendance_records"."method" IS 'NFC, Geofencing, Biometric, QR Code';

COMMENT ON COLUMN "attendance_records"."status" IS 'Attendance Not Recorded, Attendance Recorded, Window Closing Soon, Window Closed';

COMMENT ON COLUMN "attendance_records"."card_id" IS 'if NFC used';

COMMENT ON COLUMN "organisation_stats"."time_frame" IS 'Today, Weekly, Monthly';

COMMENT ON COLUMN "logs"."log_type" IS 'Attendance Marked, Leave Request';

COMMENT ON COLUMN "organisation_details"."org_logo" IS 'look into bucket';

COMMENT ON COLUMN "organisation_details"."top3_employees" IS 'avatars of top 3 employees';

COMMENT ON COLUMN "organisation_details"."worst3_employees" IS 'avatars of worst 3 employees';

COMMENT ON COLUMN "aggregated_data"."time_frame" IS 'daily, weekly, monthly, yearly';

ALTER TABLE "employee" ADD FOREIGN KEY ("employee_id") REFERENCES "auth" ("id");

ALTER TABLE "employee" ADD FOREIGN KEY ("org_id") REFERENCES "organisation" ("org_id");

ALTER TABLE "admin" ADD FOREIGN KEY ("admin_id") REFERENCES "auth" ("id");

ALTER TABLE "admin" ADD FOREIGN KEY ("org_id") REFERENCES "organisation" ("org_id");

ALTER TABLE "attendance_details" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("approval_manager") REFERENCES "admin" ("admin_id");

ALTER TABLE "leave_requests" ADD FOREIGN KEY ("leave_type_id") REFERENCES "leave_types" ("id");

ALTER TABLE "conversations" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "conversations" ADD FOREIGN KEY ("admin_id") REFERENCES "admin" ("admin_id");

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "messages" ADD FOREIGN KEY ("receiver_id") REFERENCES "admin" ("admin_id");

ALTER TABLE "cards" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "attendance_records" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "attendance_records" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("card_id");

ALTER TABLE "organisation_stats" ADD FOREIGN KEY ("org_id") REFERENCES "organisation" ("org_id");

ALTER TABLE "organisation_details" ADD FOREIGN KEY ("org_id") REFERENCES "organisation" ("org_id");

ALTER TABLE "aggregated_data" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");
