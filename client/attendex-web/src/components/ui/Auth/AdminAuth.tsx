/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import type { FunctionComponent } from "react";
import { Alert, Result, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

const AdminAuth: FunctionComponent = () => {
	const navigate = useNavigate();
	const onsubmit = () => {
		message.success("Details submitted for evaluation");
		navigate({ to: "/" });
	};
	return (
		<div className="p-8 m-8 h-auto border-solid border-black bg-white rounded-xl border shadow-md">
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
												className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
										</div>
										<div className="flex-1 px-2 mt-4 md:mt-0">
											<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
												Email address
											</label>
											<input
												type="email"
												required
												placeholder="johndoe@example.com"
												className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
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
											placeholder="Bluedart"
											className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										/>
									</div>
								</form>
							</div>
							<div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
								<Result
									title="Please Upload a valid proof"
									subTitle="Please upload any valid document like pay slip or company issued Id card that can help us verify you"
									extra={
										<Upload
											action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
											listType="picture"
											accept="image/png"
											maxCount={1}
											multiple={false}
											beforeUpload={(file: {
												type: string;
												size: number;
												name: any;
											}) => {
												const isPNG = file.type === "image/png";
												const isSizeValid = file.size / 1024 / 1024 < 5;
												if (!isPNG) {
													message.error(`${file.name} is not a png file`);
												}
												if (!isSizeValid) {
													message.error(
														`file too large please compress it below 5MB`
													);
												}
												return (isPNG && isSizeValid) || Upload.LIST_IGNORE;
											}}
										>
											<Button type="primary" icon={<UploadOutlined />}>
												Upload
											</Button>
										</Upload>
									}
								/>
							</div>
						</div>
						<button
							type="submit"
							onClick={onsubmit}
							className="w-full px-6 py-3 mt-4 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
						>
							Send Details
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};
export default AdminAuth;
