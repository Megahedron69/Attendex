import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import type { FunctionComponent } from "react";
import { signOut } from "../../../features/Auth";
export const UserHome: FunctionComponent = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1 style={{ fontSize: 32 }}>UserHome</h1>
			<Button
				onClick={async () => {
					await signOut().then(navigate({ to: "/" }));
				}}
				type="primary"
				size="large"
				danger
			>
				SignOut
			</Button>
		</div>
	);
};
