import type { FC } from "react";
import { Card, Switch } from "antd";
import "../../../../styles/UserStyles/user.css";

const Settings: FC = () => {
	return (
		<div>
			<Card
				bordered={false}
				className="header-solid h-full shadow-lg drop-shadow-lg shadow-black max-h-[475px]"
				title={<h6 className="font-semibold m-0">Platform Settings</h6>}
			>
				<ul className="list settings-list">
					<li>
						<h6 className="list-header text-sm text-muted">ACCOUNT</h6>
					</li>
					<li>
						<Switch defaultChecked />

						<span>Email me when someone follows me</span>
					</li>
					<li>
						<Switch />
						<span>Email me when someone answers me</span>
					</li>
					<li>
						<Switch defaultChecked />
						<span>Email me when someone mentions me</span>
					</li>
					<li>
						<h6 className="list-header text-sm text-muted m-0">APPLICATION</h6>
					</li>
					<li>
						<Switch defaultChecked />
						<span>New launches and projects</span>
					</li>
					<li>
						<Switch defaultChecked />
						<span>Monthly product updates</span>
					</li>
					<li>
						<Switch defaultChecked />
						<span>Subscribe to newsletter</span>
					</li>
				</ul>
			</Card>
		</div>
	);
};

export default Settings;
