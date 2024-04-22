import { supabase,adminAuthClient } from "../config/supabaseConfig.js";
export const checkEmailExists=async(email){
    const {data,error}=await supabase.auth.get
}