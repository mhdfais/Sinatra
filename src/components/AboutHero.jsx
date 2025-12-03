import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import bgStars from '../assets/sinatra-stars-bg.jpg'
import land from '../assets/sinatra-about-land.png'
import mountain from '../assets/sinatra-about-rock.png'
import toprock from '../assets/sinatra-about-toprock.png'
import logo2 from '../assets/sinatra-logo2.png'

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const landRef = useRef(null);
    const mountainRef = useRef(null);
    const topRockRef = useRef(null);
    const textRef = useRef(null);
    const navRef = useRef(null);
    const navigate = useNavigate();
    // const [active, setActive] = useState("about");
    const { pathname } = useLocation();

    useEffect(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      //  Background zoom out
      tl.fromTo(
        bgRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 1.5, ease: "power2.out" }
      );

      //  ROCKS + LAND MOVE DOWN slightly (all at once)
      tl.fromTo(
        [landRef.current, mountainRef.current, topRockRef.current],
        { y: 0 },
        { y: 175, duration: 1.5, ease: "power2.out" },
        "-=1.5"
      );

      // 3 TEXT RISES UP (opposite direction)
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 150 },
        { opacity: 1, y: -75, duration: 1.8, ease: "power2.out" },
        "-=1.4"
      );
      

      // 4 Navbar appears last
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      );



      
    }, []);

    useEffect(() => {
  const sectionEl = sectionRef.current;
  const landEl = landRef.current;
  const mountainEl = mountainRef.current;
  const topRockEl = topRockRef.current;
  const nextSection = document.querySelector("#essence-section");

  if (!sectionEl || !landEl || !mountainEl || !topRockEl) return;

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: "+=150%",   // slightly longer scroll
     scrub: 1, 
      pin: false, 
    },
  });

  // Mountains moving up
  scrollTl.to(
    [landEl, mountainEl, topRockEl],
    {
      y: -180,
      ease: "none",
    },
    0.8
  );

  // Make the next section move up with the mountains
  if (nextSection) {
    scrollTl.to(
      nextSection,
      {
        y: 0,    // same amount as mountains
        ease: "none",
      },
      0.5
    );
  }

  return () => {
    scrollTl.scrollTrigger?.kill();
    scrollTl.kill();
  };
}, []);


    return (
      <section
        ref={sectionRef}
        id="about-hero"
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/*  Background Stars */}
        <div
          ref={bgRef}
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgStars})` }}
        />

        {/*  LAND (bottom layer) */}
          <img
            ref={landRef}
            src={land}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-65 max-w-none z-10"
          />

          {/*  MAIN MOUNTAIN (middle layer) */}
          <img
            ref={mountainRef}
            src={mountain}
            className="absolute bottom-50 left-1/2 -translate-x-1/2 w-full h-45 object-cover max-w-none z-10"
          />

          {/*  TOP ROCK (front-most) */}
          <img
            ref={topRockRef}
            src={toprock}
            className="absolute bottom-27 left-1/2 -translate-x-1/2 h-85 w-full max-w-none z-10"
          />

        {/*  Navbar */}

        <nav
          ref={navRef}
          className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-5  text-white text-sm z-[40] opacity-0"
        >
          <img src={logo2} className="h-13" />

          <div className="flex gap-12">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Companies", path: "/companies" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer transition ${
                  pathname === item.path
                    ? "text-[#D8BF4A] underline"
                    : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/*  Hero Text (BEHIND top rock) */}
        <div
          ref={textRef}
          className="fixed inset-0 z-8 flex flex-col justify-center items-center text-center text-white"
        >
          <h1 className="font-medium leading-16 text-6xl" >
            Redefining Excellence <br /> Across Industries
          </h1>
          <p className="mt-4 max-w-xl text-sm opacity-90">
            At Sinatra Holding, we envision a world where opportunity <br /> meets
            innovation. Guided by our core belief in sustainable <br /> growth, we strive
            to build companies that create value— <br /> economically, socially and
            environmentally.
          </p>
        </div>
      </section>
    );
  }