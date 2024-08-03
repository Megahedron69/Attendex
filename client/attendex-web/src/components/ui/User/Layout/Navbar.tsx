/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-duplicate-imports */
import type { FC } from "react";
import { useState } from "react";
import { Layout, Menu, Badge, Avatar, Dropdown } from "antd";
import {
	MessageOutlined,
	UserOutlined,
	LogoutOutlined,
	MenuOutlined,
	MailOutlined,
} from "@ant-design/icons";
import logo from "../../../../assets/images/logo.png";
import SearchBar from "./Searchbar";
import { signOut } from "../../../../features/Auth";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
const { Header } = Layout;

const Navbar: FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const router = useRouter();
	const routerz = useRouterState();
	const pathe = routerz.location.pathname;
	const pathname = pathe.replace("/User/", "") || "";
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const menu = (
		<Menu>
			<Menu.Item
				key="1"
				icon={<UserOutlined />}
				onClick={() => {
					router.navigate({ to: "/User/Profile" });
				}}
			>
				Profile
			</Menu.Item>
			<Menu.Item
				key="2"
				icon={<LogoutOutlined />}
				onClick={async () => {
					await signOut(router);
				}}
			>
				Sign Out
			</Menu.Item>
		</Menu>
	);

	return (
		<Header className="bg-[#000002] text-white p-5 flex items-center justify-between relative rounded-2xl">
			<div className="flex items-center">
				<div className="flex flex-row items-center mr-4 ml-3">
					<Avatar size={"small"} src={logo} />
					<div className="text-blue-400 text-2xl font-bold ml-2">Attendex</div>
				</div>
				<div className="hidden md:flex space-x-12 lg:ml-20">
					<button
						type="button"
						onClick={() => {
							router.navigate({ to: "/User/Home" });
						}}
						className={`${pathname == "Home" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 active:text-blue-400`}
					>
						Dashboard
					</button>
					<button
						type="button"
						onClick={() => {
							router.navigate({ to: "/User/Markit" });
						}}
						className={`${pathname == "Markit" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
					>
						Mark-it
					</button>
					<button
						type="button"
						onClick={() => {
							router.navigate({ to: "/User/ReqLeave" });
						}}
						className={`${pathname == "ReqLeave" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
					>
						Request Leave
					</button>
				</div>
			</div>
			<div className="w-1/4">
				<SearchBar />
			</div>
			<div className="flex items-center space-x-4">
				<Badge dot>
					<MailOutlined className="text-white text-xl" />
				</Badge>
				<Badge dot>
					<MessageOutlined className="text-white text-xl" />
				</Badge>
				<Dropdown overlay={menu} placement="bottomRight">
					<Avatar size="large" icon={<UserOutlined />} />
				</Dropdown>
			</div>
			<div className="md:hidden ml-4">
				<MenuOutlined
					className="text-white text-xl cursor-pointer"
					onClick={toggleCollapsed}
				/>
			</div>
			{collapsed && (
				<Menu className="absolute right-0 top-full w-full bg-[#000002] text-white flex flex-col z-50 md:hidden">
					<Menu.Item key="1">
						<Link to="/User/Home">
							<span
								className={`${pathname == "Home" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 active:text-blue-400`}
							>
								Dashboard
							</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/User/Markit">
							<span
								className={`${pathname == "Markit" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 active:text-blue-400`}
							>
								Mark-it
							</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/User/ReqLeave">
							<span
								className={`${pathname == "ReqLeave" ? "text-blue-400" : "text-white"} hover:text-blue-400 bg-[#000002] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-md font-semibold me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 active:text-blue-400`}
							>
								Request Leave
							</span>
						</Link>
					</Menu.Item>
				</Menu>
			)}
		</Header>
	);
};

export default Navbar;
