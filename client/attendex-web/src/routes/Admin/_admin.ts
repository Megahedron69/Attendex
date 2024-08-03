import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
import Main from "../../components/ui/Admin/Main";

export const Route = createFileRoute("/Admin/_admin")({
	beforeLoad: async ({ location }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/auth/SignIn",
				search: {
					redirect: location.href,
				},
			});
		}
		const isAdminUser = await isAdmin();
		if (!isAdminUser) {
			throw redirect({
				to: "/403",
			});
		}
	},
	component: Main,
});
