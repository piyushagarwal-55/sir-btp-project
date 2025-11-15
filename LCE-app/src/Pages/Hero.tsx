import { Button } from "../components/ui/button";
import "../styles/runningGlow.css";

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row h-[70vh] w-full">
      {/* Left Content */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 md:px-12">
        <div className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
          Transforming{" "}
          <span className="text-blue-500 drop-shadow-[0_0_6px_rgba(0,0,255,0.3)]">
            early-stage ideas
          </span>{" "}
          into{" "}
          <span className="text-orange-600 drop-shadow-[0_0_6px_rgba(255,165,0,0.3)]">
            success
          </span>
        </div>
        <div className="mt-4 font-semibold text-sm sm:text-base md:text-lg text-muted-foreground font-poppins">
          We provide comprehensive support to early-stage ideas, startups and
          entrepreneurs through our diverse and impactful ecosystem.
        </div>
        <div className="mt-6">
          <Button
            variant="secondary"
            className="font-poppins font-semibold animated-border text-white text-sm sm:text-base md:text-lg px-4 py-2 md:px-6 md:py-3"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex items-center justify-center w-1/2">
        <div className="rounded-lg overflow-hidden w-4/5 h-4/5 bg-gray-200">
          <img
            src="/api/placeholder/600/400"
            alt="Business growth concept"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
