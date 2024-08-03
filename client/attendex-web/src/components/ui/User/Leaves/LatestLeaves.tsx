/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { FC } from "react";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";
import { Tag, Divider, Empty, List } from "antd";

const LatestLeaves: FC = () => {
	const leaves = [
		{
			type: "Unpaid leave (UPL)",
			startDate: "26.08.2021",
			endDate: "27.08.2021",
			days: "1 day",
			status: "Pending",
		},
		{
			type: "Paid Time Off (PTO)",
			startDate: "10.07.2021",
			endDate: "20.07.2021",
			days: "10 days",
			status: "Pending",
		},
		{
			type: "Unpaid leave (UPL)",
			startDate: "05.04.2021",
			endDate: "06.04.2021",
			days: "1 day",
			status: "Rejected",
		},
		{
			type: "Maternity leave (ML)",
			startDate: "05.07.2021",
			endDate: "03.09.2021",
			days: "60 days",
			status: "Approved",
		},
		{
			type: "Sick leave (SL)",
			startDate: "10.07.2021",
			endDate: "20.07.2021",
			days: "10 days",
			status: "Pending",
		},
	];

	const getStatusTag = (status: string) => {
		switch (status) {
			case "Pending": {
				return (
					<Tag color="warning" icon={<ClockCircleOutlined />}>
						Pending
					</Tag>
				);
			}
			case "Approved": {
				return (
					<Tag color="success" icon={<CheckCircleOutlined />}>
						Approved
					</Tag>
				);
			}
			case "Rejected": {
				return (
					<Tag color="error" icon={<CloseCircleOutlined />}>
						Rejected
					</Tag>
				);
			}
			default: {
				return null;
			}
		}
	};

	return (
		<div className="p-7 ">
			<h3 className="text-xl font-bold mb-4 flex items-center">
				<span className="mr-2">🌞</span> My latest leaves
			</h3>
			{leaves.length > 0 ? (
				<List
					itemLayout="vertical"
					dataSource={leaves}
					renderItem={(leave) => (
						<List.Item key={leave.startDate}>
							<div className="flex flex-col mb-4">
								<div className="flex justify-between items-center">
									<span className="font-bold justify-start">{leave.type}</span>
									<span className="justify-end items-center">
										{getStatusTag(leave.status)}
									</span>
								</div>
								<div className="flex justify-between items-center text-sm text-gray-500 text-nowrap">
									<span>{leave.startDate}</span>
									<div className="flex flex-row justify-center items-center">
										<Divider className="flex-grow mx-2" dashed />
										<span>{leave.days}</span>
										<Divider className="flex-grow mx-2" dashed />
									</div>
									<span>{leave.endDate}</span>
								</div>
							</div>
						</List.Item>
					)}
				/>
			) : (
				<Empty />
			)}
		</div>
	);
};

export default LatestLeaves;
