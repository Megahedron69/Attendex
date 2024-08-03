import type { FC } from "react";
import { Card, Descriptions, Button } from "antd";
import {
	EditFilled,
	TwitterOutlined,
	FacebookOutlined,
	InstagramOutlined,
} from "@ant-design/icons";
import "../../../../styles/UserStyles/user.css";

const ProfAbout: FC = () => {
	return (
		<div>
			<Card
				bordered={false}
				title={<h6 className="font-semibold m-0">Profile Information</h6>}
				className="header-solid h-full card-profile-information shadow-lg drop-shadow-lg shadow-black"
				extra={<Button type="link" icon={<EditFilled />} />}
				style={{ paddingTop: 0, paddingBottom: 16, maxHeight: "485px" }}
			>
				<p className="text-dark">
					{" "}
					Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is
					no. If two equally difficult paths, choose the one more painful in the
					short term (pain avoidance is creating an illusion of equality).{" "}
				</p>
				<hr className="my-25" />
				<Descriptions title="Oliver Liam">
					<Descriptions.Item label="Full Name" span={3}>
						Sarah Emily Jacob
					</Descriptions.Item>
					<Descriptions.Item label="Mobile" span={3}>
						(44) 123 1234 123
					</Descriptions.Item>
					<Descriptions.Item label="Email" span={3}>
						sarahjacob@mail.com
					</Descriptions.Item>
					<Descriptions.Item label="Location" span={3}>
						USA
					</Descriptions.Item>
					<Descriptions.Item label="Social" span={3}>
						<a href="#pablo" className="mx-5 px-5">
							{<TwitterOutlined />}
						</a>
						<a href="#pablo" className="mx-5 px-5">
							{<FacebookOutlined style={{ color: "#344e86" }} />}
						</a>
						<a href="#pablo" className="mx-5 px-5">
							{<InstagramOutlined style={{ color: "#e1306c" }} />}
						</a>
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</div>
	);
};

export default ProfAbout;
