import type { FC } from "react";
import MarkitSteps from "./MarkitSteps";

const MarkitCard: FC = () => {
	return (
		<div className="flex flex-col bg-white shadow-lg shadow-black drop-shadow-lg mr-3 ml-5 p-10 h-[900px] rounded-b-xl -z-10 -mt-10 mb-20">
			<div className="p-10">
				<MarkitSteps />
			</div>
		</div>
	);
};

export default MarkitCard;
