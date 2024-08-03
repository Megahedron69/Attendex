/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-duplicate-imports */
import type { FunctionComponent, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useRouterState, Outlet } from "@tanstack/react-router";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./SideNav";
import Header from "./Header";
import Footer from "./Footer";
import "../../../styles/AdminStyles/main.css";
import "../../../styles/AdminStyles/responsive.css";

const { Header: AntHeader, Content, Sider } = Layout;
interface MainProps {
	children: React.ReactNode;
}
const Main: FunctionComponent<MainProps> = function ({ children }) {
	const [visible, setVisible] = useState(false);
	const [placement, setPlacement] = useState("right");
	const [sidenavColor, setSidenavColor] = useState("#1890ff");
	const [sidenavType, setSidenavType] = useState("transparent");
	const [fixed, setFixed] = useState(false);

	const openDrawer = () => {
		setVisible(!visible);
	};
	const handleSidenavType = (type: SetStateAction<string>) => {
		setSidenavType(type);
	};
	const handleSidenavColor = (color: SetStateAction<string>) => {
		setSidenavColor(color);
	};
	const handleFixedNavbar = (
		type: boolean | ((previousState: boolean) => boolean)
	) => {
		setFixed(type);
	};

	const router = useRouterState();
	const pathe = router.location.pathname;
	const pathname = pathe.replace("/Admin/", "") || "";

	useEffect(() => {
		if (pathname === "rtl") {
			setPlacement("left");
		} else {
			setPlacement("right");
		}
	}, [pathname]);

	return (
		<Layout
			className={`layout-dashboard ${
				pathname === "profile" ? "layout-profile" : ""
			} ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
		>
			<Drawer
				title={false}
				placement={placement === "right" ? "left" : "right"}
				closable={false}
				onClose={() => {
					setVisible(false);
				}}
				open={visible}
				key={placement === "right" ? "left" : "right"}
				width={250}
				className={`drawer-sidebar ${
					pathname === "rtl" ? "drawer-sidebar-rtl" : ""
				} `}
			>
				<Layout
					className={`layout-dashboard ${
						pathname === "rtl" ? "layout-dashboard-rtl" : ""
					}`}
				>
					<Sider
						trigger={null}
						width={250}
						theme="light"
						className={`sider-primary ant-layout-sider-primary ${
							sidenavType === "#fff" ? "active-route" : ""
						}`}
						style={{ background: sidenavType }}
					>
						<Sidenav color={sidenavColor} />
					</Sider>
				</Layout>
			</Drawer>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
				trigger={null}
				width={250}
				theme="light"
				className={`sider-primary ant-layout-sider-primary ${
					sidenavType === "#fff" ? "active-route" : ""
				}`}
				style={{ background: sidenavType }}
			>
				<Sidenav color={sidenavColor} />
			</Sider>
			<Layout>
				{fixed ? (
					<Affix>
						<AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
							<Header
								onPress={openDrawer}
								name={pathname}
								subName={pathname}
								handleSidenavColor={handleSidenavColor}
								handleSidenavType={handleSidenavType}
								handleFixedNavbar={handleFixedNavbar}
								placement={undefined}
							/>
						</AntHeader>
					</Affix>
				) : (
					<AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
						<Header
							onPress={openDrawer}
							name={pathname}
							subName={pathname}
							handleSidenavColor={handleSidenavColor}
							handleSidenavType={handleSidenavType}
							handleFixedNavbar={handleFixedNavbar}
							placement={undefined}
						/>
					</AntHeader>
				)}
				<Content className="content-ant">{children}</Content>
				<Footer />
			</Layout>
		</Layout>
	);
};

export default Main;
