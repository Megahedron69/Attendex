/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import ReactApexChart from "react-apexcharts";
import Hoptions from "../configs/HeatmapOptions";

const Heatmap: FC = () => {
	const series = [
		{
			name: "Week 1",
			data: [1, 1, 2, 2, 2, 0, 0],
		},
		{
			name: "Week 2",
			data: [3, 2, 2, 2, 1, 0, 0],
		},
		{
			name: "Week 3",
			data: [2, 2, 1, 2, 6, 0, 0],
		},
		{
			name: "Week 4",
			data: [6, 2, 4, 2, 5, 0, 0],
		},
	];

	return (
		<div>
			<ReactApexChart
				options={Hoptions}
				series={series as any}
				type="heatmap"
				height={350}
			/>
		</div>
	);
};

export default Heatmap;
