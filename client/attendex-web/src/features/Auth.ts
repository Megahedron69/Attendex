/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { supabase } from "../common/supabase";
import axios from "axios";

const isAuthenticated = async () => {
	try {
		const response = await axios.get(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/authStatus`,
			{
				withCredentials: true,
			}
		);
		console.log(response.data.loginStatus);
		return {
			loginStatus: response.data.loginStatus,
			adminStatus: response.data.adminStatus,
		};
	} catch (error) {
		console.log(error);
		return {
			loginStatus: false,
			adminStatus: false,
		};
	}
};
export const checkAuthStatus = async (): Promise<boolean> => {
	try {
		const authStatus = await isAuthenticated();
		console.log("user is auth:", authStatus.loginStatus);
		return authStatus.loginStatus;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const isAdmin = async (): Promise<boolean> => {
	try {
		const authStatus = await isAuthenticated();
		console.log("user is admin:", authStatus.adminStatus);
		return authStatus.adminStatus;
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
		const response = await axios.post(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/signUp`,
			{
				mail,
				pass,
				tok,
			}
		);
		if (response.data) router.navigate({ to: "/signIn" });
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
		const response = await axios.post(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/signIn`,
			{ mail, pass, tok },
			{
				withCredentials: true,
			}
		);
		if (response.data && response.data.data && response.data.data.session) {
			// Navigate to the user home page
			const role = response.data.data.user.app_metadata.claims_admin
				? "admin"
				: "user";
			console.log(role);
			router.navigate({ to: `/${role}/Home` });
		} else {
			console.error("Invalid response structure:", response.data);
		}
	} catch (error) {
		console.log(error);
	}
};

export const signOut = async (router) => {
	try {
		const response = await axios.get(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/signOut`,
			{
				withCredentials: true,
			}
		);
		if (response) router.navigate({ to: "/" });
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

// export const signWithGoogle = async (router) => {
// 	try {
// 		const response = await axios.get(
// 			`${String(import.meta.env.VITE_BASE_URL)}/auth/googleSign`,
// 			{
// 				withCredentials: true,
// 			}
// 		);
// 		console.log("response is", response.data);
// 		if (response && response.data.url) {
// 			window.location.href = response.data.url;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const resetMypass = async (email: string, tok: string) => {
	try {
		const response = await axios.post(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/resetPass`
		);
		if (response) console.log("password resetted");
	} catch (error) {
		console.log(error);
	}
};

// const isAuthenticated = async () => {
// 	try {
// 		const {
// 			data: { user },
// 		} = await supabase.auth.getUser();
// 		console.log(user);
// 		return user ? true : false;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const checkAuthStatus = async () => {
// 	try {
// 		const isAuthenticateds = await isAuthenticated();
// 		console.log("user is auth:", isAuthenticateds);
// 		return isAuthenticateds;
// 	} catch (error) {
// 		console.log(error);
// 		return false;
// 	}
// };

// export const signUpNewUser = async (
// 	mail: string,
// 	pass: string,
// 	tok: string,
// 	router: any
// ) => {
// 	try {
// 		const { data, error } = await supabase.auth.signUp({
// 			email: mail,
// 			password: pass,
// 			options: {
// 				captchaToken: tok,
// 			},
// 		});
// 		if (!error) {
// 			router.navigate({ to: "/user/Home" });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const signInWithEmail = async (
// 	mail: string,
// 	pass: string,
// 	tok: string,
// 	router: any
// ) => {
// 	try {
// 		const { data, error } = await supabase.auth.signInWithPassword({
// 			email: mail,
// 			password: pass,
// 			options: {
// 				captchaToken: tok,
// 			},
// 		});
// 		if (!error) {
// 			router.navigate({ to: "/user/Home" });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const signOut = async (router) => {
// 	try {
// 		const { error } = await supabase.auth.signOut();
// 		if (!error) router.navigate("/");
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

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
				redirectTo: "/Admin/Home",
			},
		});
		if (!error) router.navigate({ to: "/User/Home" });
	} catch (error) {
		console.log(error);
	}
};

// export const resetMypass = async (email: string, tok: string) => {
// 	try {
// 		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
// 			captchaToken: tok,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
