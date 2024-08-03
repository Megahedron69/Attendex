import type { FC } from "react";
import MainLayout from "../../../components/ui/User/Layout/MainLayout";
import "../../../styles/UserStyles/user.css";
import { Row, Col } from "antd";

import ProfHeader from "../../../components/ui/User/Profile/ProfHeader";
import Settings from "../../../components/ui/User/Profile/Settings";
import ProfAbout from "../../../components/ui/User/Profile/ProfAbout";
import ProfConversation from "../../../components/ui/User/Profile/ProfConversation";
import ProfHeatmap from "../../../components/ui/User/Profile/ProfHeatmap";

const Profile: FC = () => {
	return (
		<div className="bg-slate-200">
			<MainLayout>
				<ProfHeader />
				<Row gutter={[24, 0]} className="bg-slate-200 p-4 lg:p-8">
					<Col span={24} md={8} className="mb-24">
						<Settings />
					</Col>
					<Col span={24} md={8} className="mb-24">
						<ProfAbout />
					</Col>
					<Col span={24} md={8} className="mb-24">
						<ProfConversation />
					</Col>
				</Row>
				<div className="flex flex-col bg-slate-200 -mt-24 p-4 lg:p-8 justify-center">
					<ProfHeatmap />
				</div>
			</MainLayout>
		</div>
	);
};

export default Profile;
