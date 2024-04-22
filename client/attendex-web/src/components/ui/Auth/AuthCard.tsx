/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable unicorn/better-regex */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Link, useRouter } from "@tanstack/react-router";
import { Card, message } from "antd";
import { userRoleStore } from "../../../store/UserRole";
import MyTurnstileComponent from "./Turnstile";
import { useState } from "react";
import { signInWithEmail, signWithGoogle } from "../../../features/Auth";

export const AuthCard = () => {
	const router = useRouter();
	const { role } = userRoleStore();
	const [messageApi, contextHolder] = message.useMessage();
	const [signInData, setSignInData] = useState({
		email: "",
		pass: "",
	});
	const [error, setError] = useState({
		emailErr: false,
		passErr: false,
	});

	const validateMyEmail = (email: String) => {
		const p = email.match(/^[\w+.-]+@[\da-z-]+\.[\d.a-z-]+$/i);
		setError((previous) => ({ ...previous, emailErr: !p }));
	};
	const validateMyPass = (pas: string) => {
		const p = pas.match(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
		);
		setError((previous) => ({ ...previous, passErr: !p }));
	};
	const onChange = (event) => {
		const { name, value } = event.target;
		setSignInData({ ...signInData, [name]: value });
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await signInWithEmail(
				signInData.email,
				signInData.pass,
				String(import.meta.env["VITE_APP_ENVIRONMENT"]) === "development"
					? String(import.meta.env["VITE_TESTCAP_KEY"])
					: role.userTok,
				router
			);
		} catch (error) {
			message.error(`errorz`);
		}
	};

	return (
		<Card
			className="block max-w-sm p-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-white-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-white-50 dark:border sm:w-32"
			bordered={true}
			style={{ width: "100%", height: "100%" }}
			hoverable
			size="small"
		>
			{contextHolder}
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
						<span className="text-black">Login with Google</span>
					</button>
				</div>
			</div>

			<div className="flex items-center justify-center w-auto rounded-lg bg-white">
				<div className="flex items-center">
					<button className="px-4 py-2 md:w-72 w-full  mt-5 border flex gap-2 hover:bg-gray-100 border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
						<img
							className="w-6 h-6"
							src="https://img.icons8.com/ios/100/face-id--v1.png"
							loading="lazy"
							alt="google logo"
						/>
						<span className="text-black">Login with Passkey</span>
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
							Log in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6 text-left"
							action="#"
							onSubmit={onSubmit}
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 mt-4 text-sm font-semibold text-gray-900"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									value={signInData.email}
									onChange={onChange}
									pattern="^[^@]+@[^@]+\.[^@]+$"
									className="bg-gray-50 border peer border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium"
									placeholder="name@company.com"
									required={true}
									onBlur={(event) => {
										validateMyEmail(event.target.value);
									}}
								/>
								{error.emailErr && (
									<span className="text-red-500 peer-invalid:visible">
										Enter a valid Email please
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-semibold text-gray-900"
								>
									Password
								</label>
								<input
									type="password"
									name="pass"
									value={signInData.pass}
									placeholder="••••••••"
									className="bg-gray-50 border peer border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium"
									onChange={onChange}
									required={true}
									minLength={8}
									pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
									onBlur={(event) => {
										validateMyPass(event.target.value);
									}}
								/>
								{error.passErr && (
									<span className="text-red-500 peer-invalid:visible">
										Password must be at least 8 characters long and contain at
										least one uppercase letter, one lowercase letter, one
										number, and one special character.
									</span>
								)}
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded placeholder-white bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required={false}
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-500"
										>
											Remember me
										</label>
									</div>
								</div>
								<Link
									to="/auth/ForgotPassword"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-500"
								>
									Forgot password?
								</Link>
							</div>
							<button
								type="submit"
								disabled={
									error.emailErr === false &&
									error.passErr === false &&
									role.userTok !== ""
										? false
										: true
								}
								className="w-full text-black bg-white  hover:bg-gray-100 border-2 hover:shadow-sm focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
							>
								Log in
							</button>
							<div className={`flex justify-center`}>
								<MyTurnstileComponent />
							</div>
							<p className="text-sm font-light text-gray-500 dark:text-gray-500">
								Don’t have an account yet?{" "}
								<Link
									to="/auth/SignUp"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</Card>
	);
};
