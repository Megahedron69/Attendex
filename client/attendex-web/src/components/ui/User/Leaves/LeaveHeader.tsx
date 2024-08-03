import type { FC } from "react";
import { Divider } from "antd";

export const LeaveHeader: FC = () => {
	return (
		<div className="flex flex-col md:flex-row justify-evenly items-center bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl mx-6 my-10 p-2 drop-shadow-xl">
			<div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0">
				<div>
					<h2 className="text-5xl leading-relaxed font-bold text-blue-400 mr-1">
						26
					</h2>
				</div>
				<div className="ml-1 font-semibold flex flex-col text-white">
					<span>Available Leaves</span>
					<span>this year</span>
				</div>
			</div>
			<div className="hidden md:block">
				<Divider className="text-5xl bg-blue-400" type="vertical" />
			</div>
			<div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0">
				<div>
					<h2 className="text-5xl leading-relaxed font-bold text-blue-400 mr-1">
						0
					</h2>
				</div>
				<div className="ml-1 font-semibold flex flex-col text-white">
					<span>Leaves</span>
					<span>used this year</span>
				</div>
			</div>
			<div className="hidden md:block">
				<Divider className="text-5xl bg-blue-400" type="vertical" />
			</div>
			<div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0">
				<div>
					<h2 className="text-5xl leading-relaxed font-bold text-blue-400 mr-1">
						2
					</h2>
				</div>
				<div className="ml-1 font-semibold flex flex-col text-white">
					<span>Overdue Leaves</span>
					<span>to use before 31st March</span>
				</div>
			</div>
			<div className="hidden md:block">
				<Divider className="text-5xl text-blue-400" type="vertical" />
			</div>
		</div>
	);
};
