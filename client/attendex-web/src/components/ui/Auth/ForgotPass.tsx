import { useState, type FunctionComponent } from "react";
import { resetMypass } from "../../../features/Auth";
import { useNavigate } from "@tanstack/react-router";
import MyTurnstileComponent from "./Turnstile";
import Logo from "../LandingPage/logo";

const ForgotPass: FunctionComponent = () => {
	const navigate = useNavigate();
	const [emailDat, setEmailDat] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const handleClick: void = async (event) => {
		event.preventDefault();
		try {
			await resetMypass(
				emailDat,
				String(import.meta.env["VITE_APP_ENVIRONMENT"]) === "development"
					? String(import.meta.env["VITE_TESTCAP_KEY"])
					: role.userTok
			)
				.then(navigate({ to: "/auth/SignIn" }))
				.catch(console.log("failed"));
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
				>
					<div className="w-8 h-8 mr-2">
						<Logo />
					</div>
					Attendex
				</a>
				<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
					<h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
						Forgot your password?
					</h1>
					<p className="font-light text-gray-500">
						Don't fret! Just type in your email and we will send you a code to
						reset your password!
					</p>
					<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Your email
							</label>
							<input
								type="email"
								name="email"
								value={emailDat}
								onChange={(event) => {
									setEmailDat(event.target.value);
								}}
								pattern="^[^@]+@[^@]+\.[^@]+$"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500"
								placeholder="name@company.com"
								required
								onBlur={(event) => {
									const p = event.target.value.match(/^[^@]+@[^@]+\.[^@]+$/);
									setError(!p);
								}}
							/>
						</div>
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									id="terms"
									aria-describedby="terms"
									type="checkbox"
									className="w-4 h-4 border border-gray-300 rounded bg-white-50 focus:ring-3 focus:ring-primary-300"
									required
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="terms" className="font-light text-gray-500">
									I accept the{" "}
									<a
										className="font-medium text-primary-600 hover:underline"
										href="#"
									>
										Terms and Conditions
									</a>
								</label>
							</div>
						</div>
						<div className={`flex justify-center`}>
							<MyTurnstileComponent />
						</div>
						<button
							type="submit"
							disabled={error}
							onClick={handleClick}
							className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500"
						>
							Reset password
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ForgotPass;
