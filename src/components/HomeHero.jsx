import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImage from "../assets/sinatra-home-hero3.jpg";
import rock from "../assets/sinatra-ocean-rock.png";
import lionIcon from "../assets/sinatra-lion-icon.png";
import logo2 from "../assets/sinatra-logo.png";
import { useLocation, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const navRef = useRef(null);
  const lionRef = useRef(null);
  //   const rockRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // NAVBAR → slide down
    tl.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // LION → fade + slight rise
    tl.fromTo(
      lionRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: -90, duration: 1.2, ease: "power2.out" },
      0
    );

    // ROCK → fade in
    // tl.fromTo(
    //   rockRef.current,
    //   { opacity: 0, y: 40 },
    //   { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    //   "-=1"
    // );

    // LEFT TEXT → slide from left
    tl.fromTo(
      leftTextRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    );

    // RIGHT TEXT → slide from right
    tl.fromTo(
      rightTextRef.current,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div
        className="
    absolute bottom-0 left-0 w-full h-[30%]
    pointer-events-none
    bg-gradient-to-t
    from-white
    to-transparent
    z-10
  "
      ></div>

      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-5  text-white text-sm z-[50] opacity-0"
      >
        <img src={logo2} className="h-14 " />

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
                  : "text-black"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* LION ICON (behind rock) */}
     <img
        ref={lionRef}
        src={lionIcon}
        className="
          absolute w-[200px] md:w-[13vw] sm:w-[150px]
          left-1/2 top-[34%] md:top-[30%] sm:top-[25%]
          -translate-x-1/2
          opacity-0
          z-10
          filter invert brightness-90
        "
      />

      {/* ROCK IMG */}
      <img
        src={rock}
        className="
          absolute 
          w-full md:w-[40vw] sm:w-full
          left-[47%]
          top-[33%] md:top-[31%] sm:top-[25%]
          -translate-x-1/2
          -translate-y-[20%] md:-translate-y-[15%] sm:-translate-y-[10%]
          z-20
          max-w-none
          h-auto
        "
      />

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 flex items-end px-16 pb-10 z-40">
        {/* LEFT TEXT */}
        <h1
          ref={leftTextRef}
          className="text-black text-5xl font-bold opacity-0"
        >
          Building <br /> The Future
        </h1>

        {/* RIGHT TEXT */}
        <p ref={rightTextRef} className="ml-auto max-w-sm text-black">
          Sinatra Holding is where foresight and ideas come into play. We are
          home to several emerging market leaders, each offering distinct
          products, services, and opportunities.
        </p>
      </div>
    </section>
  );
}
