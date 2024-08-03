import type { FC } from "react";
import { userLocnStore } from "../../../../store/UserLocation";
const MarkitMethFnCont: FC = () => {
	const { long, lat, methodName } = userLocnStore();
	return (
		<div className="flex flex-col justify-center items-center  w-full h-full">
			<div className="flex flex-row bg-white p-7 drop-shadow-lg shadow-sm shadow-black items-center justify-between w-full h-auto rounded-md">
				<div className="flex flex-row justify-start items-center">
					<span className="text-muted text-base font-semibold mr-2">
						Longitude:{" "}
					</span>
					<span className="text-green-400 text-base font-semibold mr-2">
						{long}
					</span>
					<span className="text-muted text-base font-semibold mr-2">
						Latitude:{" "}
					</span>
					<span className="text-green-400 text-base font-semibold">{lat}</span>
				</div>
				<div className="flex flex-row justify-end items-center">
					<span className="text-muted text-base font-semibold mr-2">
						Method Name:{" "}
					</span>
					<span className="text-blue-400 text-base font-semibold">
						{methodName}
					</span>
				</div>
			</div>
		</div>
	);
};
export default MarkitMethFnCont;
