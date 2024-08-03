/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
	type SetStateAction,
	useState,
	type FC,
	type ReactNode,
	memo,
} from "react";
import Navbar from "./Navbar";
import Breads from "./Breads";
import { WechatOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import ChatWidget from "./ChatWidget";
import "../../../../styles/UserStyles/user.css";
interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	const [showChatWidget, setShowChatWidget] = useState(false);
	const [selectedRole, setSelectedRole] = useState("");

	const toggleChatWidget = (role: SetStateAction<string>) => {
		setShowChatWidget(!showChatWidget);
		setSelectedRole(role);
	};
	return (
		<div className="bg-slate-200 w-screen h-screen">
			<div
				style={{ width: "99%" }}
				className="bg-[#000002] rounded-t-2xl m-5 p-6 mb-0 flex flex-col justify-center shadow-lg shadow-black drop-shadow-2xl"
			>
				<Navbar />
				<Breads />
			</div>
			<div>{children}</div>
			{!showChatWidget && (
				<FloatButton.Group
					shape="circle"
					trigger="click"
					type="primary"
					tooltip={<span>Chat</span>}
					className="floater"
					icon={
						<WechatOutlined style={{ fontSize: "25px", textAlign: "center" }} />
					}
				>
					<FloatButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								style={{
									width: "20px",
									height: "20px",
									fontSize: "25px",
									textAlign: "center",
								}}
							>
								<path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
							</svg>
						}
						tooltip={<span>Bot</span>}
						onClick={() => {
							toggleChatWidget("bot");
						}}
					/>
					<FloatButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="w-full h-full"
							>
								<path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" />
							</svg>
						}
						tooltip={<span>Admin</span>}
						onClick={() => {
							toggleChatWidget("admin");
						}}
					/>
				</FloatButton.Group>
			)}
			<ChatWidget
				isOpen={showChatWidget}
				onClose={() => {
					setShowChatWidget(false);
				}}
				role={selectedRole}
			/>
		</div>
	);
};

export default memo(MainLayout);
