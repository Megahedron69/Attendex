/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-duplicate-imports */

import { useState } from "react";
import { InboxOutlined, ToolOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button } from "antd";
import ManVerified from "./ManVerified";
import axios from "axios";
import { userInfoStore } from "../../../store/UserInfo";
import type { FunctionComponent } from "react";

const { Dragger } = Upload;

const Verified: FunctionComponent = () => {
	const [manualMode, setManualMode] = useState<boolean>(false);
	const [automaticMode, setAutomaticMode] = useState<boolean>(false);
	const { updateUserInfo } = userInfoStore();

	const customRequest = async (options: any) => {
		try {
			const data = new FormData();
			data.append("file", options.file);
			const config = {
				headers: {
					"content-type":
						"multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
				},
			};
			const res = await axios.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/smart/extraction`,
				data,
				config
			);
			options.onSuccess(res.data, options.file);
			console.log("res is", res.data, options.file);
			updateUserInfo({
				userId: res.data.uid,
				firstName:
					res.data.inputVal.name.ptrs.length > 0
						? res.data.inputVal.name.ptrs[0][3].split("|")[0]
						: "",
				lastName:
					res.data.inputVal.name.ptrs.length > 0
						? res.data.inputVal.name.ptrs[0][4].split("|")[0]
						: "",
				email:
					res.data.inputVal.email.length > 0 ? res.data.inputVal.email : "",
				age: res.data.face.age,
				jobTitle: "",
				organisation:
					res.data.inputVal.organizations.ptrs.length > 0
						? res.data.inputVal.organizations.ptrs[0][3].split("|")[0]
						: "",
				phone: res.data.inputVal.phoneNumber[0],
				address:
					res.data.inputVal.places.ptrs.length > 0
						? [
								...new Set(
									res.data.inputVal.places.ptrs.flatMap((ptr: any) =>
										ptr.slice(3).map((string_: any) => string_.split("|")[0])
									)
								),
							].join(" ")
						: "",
				profilePic: res.data.face.faceBase64 ?? "",
				gender: res.data.face.gender ?? "male",
				startDate:
					res.data.inputVal.validity.length > 0
						? res.data.inputVal.validity[0].split("-")[0]
						: "",
				endDate:
					res.data.inputVal.validity.length > 0
						? res.data.inputVal.validity[0].split("-")[1]
						: "",
				allDetailsValidated: false,
			});
			setAutomaticMode(true);
		} catch (error) {
			console.log(error);
		}
	};

	const manRequest = async () => {
		try {
			const res = await axios.get(
				`${String(import.meta.env["VITE_BASE_URL"])}/db/uidGen`
			);
			updateUserInfo({ userId: res.data.uid });
			setManualMode(true);
		} catch (error) {
			console.log(error);
		}
	};

	const props: UploadProps = {
		name: "file",
		listType: "picture-card",
		accept: "image/png",
		beforeUpload: (file: { type: string; size: number; name: any }) => {
			const isPNG = file.type === "image/png";
			const isSizeValid = file.size / 1024 / 1024 < 5;
			if (!isPNG) {
				message.error(`${file.name} is not a png file`);
			}
			if (!isSizeValid) {
				message.error(`file too large please compress it below 5MB`);
			}
			return (isPNG && isSizeValid) || Upload.LIST_IGNORE;
		},
		maxCount: 1,
		multiple: false,
		onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
			const { status } = info.file;
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(event: { dataTransfer: { files: any } }) {
			console.log("Dropped files", event.dataTransfer.files);
		},
	};

	return (
		<div className="flex flex-col items-center space-y-2 md:space-y-4">
			{!manualMode && (
				<>
					<Dragger
						{...props}
						customRequest={customRequest}
						className="w-full md:w-auto -mb-2 flex flex-col items-center"
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag your company issued ID-card to this area to upload
						</p>
						<p className="ant-upload-hint">
							Upload a clear .png photo of your ID card to automatically extract
							required data. You can also do it manually by clicking below
							<a
								className="text-cyan-400 hover:text-cyan-700 active:text-cyan-900 ml-1"
								download
								target="_blank"
								href="https://i.imgur.com/5G6UjvK.png"
								rel="noopener noreferrer"
							>
								Sample IdCard
							</a>
						</p>
					</Dragger>
					{automaticMode ? (
						<div className="-mt-10">
							<ManVerified />
						</div>
					) : null}
				</>
			)}

			<div
				className={`relative w-full md:w-auto h-12 ${manualMode || automaticMode ? "invisible" : "visible"}`}
			>
				<div className="inline-flex items-center justify-center w-full">
					<hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
					<span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black dark:bg-white">
						or
					</span>
				</div>
			</div>
			<div className="w-full md:w-auto">
				<Button
					type="primary"
					icon={<ToolOutlined />}
					size="large"
					onClick={manRequest}
					hidden={manualMode || automaticMode}
				>
					Do It Manually
				</Button>
			</div>

			{manualMode && <ManVerified />}
		</div>
	);
};

export default Verified;
