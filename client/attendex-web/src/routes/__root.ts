import { createRootRoute } from "@tanstack/react-router";
import FourOfour from "../pages/Error/FourOfour";
import ServerError from "../pages/Error/ServerError";
import Loader from "../pages/Miscellaneous/Loader";

export const Route = createRootRoute({
	notFoundComponent: FourOfour,
	errorComponent: ServerError,
	pendingComponent: Loader,
});
