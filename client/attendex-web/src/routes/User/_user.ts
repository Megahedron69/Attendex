import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	checkAuthStatus,
	isAdmin,
	mfaStat,
	signOut,
} from "../../features/Auth";
import MainLayout from "../../components/ui/User/Layout/MainLayout";

export const Route = createFileRoute("/User/_user")({
	beforeLoad: async ({ location, navigate }) => {
		if (!(await checkAuthStatus())) {
			throw redirect({
				to: "/Auth/SignIn",
				search: {
					redirect: location.href,
				},
			});
		}
		const isAdminUser = await isAdmin();
		if (isAdminUser) {
			throw redirect({
				to: "/Admin/Home",
			});
		}
		const mfaStatus = await mfaStat();
		if (!mfaStatus) {
			await signOut(navigate);
			throw redirect({
				to: "/403", // Route to your 403 error page
			});
		}
	},
	component: MainLayout,
});
