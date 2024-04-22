/* eslint-disable no-duplicate-imports */
import type React from "react";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { userRoleStore } from "../../../store/UserRole";
const MyTurnstileComponent: React.FC = () => {
	const { role, updateUserRole } = userRoleStore();
	const [windowSize, setWindowSize] = useState<{
		width: number;
		height: number;
	}>({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [captchaToken, setCaptchaToken] = useState<string>("");
	console.log(captchaToken);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const size: "compact" | "normal" =
		windowSize.width <= 390 && windowSize.height <= 884 ? "compact" : "normal";

	return (
		<Turnstile
			siteKey={
				String(import.meta.env["VITE_APP_ENVIRONMENT"]) === "development"
					? "1x00000000000000000000AA"
					: String(import.meta.env["VITE_TURNSTILE_KEY"])
			}
			onSuccess={(token: string) => {
				String(import.meta.env["VITE_APP_ENVIRONMENT"]) === "development"
					? "1x0000000000000000000000000000000AA"
					: setCaptchaToken(token);
				updateUserRole({ rolez: role.rolez, userTok: token });
			}}
			options={{
				theme: "light",
				size: size,
			}}
			className="rounded-md"
		/>
	);
};

export default MyTurnstileComponent;
