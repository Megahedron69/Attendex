import type { FunctionComponent } from "../common/types";
import Header from "../components/ui/LandingPage/header";
import LandingPage from "./LandingPage";
import Footer from "../components/ui/LandingPage/footer";
export const Home = (): FunctionComponent => {
	return (
		<div className="font-inter antialiased bg-white text-gray-900 tracking-tight">
			<div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
				<Header />
				<LandingPage />
				<Footer />
			</div>
		</div>
	);
};
