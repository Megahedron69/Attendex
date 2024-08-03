/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Avatar } from "antd";
import { UserOutlined, VerifiedOutlined } from "@ant-design/icons";
import type { FunctionComponent } from "react";
import { userRoleStore } from "../../../store/UserRole";
import { useNavigate } from "@tanstack/react-router";

const UserRole: FunctionComponent = () => {
	const { role, updateUserRole } = userRoleStore();
	const navigate = useNavigate();
	return (
		<>
			<div className="flex items-center flex-col mr-10 mt-20">
				<Avatar
					className={`bg-blue-500 cursor-pointer ring-8 ${role.rolez === "user" ? "ring-green-500" : "ring-gray-300"}`}
					size={{ xs: 64, sm: 72, md: 96, lg: 120, xl: 150, xxl: 170 }}
					icon={<UserOutlined />}
					onClick={() => {
						updateUserRole({ rolez: "user" });
					}}
				/>
				<h1 className="pb-12 text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl xxl:text-6xl font-bold text-black">
					User
				</h1>
			</div>
			<div className="flex items-center flex-col ml-10 mt-20 ">
				<Avatar
					className={`bg-red-500 cursor-pointer ring-8 ${role.rolez === "admin" ? "ring-green-500" : "ring-gray-300"}`}
					size={{ xs: 64, sm: 72, md: 96, lg: 120, xl: 150, xxl: 170 }}
					icon={<VerifiedOutlined />}
					onClick={() => {
						updateUserRole({ rolez: "admin" });
						navigate({ to: "/auth/AdminAuth" });
					}}
				/>
				<h1 className="pb-12 text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl xxl:text-6xl font-bold text-black">
					Admin
				</h1>
			</div>
		</>
	);
};

export default UserRole;
