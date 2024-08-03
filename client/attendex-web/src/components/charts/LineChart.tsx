import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import type { FC } from "react";
const LineChart: FC = function () {
	const { Title, Paragraph } = Typography;

	return (
		<>
			<div className="linechart">
				<div>
					<Title level={5}>Attendance vs Absence</Title>
					<Paragraph className="lastweek">
						change than last week <span className="bnb2">+30%</span>
					</Paragraph>
				</div>
				<div className="sales">
					<ul>
						<li>{<MinusOutlined />} Absence</li>
						<li>{<MinusOutlined />} Attendance</li>
					</ul>
				</div>
			</div>

			<ReactApexChart
				className="full-width"
				options={lineChart.options}
				series={lineChart.series}
				type="area"
				height={350}
				width={"100%"}
			/>
		</>
	);
};

export default LineChart;
