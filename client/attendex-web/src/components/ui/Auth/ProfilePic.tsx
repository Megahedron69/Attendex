/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-duplicate-imports */
import { useState } from "react";
import { useStore } from "zustand";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import axios from "axios";
import { userInfoStore } from "../../../store/UserInfo";

interface ProfilePicProps {
	userID: string;
	picUrl: string;
	handlePicChange: any;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const ProfilePic: React.FC<ProfilePicProps> = ({
	picUrl,
	userID,
	handlePicChange,
}) => {
	const [previewOpen, setPreviewOpen] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>("");
	const [previewTitle, setPreviewTitle] = useState<string>("");
	const updateUserInfo = useStore(
		userInfoStore,
		(state) => state.updateUserInfo
	);
	const [fileList, setFileList] = useState<Array<UploadFile>>([
		{
			uid: userID,
			url: picUrl,
			name: "Upload",
			status: "done",
			thumbUrl: picUrl,
		},
	]);

	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const customRequest = async (options: any) => {
		const { file, onSuccess, onError } = options;
		const formData = new FormData();
		formData.append("file", file);
		const fileData = {
			userID: userID,
			fileType: "Avatar",
		};
		formData.append("fileData", JSON.stringify(fileData));

		try {
			const response = await axios.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/db/profilePic`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const { url } = response.data;
			setFileList([
				{
					uid: userID,
					url: url,
					name: file.name,
					status: "done",
					thumbUrl: url,
				},
			]);
			handlePicChange(url);
			onSuccess(response.data);
		} catch (error) {
			message.error("Failed to upload image.");
			console.error("Upload error: ", error);
			onError(error);
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<>
			<Upload
				listType="picture-circle"
				accept="image/png"
				customRequest={customRequest}
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={(file) => {
					const isPNG = file.type === "image/png";
					if (!isPNG) {
						message.error("You can only upload PNG file!");
					}
					const isLt2M = file.size / 1024 / 1024 < 2;
					if (!isLt2M) {
						message.error("Image must be smaller than 2MB!");
					}
					return isPNG && isLt2M;
				}}
				maxCount={1}
			>
				{fileList.length >= 1 ? null : uploadButton}
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
};

export default ProfilePic;
