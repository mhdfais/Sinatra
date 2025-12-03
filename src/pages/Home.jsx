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
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
 



  return (
    <>
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
    </>
  );
};

export default Home;
