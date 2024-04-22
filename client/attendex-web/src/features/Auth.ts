/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { supabase } from "../common/supabase";
const isAuthenticated = async () => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user ? true : false;
	} catch (error) {
		console.log(error);
	}
};

export const checkAuthStatus = async () => {
	try {
		const isAuthenticateds = await isAuthenticated();
		console.log("user is auth:", isAuthenticateds);
		return isAuthenticateds;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const signUpNewUser = async (
	mail: string,
	pass: string,
	tok: string,
	router: any
) => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email: mail,
			password: pass,
			options: {
				captchaToken: tok,
			},
		});
		if (!error) {
			router.navigate({ to: "/user/Home" });
		}
	} catch (error) {
		console.log(error);
	}
};

export const signInWithEmail = async (
	mail: string,
	pass: string,
	tok: string,
	router: any
) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: mail,
			password: pass,
			options: {
				captchaToken: tok,
			},
		});
		if (!error) {
			router.navigate({ to: "/user/Home" });
		}
	} catch (error) {
		console.log(error);
	}
};

export const signOut = async () => {
	try {
		const { error } = await supabase.auth.signOut();
	} catch (error) {
		console.log(error);
	}
};

export const signWithGoogle = async (router) => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				queryParams: {
					// eslint-disable-next-line camelcase
					access_type: "offline",
					prompt: "consent",
				},
			},
		});
		if (!error) router.navigate({ to: "/user/Home" });
	} catch (error) {
		console.log(error);
	}
};

export const resetMypass = async (email: string, tok: string) => {
	try {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			captchaToken: tok,
		});
	} catch (error) {
		console.log(error);
	}
};
