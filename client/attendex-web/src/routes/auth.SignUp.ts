import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUp from "../pages/Auth/SignUp";
import { checkAuthStatus } from "../features/Auth";
export const Route = createFileRoute("/auth/SignUp")({
	component: SignUp,
	loader: async () => {
		if (await checkAuthStatus()) {
			throw redirect({
				to: "/user/Home",
			});
		}
	},
});
