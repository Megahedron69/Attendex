import { createFileRoute } from "@tanstack/react-router";
import AdminAuth from "../../components/ui/Auth/AdminAuth";

export const Route = createFileRoute("/Auth/AdminAuth")({
	component: AdminAuth,
});
