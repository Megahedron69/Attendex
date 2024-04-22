import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
	String(import.meta.env["VITE_SUPABASE_URL"]),
	String(import.meta.env["VITE_SUPABASE_KEY"])
);
