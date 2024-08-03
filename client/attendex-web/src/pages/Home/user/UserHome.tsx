import type { FunctionComponent } from "react";
import DashDown from "../../../components/ui/User/Dashboard/DashDown";
import Dashmain from "../../../components/ui/User/Dashboard/Dashmain";
import MainLayout from "../../../components/ui/User/Layout/MainLayout";
export const UserHome: FunctionComponent = () => {
	return (
		<div className="bg-slate-200">
			<MainLayout>
				<div
					className="bg-[#000002] rounded-b-2xl m-5 -mt-1 p-6 flex flex-col justify-center shadow-lg drop-shadow-2xl shadow-black"
					style={{ width: "99%" }}
				>
					<Dashmain />
				</div>
				<div>
					<DashDown />
				</div>
			</MainLayout>
		</div>
	);
};
