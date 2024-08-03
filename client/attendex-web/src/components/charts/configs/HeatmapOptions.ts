import type { ApexOptions } from "apexcharts";
const Hoptions: ApexOptions = {
	chart: {
		type: "heatmap",
		height: 350,
	},
	dataLabels: {
		enabled: false,
	},
	colors: [
		"#9fa1a3",
		"#f87171",
		"#60a5fa",
		"#93c5fd",
		"#3b82f6",
		"#1e40af",
		"#2563eb",
	], // muted gray, red, green
	xaxis: {
		categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yaxis: {
		title: {
			text: "Weeks",
		},
	},
	plotOptions: {
		heatmap: {
			radius: 24,
			colorScale: {
				ranges: [
					{
						from: 0,
						to: 0,
						color: "#9fa1a3",
						name: "Holiday",
					},
					{
						from: 1,
						to: 1,
						color: "#f87171",
						name: "Absent",
					},
					{
						from: 2,
						to: 2,
						color: "#60a5fa",
						name: "Present",
					},
					{
						from: 3,
						to: 3,
						color: "#93c5fd",
						name: "UPL",
					},
					{
						from: 4,
						to: 4,
						color: "#3b82f6",
						name: "PL",
					},
					{
						from: 5,
						to: 5,
						color: "#1e40af",
						name: "SL",
					},
					{
						from: 6,
						to: 6,
						color: "#2563eb",
						name: "ML",
					},
				],
			},
		},
	},
};
export default Hoptions;
