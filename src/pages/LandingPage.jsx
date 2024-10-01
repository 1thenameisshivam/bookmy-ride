import Hero from "../components/Hero";
import Logo from "../components/Logo";
const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="p-5">
        <Logo />
      </div>
      <div className="mt-10 lg:scale-150 mb-24">
        <Hero />
      </div>
      <p className="text-white bg-white">jfghj</p>
    </div>
  );
};

export default LandingPage;
