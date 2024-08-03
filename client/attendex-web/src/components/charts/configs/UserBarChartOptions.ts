import type { ApexOptions } from "apexcharts";
export const Baroptions: ApexOptions = {
	chart: {
		type: "bar",
		height: 350,
	},
	title: {
		text: "Attendance Bifurication",
	},
	xaxis: {
		categories: ["Attendance", "Abscences", "Approved Leaves"],
	},
};
