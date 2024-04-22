/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-duplicate-imports */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface ProfilePicProps {
	userID: string;
	picUrl: string;
}

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("load", () => {
			resolve(reader.result as string);
		});
		reader.onerror = (error) => {
			reject(error);
		};
	});

const ProfilePic: React.FC<ProfilePicProps> = ({ picUrl, userID }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState<Array<UploadFile>>([
		{ uid: userID, url: picUrl, name: `userID.png`, status: "done" },
	]);

	const handleCancel = () => {
		setPreviewOpen(false);
	};

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.slice(Math.max(0, file.url!.lastIndexOf("/") + 1))
		);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
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
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				maxCount={1}
			>
				{fileList.length >= 8 ? null : uploadButton}
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
