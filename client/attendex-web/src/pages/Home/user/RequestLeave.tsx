import type { FC } from "react";
import MainLayout from "../../../components/ui/User/Layout/MainLayout";
import { LeaveHeader } from "../../../components/ui/User/Leaves/LeaveHeader";
import { LeavesCalendar } from "../../../components/ui/User/Leaves/LeavesCalendar";

const RequestLeave: FC = () => {
	return (
		<div className="bg-slate-200">
			<MainLayout>
				<div className="flex flex-col">
					<div
						className="bg-[#000002] ml-5 mr-5 p-5 -mt-2 rounded-b-2xl"
						style={{ width: "99%" }}
					>
						<LeaveHeader />
					</div>
					<div>
						<LeavesCalendar />
					</div>
				</div>
			</MainLayout>
		</div>
	);
};
export default RequestLeave;
