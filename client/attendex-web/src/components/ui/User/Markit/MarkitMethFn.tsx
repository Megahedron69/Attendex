/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC, useEffect, useState } from "react";
import { userLocnStore } from "../../../../store/UserLocation";
import {
	Tabs,
	Result,
	Button,
	Modal,
	Watermark,
	QRCode,
	type TabsProps,
	type ResultProps,
} from "antd";
import axios from "axios";
import compCover from "../../../../assets/images/User/UserMethods/CoverB.png";
import {
	CloseCircleOutlined,
	LoginOutlined,
	SyncOutlined,
} from "@ant-design/icons";

type FnProps = {
	inOffice: boolean;
	methodUsed: "app" | "web";
	attenMethod: string | null;
};
type USBDeviceInfo = {
	deviceId: number;
	vendorId: number;
	productId: number;
	productName?: string;
};

const Notif: FC<ResultProps> = ({ status, title, subTitle }) => {
	return (
		<div>
			<div>
				<Result status={status} title={title} subTitle={subTitle} />
			</div>
		</div>
	);
};

const NFCWebFn: FC<FnProps> = ({ inOffice, attenMethod, methodUsed }) => {
	const [devices, setDevices] = useState<Array<USBDeviceInfo>>([]);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (methodUsed === "web") {
			if (!navigator.usb) {
				setError("No device");
				return;
			}

			const getUSBDevices = async (): Promise<void> => {
				try {
					const usbDevices: Array<USBDeviceInfo> =
						await navigator.usb.getDevices();
					setDevices(usbDevices);

					usbDevices.forEach((device) => {
						console.log(
							`Device: ${device.productName}, Vendor ID: ${device.vendorId}, Product ID: ${device.productId}`
						);
					});

					const nfcVendorId = 0x12_34;
					const nfcProductId = 0x56_78;

					const nfcReader = usbDevices.find((device) => {
						return (
							device.vendorId === nfcVendorId &&
							device.productId === nfcProductId
						);
					});

					if (nfcReader) {
						console.log("NFC reader detected!");
					} else {
						setError("No device");
					}
				} catch {
					setError("Access Error");
				}
			};

			// Fetch connected USB devices
			getUSBDevices();
		}
	}, [methodUsed]);
	return <div className="w-full"></div>;
};

const geoWebFn: FC<FnProps> = ({ inOffice, attenMethod, methodUsed }) => {
	const [error, setError] = useState<string | null>();
};

const QrWebFn: FC<FnProps> = ({ inOffice, attenMethod, methodUsed }) => {
	const [error, setError] = useState<string | null>();
};

const WebFn: FC<FnProps> = ({ inOffice, methodUsed, attenMethod }) => {
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (!inOffice) {
			setError("Not in Office");
		}
	}, [inOffice]);
	switch (error) {
		case "No Device": {
			return (
				<Notif
					status="warning"
					title="NFC reader not detected or supported"
					subTitle="Either your device doesn't support NFC or a reader could not be detected"
				/>
			);
		}
		case "Not in Office": {
			return (
				<Notif
					status="error"
					title="User not in office"
					subTitle="You are not within a 100m radius of your office"
				/>
			);
		}
	}
	return (
		<div className="w-full">
			<div></div>
		</div>
	);
};

