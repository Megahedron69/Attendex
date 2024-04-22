import { createFileRoute } from "@tanstack/react-router";
import ForgotPass from "../components/ui/Auth/ForgotPass";

export const Route = createFileRoute("/auth/ForgotPassword")({
	component: ForgotPass,
});
