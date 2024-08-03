import { type FC, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { InfoCircleFilled } from "@ant-design/icons";
import { Progress, Carousel, message } from "antd";
import { userLocnStore } from "../../../../store/UserLocation";
import "../../../../styles/UserStyles/user.css";

import bgImage1 from "../../../../assets/images/User/UserBg/stacked-waves-haikei.svg";
import bgImage2 from "../../../../assets/images/User/UserBg/blob-scene-haikei.svg";
import bgImage3 from "../../../../assets/images/User/UserBg/stacked-peaks-haikei.svg";
import bgImage4 from "../../../../assets/images/User/UserBg/stacked-steps-haikei.svg";
import nfcIcon from "../../../../assets/images/User/nf.png";
import mapIcon from "../../../../assets/images/User/MAP.png";
import biometricIcon from "../../../../assets/images/User/boy-front-color.png";
import qrIcon from "../../../../assets/images/User/qr.png";

const methods = [
	{
		name: "NFC",
		icon: nfcIcon,
		background: bgImage1,
		reliability: 100,
		easiness: 65,
		description: `
      Tap your NFC card on a reader for quick and secure attendance logging.
      Requires compatible NFC cards and readers.
    `,
	},
	{
		name: "Geolocation",
		icon: mapIcon,
		background: bgImage2,
		reliability: 80,
		easiness: 95,
		description: `
      Logs attendance based on your current location.
      May be less accurate in areas with poor GPS reception.
    `,
	},
	{
		name: "Biometric",
		icon: biometricIcon,
		background: bgImage3,
		reliability: 80,
		easiness: 75,
		description: `
      Uses your fingerprint, face ID, or other biometric data for secure attendance.
      Requires a compatible device and may have setup requirements.
    `,
	},
	{
		name: "QR Code",
		icon: qrIcon,
		background: bgImage4,
		reliability: 70,
		easiness: 95,
		description: `
      Scan a unique QR code using your device's camera to log attendance.
      Requires a QR code scanner app and may be less secure than other methods.
    `,
	},
];

const MethodCard: FC<{ method: (typeof methods)[0] }> = ({ method }) => {
	const { long, lat, methodName, updateUserLocn, resetMethod } =
		userLocnStore();
	const [flipHorizontally, setFlip] = useState<boolean>(true);
	const isSelected = methodName === method.name;

	useEffect(() => {
		if (isSelected) {
			setFlip(false);
		} else {
			setFlip(true);
		}
	}, [isSelected]);

	return (
		<div
			className="cursor-pointer w-fit h-fit"
			onClick={() => {
				setFlip(!flipHorizontally);
				if (isSelected) {
					resetMethod();
				} else {
					updateUserLocn(long, lat, method.name);
				}
			}}
		>
			<Tilt
				flipHorizontally={flipHorizontally}
				perspective={900}
				scale={1.1}
				glareEnable={true}
				glareMaxOpacity={0.5}
				glareColor="#ffffffff"
				glarePosition="all"
				glareBorderRadius="20px"
				className={`flex flex-col w-[500px] h-[500px] bg-white shadow-lg drop-shadow-2xl shadow-black rounded-xl p-10 ${isSelected ? "pulse-border shadow-[gold]" : ""}`}
				style={{
					transformStyle: "preserve-3d",
					backgroundImage: `url(${method.background})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<div
					className="flex justify-end items-center drop-shadow-2xl"
					style={{
						transform: "translateZ(80px) scale(0.9)",
					}}
				>
					<InfoCircleFilled
						color="blue"
						className="text-blue-400 text-xl cursor-pointer drop-shadow-2xl animate-pulse"
						style={{
							transform: "translateZ(60px) scale(1.2)",
							textShadow: "0 0 10px rgba(0, 0, 255, 0.7)",
						}}
					/>
				</div>
				{flipHorizontally ? (
					<div
						className="flex justify-center items-center w-full h-full drop-shadow-2xl"
						style={{
							transform: "translateZ(160px)",
						}}
					>
						<img
							src={method.icon}
							className="w-64 h-64 drop-shadow-2xl transition-shadow rounded-[10px]"
						/>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center w-full h-full drop-shadow-2xl space-y-6">
						<h1
							className="text-center text-2xl font-bold text-white"
							style={{
								transform: "translateZ(80px)",
								borderRadius: "10px",
								padding: "20px",
								textShadow:
									"0 2px 15px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.6)",
							}}
						>
							{method.name}
						</h1>
						<p
							className="text-center text-xl font-semibold text-white"
							style={{
								transform: "translateZ(60px)",
								borderRadius: "10px",
								padding: "10px 20px",
								textShadow:
									"0 2px 15px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.6)",
							}}
						>
							{method.description}
						</p>
						<div
							className="w-full"
							style={{
								transform: "translateZ(40px)",
							}}
						>
							<div className="mb-6">
								<span
									className="text-lg font-bold text-white"
									style={{
										textShadow:
											"0 0 10px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 0, 0, 0.6)",
									}}
								>
									Method Reliability
								</span>
								<Progress
									percent={method.reliability}
									status="active"
									showInfo={true}
									size={[400, 24]}
									strokeColor={{
										"0%": "#00ff99",
										"100%": "#33ccff",
									}}
									className="rounded-lg drop-shadow-2xl"
									style={{
										boxShadow:
											"0 0 20px rgba(0, 255, 153, 0.7), 0 0 15px rgba(51, 204, 255, 0.7)",
									}}
								/>
							</div>
							<div>
								<span
									className="text-lg font-bold text-white"
									style={{
										textShadow:
											"0 0 10px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 0, 0, 0.6)",
									}}
								>
									Method Easiness
								</span>
								<Progress
									percent={method.easiness}
									status="active"
									showInfo={true}
									size={[400, 24]}
									strokeColor={{
										"0%": "#ffcc33",
										"100%": "#ff6699",
									}}
									className="rounded-lg drop-shadow-2xl"
									style={{
										boxShadow:
											"0 0 20px rgba(255, 204, 51, 0.7), 0 0 15px rgba(255, 102, 153, 0.7)",
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</Tilt>
		</div>
	);
};

const MarkitMethCarousel: FC = () => {
	const { methodName } = userLocnStore();
	const isMethodSelected = methodName !== "";
	useEffect(() => {
		void message.info(
			"Click on a card to choose a method for recording attendance",
			5
		);
	}, []);
	return (
		<Carousel
			className="bg-transparent w-[700px] flex justify-center caro"
			arrows={true}
			swipe
			pauseOnFocus
			swipeToSlide
			draggable
			dots={false}
			speed={1000}
			autoplay={!isMethodSelected}
			infinite={!isMethodSelected}
			effect="scrollx"
			easing="cubic-bezier(0.85, 0, 0.15, 1)"
			waitForAnimate
		>
			{methods.map((method, index) => (
				<div
					key={index}
					className="flex flex-col justify-center items-center bg-transparent w-[600px] h-[600px] p-12 m-12"
				>
					<MethodCard method={method} />
				</div>
			))}
		</Carousel>
	);
};

export default MarkitMethCarousel;
