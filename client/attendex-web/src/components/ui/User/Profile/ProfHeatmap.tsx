/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FC } from "react";
import { Card } from "antd";
import "../../../../styles/UserStyles/user.css";
import HeatMap from "@uiw/react-heat-map";

const value = [
	{ date: "2024/07/01", count: 1, type: "present" },
	{ date: "2024/07/02", count: 2, type: "UPL" },
	{ date: "2024/07/03", count: 3, type: "PL" },
	{ date: "2024/07/04", count: 4, type: "SL" },
	{ date: "2024/07/05", count: 5, type: "ML" },
	{ date: "2024/07/06", count: 6, type: "holiday" },
	{ date: "2024/07/21", count: 7, type: "holiday" },
];

const ProfHeatmap: FC = () => {
	type ColorType =
		| "present"
		| "UPL"
		| "PL"
		| "SL"
		| "ML"
		| "absent"
		| "holiday";

	const colors: Record<ColorType, string> = {
		present: "#60a5fa", // bg-blue-400 for present
		UPL: "#93c5fd", // light blue for UPL leave
		PL: "#3b82f6", // blue for PL leave
		SL: "#1e40af", // dark blue for SL leave
		ML: "#2563eb", // medium blue for ML leave
		absent: "#f87171", // red for absent
		holiday: "#9fa1a3", // for public holidays and weekends
	};

	return (
		<div className="heatmap-container p-4 overflow-x-auto">
			<Card
				bordered={false}
				className="header-solid shadow-lg drop-shadow-lg shadow-black rounded-xl w-full"
				title={
					<>
						<h6 className="font-semibold text-lg">Yearly Attendance Heatmap</h6>
					</>
				}
			>
				<HeatMap
					value={value}
					width={"100%"}
					height={250}
					startDate={new Date("2024-07-01")} // Start from the correct Monday in July 2023
					rectSize={25}
					legendCellSize={0}
					space={5}
					rectProps={{
						rx: 5,
					}}
					panelColors={{
						1: colors.present,
						2: colors.UPL,
						3: colors.PL,
						4: colors.SL,
						5: colors.ML,
						6: colors.absent,
						7: colors.holiday,
					}}
				/>
				<div className="mt-4">
					<h6 className="font-semibold text-lg">Legend</h6>
					<div className="flex flex-wrap gap-4 mt-2">
						{(Object.keys(colors) as Array<ColorType>).map((type) => (
							<div key={type} className="flex items-center">
								<div
									className="w-4 h-4 rounded-sm mr-2"
									style={{ backgroundColor: colors[type] }}
								></div>
								<span className="text-sm capitalize">{type}</span>
							</div>
						))}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProfHeatmap;
