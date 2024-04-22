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

import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import axios from "axios";
import { userInfoStore } from "../../../store/UserInfo";
import type { FunctionComponent } from "react";

const { Dragger } = Upload;

const Verified: FunctionComponent = () => {
	const { updateUserInfo } = userInfoStore();

	const customRequest = (options: any) => {
		const data = new FormData();
		data.append("file", options.file);
		const config = {
			headers: {
				"content-type":
					"multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
			},
		};
		axios
			.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/smart/extraction`,
				data,
				config
			)
			.then((res: any) => {
				options.onSuccess(res.data, options.file);
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
										res.data.inputVal.places.ptrs.flatMap((ptr) =>
											ptr
												.slice(3)
												.map((string_: string) => string_.split("|")[0])
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
			})
			.catch((error: Error) => {
				console.log(error);
			});
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
			// if (status !== "uploading") {
			// 	console.log(info.file, info.fileList);
			// }
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
		<Dragger {...props} customRequest={customRequest}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">
				Click or drag your company issued ID-card to this area to upload
			</p>
			<p className="ant-upload-hint">
				Upload a clear .png photo of your ID card to automatically extract
				required data. If you dont have a company issued card proceed by
				downloading
				<a
					className="text-cyan-400 hover:text-cyan-700 active:text-cyan-900 ml-1"
					download
					target="_blank"
					href="https://i.imgur.com/5G6UjvK.png"
				>
					Sample IdCard
				</a>
			</p>
		</Dragger>
	);
};

export default Verified;
