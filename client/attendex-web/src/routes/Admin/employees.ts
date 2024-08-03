import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
import Employees from "../../pages/Home/admin/Companies";

export const Route = createFileRoute("/Admin/employees")({
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
				to: "/403", // Route to your 403 error page
			});
		}
	},
	component: Employees,
});
