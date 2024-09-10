/* eslint-disable @typescript-eslint/no-floating-promises */
import { type FC, useState } from "react";
import { Modal, Collapse, type CollapseProps, message } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { PostReq } from "../../../store/DataPost";
import { useNavigate } from "@tanstack/react-router";

type EmailProps = {
	email: string;
	emailCStat: boolean;
};
type MFAprops = {
	ImageURL: string;
	mfaID: string;
	mfaSecret: string;
	mfaURI: string;
	userID: string;
	mfaStat: boolean;
	emailCstat: boolean;
	naviBool: boolean;
};
type Props = {
	emailCStat: boolean;
	email: string;
	mfaStat: boolean;
	ImageURL: string;
	mfaID: string;
	mfaSecret: string;
	mfaURI: string;
	userID: string;
};

const EmailConfirmBox: FC<EmailProps> = ({ email, emailCStat }) => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-4">
			{emailCStat ? (
				<>
					<div className="w-64 h-64 mt-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
							<path
								fill="#63E6BE"
								d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176 0 384c0 35.3 28.7 64 64 64l296.2 0C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"
							/>
						</svg>
					</div>
					<h2 className="mb-2 text-[24px] sm:text-[42px] font-bold text-zinc-800">
						Email Confirmed
					</h2>
				</>
			) : (
				<>
					<div className="w-64 h-64 mt-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M255.4 48.2c.2-.1 .4-.2 .6-.2s.4 .1 .6 .2L460.6 194c2.1 1.5 3.4 3.9 3.4 6.5l0 13.6L291.5 355.7c-20.7 17-50.4 17-71.1 0L48 214.1l0-13.6c0-2.6 1.2-5 3.4-6.5L255.4 48.2zM48 276.2L190 392.8c38.4 31.5 93.7 31.5 132 0L464 276.2 464 456c0 4.4-3.6 8-8 8L56 464c-4.4 0-8-3.6-8-8l0-179.8zM256 0c-10.2 0-20.2 3.2-28.5 9.1L23.5 154.9C8.7 165.4 0 182.4 0 200.5L0 456c0 30.9 25.1 56 56 56l400 0c30.9 0 56-25.1 56-56l0-255.5c0-18.1-8.7-35.1-23.4-45.6L284.5 9.1C276.2 3.2 266.2 0 256 0z" />
						</svg>
					</div>
					<div className="flex flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
						<div className="max-w-xl px-5 text-center">
							<h2 className="mb-2 text-[24px] sm:text-[42px] font-bold text-zinc-800">
								Check your inbox
							</h2>
							<p className="mb-2 text-lg text-zinc-500">
								We are glad, that you’re with us. We’ve sent you a verification
								link to the email address{" "}
								<span className="font-medium text-blue-600">{email}</span>.
							</p>
							<a
								href="https://mail.google.com/mail/u/0/#inbox"
								target="_blank"
								className="mt-3 inline-block w-full sm:w-96 rounded bg-blue-400 px-5 py-3 font-medium text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:text-white"
							>
								Confirm Mail →
							</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const EnrollMFA: FC<MFAprops> = ({
	ImageURL,
	mfaID,
	userID,
	mfaURI,
	mfaStat,
	emailCstat,
	naviBool,
}) => {
	const navigate = useNavigate();
	const submitFn = async (uID: string, mID: string, mStat: boolean) => {
		try {
			console.log(uID);
			if (!emailCstat)
				return await message.error("Please confirm the requirements");
			const resp = await PostReq("/setClaim", { uID, mID, mStat });
			if (resp.status) {
				message.success("Sign In requirements completed");
				naviBool ?? navigate({ to: "/Auth/SignIn" });
			} else {
				message.error("Something went wrong try again");
			}
		} catch (error) {
			console.log(error);
			message.error("Something went wrong!");
		}
	};
	return (
		<div className="flex justify-center items-center flex-col p-4">
			<div className="bg-white p-4 sm:p-8 max-w-sm sm:max-w-md w-full flex items-center flex-col">
				<h2 className="text-xl sm:text-2xl font-semibold text-left mb-4">
					Set up MFA
				</h2>
				<p className="text-center mb-4">
					Please use your authenticator app (for example Authy, Google
					Authenticator, Duo, etc) to scan this QR code:
				</p>
				<div className="flex justify-center mb-4">
					<img
						src={ImageURL}
						alt="QR Code"
						className="w-auto h-auto sm:w-64 sm:h-64"
					/>
				</div>
				<p className="text-center mb-4">
					Or open this link in your authenticator app:
				</p>
				<a className="text-center mb-4 text-lg font-mono break-all">{mfaURI}</a>

				<button
					onClick={() => {
						mfaStat = true;
						submitFn(userID, mfaID, mfaStat);
					}}
					className="inline-block w-full sm:w-[282px] ml-4 mr-4 rounded bg-blue-400 px-5 py-3 font-medium text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:text-white"
				>
					Continue →
				</button>
				<p className="text-center text-gray-500 mt-4">
					Need help? Please contact Support.
				</p>
			</div>
		</div>
	);
};

const VerifyModal: FC<Props> = ({
	emailCStat,
	email,
	mfaStat,
	ImageURL,
	mfaID,
	mfaSecret,
	userID,
	mfaURI,
}) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: <span className="text-xl">Verify Email</span>,
			children: <EmailConfirmBox email={email} emailCStat={emailCStat} />,
			extra: emailCStat ? (
				<CheckCircleFilled className="text-green-500 text-xl" />
			) : (
				<CloseCircleFilled className="text-red-500 text-xl" />
			),
		},
		{
			key: "2",
			label: <span className="text-xl">Enable MFA</span>,
			children: (
				<EnrollMFA
					ImageURL={ImageURL}
					mfaID={mfaID}
					userID={userID}
					mfaSecret={mfaSecret}
					mfaURI={mfaURI}
					mfaStat={mfaStat}
					emailCstat={emailCStat}
					naviBool={true}
				/>
			),
			extra: mfaStat ? (
				<CheckCircleFilled className="text-green-500 text-xl" />
			) : (
				<CloseCircleFilled
					className="text-red-500 text-xl
				"
				/>
			),
		},
	];
	return (
		<Modal
			title="Sign In Requirements"
			open={true}
			className="myModal"
			centered
			footer={null}
		>
			<div className="p-4">
				<Collapse
					size="large"
					items={items}
					defaultActiveKey={["1"]}
					ghost={true}
					bordered={false}
				/>
			</div>
		</Modal>
	);
};

export default VerifyModal;
