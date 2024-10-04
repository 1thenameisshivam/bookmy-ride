import Destination from "../components/Destination";
import FeaturedTrips from "../components/LandingPage/FeaturedTrips";
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Testimonials from "../components/LandingPage/Testimonials";
import WhoWeAre from "../components/LandingPage/WhoWeAre";

const LandingPage = () => {
  return (
    <div className="">
      <div className="">
        <Hero />
      </div>
      <div className="">
        <FeaturedTrips />
      </div>
      <div className="mb-10 ">
        <Destination />
      </div>
      <div className="">
        <WhoWeAre />
      </div>
      <div className="">
        <HowItWorks />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
};

export default LandingPage;
