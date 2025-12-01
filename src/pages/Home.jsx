import homeHero from "../assets/sinatra-home-hero.jpg";
import sinatraLogo from "../assets/sinatra-logo.png";
import lionIcon from "../assets/sinatra-lion-icon.png";
import rock from "../assets/sinatra-ocean-rock.png";
import ContactForm from "../components/ContactForm";
import Footers from "../components/Footers";
import OurApproach from "../components/OurApproach";
import { useNavigate } from "react-router-dom";
import HomeHero from "../components/HomeHero";
import DesertSection from "../components/DesertSection";
import ForestSection from "../components/ForestSection";
import MountainSection from "../components/MountainSection";
import JourneySection from "../components/JourneySection";
import NewsInsights from "../components/NewsInsights";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <HomeHero />
      <DesertSection />
      <ForestSection />
      <MountainSection />
      <JourneySection />
      <NewsInsights />
      <OurApproach />
      <ContactForm />
      <Footers />
    </>
  );
};

export default Home;
