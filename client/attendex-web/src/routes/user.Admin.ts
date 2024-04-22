import { createFileRoute, redirect } from "@tanstack/react-router";
import AdminHome from "../pages/Home/admin/AdminHome";
import { checkAuthStatus } from "../features/Auth";
export const Route = createFileRoute("/user/Admin")({
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
	},
	component: AdminHome,
});
