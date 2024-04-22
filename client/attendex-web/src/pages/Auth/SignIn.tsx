/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-duplicate-imports */
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { AuthCard } from "../../components/ui/Auth/AuthCard";
import Header from "../../components/ui/LandingPage/header";
const SignIn: FunctionComponent = () => {
	useEffect(() => {});
	return (
		<>
			<nav className="width-100 z-10">
				<Header />
			</nav>
			<div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 bg-slate-50 flex justify-center">
				<AuthCard />
			</div>
		</>
	);
};

export default SignIn;
