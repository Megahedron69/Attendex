/* eslint-disable @typescript-eslint/no-misused-promises */
import { Card, Avatar } from "antd";

import type { FC } from "react";
import { cardData } from "../../../../store/Constants";
import { useRouter } from "@tanstack/react-router";

const Dashmain: FC = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2">
			<div className="flex flex-col mt-5 justify-start lg:mr-16">
				<h1 className="text-5xl font-bold text-white">Morning, Pristia</h1>
				<p className="text-gray-400 mt-1 text-md">
					Track your attendance here!
				</p>
				<div className="mt-16 rounded-3xl flex flex-col sm:flex-row justify-between items-center p-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800">
					<div className="mb-4 sm:mb-0 sm:mr-4">
						<span className="font-bold text-2xl text-black">
							Mark attendance
						</span>
					</div>
					<div>
						<button
							onClick={() => router.navigate({ to: "/User/Markit" })}
							className="text-white bg-slate-900 font-medium rounded-2xl text-md px-8 py-2.5 text-center"
						>
							Mark-it
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row mt-12 justify-evenly items-center w-full lg:w-auto">
				{cardData.map((card, index) => {
					const IconComponent = card.IconComponent;
					const PercentageChangeIconComponent =
						card.PercentageChangeIconComponent;

					return (
						<Card
							key={index}
							className="bg-[#2a2a2b] text-white border-0 rounded-3xl shadow-lg shadow-gray-700 drop-shadow-2xl mb-6 lg:mb-0 lg:mr-8"
							style={{
								padding: "25px",
								width: "100%",
								maxWidth: "280px",
								height: "275px",
							}}
							hoverable
						>
							<div className="flex items-center mb-4">
								<Avatar
									size="large"
									className="bg-[#3e3e3f]"
									icon={<IconComponent />}
								/>
								<div className="ml-4">
									<p className="text-gray-400">{card.title}</p>
								</div>
							</div>
							<div className="text-4xl font-bold">{card.count}</div>
							<div
								className={`flex items-center ${card.percentageChangeColor} mt-2`}
							>
								<PercentageChangeIconComponent />
								<span className="ml-1">{card.percentage}</span>
							</div>
							<p className="text-gray-400 mt-2">{card.changeText}</p>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default Dashmain;
