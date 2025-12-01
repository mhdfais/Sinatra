import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import forestFront from "../assets/sinatra-forest.png";
import forestBack from "../assets/sinatra-forest-sky.png";

gsap.registerPlugin(ScrollTrigger);

export default function ForestSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);
  const pinTriggerRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    // INITIAL LOAD ANIM
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      backgroundRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }
    );

    tl.fromTo(
      foregroundRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1"
    );

    // CONTENT ENTERS ONLY WHEN FOREST SECTION REACHES SCREEN
    gsap.fromTo(
      content,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // PIN + INTERNAL SCROLL BEHAVIOR (same as desert)
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    content.style.overflowY = "hidden";
    content.style.WebkitOverflowScrolling = "touch";

    const getPinEnd = () =>
      `+=${Math.max(content.scrollHeight, window.innerHeight) + 50}`;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: getPinEnd,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,

      onEnter: () => {
        content.style.overflowY = "auto";
      },
      onLeave: () => {
        content.style.overflowY = "hidden";
        requestAnimationFrame(() => ScrollTrigger.update());
      },
      onEnterBack: () => {
        content.style.overflowY = "auto";
      },
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

    pinTriggerRef.current = trigger;

    setTimeout(() => ScrollTrigger.refresh(true), 150);

    return () => {
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div>
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* TOP GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-white to-transparent z-30 pointer-events-none" />

      {/* BACKGROUND — MOUNTAINS + FOG */}
      <img
        ref={backgroundRef}
        src={forestBack}
        className="absolute inset-0 w-full h-[160vh] z-0"
      />

      {/* FOREGROUND — TREES */}
      <img
        ref={foregroundRef}
        src={forestFront}
        className="absolute bottom-0 left-0 w-full h-[100vh] z-30 pointer-events-none"
      />
       <div
        className="
    absolute bottom-0 left-0 w-full h-[20%]
    pointer-events-none
    bg-gradient-to-t
    from-white
    to-transparent
    z-30
  "
      ></div>

      {/* CONTENT — SCROLLS BEHIND FOREST */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 overflow-y-scroll pt-16 px-10"
        style={{ scrollbarWidth: "none" }}
      >
        <h1 className="text-3xl font-bold mb-10 text-black">Our Values</h1>

        <div className="flex justify-end w-full">
          <div className="w-[55%] pr-6">
            <div className="grid grid-cols-2 gap-10 text-black">
              {/* Value Blocks */}
              {/* Repeat all your value items here exactly as before */}
              {/* SAMPLE BELOW (paste your full list) */}
              <div className="border-b-2 pb-4 ">
                <h2 className="text-2xl font-semibold mb-2">Sustainable</h2>
                <p className=" leading-relaxed ">
                  Sustainability is at the core of what we do. Everytime we
                  invest and empower a business in UAE and the MENA region, We
                  ask ourselves, how de we ensure longevity?
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Teamwork</h2>
                <p className=" leading-relaxed">
                  Our people are mindfull of their greater purpose - they
                  willingly share responsibility in order to attain our common
                  vision
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Integrity</h2>
                <p className=" leading-relaxed">
                  We faithfully live up to all our responsibilities and
                  obligations as part of the bigger whole that is Sinatra
                  Holding, and we fully uphold proper behavior in accordance
                  with ethical and corporate governance standards.
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Reliable</h2>
                <p className=" leading-relaxed">
                  We create and enhance value non-stop for all our customers,
                  employees, investors, and even the communities we serve. We
                  proactively seek and implement opportunities that drive and
                  sustain higher levels of organizational performance and
                  growth, cost effectiveness, and efficient delivery of services
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Niche</h2>
                <p className=" leading-relaxed">
                  We strive to provide solutions even to the most complex
                  problems by empowering highly specialized businesss with our
                  knowledge and experience
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Alliance</h2>
                <p className=" leading-relaxed">
                  Assuming ownership and taking full accountability for all our
                  actions is deeply ingrained in every indivitual in Sinatra
                  Holding
                </p>
              </div>
              <div className="border-b-2 pb-4">
                <h2 className="text-2xl font-semibold mb-3">Ambition</h2>
                <p className=" leading-relaxed ">
                  Assisting our partners so they can reach greater heights is
                  our primary objective
                </p>
              </div>
              {/* Ensure space at end so scroll completes */}
              <div className="col-span-2 pb-[38vh]" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
