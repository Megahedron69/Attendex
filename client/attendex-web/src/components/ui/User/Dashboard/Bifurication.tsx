import type { FC } from "react";
import { Space } from "antd";

const EmployeeStatus: FC = () => {
	const statuses = [
		{ color: "bg-blue-600", label: "Present", count: 49 },
		{ color: "bg-blue-400", label: "Absent", count: 32 },
		{ color: "bg-blue-200", label: "Holiday", count: 40 },
	];

	return (
		<div className="p-4">
			{statuses.map((status, index) => (
				<div key={index} className="flex items-center justify-between my-2">
					<Space>
						<span
							className={`inline-block w-3 h-3 rounded-full ${status.color}`}
						></span>
						<span>{status.label}</span>
					</Space>
					<span className="font-semibold">{status.count}</span>
				</div>
			))}
		</div>
	);
};

export default EmployeeStatus;
