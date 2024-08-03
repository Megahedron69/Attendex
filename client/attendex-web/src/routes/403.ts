import { createFileRoute } from "@tanstack/react-router";
import Error403Page from "../pages/Error/FourOfThreeError";
export const Route = createFileRoute("/403")({
	component: Error403Page,
});
