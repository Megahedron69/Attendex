import { createFileRoute, redirect } from "@tanstack/react-router";
import Profile from "../../pages/Home/Common/Profile";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
export const Route = createFileRoute("/User/Profile")({
	beforeLoad: async ({ location }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/Auth/SignIn",
				search: {
					redirect: location.href,
				},
			});
		} else if (await isAdmin()) {
			throw redirect({
				to: "/Admin/profile",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Profile,
});
