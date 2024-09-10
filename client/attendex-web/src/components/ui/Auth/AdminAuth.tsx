/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect, type FunctionComponent } from "react";
import {
	Alert,
	Result,
	Button,
	Upload,
	message,
	notification,
	type UploadFile,
	type UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import Header from "../LandingPage/header";
import axios from "axios";
import { PostReq } from "../../../store/DataPost";

type NotificationType = "success" | "info" | "warning" | "error";

const AdminAuth: FunctionComponent = () => {
	const [api, contextHolder] = notification.useNotification();

	const navigate = useNavigate();

	const [formData, setFormData] = useState<object>({
		userId: "",
		fullName: "",
		emailId: "",
		orgName: "",
		designation: "",
		avatarURL: "",
		logoURL: "",
		docsURL: "",
		referenceId: "",
	});
	const [fileList, setFileList] = useState<Array<UploadFile>>([]);
	const [showNotif, setShowNotif] = useState<object>({
		status: false,
		message: "",
	});

	useEffect(() => {
		if (showNotif.status) {
			const openNotificationWithIcon = (type) => {
				api[type]({
					message: "Error Occurred",
					description: <div>{showNotif.message}</div>,
				});
			};
			openNotificationWithIcon("error");
		}
	}, [showNotif]);

	useEffect(() => {
		const genUID = async () => {
			try {
				const response = await axios.get(
					`${String(import.meta.env["VITE_BASE_URL"])}/db/uidGen`
				);
				const { uid } = response.data;
				setFormData({ ...formData, userId: uid });
			} catch (error) {
				console.log(error);
			}
		};
		genUID();
	}, []);
	console.log(formData);
	const onsubmit = async () => {
		try {
			const resp = await PostReq("requestAdmin", formData);
			console.log(resp);
			if (resp.status) {
				setShowNotif({ status: true, message: "" });
				message.success("Details submitted for evaluation");
				navigate({ to: "/" });
			} else {
				if (Array.isArray(resp.message)) {
					const errorList = (
						<ul>
							{resp.message.map((msg, index) => (
								<li key={index}>{msg}</li>
							))}
						</ul>
					);
					setShowNotif({ status: true, message: errorList });
				} else {
					setShowNotif({ status: true, message: resp.message });
				}
			}
		} catch (error) {
			message.error(`Unable to submit details ${error}`);
		}
	};
	const befUpl = (file: { type: string; size: number; name: any }) => {
		const isPNG = file.type === "image/png";
		const isSizeValid = file.size / 1024 / 1024 < 2;
		if (!isPNG) {
			message.error(`${file.name} is not a png file`);
		}
		if (!isSizeValid) {
			message.error(`file too large please compress it below 2MB`);
		}
		return (isPNG && isSizeValid) || Upload.LIST_IGNORE;
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const customRequest = async (
		options: any,
		ImgType: "Avatar" | "Logo" | "Documents"
	) => {
		const { file, onSuccess, onError } = options;
		const FormDataz = new FormData();
		const fileData = {
			userID: formData.userId,
			fileType: ImgType,
		};
		FormDataz.append("file", file);
		FormDataz.append("fileData", JSON.stringify(fileData));

		try {
			const response = await axios.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/db/profilePic`,
				FormDataz,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const { url } = response.data;
			setFileList([
				{ uid: formData.userId, url, name: file.name, status: "done" },
			]);
			if (ImgType === "Avatar") setFormData({ ...formData, avatarURL: url });
			else if (ImgType === "Logo") setFormData({ ...formData, logoURL: url });
			else setFormData({ ...formData, docsURL: url });
			onSuccess(response.data);
		} catch (error) {
			message.error("Failed to upload image.");
			console.error("Upload error: ", error);
			onError(error);
		}
	};
	return (
		<div className="flex flex-col">
			{contextHolder}
			<nav className="w-full ">
				<Header />
			</nav>
			<div className="mt-32 p-8 m-8 h-auto border-solid border-black bg-white rounded-xl border shadow-md">
				<div>
					<Alert
						message="Admin Auth"
						description="For getting admin rights please fill out the details below which will get manually verified within 24hrs. If approved login details will be sent to registered email Id"
						type="info"
						showIcon
						className="font-medium text-xl"
					/>
				</div>
				<div>
					<section className="min-h-screen bg-white dark:bg-gray-900">
						<div className="container px-6 py-10 mx-auto">
							<div className="lg:flex lg:items-center lg:-mx-10">
								<div className="lg:w-1/2 lg:mx-10">
									<h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
										Admin Form
									</h1>
									<p className="mt-4 text-gray-500 dark:text-gray-400">
										Details will be manually approved within 24hrs
									</p>
									<form className="mt-12">
										<div className="-mx-2 md:items-center md:flex">
											<div className="flex-1 px-2">
												<label
													aria-required
													className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
												>
													Full Name
												</label>
												<input
													type="text"
													placeholder="John Doe"
													required
													name="fullName"
													onChange={handleChange}
													pattern="^[a-zA-Z\s]+$"
													value={formData.fullName}
													className="peer block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
												/>
												<span className="peer-valid:invisible mt-2 invisible peer-invalid:visible text-pink-600 text-xs">
													Please provide a valid name
												</span>
											</div>
											<div className="flex-1 px-2 mt-4 md:mt-0">
												<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
													Email address
												</label>
												<input
													type="email"
													required
													pattern="^[^@]+@[^@]+\.[^@]+$"
													maxLength={30}
													name="emailId"
													value={formData.emailId}
													onChange={handleChange}
													placeholder="johndoe@example.com"
													className="peer block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
												/>
												<span className="peer-valid:invisible mt-2 invisible peer-invalid:visible text-pink-600 text-xs">
													Please provide a valid email-id
												</span>
											</div>
										</div>
										<div className="w-full mt-4">
											<label
												aria-required
												className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
											>
												Organisation Name
											</label>
											<input
												type="text"
												required
												name="orgName"
												value={formData.orgName}
												onChange={handleChange}
												maxLength={30}
												minLength={2}
												pattern="^[a-zA-Z\s]+$"
												placeholder="Bluedart"
												className="peer block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
											<span className="peer-valid:invisible mt-2 invisible peer-invalid:visible text-pink-600 text-xs">
												Please provide a valid organisation
											</span>
										</div>
										<div className="-mx-2 md:items-center md:flex">
											<div className="flex-1 px-2">
												<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
													Designation
												</label>
												<input
													type="text"
													required
													name="designation"
													value={formData.designation}
													onChange={handleChange}
													maxLength={30}
													minLength={2}
													pattern="^[a-zA-Z\s]+$"
													placeholder="Intern"
													className="peer block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
												/>
												<span className="peer-valid:invisible mt-2 invisible peer-invalid:visible text-pink-600 text-xs">
													Please provide a valid designation
												</span>
											</div>
											<div className="flex flex-wrap justify-center items-center">
												<div className="flex-1 px-2">
													<div className="flex justify-center items-center w-full px-5 py-3 h-fit ">
														<Upload
															customRequest={(options) => {
																customRequest(options, "Avatar");
															}}
															listType="text"
															maxCount={1}
															beforeUpload={befUpl}
														>
															<Button
																icon={<UploadOutlined />}
																className="w-full text-center px-7 py-6 justify-center items-center flex mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
															>
																Upload Profile Picture
															</Button>
															<p className="block mb-2 text-xs text-gray-600 dark:text-gray-200">
																Png less than 2mb
															</p>
														</Upload>
													</div>
												</div>
												<div className="flex-1 px-2">
													<div className="flex justify-center items-center w-full px-5 py-3 ">
														<Upload
															customRequest={(options) => {
																customRequest(options, "Logo");
															}}
															listType="text"
															maxCount={1}
															beforeUpload={befUpl}
														>
															<Button
																icon={<UploadOutlined />}
																className="w-full text-center px-7 py-6 justify-center items-center flex mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
															>
																Upload Company Logo
															</Button>
															<p className="block mb-2 text-xs text-gray-600 dark:text-gray-200">
																Png less than 2mb
															</p>
														</Upload>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
									<Result
										title="Please Upload a valid proof"
										subTitle="Please upload any valid png document like pay slip or company issued Id card that can help us verify you"
										extra={
											<Upload
												customRequest={(options) => {
													customRequest(options, "Documents");
												}}
												listType="picture"
												accept="image/png"
												maxCount={1}
												multiple={false}
												beforeUpload={befUpl}
											>
												<Button type="primary" icon={<UploadOutlined />}>
													Upload
												</Button>
											</Upload>
										}
									/>
									<div className="relative py-4 justify-center items-center flex -mt-8">
										<div className="absolute inset-0 flex items-center">
											<div className="w-full border-b border-gray-300"></div>
										</div>
										<div className="relative flex justify-center">
											<span className="bg-white px-4 text-sm text-gray-500">
												OR
											</span>
										</div>
									</div>

									<div className="w-full flex flex-col items-center justify-start">
										<input
											type="text"
											name="referenceId"
											minLength={8}
											maxLength={8}
											value={formData.referenceId}
											onChange={handleChange}
											placeholder="Company reference id"
											className="peer block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										/>
										<span className="peer-valid:invisible mt-2 text-left invisible peer-invalid:visible text-pink-600 text-xs">
											Please provide a valid reference Id
										</span>
									</div>
								</div>
							</div>
							<button
								type="submit"
								onClick={onsubmit}
								className="w-full px-6 py-3 mt-8 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
							>
								Send Details
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};
export default AdminAuth;
