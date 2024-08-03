import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUp from "../../pages/Auth/SignUp";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
export const Route = createFileRoute("/Auth/SignUp")({
	component: SignUp,
	loader: async () => {
		if (await checkAuthStatus()) {
			const isAdminUser = await isAdmin();
			throw redirect({
				to: isAdminUser ? "/Admin/Home" : "/User/Home",
			});
		}
	},
});
