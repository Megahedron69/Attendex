/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Avatar, Input, List } from "antd";
import { WechatOutlined } from "@ant-design/icons";

// Define the types for the message
interface Message {
	text: string;
	sender: "user" | "bot" | "admin";
	timestamp: Date;
}

// Define the props for the ChatWidget component
interface ChatWidgetProps {
	isOpen: boolean;
	onClose: () => void;
	role: "bot" | "admin";
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, role }) => {
	const [adminMessages, setAdminMessages] = useState<Array<Message>>([]);
	const [botMessages, setBotMessages] = useState<Array<Message>>([]);
	const [inputValue, setInputValue] = useState<string>("");

	const handleSend = () => {
		if (inputValue.trim() !== "") {
			const newMessage: Message = {
				text: inputValue,
				sender: "user",
				timestamp: new Date(),
			};

			if (role === "admin") {
				setAdminMessages([...adminMessages, newMessage]);
			} else {
				setBotMessages([...botMessages, newMessage]);
			}

			setInputValue("");
			// Send message logic to admin or bot
		}
	};

	const formatTimestamp = (timestamp: Date): string => {
		return timestamp.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const messages = role === "admin" ? adminMessages : botMessages;

	return (
		<div
			className={`fixed bottom-4 right-4 ${isOpen ? "block" : "hidden"} md:bottom-8 md:right-8 lg:bottom-10 lg:right-10`}
		>
			<div
				className="bg-white border-2 rounded-xl shadow-lg p-4 border-black"
				style={{
					width: "100%",
					maxWidth: "400px",
					height: "80vh",
					maxHeight: "600px",
				}}
			>
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center">
						<Avatar icon={<WechatOutlined />} />
						<span className="ml-2 font-semibold text-lg">Chat</span>
					</div>
					<button className="text-sm text-gray-500" onClick={onClose}>
						Close
					</button>
				</div>

				<div className="mb-3 overflow-auto flex-1">
					<List
						itemLayout="horizontal"
						dataSource={messages}
						renderItem={(message, index) => (
							<List.Item
								key={index}
								className={`flex items-start gap-2.5 ${
									message.sender === "user"
										? "justify-end rtl:space-x-reverse"
										: "justify-start"
								}`}
							>
								{message.sender !== "user" && (
									<Avatar
										icon={
											role === "bot" ? (
												<WechatOutlined />
											) : (
												<Avatar icon="user" />
											)
										}
									/>
								)}
								<div
									className={`flex flex-col gap-1 w-full max-w-[280px] ${
										message.sender === "user" ? "items-end" : "items-start"
									}`}
								>
									<div className="flex items-center space-x-2">
										<span className="text-sm font-semibold">
											{message.sender === "user" ? "You" : "Admin/Bot"}
										</span>
										<span className="text-xs font-normal text-gray-500">
											{formatTimestamp(message.timestamp)}
										</span>
									</div>
									<div
										className={`flex flex-col leading-1.5 px-3 py-2 border-gray-200 bg-gray-100 rounded-xl ${
											message.sender === "user"
												? "bg-blue-200 text-gray-900"
												: "bg-blue-100 text-gray-900"
										}`}
									>
										<p className="text-sm font-normal">{message.text}</p>
									</div>
								</div>
								{message.sender === "user" && (
									<button
										id={`dropdownMenuIconButton${index}`}
										className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100"
										type="button"
									></button>
								)}
							</List.Item>
						)}
					/>
				</div>

				<div className="flex">
					<Input
						value={inputValue}
						onChange={(event_) => {
							setInputValue(event_.target.value);
						}}
						onPressEnter={handleSend}
						placeholder="Type your message..."
						className="rounded-2xl flex-1 mr-2"
					/>
					<button
						className="px-3 py-1 text-sm text-white bg-blue-400 rounded-xl hover:bg-blue-600"
						onClick={handleSend}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatWidget;
