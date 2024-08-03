/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-duplicate-imports */
import { useState, useEffect } from "react";
import {
	Row,
	Col,
	Breadcrumb,
	Badge,
	Dropdown,
	Button,
	Input,
	Drawer,
	Typography,
	Switch,
	FloatButton,
	Menu,
} from "antd";
import {
	BellFilled,
	SearchOutlined,
	SettingFilled,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link, useRouter } from "@tanstack/react-router";
import styled from "styled-components";
import { signOut } from "../../../features/Auth";

const ButtonContainer = styled.div`
	.ant-btn-primary {
		background-color: #1890ff;
	}
	.ant-btn-success {
		background-color: #52c41a;
	}
	.ant-btn-yellow {
		background-color: #fadb14;
	}
	.ant-btn-black {
		background-color: #262626;
		color: #fff;
		border: 0px;
		border-radius: 5px;
	}
	.ant-switch-active {
		background-color: #1890ff;
	}
`;

const bell = [<BellFilled />];

const handleMenuClick: MenuProps["onClick"] = (event) => {
	console.log("click", event);
};

const items: MenuProps["items"] = [
	{
		label: "1st menu item",
		key: "1",
		icon: <UserOutlined />,
	},
	{
		label: "2nd menu item",
		key: "2",
		icon: <UserOutlined />,
	},
	{
		label: "3rd menu item",
		key: "3",
		icon: <UserOutlined />,
		danger: true,
	},
	{
		label: "4rd menu item",
		key: "4",
		icon: <UserOutlined />,
		danger: true,
		disabled: true,
	},
];

const menuProps = {
	items,
	onClick: handleMenuClick,
};

const logsetting = [<SettingFilled />];
const profile = [
	<svg
		width="20`"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		key={0}
		style={{ fontSize: "large" }}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
			fill="#111827"
		></path>
	</svg>,
];

const toggler = [
	<svg
		width="20"
		height="20"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		key={0}
	>
		<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
	</svg>,
];

const setting = [<SettingFilled className="w-auto h-auto" />];

interface ProfileItem {
	key: number;
	label: string;
	icon: React.ReactNode;
	linkTo: string;
}

// Define the type for the props
interface ProfilePropz {
	profileItems: Array<ProfileItem>;
	onClick: (event: any) => void;
}

// Define the handleProfileClick function
const handleProfileClick: ProfilePropz["onClick"] = (event) => {
	console.log("click", event);
};

// Define the profile items
const profileItems: ProfilePropz["profileItems"] = [
	{
		key: 1,
		label: "Profile",
		icon: <UserOutlined />,
		linkTo: "/Admin/profile",
	},
	{
		key: 2,
		label: "Sign Out",
		icon: <UserOutlined />,
		linkTo: "/signOut",
	},
];

// Create a menu from profileItems
const menuk = () => {
	const router = useRouter();
	return (
		<Menu onClick={handleProfileClick}>
			{profileItems.map((item) => (
				<Menu.Item
					key={item.key}
					icon={item.icon}
					onClick={async () => {
						if (item.key === 2) await signOut(router);
					}}
				>
					{item.label}
				</Menu.Item>
			))}
		</Menu>
	);
};

function Header({
	placement,
	name,
	subName,
	onPress,
	handleSidenavColor,
	handleSidenavType,
	handleFixedNavbar,
}: {
	placement: any;
	name: string;
	subName: string;
	onPress: any;
	handleSidenavColor: any;
	handleSidenavType: any;
	handleFixedNavbar: any;
}): JSX.Element {
	const { Title, Text } = Typography;

	const [visible, setVisible] = useState(false);
	const [sidenavType, setSidenavType] = useState("transparent");

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	const showDrawer = () => {
		setVisible(true);
	};
	const hideDrawer = () => {
		setVisible(false);
	};

	return (
		<>
			<FloatButton icon={setting} onClick={showDrawer} />
			<Row gutter={[24, 0]}>
				<Col span={24} md={6}>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/Admin/Home">admin</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{name.replace("admin/", "")}</Breadcrumb.Item>
					</Breadcrumb>
					<div className="ant-page-header-heading">
						<span
							className="ant-page-header-heading-title"
							style={{ textTransform: "capitalize" }}
						>
							{subName.replace("admin/", "")}
						</span>
					</div>
				</Col>
				<Col span={24} md={18} className="header-control">
					<Badge size="small" count={4}>
						<Dropdown menu={menuProps} placement="bottom">
							<a
								href="#pablo"
								className="ant-dropdown-link"
								onClick={(event) => {
									event.preventDefault();
								}}
							>
								{bell}
							</a>
						</Dropdown>
					</Badge>
					<Button type="link" onClick={showDrawer}>
						{logsetting}
					</Button>
					<Button
						type="link"
						className="sidebar-toggler"
						onClick={() => onPress()}
					>
						{toggler}
					</Button>
					<Drawer
						className="settings-drawer"
						mask={true}
						width={360}
						onClose={hideDrawer}
						placement={placement}
						open={visible}
					>
						<div>
							<div className="header-top">
								<Title level={4}>
									Configurator
									<Text className="subtitle">See our dashboard options.</Text>
								</Title>
							</div>

							<div className="sidebar-color">
								<Title level={5}>Sidebar Color</Title>
								<div className="theme-color mb-2">
									<ButtonContainer>
										<Button
											type="primary"
											onClick={() => handleSidenavColor("#1890ff")}
										>
											1
										</Button>
										<Button
											style={{ backgroundColor: "#52c41a" }}
											onClick={() => handleSidenavColor("#52c41a")}
										>
											1
										</Button>
										<Button
											style={{ backgroundColor: "#d9363e" }}
											onClick={() => handleSidenavColor("#d9363e")}
										>
											1
										</Button>
										<Button
											style={{ backgroundColor: "#fadb14" }}
											onClick={() => handleSidenavColor("#fadb14")}
										>
											1
										</Button>

										<Button
											style={{ backgroundColor: "black" }}
											onClick={() => handleSidenavColor("#111")}
										>
											1
										</Button>
									</ButtonContainer>
								</div>

								<div className="sidebarnav-color mb-2">
									<Title level={5}>Sidenav Type</Title>
									<Text>Choose between 2 different sidenav types.</Text>
									<ButtonContainer className="trans">
										<Button
											color={
												sidenavType === "transparent" ? "#1890ff" : "white"
											}
											onClick={() => {
												handleSidenavType("transparent");
												setSidenavType("transparent");
											}}
										>
											TRANSPARENT
										</Button>
										<Button
											color={sidenavType === "white" ? "#1890ff" : "white"}
											onClick={() => {
												handleSidenavType("#fff");
												setSidenavType("white");
											}}
										>
											WHITE
										</Button>
									</ButtonContainer>
								</div>
								<div className="fixed-nav mb-2">
									<Title level={5}>Navbar Fixed </Title>
									<Switch onChange={(event) => handleFixedNavbar(event)} />
								</div>
							</div>
						</div>
					</Drawer>
					<Dropdown overlay={menuk} placement="bottom">
						<a
							href="/Admin/Home"
							className="ant-dropdown-link"
							onClick={(event) => {
								event.preventDefault();
							}}
						>
							{profile}
						</a>
					</Dropdown>
					<Input
						className="header-search rounded-md"
						placeholder="Search Here..."
						prefix={<SearchOutlined />}
					/>
				</Col>
			</Row>
		</>
	);
}

export default Header;
