import type { FC } from "react";
import { Card, Avatar, Row, Col } from "antd";
import "../../../../styles/UserStyles/user.css";

const ProfHeader: FC = () => {
	return (
		<div className="p-4 lg:-mt-3 lg:-ml-3">
			<Card className="card-profile-head shadow-lg drop-shadow-xl shadow-black rounded-xl">
				<Row justify="space-between" align="middle" gutter={[24, 0]}>
					<Col span={24} md={12} className="col-info">
						<Avatar.Group>
							<Avatar
								size={74}
								src={
									"https://this-person-does-not-exist.com/img/avatar-genab85eec6bbe27dd0a8990ea740765ab0.jpg"
								}
								className="mr-4"
							/>

							<div className="avatar-info">
								<h4 className="font-semibold m-0">Sarah Jacob</h4>
								<p>Intern</p>
							</div>
						</Avatar.Group>
					</Col>
					<Col
						span={24}
						md={12}
						className="flex items-center justify-center md:justify-end mt-4 md:mt-0"
					>
						<img
							className="w-24 h-24 text-center"
							src={
								"https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af343a4c3e2672_mastercard_-%20logo-300x303.png"
							}
						/>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default ProfHeader;
