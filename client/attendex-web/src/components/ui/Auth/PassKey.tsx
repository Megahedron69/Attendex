import type { FunctionComponent } from "react";
import { useNavigate } from "@tanstack/react-router";
const PassKey: FunctionComponent = () => {
	const navigate = useNavigate();
	const onLoggedIn = () => {
		navigate({ to: "/auth/SignUp" });
	};
	const onSignUp = () => {
		navigate({ to: "/auth/SignUp" });
	};
	return (
		<div
			className="Auth"
			style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
		>
			<h1>passkey auth</h1>
		</div>
	);
};

export default PassKey;
