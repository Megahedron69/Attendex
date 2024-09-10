/* eslint-disable camelcase */
/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
	tok: string
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
		if (response.data) {
			try {
				const semiResp = await axios.get(
					`${String(import.meta.env["VITE_BASE_URL"])}/auth/mfaEnroll`
				);
				const {
					data: {
						id,
						totp: { qr_code, secret, uri },
					},
				} = semiResp.data.resp;
				return { status: true, id, qr_code, secret, uri, data: response.data };
			} catch (error) {
				console.log(error);
				return { status: false };
			}
		}
	} catch (error) {
		if (error.response && error.response.status === 400) {
			console.log(error);
			return { status: false, message: "Incorrect email or password format." };
		} else if (error.response && error.response.status === 404) {
			return { status: false, message: "Failed to sign up the user" };
		} else {
			console.error(error);
			return { status: false, message: error.message || "An error occurred" };
		}
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
			try {
				if (response.data.data.user.app_metadata.mfaStatus) {
					return {
						status: true,
						mfaStat: !!response.data.data.user.app_metadata.mfaStatus,
						userID: response.data.data.user.id,
						mfaID: response.data.data.user.app_metadata.mfaStatus.mID,
					};
				} else {
					const semiResp = await axios.get(
						`${String(import.meta.env["VITE_BASE_URL"])}/auth/mfaEnroll`
					);
					const {
						data: {
							id,
							totp: { qr_code, secret, uri },
						},
					} = semiResp.data.resp;
					console.log("auth page semiresp", semiResp);
					return {
						status: true,
						id,
						qr_code,
						secret,
						uri,
						data: response.data,
						message: "Login successful",
						mfaStat: !!response.data.data.user.app_metadata.mfaStatus,
						userID: response.data.data.user.id,
					};
				}
			} catch (error) {
				console.log(error);
				return { status: false };
			}
		} else {
			return { status: false, message: "Invalid response structure" };
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log(error);
			return { status: false, message: "Incorrect email or password." };
		} else if (error.response && error.response.status === 402) {
			console.log("email not verified");
			return { status: false, message: "Verify Email Before Sign-in" };
		} else if (error.response && error.response.status === 403) {
			console.log("MFA not enabled");
			return { status: false, message: "Enable MFA Before Sign-in" };
		} else {
			console.error(error);
			return { status: false, message: error.message || "An error occurred" };
		}
	}
};

export const verifyMyOTP = async (otp: string, mfaID: string, router: any) => {
	try {
		const resp = await axios.post(
			`${String(import.meta.env["VITE_BASE_URL"])}/auth/mfaVerify`,
			{ otp, mfaID },
			{
				withCredentials: true,
			}
		);
		if (resp.data && resp.data.status) {
			console.log(resp.data);
			const role = resp.data.adminDat ? "admin" : "user";
			router.navigate({ to: `/${role}/Home` });
			return { status: true, message: "OTP CONFIRMED" };
		} else {
			console.log(resp.data);
			return { status: false, message: "OTP INVALID" };
		}
	} catch (error) {
		if (error.response && error.response.status === 400) {
			console.log("Invalid code");
			return { status: false, message: "Invalid Code" };
		}
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

export const signWithGoogle = async (router) => {
	try {
		const response = await axios.get(
			`${String(import.meta.env.VITE_BASE_URL)}/auth/googleSign`,
			{
				withCredentials: true,
			}
		);
		console.log("response is", response.data);
		if (response && response.data.url) {
			window.location.href = response.data.url;
		}
	} catch (error) {
		console.log(error);
	}
};

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
