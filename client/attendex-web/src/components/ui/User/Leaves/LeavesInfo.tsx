import type { FC } from "react";
import { Alert } from "antd";

const LeaveInfo: FC = () => {
	return (
		<div className="p-4 md:p-7">
			<Alert
				message="Leave Types"
				description={
					<ul className="list-disc list-inside text-sm text-gray-700">
						<li>Paid Time Off (PTO)</li>
						<li>Sick Leave (SL)</li>
						<li>Maternity Leave (ML)</li>
						<li>Unpaid Leave (UPL)</li>
					</ul>
				}
				type="info"
				showIcon
				className="bg-white shadow-lg shadow-black rounded-lg p-4 md:p-7"
			/>
		</div>
	);
};

export default LeaveInfo;
