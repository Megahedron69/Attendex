/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ApexOptions } from "apexcharts";
export const goptions: ApexOptions = {
	chart: {
		type: "area",
		height: 350,
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "monotoneCubic",
	},
	grid: {
		show: false, // Remove grid lines
	},
	xaxis: {
		categories: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		labels: {
			style: {
				colors: "grey",
				fontWeight: 800,
				fontSize: "12px",
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: "grey",
				fontWeight: 800,
				fontSize: "12px",
			},
		},
	},
	tooltip: {
		theme: "dark", // Set the theme to dark
		style: {
			fontSize: "12px",
		},
		y: {
			formatter: function (value: number) {
				return `${value}%`;
			},
		},
		marker: {
			show: true,
		},
		x: {
			show: true,
			formatter: (value) => `July ${value}`,
		},
	},
	fill: {
		opacity: 0.3,
		type: "pattern", // Use pattern fill for crossed lines
		pattern: {
			style: "verticalLines", // Choose pattern style
			width: 6,
			height: 6,
			strokeWidth: 2,
		},
	},
	markers: {
		size: 5,
		colors: ["#a4c400"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7,
		},
	},
};
