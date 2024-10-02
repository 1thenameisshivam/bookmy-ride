import Destination from "../components/Destination";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Logo from "../components/Logo";
import NumberCount from "../components/NumberCount";
import WhoWeAre from "../components/WhoWeAre";
const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="p-5">
        <Logo />
      </div>
      <div className="mt-10 lg:scale-150 lg:mb-24">
        <Hero />
      </div>
      <div className="lg:mt-32">
        <WhoWeAre />
      </div>
      <div>
        <Destination />
      </div>
      <div className="mt-20">
        <Features />
      </div>
      <div className="flex justify-center">
        <NumberCount />
      </div>
    </div>
  );
};

export default LandingPage;
