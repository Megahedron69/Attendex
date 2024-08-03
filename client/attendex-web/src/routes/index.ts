import { createFileRoute, redirect } from "@tanstack/react-router";
import { Home } from "../pages/Home";
import { checkAuthStatus, isAdmin } from "../features/Auth";

export const Route = createFileRoute("/")({
	beforeLoad: async ({ location }) => {
		if (await checkAuthStatus()) {
			const isAdminUser = await isAdmin();
			throw redirect({
				to: isAdminUser ? "/Admin/Home" : "/User/Home",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href,
				},
			});
		}
	},
	component: Home,
});
