import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserHome } from "../../pages/Home/user/UserHome";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
export const Route = createFileRoute("/User/Home")({
	beforeLoad: async ({ location }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/Auth/SignIn",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href,
				},
			});
		} else if (await isAdmin()) {
			throw redirect({
				to: "/Admin/Home",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href,
				},
			});
		}
	},
	component: UserHome,
});
