import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "../pages/Auth/SignIn";
import { checkAuthStatus } from "../features/Auth";

export const Route = createFileRoute("/auth/SignIn")({
	beforeLoad: async ({ location }) => {
		if (await checkAuthStatus()) {
			throw redirect({
				to: "/user/Home",
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
