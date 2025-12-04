import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import skyBg from "../assets/sinatra-stars-bg.jpg";
import mountain from "../assets/sinatra-snowy-mountain.png";
import swaplogo from "../assets/sinatra-swapgo-logo.png";
import wattchargelogo from "../assets/sinatra-wattcharge-logo.png";
import bmntech from "../assets/sinatra-bmntech-logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function MountainSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const mountainRef = useRef(null);
  const skyRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    // Initial native scroll lock
    content.style.overflowY = "hidden";
    content.style.WebkitOverflowScrolling = "touch";

    // Fade-in animation
    gsap
      .timeline({ delay: 0.25 })
      .fromTo(
        skyRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
      )
      .fromTo(
        mountainRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

    // Slide content in ONLY when section becomes visible
    gsap.fromTo(
      contentRef.current,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 45%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ---- EXACT SAME PIN + INTERNAL SCROLL AS DESERT SECTION ----
    const getPinEnd = () => `+=${window.innerHeight}`;
    // section.dataset.canPin = "false";
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: getPinEnd,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: false,

      onEnter: () => (content.style.overflowY = "auto"),
      onLeave: () => {
        content.style.overflowY = "hidden";
        requestAnimationFrame(() => ScrollTrigger.update());
      },
      onEnterBack: () => (content.style.overflowY = "auto"),
      onLeaveBack: () => {
        content.style.overflowY = "hidden";
        requestAnimationFrame(() => ScrollTrigger.update());
      },

      onRefresh: () => {
        content.style.overflowY = ScrollTrigger.isRefreshing
          ? "hidden"
          : content.style.overflowY;
      },
    });

    pinRef.current = trigger;
    window.mountainPin = trigger;

    setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      if (pinRef.current) pinRef.current.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const mountainImg = mountainRef.current;
    const mountainSection = sectionRef.current;

    const wait = setInterval(() => {
      if (!window.mountainPin) return; // Wait for pin to exist
      clearInterval(wait);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mountainSection,
          start: () => window.mountainPin.end, // start AFTER internal scroll
          end: "+=100%", // zoom duration
          scrub: 1.2,
        },
      });

      tl.to(mountainImg, {
        scale: 1.8,
        ease: "none",
      });
    }, 30);

    return () => clearInterval(wait);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const bg = skyRef.current;

    const onScroll = () => {
      const maxScroll = content.scrollHeight - content.clientHeight;
      const progress = content.scrollTop / maxScroll;

   const targetZoom = 1.18 - progress * 0.15; 

      gsap.to(bg, {
        scale: targetZoom,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    content.addEventListener("scroll", onScroll);
    return () => content.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative z-10">
      <section
        id="mountain-section"
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* TOP FADE */}
        <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-white to-transparent z-30 pointer-events-none" />

        {/* WHITE THEME GRADIENT LAYER (like screenshot) */}
        <div className="absolute top-0 left-0 w-full h-[80%] bg-gradient-to-b from-white to-transparent z-[5] pointer-events-none" />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-300/60 via-blue-300/10 to-transparent mix-blend-screen z-[4] pointer-events-none" />

        {/* SKY BACKGROUND */}
        <img
          ref={skyRef}
          src={skyBg}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* FOREGROUND MOUNTAIN */}
        <img
          ref={mountainRef}
          src={mountain}
          className="absolute bottom-0 w-full h-[60vh] object-cover z-20 pointer-events-none"
        />
        <div
          className="
    absolute bottom-0 left-0 w-full h-[30%]
    pointer-events-none
    bg-gradient-to-t
    from-black
    to-transparent
    z-30
  "
        ></div>

        {/* INTERNAL SCROLL CONTENT */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 overflow-y-scroll px-10 pt-35 "
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {/* STATS */}
          <div className="w-full text-center text-black mb-35">
            <div className="flex justify-center gap-40 text-xl font-medium items-center">
              <div className="font-normal text-2xl leading-5 text-[#313438]">
                <span className="text-4xl font-semibold text-black">14</span>
                <br />
                Years <br /> Experience
              </div>
              <div className="font-normal text-2xl text-[#313438]">
                <span className="text-4xl font-semibold text-black">+25</span>
                <br />
                Companies
              </div>
              <div className="font-normal text-2xl text-[#313438]">
                <span className="text-4xl font-semibold text-black">+200</span>
                <br />
                Investments
              </div>
              <div className="font-normal text-2xl text-[#313438]">
                <span className="text-4xl font-semibold text-black">+120</span>
                <br />
                Teams
              </div>
            </div>
          </div>

          {/* COMPANY LOGOS */}
          <div className="w-full text-center text-black pb-20">
            <h2 className="text-4xl font-bold mb-20">Our Companies</h2>

            <div className="flex justify-between  opacity-90 px-20">
              <img
                src={swaplogo}
                className="h-15 filter invert brightness-100"
              />
              <img
                src={wattchargelogo}
                className="h-15 filter invert brightness-100"
              />
              <img
                src={bmntech}
                className="h-15 filter invert brightness-100"
              />
              <img
                src={wattchargelogo}
                className="h-15 filter invert brightness-100"
              />
              <img
                src={swaplogo}
                className="h-15 filter invert brightness-100"
              />
            </div>
          </div>

          {/* EXTRA SPACE FOR SCROLL */}
          <div className="pb-[45vh]" />
        </div>
      </section>
    </div>
  );
}
