import {
	UsergroupAddOutlined,
	UsergroupDeleteOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
} from "@ant-design/icons";

export const cardData = [
	{
		title: "Employee Attendance",
		count: 58,
		percentage: "15.3%",
		IconComponent: UsergroupAddOutlined,
		PercentageChangeIconComponent: ArrowUpOutlined,
		percentageChangeColor: "text-green-500",
		changeText: "Increased vs last month",
	},
	{
		title: "Employee Absences",
		count: 34,
		percentage: "15.3%",
		IconComponent: UsergroupDeleteOutlined,
		PercentageChangeIconComponent: ArrowDownOutlined,
		percentageChangeColor: "text-red-500",
		changeText: "Decreased vs last month",
	},
	{
		title: "Approved Leaves",
		count: 58,
		percentage: "15.3%",
		IconComponent: ArrowUpOutlined,
		PercentageChangeIconComponent: ArrowUpOutlined,
		percentageChangeColor: "text-green-500",
		changeText: "Increased vs last month",
	},
];
