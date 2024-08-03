import {
	CalendarTwoTone,
	ClockCircleTwoTone,
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	CloseCircleOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip, List } from "antd";
import { type FC, useState, useEffect, type JSX } from "react";

const getStatusTag = (status: string): JSX.Element | null => {
	switch (status) {
		case "Recorded": {
			return (
				<Tag
					className="rounded-xl p-1 font-bold"
					color="success"
					icon={<CheckCircleOutlined />}
				>
					Attendance Recorded
				</Tag>
			);
		}
		case "Closing-Soon": {
			return (
				<Tag
					className="rounded-xl p-1 font-bold"
					color="warning"
					icon={<ExclamationCircleOutlined />}
				>
					Window Closing Soon{" "}
				</Tag>
			);
		}
		case "Closed": {
			return (
				<Tag
					className="rounded-xl p-1 font-bold"
					color="error"
					icon={<CloseCircleOutlined />}
				>
					Window Closed
				</Tag>
			);
		}
		default: {
			return (
				<Tag
					className="rounded-xl p-1 font-bold"
					icon={<SyncOutlined spin />}
					color="processing"
				>
					Attendance not recorded
				</Tag>
			);
		}
	}
};

const TooltipContent: FC = () => (
	<List
		className="flex flex-col items-center justify-start"
		dataSource={[
			{ tag: getStatusTag(""), description: "Attendance window is open" },
			{
				tag: getStatusTag("Recorded"),
				description: "Attendance has been recorded",
			},
			{
				tag: getStatusTag("Closing-Soon"),
				description: "Attendance recording window closing in 30 mins",
			},
			{
				tag: getStatusTag("Closed"),
				description: "Attendance recording window has closed",
			},
		]}
		renderItem={(item) => (
			<List.Item>
				<span>{item.tag}</span>:
				<br />
				<span className="text-black text-xs">{item.description}</span>
			</List.Item>
		)}
	/>
);

const MarkitHeader: FC = () => {
	const [time, setTime] = useState<string>(
		new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
	);
	const [date] = useState<string>(new Date().toDateString());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(
				new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="flex flex-col">
			<div
				className="bg-[#000002] h-10 ml-5 mr-5 p-5 rounded-b-xl drop-shadow-2xl shadow-lg"
				style={{ width: "99%" }}
			></div>
			<div className="flex flex-row mt-10">
				<div
					className="bg-white p-10 shadow-lg drop-shadow-xl shadow-black border-black rounded-2xl ml-5 mr-5 flex flex-row justify-between items-center z-10"
					style={{ width: "99%" }}
				>
					<div className="flex justify-start text-base font-semibold items-center">
						<CalendarTwoTone className="text-lg" />
						<span className="ml-2 mr-4">{date}</span>
						<ClockCircleTwoTone className="text-lg" />
						<span className="ml-2">{time}</span>
					</div>
					<div className="flex flex-row justify-end text-base font-bold items-center">
						<span className="mr-4">Attendance Status:</span>
						<Tooltip
							title={<TooltipContent />}
							autoAdjustOverflow
							color={"white"}
							className="drop-shadow-lg cursor-pointer"
						>
							<span>{getStatusTag("")}</span>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarkitHeader;
