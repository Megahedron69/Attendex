import { supabase } from "../config/supabaseConfig.js";

export const checkMyAuthStatus = async (token) => {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error("Failed to authenticate token:", error.message);
      return false;
    }
    return {
      status: !!data.user,
      adminStat: data.user.app_metadata.claims_admin,
    };
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

export const isAdmin = async () => {
  try {
    const { data, error } = await supabase.rpc("is_claims_admin", {});
    return { data, error };
  } catch (error) {
    console.log(error);
  }
};

export const mySignUpFunc = async (email, pass, tok) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        captchaToken: tok,
      },
    });
    if (!error) {
      return { data };
    } else {
      return { error };
    }
  } catch (err) {
    console.log(err);
  }
};

export const myGoogleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `http://localhost:5173/user/home`, // Ensure this is the correct URL for your callback
      },
    });
    if (!error) return { data };
    else return { error };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getSession = async (quer) => {
  try {
    const { code } = quer;
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return { error };
    return { session };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const mySignInFunc = async (email, pass, token) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
      options: {
        captchaToken: token,
      },
    });
    if (!error) {
      return { data };
    } else {
      return { error };
    }
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

export const signMeOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return false;
  else return true;
};

export const resetMyPass = async (email, tok) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      captchaToken: tok,
    });
    if (!error) {
      return { data };
    } else {
      return { error };
    }
  } catch (error) {
    console.log(error);
  }
};

export const mfaEnroll = async (id) => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Qr-Code",
    });
    return { data, error };
  } catch (error) {
    console.log(error);
  }
};

export const mfaVerify = async (fId, otp) => {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: fId,
      code: otp,
    });

    if (error) {
      console.log("err is", error);
      throw new Error(`MFA Verification failed: ${error.message}`);
    }

    if (!data || !data.access_token) {
      console.log("NO data");
      throw new Error("MFA Verification failed: Missing access token or data");
    }

    return { data, error: null };
  } catch (err) {
    console.log("MFA Verification Error:", err);
    return { data: null, error: err };
  }
};
