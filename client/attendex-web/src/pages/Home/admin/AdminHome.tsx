import { Button } from "antd";
import React, { FunctionComponent } from "react";
import { Navigate } from "@tanstack/react-router";
import { signOut } from "../../../features/Auth";
const AdminHome: FunctionComponent = () => {
	return (
		<div>
			<h1 style={{ fontSize: 32 }}>AdminHome</h1>
			<Button
				onClick={async () => {
					await signOut();
					Navigate("/auth/SignIn");
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

export default AdminHome;
