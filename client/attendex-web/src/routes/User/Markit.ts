import { createFileRoute, redirect } from "@tanstack/react-router";
import UserMarkit from "../../pages/Home/user/UserMarkit";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
export const Route = createFileRoute("/User/Markit")({
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
				to: "/Admin/Home",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: UserMarkit,
});
