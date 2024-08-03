import { FileSyncOutlined, EditFilled } from "@ant-design/icons";
import type { FC } from "react";
import { Button } from "antd";
import LeaveForm from "./LeaveForm";
import CustomCalendar from "./CustomCalendar";
import LatestLeaves from "./LatestLeaves";
import LeavesInfo from "./LeavesInfo";

export const LeavesCalendar: FC = () => {
	return (
		<div className="flex flex-col lg:flex-row bg-slate-200">
			<div className="flex flex-col lg:flex-row justify-start items-start m-4 lg:m-10 p-4 lg:p-7 bg-white shadow-lg shadow-black rounded-lg lg:w-2/3 drop-shadow-lg">
				{/* Main Leave Request Section */}
				<div className="flex flex-col w-full">
					{/* Header */}
					<div className="flex flex-row items-center justify-between w-full mb-5">
						<div className="flex flex-row items-center">
							<FileSyncOutlined className="mr-2 text-xl" />
							<h2 className="text-xl font-bold">Leave Request</h2>
						</div>
						<div className="flex flex-row items-center">
							<span className="font-semibold text-sm mr-1">22</span>
							<span className="text-sm text-gray-500">
								PTO leaves remaining
							</span>
						</div>
					</div>
					{/* Form and Calendar */}
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4">
						<div className="flex flex-col w-full lg:w-1/2 mb-4 lg:mb-0">
							<LeaveForm />
						</div>
						<div className="flex flex-col w-full lg:w-1/2">
							<CustomCalendar />
						</div>
					</div>
					{/* Submit Button */}
					<div className="flex justify-end items-center mt-5">
						<Button
							className="bg-transparent text-blue-400 rounded-xl border-none outline-none mr-2 text-base"
							icon={<EditFilled />}
						>
							Save As Draft
						</Button>
						<Button className="bg-blue-400 text-white rounded-xl text-base">
							Submit
						</Button>
					</div>
				</div>
			</div>
			{/* Side Information Section */}
			<div className="flex flex-col w-full lg:w-1/3 m-4 lg:mt-2 lg:ml-4 p-4 lg:p-7">
				<div className="bg-white shadow-lg shadow-black drop-shadow-lg rounded-lg w-full mb-5 h-[400px] lg:h-[600px] overflow-hidden overflow-y-auto">
					<LatestLeaves />
				</div>
				<div className="bg-white shadow-lg shadow-black drop-shadow-lg rounded-lg w-full h-auto">
					<LeavesInfo />
				</div>
			</div>
		</div>
	);
};

export default LeavesCalendar;
