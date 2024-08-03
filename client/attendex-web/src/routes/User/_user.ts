import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
import MainLayout from "../../components/ui/User/Layout/MainLayout";

export const Route = createFileRoute("/User/_user")({
	beforeLoad: async ({ location }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/Auth/SignIn",
				search: {
					redirect: location.href,
				},
			});
		}
		const isAdminUser = await isAdmin();
		if (isAdminUser) {
			throw redirect({
				to: "/Admin/Home",
			});
		}
	},
	component: MainLayout,
});
