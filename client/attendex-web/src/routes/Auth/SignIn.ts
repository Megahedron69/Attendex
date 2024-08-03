import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "../../pages/Auth/SignIn";
import { checkAuthStatus, isAdmin } from "../../features/Auth";

export const Route = createFileRoute("/Auth/SignIn")({
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
	component: SignIn,
});