const AttApp: FC<FnProps> = ({ inOffice, methodUsed, attenMethod }) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [attendanceRecorded, setAttendanceRecorded] = useState<boolean>(false);
	console.log(loading, timeLeft, attendanceRecorded);
	if (!inOffice) {
		return (
			<div>
				<Notif
					status="error"
					title="User not in office"
					subTitle="You are not within a 100m radius of your office"
				/>
			</div>
		);
	}

	const checkAttendanceStatus = async (): Promise<boolean> => {
		try {
			const response = await axios.get(
				"https://dummyjson.com/c/aa0b-5443-44da-bc28"
			);
			return response.data.status;
		} catch {
			setError("DB error");
			return false;
		}
	};

	const startTimer = () => {
		setTimeLeft(120); // Start with 120 seconds (2 minutes)
		setLoading(true);
		setDisabled(true);
		setError(null);
		setAttendanceRecorded(false); // Reset attendance state

		// Polling the server every second
		const intervalId = setInterval(async () => {
			setTimeLeft((previousTime) => {
				if (previousTime === null || previousTime <= 1) {
					clearInterval(intervalId);
					return 0;
				}
				return previousTime - 1;
			});

			// Check attendance status
			const isAttendanceRecorded = await checkAttendanceStatus();

			// If attendance is recorded, stop the timer and mark attendance
			if (isAttendanceRecorded) {
				clearInterval(intervalId);
				setLoading(false);
				setAttendanceRecorded(true);
				setDisabled(true);
			}
		}, 1000); // Poll every 1 second

		// Set a timeout to stop checking after 2 minutes
		setTimeout(async () => {
			clearInterval(intervalId);
			const isAttendanceRecorded = await checkAttendanceStatus();
			if (!isAttendanceRecorded) {
				setLoading(false);
				setDisabled(true);
				setError("Choose other method");
			}
		}, 120_000); // 120 seconds = 2 minutes
	};

	return (
		<div className="w-full ">
			{error === "Access Error" && (
				<Notif
					status="error"
					title="Unable to read NFC card"
					subTitle="Either data is corrupted or something went wrong"
				/>
			)}
			{methodUsed === "app" && (
				<div>
					<div className="w-full h-full rounded-md ">
						<img src={compCover} loading="lazy" className="rounded-md" />
					</div>
					<div className="mt-5">
						<p className="text-sm font-semibold text-muted">
							First, log in to your companion app and navigate to the{" "}
							{attenMethod?.toUpperCase()} tab{" "}
							<span className="text-yellow-500">before clicking</span> the
							button below. Make sure to mark your attendance within{" "}
							<span className="text-red-400">2 minutes</span> after the timer
							starts.
						</p>
					</div>
					<div className="mt-5">
						<Button
							block
							size="large"
							loading={loading}
							disabled={disabled}
							icon={
								error ? (
									<CloseCircleOutlined />
								) : loading ? (
									<SyncOutlined spin />
								) : (
									<LoginOutlined />
								)
							}
							className="text-white bg-gradient-to-r text-center from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg font-semibold text-xl transition-all"
							style={{ backgroundColor: error ? "red" : "" }}
							onClick={startTimer}
						>
							{loading
								? timeLeft === null
									? "Marking Attendance..."
									: `Marking Attendance... (${timeLeft}s)`
								: attendanceRecorded
									? "Attendance Recorded"
									: error === "Choose other method"
										? "Choose other method"
										: "Mark Attendance"}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

const MarkitMethFnCont: FC = () => {
	const { long, lat, methodName } = userLocnStore();
	const [tab, setTab] = useState<string | null>();
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Companion App",
			children: (
				<AttApp inOffice={true} methodUsed={"app"} attenMethod={methodName} />
			),
		},
		{
			key: "2",
			label: "Web Service",
			children: (
				<WebFn inOffice={true} methodUsed={"web"} attenMethod={methodName} />
			),
		},
	];

	const onChange = (key: string): void => {
		setTab(key);
	};
	return (
		<div className="flex flex-col justify-center items-center  w-full h-full">
			<div className="flex flex-row bg-white p-7 drop-shadow-lg shadow-sm shadow-black items-center justify-between w-full h-auto rounded-md z-10">
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
			<div
				className="flex flex-row items-center justify-center w-full bg-white p-7 rounded-b-md "
				style={{
					boxShadow:
						"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
				}}
			>
				<Tabs
					defaultActiveKey="1"
					items={items}
					onChange={onChange}
					type="card"
				/>
			</div>
		</div>
	);
};
export default MarkitMethFnCont;
