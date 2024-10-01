/* eslint-disable react/no-unescaped-entities */
import ScrollReveal from "./ScrollReveal";
import Spline from "@splinetool/react-spline";
const WhoWeAre = () => {
  return (
    <div className="flex justify-center text-center w-screen lg:p-10">
      <div className="lg:w-1/2">
        <ScrollReveal className="md:text-3xl dark:text-gray-200">
          <span className="text-red-600 font-bold">We are</span> a Uttar
          Pradesh-based travel agency with a passion for crafting memorable
          journeys across India. Our expertise shines through in the successful
          trips we have designed to breathtaking destinations such as Kashmir,
          Jaipur, and Varanasi. We are proud to be associated with Gupta Tour
          and Travel, a reputable travel agency based in Sharanpur. Together, we
          aim to cover all corners of India, offering unique travel experiences
          tailored to our clients' desires.
        </ScrollReveal>
      </div>
      <div className="w-1/2 flex flex-wrap justify-center hidden lg:block">
        <div className="w-[80%] m-10">
          <Spline
            className="rounded-xl bg-black"
            scene="https://prod.spline.design/STPBFMKgAGuHmjDE/scene.splinecode"
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
