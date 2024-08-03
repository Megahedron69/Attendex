import type { FC } from "react";
import { Progress, Tooltip } from "antd";

const BarChart: FC = () => {
	const attendancePercent = 50; // Example percentage for attendance
	const absencePercent = 30; // Example percentage for absence
	const leavePercent = 20; // Example percentage for approved leaves

	return (
		<div style={{ position: "relative", width: "100%", height: "30px" }}>
			<Tooltip title={`Attendance: ${attendancePercent}%`}>
				<Progress
					percent={attendancePercent}
					strokeColor="rgb(37 99 235)"
					showInfo={false}
					style={{
						position: "absolute",
						width: "100%",
						zIndex: 3,
					}}
				/>
			</Tooltip>
			<Tooltip title={`Absence: ${absencePercent}%`}>
				<Progress
					percent={attendancePercent + absencePercent}
					strokeColor="rgb(96 165 250)"
					showInfo={false}
					trailColor="transparent"
					style={{
						position: "absolute",
						width: "100%",
						zIndex: 2,
					}}
				/>
			</Tooltip>
			<Tooltip title={`Approved Leaves: ${leavePercent}%`}>
				<Progress
					percent={attendancePercent + absencePercent + leavePercent}
					strokeColor="rgb(191 219 254)"
					showInfo={false}
					trailColor="transparent"
					style={{
						position: "absolute",
						width: "100%",
						zIndex: 1,
					}}
				/>
			</Tooltip>
		</div>
	);
};

export default BarChart;
