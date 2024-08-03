/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FC, useState, useEffect } from "react";
import { message, Steps } from "antd";
import {
	SlidersTwoTone,
	SmileTwoTone,
	IdcardTwoTone,
	EnvironmentTwoTone,
} from "@ant-design/icons";
import { Permissions, DoneCard } from "./MarkitPermissions";
import { userLocnStore } from "../../../../store/UserLocation";
import MarkitMethCarousel from "./MarkitMeth";
import MarkitMethFnCont from "./MarkitMethFn";
const steps = [
	{
		title: "Grant Permission",
		content: (
			<div className="flex justify-center items-center">
				<Permissions />
			</div>
		),
		icon: <EnvironmentTwoTone />,
	},
	{
		title: "Choose Method",
		content: (
			<div className="flex justify-center items-center">
				<MarkitMethCarousel />
			</div>
		),
		icon: <SlidersTwoTone />,
	},
	{
		title: "Log Attendance",
		content: (
			<div className="flex justify-center items-center">
				<MarkitMethFnCont />
			</div>
		),
		icon: <IdcardTwoTone />,
	},
	{
		title: "Done",
		content: (
			<div className="flex justify-center items-center">
				<DoneCard />
			</div>
		),
		icon: <SmileTwoTone />,
	},
];

const MarkitSteps: FC = () => {
	const { lat, long, methodName } = userLocnStore();
	const [current, setCurrent] = useState(0);
	const [canProceed, setCanProceed] = useState(false);

	useEffect(() => {
		if (current === 0) {
			setCanProceed(!!lat && !!long);
		} else if (current === 1) {
			setCanProceed(!!methodName);
		} else {
			setCanProceed(true);
		}
	}, [current, lat, long, methodName]);

	const next = () => {
		if (current === 1 && !methodName) {
			message.error("Please choose a method");
			return;
		}
		setCurrent(current + 1);
	};

	const previous = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
		icon: item.icon,
	}));

	const contentStyle: React.CSSProperties = {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	};

	const stepsContainerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
	};

	return (
		<div className="flex flex-col justify-evenly">
			<div className="flex flex-row" style={stepsContainerStyle}>
				<Steps current={current} items={items} direction="vertical" />
				<div style={contentStyle}>
					{steps[current] && (
						<div style={contentStyle}>{steps[current].content}</div>
					)}
				</div>
			</div>
			<div style={{ marginTop: 24 }}>
				{current < steps.length - 1 && (
					<button
						className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-semibold rounded-xl text-base px-6 py-3 text-center me-2 mb-2"
						onClick={next}
						disabled={!canProceed}
					>
						Next
					</button>
				)}
				{current === steps.length - 1 && (
					<button
						className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-semibold rounded-xl text-base px-6 py-3 text-center me-2 mb-2"
						onClick={() => message.success("Processing complete!")}
					>
						Done
					</button>
				)}
				{current > 0 && (
					<button
						className="shadow-lg shadow-black font-semibold rounded-xl text-base px-6 py-3 text-center me-2 mb-2"
						style={{ margin: "0 8px" }}
						onClick={previous}
					>
						Previous
					</button>
				)}
			</div>
		</div>
	);
};

export default MarkitSteps;
