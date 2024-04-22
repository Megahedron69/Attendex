/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useEffect, useState } from "react";
import { message, Steps, theme } from "antd";
import { SignUpCard } from "../../components/ui/Auth/SignUpCard";
import UserRole from "../../components/ui/Auth/UserRole";
import Verified from "../../components/ui/Auth/GetVerified";
import ManVerified from "../../components/ui/Auth/ManVerified";
import { userRoleStore } from "../../store/UserRole";
import { userInfoStore } from "../../store/UserInfo";
import Header from "../../components/ui/LandingPage/header";

const steps = [
	{
		title: "Choose role",
		content: (
			<div className="flex justify-center items-center">
				<UserRole />
			</div>
		),
	},
	{
		title: "Get Started!",
		content: (
			<div className="flex justify-center items-center flex-col">
				<div>
					<Verified />
				</div>
				<div className="-mt-10">
					<ManVerified />
				</div>
			</div>
		),
	},
	{
		title: "Final touches!",
		content: (
			<div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 flex justify-center">
				<SignUpCard />
			</div>
		),
	},
];

const SignUp: React.FC = () => {
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const { role } = userRoleStore();
	const { allDetailsValidated } = userInfoStore();
	const [isDisabled, setIsDisabled] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (role === "" || (current === 1 && !allDetailsValidated)) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [role, allDetailsValidated, current]);

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const next = () => {
		setCurrent(current + 1);
	};
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	const contentStyle: React.CSSProperties = {
		lineHeight: "260px",
		textAlign: "center",
		color: token.colorTextTertiary,
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: token.borderRadiusLG,
		marginTop: 16,
		width: "100%",
	};

	return (
		<>
			<nav className="width-100 z-10">
				<Header />
			</nav>
			{contextHolder}
			<div className="mx-auto w-full max-w-screen-md p-12">
				<Steps
					current={current}
					items={items}
					className="w-full bg-white mt-8"
				/>
				<div style={contentStyle} className="mt-4 p-4 bg-white">
					{steps[current].content}
				</div>
				<div className="mt-4 bg-white">
					{current < steps.length - 1 && (
						<button
							className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
							onClick={() => {
								if (isDisabled) {
									messageApi.open({
										type: "error",
										content: "missing or empty fields",
									});
								} else {
									next();
								}
							}}
						>
							Next
						</button>
					)}
					{current === steps.length - 1 && (
						<button
							className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${current == 2 && "hidden"}`}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={() => message.success("Processing complete!")}
						>
							Done
						</button>
					)}
					{current > 0 && (
						<button
							className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${current == 2 && "hidden"}`}
							style={{ margin: "0 8px" }}
							onClick={() => {
								if (allDetailsValidated) {
									message.error("Cannot go back now. Start a fresh SignUp");
								} else {
									prev();
								}
							}}
						>
							Previous
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default SignUp;
