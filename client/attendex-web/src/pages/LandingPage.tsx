import type { FC } from "react";
import Hero from "../components/ui/LandingPage/hero";
import Features from "../components/ui/LandingPage/features";
import FeaturesBlocks from "../components/ui/LandingPage/features-blocks";
import Testimonials from "../components/ui/LandingPage/testimonials";
import Newsletter from "../components/ui/LandingPage/newsletter";

const LandingPage: FC = () => {
	return (
		<div className="">
			<Hero />
			<Features />
			<FeaturesBlocks />
			<Testimonials />
			<Newsletter />
		</div>
	);
};

export default LandingPage;
