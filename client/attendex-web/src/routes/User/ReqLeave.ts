/* eslint-disable unicorn/prevent-abbreviations */
import { createFileRoute, redirect } from "@tanstack/react-router";
import RequestLeave from "../../pages/Home/user/RequestLeave";
import { checkAuthStatus, isAdmin } from "../../features/Auth";
export const Route = createFileRoute("/User/ReqLeave")({
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
	component: RequestLeave,
});
