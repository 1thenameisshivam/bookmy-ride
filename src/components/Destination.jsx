/* eslint-disable react/no-unescaped-entities */
import TiltedCover from "./TiltedCover";
import AnimatedGradientText from "./AnimatedGradientText";
const Destination = () => {
  return (
    <>
      <AnimatedGradientText className="text-5xl font-mono text-center mb-10">
        Popular Destinations we cover
      </AnimatedGradientText>
      <div className="flex w-full flex-wrap items-center justify-center">
        <TiltedCover
          image={{
            alt: "Statue of Liberty",
            src: "https://plus.unsplash.com/premium_vector-1689096845649-80579c8bb9ce?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          }}
        >
          <div className="p-2 text-white">
            <div className="mb-2 text-sm font-semibold text-foreground/80">
              Khatushyam, Jaipur:
            </div>
            <p className="leading-2 text-sm text-muted-foreground">
              Visit the sacred temple of Khatushyam in Rajasthan, known for its
              spiritual significance and the devotion of Lord Shyam's followers.
            </p>
          </div>
        </TiltedCover>

        <TiltedCover
          direction="right"
          tiltCover={false}
          cover={
            <div className="p-2 text-sm text-blue-500">
              <div>
                Explore some of the most exciting destinations we proudly serve!
              </div>
            </div>
          }
        >
          <div className="p-2 text-white">
            <div className="mb-2 text-sm font-semibold text-foreground/80">
              popular destinations
            </div>
            <p className="leading-2 text-sm text-muted-foreground">
              Whether you're seeking adventure, relaxation, or cultural
              experiences, we offer rides to a wide range of popular spots
              across the city and beyond.
            </p>
          </div>
        </TiltedCover>

        <TiltedCover
          direction="right"
          image={{
            alt: "Work desk",
            src: "https://plus.unsplash.com/premium_vector-1709299689737-3bddaa02fa7e?bg=FFFFFF&q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3",
          }}
        >
          <div className="p-2 text-white">
            <div className="mb-2 text-sm font-semibold text-foreground/80">
              Vaishno Devi, Kashmir:
            </div>
            <p className="leading-2 text-sm text-muted-foreground">
              Embark on a spiritual journey to the revered Vaishno Devi shrine
              nestled in the breathtaking mountains of Jammu and Kashmir.
            </p>
          </div>
        </TiltedCover>
      </div>
    </>
  );
};

export default Destination;
