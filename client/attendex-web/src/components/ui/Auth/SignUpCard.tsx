/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/better-regex */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Link, useRouter } from "@tanstack/react-router";
import { Card, Input, message } from "antd";
import { userInfoStore } from "../../../store/UserInfo";
import { userRoleStore } from "../../../store/UserRole";
import MyTurnstileComponent from "./Turnstile";
import { useState } from "react";
import { signUpNewUser, signWithGoogle } from "../../../features/Auth";
import { PostReq } from "../../../store/DataPost";
import VerifyModal from "../Common/VerifyModal";

export const SignUpCard = () => {
	const router = useRouter();
	const {
		firstName,
		orgId,
		lastName,
		email,
		age,
		jobTitle,
		organisation,
		phone,
		address,
		profilePic,
		gender,
		startDate,
		endDate,
	} = userInfoStore();
	const { role } = userRoleStore();
	const [signUpData, setSignUpData] = useState({
		email: email,
		pass: "",
		confPass: "",
	});
	const [error, setError] = useState({
		passErr: false,
		cPassErr: false,
	});
	const [mfaData, setMfaData] = useState({
		id: "",
		qrCode: "",
		secret: "",
		email: "",
		uri: "",
		emailCStat: false,
		userID: "",
	});
	const validateMyPass = (pas: string) => {
		const p = pas.match(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
		);
		setError((previous) => ({ ...previous, passErr: !p }));
	};
	const validateMyCpass = (cPas: string) => {
		const p = cPas === signUpData.pass;
		setError((previous) => ({
			...previous,
			cPassErr: !p,
		}));
	};
	const onChange = (event) => {
		const { name, value } = event.target;
		setSignUpData({ ...signUpData, [name]: value });
	};
	const onSubmit = async (event) => {
		if (signUpData.pass !== signUpData.confPass) {
			setError((previous) => ({
				...previous,
				cPassErr: true,
			}));
		} else {
			try {
				event.preventDefault();
				const signUpResponse = await signUpNewUser(
					signUpData.email,
					signUpData.pass,
					String(import.meta.env["VITE_APP_ENVIRONMENT"]) === "development"
						? String(import.meta.env["VITE_TESTCAP_KEY"])
						: role.userTok
				);
				console.log("signup iz", signUpResponse);
				if (signUpResponse?.status) {
					try {
						await PostReq(`createUser`, {
							firstName,
							lastName,
							orgId,
							email,
							age,
							jobTitle,
							organisation,
							phone,
							address,
							profilePic,
							gender,
							startDate,
							endDate,
						});
						message.success("Sign Up successful");
						console.log("User created successfully and signzis");
						setMfaData({
							id: signUpResponse.id,
							qrCode: signUpResponse.qr_code,
							secret: signUpResponse.secret,
							email: signUpResponse.data.data.user.email,
							uri: signUpResponse.uri,
							emailCStat: !!signUpResponse.data.data.user.email_confirmed_at,
							userID: signUpResponse.data.data.user.id,
						});
						router.navigate({ to: "/Auth/SignIn" });
					} catch (error) {
						console.error("Error creating new user in database", error);
					}
				} else {
					message.error(signUpResponse?.message || "Failed to sign up user");
				}
			} catch (error) {
				message.error("Catastrophic Error");
				console.log(error);
			}
		}
	};

	return (
		<>
			{!mfaData.id ? (
				<Card
					className="block max-w-sm p-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-white-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-white-50 dark:border sm:w-32"
					bordered={true}
					style={{ width: "auto", height: "auto" }}
					hoverable
					size="small"
				>
					<div className="flex items-center justify-center w-auto rounded-lg bg-white">
						<div className="flex items-center">
							<button
								onClick={() => {
									signWithGoogle(router);
								}}
								className="px-4 py-2 md:w-72 lg:w-72 xl:w-72 w-full sm:max-w-xs mt-5 border flex gap-2 hover:bg-gray-100 border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
							>
								<img
									className="w-6 h-6"
									src="https://www.svgrepo.com/show/475656/google-color.svg"
									loading="lazy"
									alt="google logo"
								/>
								<span className="text-black">Signup with Google</span>
							</button>
						</div>
					</div>
					<div className="inline-flex items-center justify-center w-full">
						<hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
						<span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black dark:bg-white	">
							or
						</span>
					</div>
					<div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-auto lg:py-0">
						<div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
							<div>
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
									Let's get started
								</h1>
								<form
									className="space-y-4 md:space-y-6 text-left"
									onSubmit={onSubmit}
								>
									<div>
										<label
											htmlFor="email"
											className="block mb-2 mt-4 text-sm font-semibold text-gray-900"
										>
											Your email
										</label>
										<Input
											type="email"
											id="email"
											className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium"
											placeholder="name@company.com"
											value={signUpData.email}
											required
											disabled
											name="email"
										/>
									</div>
									<div>
										<label
											htmlFor="pass"
											className="block mb-2 text-sm font-semibold text-gray-900"
										>
											Password
										</label>
										<Input.Password
											type="password"
											name="pass"
											required={true}
											value={signUpData.pass}
											minLength={8}
											placeholder="••••••••"
											pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
											className={`border border-gray-300 peer text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full px-2.5 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium flex flex-row ${error.passErr && "peer-invalid:outline-red-500"}`}
											onChange={onChange}
											onBlur={(event) => {
												validateMyPass(event.target.value);
											}}
										/>
										{error.passErr && (
											<span className="text-red-500 peer-invalid:visible">
												Password must be at least 8 characters long and contain
												at least one uppercase letter, one lowercase letter, one
												number, and one special character.
											</span>
										)}
									</div>
									<div>
										<label
											htmlFor="confPass"
											className="block mb-2 text-sm font-semibold text-gray-900"
										>
											Confirm Password
										</label>
										<Input.Password
											type="password"
											name="confPass"
											placeholder="••••••••"
											className="border flex flex-row border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full px-2.5  dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium"
											onChange={onChange}
											value={signUpData.confPass}
											onBlur={(event) => {
												validateMyCpass(event.target.value);
											}}
										/>
										{error.cPassErr && (
											<span className="text-red-500">
												Passwords do not match
											</span>
										)}
									</div>
									<button
										type="submit"
										className="w-full text-black bg-white  hover:bg-gray-100 border-2 hover:shadow-sm focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
										disabled={
											error.passErr === false &&
											error.cPassErr === false &&
											signUpData.pass === signUpData.confPass &&
											role.userTok !== ""
												? false
												: true
										}
										onClick={onSubmit}
									>
										Sign up
									</button>
									<div className={`flex justify-center`}>
										<MyTurnstileComponent />
									</div>
									<p className="text-sm font-light text-gray-500 dark:text-gray-500">
										Already have an account?{" "}
										<Link
											to="/auth/SignIn"
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Log in
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</Card>
			) : (
				<VerifyModal
					emailCStat={mfaData.emailCStat}
					email={mfaData.email}
					mfaStat={false}
					ImageURL={mfaData.qrCode}
					mfaID={mfaData.id}
					mfaSecret={mfaData.secret}
					mfaURI={mfaData.uri}
					userID={mfaData.userID}
				/>
			)}
		</>
	);
};
