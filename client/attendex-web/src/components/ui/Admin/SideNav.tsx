/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Menu, Button } from "antd";
import { Link, useLocation } from "@tanstack/react-router";
import {
	TeamOutlined,
	FileTextOutlined,
	MessageFilled,
} from "@ant-design/icons";
import logo from "../../../assets/images/logo.png";

interface SidenavProps {
	color: string;
}

const Sidenav: React.FC<SidenavProps> = ({ color }) => {
	const pathname = useLocation();
	const page = pathname.pathname.replace("admin/", "") || "";

	const Home = [
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			key={0}
			fill={color}
		>
			<path
				d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
				fill={color}
			></path>
			<path
				d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
				fill={color}
			></path>
			<path
				d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
				fill={color}
			></path>
		</svg>,
	];

	const employees = [
		<TeamOutlined className="h-24 w-24 justify-center" color={color} />,
	];

	const companies = [
		<svg
			fill="none"
			height="20"
			width="20"
			key={0}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			className="justify-center"
		>
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				{" "}
				<path d="M17 15H19V17H17V15Z" fill={color}></path>{" "}
				<path d="M19 11H17V13H19V11Z" fill={color}></path>{" "}
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M13 7H23V21H1V3H13V7ZM8 5H11V7H8V5ZM11 19V17H8V19H11ZM11 15V13H8V15H11ZM11 11V9H8V11H11ZM21 19V9H13V11H15V13H13V15H15V17H13V19H21ZM3 19V17H6V19H3ZM3 15H6V13H3V15ZM6 11V9H3V11H6ZM3 7H6V5H3V7Z"
					fill={color}
				></path>{" "}
			</g>
		</svg>,
	];

	const logs = [
		<FileTextOutlined className="justify-center w-24 h-24" color={color} />,
	];

	const profile = [
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			key={0}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
				fill={color}
			></path>
		</svg>,
	];

	return (
		<>
			<div className="brand flex flex-row items-center ">
				<img src={logo} alt="" className="mr-2" />
				<span className="font-bold text-lg">Attendex</span>
			</div>
			<hr />
			<Menu theme="light" mode="inline">
				<Menu.Item key="1">
					<Link to="/Admin/Home">
						<span
							className="icon"
							style={{
								backgroundColor: page === "Home" ? color : "",
							}}
						>
							{Home}
						</span>
						<span className="label">Dashboard</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/Admin/employees">
						<span
							className="icon"
							style={{
								background: page === "/Admin/employees" ? color : "",
							}}
						>
							{employees}
						</span>
						<span className="label">Employees</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="3">
					<Link to="/Admin/companies">
						<span
							className="icon"
							style={{
								background: page === "companies" ? color : "",
							}}
						>
							{companies}
						</span>
						<span className="label">Companies</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="4">
					<Link to="/Admin/logs">
						<span
							className="icon"
							style={{
								background: page === "logs" ? color : "",
							}}
						>
							{logs}
						</span>
						<span className="label">Logs</span>
					</Link>
				</Menu.Item>
				<Menu.Item className="menu-item-header" key="5">
					Account Pages
				</Menu.Item>
				<Menu.Item key="6">
					<Link to="/Admin/profile">
						<span
							className="icon"
							style={{
								background: page === "profile" ? color : "",
							}}
						>
							{profile}
						</span>
						<span className="label">Profile</span>
					</Link>
				</Menu.Item>
			</Menu>
			<div className="aside-footer">
				<div
					className="footer-box"
					style={{
						background: color,
					}}
				>
					<span className="icon" style={{ color }}>
						{Home}
					</span>
					<h6>Need Help?</h6>
					<p className="mb-2">Contact us</p>
					<Button
						type="primary"
						className="ant-btn-sm ant-btn-block mt-4 flex flex-row justify-center items-center"
						iconPosition="end"
					>
						<h6 style={{ color: color, marginRight: "8px", fontSize: "16px" }}>
							Support
						</h6>
						<MessageFilled
							className="aligin-center flex items-center justify-center self-center mt-1"
							style={{ color: color, fontSize: "16px" }}
						/>
					</Button>
				</div>
			</div>
		</>
	);
};

export default Sidenav;
