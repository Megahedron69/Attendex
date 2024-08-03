import { createFileRoute } from "@tanstack/react-router";
import PassKey from "../../components/ui/Auth/PassKey";
export const Route = createFileRoute("/Auth/Passkey")({
	component: PassKey,
});
