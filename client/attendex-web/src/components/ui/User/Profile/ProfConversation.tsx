import type { FC } from "react";
import { Card, Avatar, List, Button } from "antd";
import "../../../../styles/UserStyles/user.css";

const data = [
	{
		title: "Sophie B.",
		avatar:
			"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg",
		description: "Hi! I need more information…",
	},
	{
		title: "Anne Marie",
		avatar:
			"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg",
		description: "Awesome work, can you…",
	},
	{
		title: "Ivan",
		avatar:
			"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg",
		description: "About files I can…",
	},
	{
		title: "Peterson",
		avatar:
			"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg",
		description: "Have a great afternoon…",
	},
	{
		title: "Nick Daniel",
		avatar:
			"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg",
		description: "Hi! I need more information…",
	},
];

const ProfConversation: FC = () => {
	return (
		<div>
			<Card
				bordered={false}
				title={<h6 className="font-semibold mt-12">Conversations</h6>}
				className="header-solid h-full shadow-lg drop-shadow-lg shadow-black overflow-hidden overflow-y-auto items-center"
				style={{ paddingTop: 0, paddingBottom: 16, maxHeight: "485px" }}
			>
				<List
					itemLayout="horizontal"
					dataSource={data}
					split={false}
					className="conversations-list"
					renderItem={(item) => (
						<List.Item actions={[<Button type="link">REPLY</Button>]}>
							<List.Item.Meta
								avatar={<Avatar shape="square" size={48} src={item.avatar} />}
								title={item.title}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</div>
	);
};

export default ProfConversation;
