import { useEffect, type FC } from "react";
import Hero from "../components/ui/LandingPage/hero";
import Features from "../components/ui/LandingPage/features";
import FeaturesBlocks from "../components/ui/LandingPage/features-blocks";
import Testimonials from "../components/ui/LandingPage/testimonials";
import Newsletter from "../components/ui/LandingPage/newsletter";

const LandingPage: FC = () => {
	return (
		<>
			<Hero />
			<Features />
			<FeaturesBlocks />
			<Testimonials />
			<Newsletter />
		</>
	);
};

export default LandingPage;
