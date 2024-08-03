/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ReactApexChart from "react-apexcharts";
import { goptions } from "../configs/UserLineChart";
import type { FC } from "react";
const UserLineChart: FC = () => {
	const series = [
		{
			data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 135, 140, 150],
		},
	];

	return (
		<div className="app">
			<div className="row">
				<div className="mixed-chart">
					<ReactApexChart
						options={goptions}
						series={series}
						type="area"
						height={350}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserLineChart;
