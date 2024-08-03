/* eslint-disable no-duplicate-imports */
import { useRouterState, Link } from "@tanstack/react-router";
import { Breadcrumb, Button, DatePicker } from "antd";
import { ExportOutlined, CalendarOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import type { FC } from "react";
import dayjs from "dayjs";

const Breads: FC = () => {
	const router = useRouterState();
	const pathe = router.location.pathname;
	const pathname = pathe.replace("/User/", "") || "";
	console.log(pathname);
	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<div className="flex flex-col md:flex-row justify-between items-center mt-20">
			<div className="flex justify-start items-center  md:mb-0">
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to="/User/Home">
							<span className="text-gray-500 font-bold text-md">Home /</span>
						</Link>
						<Link to={`/User/${pathname}`}>
							<span
								className={`text-gray-50 font-bold text-md capitalize ${
									pathname === "Home" ? "text-blue-400" : ""
								}`}
							>
								{pathname === "Home" ? "Dashboard" : pathname}
							</span>
						</Link>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div
				className={`${pathname === "Home" ? "visible" : "hidden"} flex flex-col md:flex-row items-center mr-6 space-y-4 md:space-y-0 md:space-x-4`}
			>
				<div className="relative inline-block">
					<DatePicker
						className="bg-[#0002] border-2 outline-2 border-[#2f2f31] text-white rounded-3xl px-4 py-2 hover:bg-[#0002] hover:border-2 hover:border-[#2f2f31] active:border-[#2f2f31]"
						onChange={onChange}
						picker="year"
						minDate={dayjs()}
						defaultValue={dayjs()}
						suffixIcon={
							<CalendarOutlined
								className="hover:bg-white"
								style={{ color: "white" }}
							/>
						}
						style={{ width: "150px" }}
					/>
				</div>
				<Button
					className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-xl font-bold text-lg focus:outline-none"
					size="small"
					icon={<ExportOutlined className="font-bold" />}
				>
					Export
				</Button>
			</div>
		</div>
	);
};

export default Breads;
