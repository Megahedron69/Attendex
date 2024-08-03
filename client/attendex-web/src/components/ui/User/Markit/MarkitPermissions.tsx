/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FC, useState, useEffect } from "react";
import { Button, message } from "antd";
import {
	LoadingOutlined,
	ExclamationCircleOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons";
import Lottie from "lottie-react";
import map from "../../../../assets/Lotties/eslintrc.json";
import done from "../../../../assets/Lotties/tick.json";
import { userLocnStore } from "../../../../store/UserLocation";

const Permissions: FC = () => {
	const { lat, long, updateUserLocn } = userLocnStore();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const requestLocation = () => {
		setLoading(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					updateUserLocn(longitude, latitude, null);
					setError(null);
					setLoading(false);
				},
				(error_) => {
					setError(error_.message);
					setLoading(false);
				},
				{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
			);
		} else {
			setError("Geolocation is not supported by this browser.");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			message.error("Providing location permission is mandatory");
		} else if (lat !== 0 && long !== 0) {
			message.success("Location permission already granted");
		}
	}, [error, lat, long]);

	return (
		<div className="flex flex-col items-center justify-center h-auto">
			<Lottie animationData={map} loop={true} />
			<Button
				onClick={requestLocation}
				className={`w-full mt-4 rounded-full text-white ${
					loading
						? "bg-blue-400"
						: error
							? "bg-red-400"
							: lat !== 0 && long !== 0
								? "bg-green-400"
								: "bg-blue-400"
				}`}
				icon={
					loading ? (
						<LoadingOutlined />
					) : error ? (
						<ExclamationCircleOutlined />
					) : lat !== 0 && long !== 0 ? (
						<CheckCircleOutlined />
					) : null
				}
				disabled={lat !== 0 && long !== 0}
			>
				{loading
					? "Requesting Location..."
					: error
						? "Location Permission Denied"
						: lat !== 0 && long !== 0
							? "Location Permission Granted"
							: "Request Location Permission"}
			</Button>
		</div>
	);
};

const DoneCard: FC = () => {
	useEffect(() => {
		message.success("Your attendance has been marked");
	}, []);
	return (
		<div>
			<Lottie animationData={done} autoPlay loop />
		</div>
	);
};

export { Permissions, DoneCard };
