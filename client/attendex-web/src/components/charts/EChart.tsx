/* eslint-disable unicorn/prevent-abbreviations */
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/Echart";
import type { FC } from "react";

const EChart: FC = function () {
	const { Title, Paragraph } = Typography;

	const items = [
		{
			Title: "3.6K",
			user: "Users",
		},
		{
			Title: "500",
			user: "Companies",
		},
		{
			Title: "10.3k",
			user: "Attendances",
		},
		{
			Title: "82",
			user: "Leave Requests",
		},
	];

	return (
		<>
			<div id="chart">
				<ReactApexChart
					className="bar-chart"
					options={eChart.options}
					series={eChart.series}
					type="bar"
					height={220}
				/>
			</div>
			<div className="chart-vistior">
				<Title level={5}>Attendance records</Title>
				<Paragraph className="lastweek">
					than last week <span className="bnb2">+30%</span>
				</Paragraph>
				<Paragraph className="lastweek">
					We offer a variety of tools to help you seamlessly track and manage
					attendance, ensuring accurate and efficient records.
				</Paragraph>
				<Row gutter={[6, 6]}>
					{items.map((v, index) => (
						<Col xs={6} xl={6} sm={6} md={6} key={index}>
							<div className="chart-visitor-count">
								<Title level={4}>{v.Title}</Title>
								<span>{v.user}</span>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default EChart;
