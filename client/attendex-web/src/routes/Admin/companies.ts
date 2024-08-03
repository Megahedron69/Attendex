import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
import Companies from "../../pages/Home/admin/Companies";

export const Route = createFileRoute("/Admin/companies")({
	beforeLoad: async ({ location }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/auth/SignIn",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
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
	component: Companies,
});
