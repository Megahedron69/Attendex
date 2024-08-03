import type { FC } from "react";
import MainLayout from "../../../components/ui/User/Layout/MainLayout";
import MarkitHeader from "../../../components/ui/User/Markit/MarkitHeader";
import MarkitCard from "../../../components/ui/User/Markit/MarkitCard";
const UserMarkit: FC = () => {
	return (
		<div className="bg-slate-200">
			<MainLayout>
				<MarkitHeader />
				<div className="m-5">
					<MarkitCard />
				</div>
			</MainLayout>
		</div>
	);
};
export default UserMarkit;
