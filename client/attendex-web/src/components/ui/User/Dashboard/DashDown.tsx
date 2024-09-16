import type { FC } from "react";
import { Tag, Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import UserLineChart from "../../../charts/UserCharts/UserLineChart";
import Heatmap from "../../../charts/UserCharts/Heatmap";
import UserBarChart from "../../../charts/UserCharts/BarChart";
import EmployeeStatus from "./Bifurication";
const DashDown: FC = () => {
	return (
		<div className="flex flex-col lg:flex-row lg:justify-around lg:items-center p-4 space-y-4 lg:space-y-0 lg:space-x-4 bg-slate-200">
			<div
				className="rounded-xl bg-white shadow-lg shadow-black p-7 flex flex-col lg:mr-2 drop-shadow-lg"
				style={{ width: "100%", maxWidth: "550px", height: "450px" }}
			>
				<h2 className="font-semibold text-lg mb-3">Attendance Records</h2>
				<div className="flex flex-row justify-start items-center">
					<h3 className="font-extrabold text-lg mr-3">90.15%</h3>
					<Tag color="black" className="text-sm font-normal rounded-xl mr-3">
						<ArrowUpOutlined className="text-blue-400 font-bold" />
						<span className="text-blue-400 font-bold">5.3%</span>
					</Tag>
					<span className="text-muted text-sm">Increased vs last month</span>
				</div>
				<UserLineChart />
			</div>
			<div
				className="rounded-xl bg-white shadow-lg shadow-black p-7 flex flex-col lg:mr-2 drop-shadow-lg"
				style={{ width: "100%", maxWidth: "550px", height: "450px" }}
			>
				<h2 className="font-semibold text-lg self-start mb-2">
					Attendance Heatmap
				</h2>
				<Heatmap />
			</div>
			<div
				className="flex flex-col"
				style={{ width: "100%", maxWidth: "550px", height: "450px" }}
			>
				<div
					className="rounded-xl bg-white shadow-lg shadow-black drop-shadow-lg p-7 flex flex-col mb-2"
					style={{ width: "auto", height: "225px" }}
				>
					<h2 className="font-semibold text-lg">Attendance Bifurcation</h2>
					<div className="flex flex-row items-center justify-between">
						<h3 className="text-md font-base text-muted">Total Days</h3>
						<h2 className="text-lg font-medium text-black">123</h2>
					</div>
					<UserBarChart />
					<div>
						<EmployeeStatus />
					</div>
				</div>
				<div
					className="rounded-xl bg-white shadow-lg shadow-black p-7 flex flex-col justify-start items-center drop-shadow-lg"
					style={{ width: "auto", height: "225px" }}
				>
					<h2 className="font-semibold text-lg self-start mb-2">
						Request for a leave!
					</h2>
					<span className="text-muted font-semibold text-base mb-4 lg:visible">
						Click here to request for leaves and see the current status of
						pending requests
					</span>
					<Link to="/User/ReqLeave" style={{ all: "unset", width: "90%" }}>
						<Button
							block
							className="text-white bg-gradient-to-r text-center from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg font-semibold text-lg"
						>
							Request leave
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default DashDown;
