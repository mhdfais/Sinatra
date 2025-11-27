import homeHero from "../assets/sinatra-home-hero.jpg";
import sinatraLogo from "../assets/sinatra-logo.png";
import lionIcon from "../assets/sinatra-lion-icon.png";
import rock from "../assets/sinatra-ocean-rock.png";
import ContactForm from "../components/ContactForm";
import Footers from "../components/Footers";
import OurApproach from "../components/OurApproach";

const Home = () => {
  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden">
        {/* BACKGROUND IMAGE - full cover */}
        <div className="absolute inset-0 hero-bg"></div>

        {/* ROCK PNG — placed exactly on the real rock */}
        <img
          src={rock}
          className="
      absolute 
      w-[38vw]                /* size proportional to screen */
      left-1/2 
      top-[46%]               /* adjust this to match rock */
      -translate-x-[28%]      /* slide to left slightly */
      -translate-y-[20%]      /* align vertically */
      z-20
      pointer-events-none
    "
        />

        {/* LION ICON — behind the rock */}
        <img
          src={lionIcon}
          className="
      absolute 
      w-[9vw] 
      left-1/2 
      top-[34%]              /* sits behind rock */
      -translate-x-1/2
      z-10                    /* lion BEHIND the rock */
      opacity-100
    "
        />

        {/* NAVBAR */}
        <nav
          className="
    absolute top-0 left-0 w-full py-6
    animate-slide-down opacity-0 animate-delay-1000
  "
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
            <img src={sinatraLogo} className="h-10" />
            <ul className="flex gap-10 text-black text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Companies</li>
              <li>Contact</li>
            </ul>
          </div>
        </nav>

        {/* TEXT CONTENT */}
        <div className="relative z-30 h-full flex items-end px-16 pb-16">
          <h1 className="text-black text-6xl font-bold">
            Building
            <br />
            The Future
          </h1>

          <div className="ml-auto max-w-md">
            <p className="text-black text-sm">
              Sinatra Holding is where foresight and ideas come into play…
            </p>
          </div>
        </div>
      </section>

      {/* <OurApproach/> */}
      <ContactForm />
      <Footers/>
    </>
  );
};

export default Home;
