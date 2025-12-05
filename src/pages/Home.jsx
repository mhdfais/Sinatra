import homeHero from "../assets/sinatra-home-hero.jpg";
import sinatraLogo from "../assets/sinatra-logo.png";
import lionIcon from "../assets/sinatra-lion-icon.png";
import rock from "../assets/sinatra-ocean-rock.png";
import ContactForm from "../components/ContactForm";
import Footers from "../components/Footers";
import OurApproach from "../components/OurApproach";
import { useLocation, useNavigate } from "react-router-dom";
import HomeHero from "../components/HomeHero";
import DesertSection from "../components/DesertSection";
import ForestSection from "../components/ForestSection";
import MountainSection from "../components/MountainSection";
import JourneySection from "../components/JourneySection";
import NewsInsights from "../components/NewsInsights";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const Home = () => {
  const smootherRef = useRef(null);
  useEffect(() => {

    ScrollTrigger.defaults({
  wheelMultiplier: 0.5, 
  touchMultiplier: 0.5 
});
    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // inertia amount
      effects: true, // enables parallax
    });

    // Refresh ScrollTrigger after ScrollSmoother is created
    // This ensures all ScrollTrigger instances work properly with ScrollSmoother
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HomeHero />
          <DesertSection />

          <ForestSection />
          <div className="relative">
            <MountainSection />
            <JourneySection />
          </div>
          <NewsInsights />
          {/* <OurApproach /> */}
          <ContactForm />
          <Footers />
        </div>
      </div>
    </>
  );
};

export default Home;
