import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import desert from "../assets/sinatra-desert2.png";

gsap.registerPlugin(ScrollTrigger);

export default function DesertSection() {
  const sectionRef = useRef(null);
  const desertRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const pinTriggerRef = useRef(null); // store ScrollTrigger instance

  // ===== PAGE LOAD ANIMATION =====
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.25 });

    tl.fromTo(
      bgRef.current,
      { scale: 1.06 },
      { scale: 1, duration: 1.4, ease: "power2.out" }
    );

    tl.fromTo(
      desertRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=1"
    );

    // tl.fromTo(
    //   contentRef.current,
    //   { y: 80, opacity: 0 },
    //   { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
    //   "-=1"
    // );
  }, []);

  // ===== PIN + INTERNAL SCROLL LOGIC =====
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // ensure content initially not scrollable (native)
    content.style.overflowY = "hidden";
    content.style.WebkitOverflowScrolling = "touch";

    // helper to compute pin length:
    // pin length must be enough to allow user to scroll the internal content fully.
    // We'll set end to section top + content.scrollHeight so the pinned area
    // lasts long enough for internal scrolling.
    const getPinEnd = () => {
      // adding a small buffer (50) to avoid off-by-one on some devices
      return `+=${Math.max(content.scrollHeight, window.innerHeight) + 50}`;
    };

    gsap.fromTo(
  contentRef.current,
  { y: 250, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 40%",   // when 35% of DesertSection enters screen
      toggleActions: "play none none reverse",
    },
  }
);

    // Create ScrollTrigger that pins the section and toggles internal scroll
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: getPinEnd,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: false, // we want native internal scrolling, not scrubbed animation
      onEnter: () => {
        // enable internal scroll when pinned
        content.style.overflowY = "auto";
      },
      onLeave: () => {
        // leaving downward — disable internal scroll so page continues
        content.style.overflowY = "hidden";
        requestAnimationFrame(() => ScrollTrigger.update());
      },
      onEnterBack: () => {
        // coming back up into the pinned area
        content.style.overflowY = "auto";
      },
      onLeaveBack: () => {
        content.style.overflowY = "hidden";
        requestAnimationFrame(() => ScrollTrigger.update());
      },
      // small safety to avoid mismatch when layout changes
      onRefresh: () => {
        // ensure content overflow state recomputed after refresh
        content.style.overflowY = ScrollTrigger.isRefreshing ? "hidden" : content.style.overflowY;
      },
    //   end: () => "+=" + (content.scrollHeight + -200)
    });




    // store for cleanup
    pinTriggerRef.current = trigger;

    // After initial render, refresh ScrollTrigger once (helps with image loading)
    const refreshId = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 120);

    // Cleanup on unmount
    return () => {
      clearTimeout(refreshId);
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* TOP FADE (subtle white top) */}
      <div
        className="
          absolute top-0 left-0 w-full h-[9%]
          pointer-events-none
          bg-gradient-to-b
          from-white
          to-transparent
          z-30
        "
      />

      {/* BACKGROUND LIGHT BLUE */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgb(172 206 241), rgb(182 216 246))",
        }}
      />

      {/* DESERT FOREGROUND */}
      <img
        ref={desertRef}
        src={desert}
        alt="desert"
        className="absolute bottom-0 left-1/2 h-[75vh] -translate-x-1/2 w-[140%] max-w-none z-20 pointer-events-none"
      />

      {/* SCROLLING CONTENT (will become scrollable only when pinned) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center px-6 pt-10 h-full"
        style={{
          // start hidden; GSAP will toggle between 'hidden' and 'auto'
          overflowY: "hidden",
          scrollbarWidth: "none", // firefox
          WebkitOverflowScrolling: "touch", // smooth touch scrolling
        }}
      >
        {/* main heading + intro */}
        <h1 className="text-3xl font-bold mb-4 text-black">About Sinatra</h1>

        <p className="max-w-3xl text-black leading-relaxed mb-8 text-center">
          Sinatra Holding is a holding company for an array of sub companies
          with related but distinct <br /> products, services, markets and
          opportunities. <br /> Established in January 2010, we started as an
          investment opportunity within the UAE <br /> marketplace, with the primary
          aim of providing a diverse mix of high-end tailored services for <br /> our
          valued customer base. <br /> Each Sinatra Holding sub-company offers
          high-quality customer service, branded consumer <br /> products, and
          distinct lines of specialist products and secondary services to
          concierge each <br /> division's efforts. Currently, we are operating as a
          corporation under the laws of the United <br /> Arab Emirates.
        </p>

        {/* content block that can be scrolled */}
        <div className="w-full max-w-7xl mx-auto py-16 px-6 pb-60">
          <div className="flex justify-between items-center gap-16">
            {/* LEFT COLUMN */}
            <div className="flex flex-col w-1/2 max-w-2xl">
              <h2 className="text-3xl font-bold mb-6">
                Brands under Sinatra <br /> Holding include
              </h2>

              <p className="leading-relaxed text-black">
                Our head office is located in the heart of Dubai, U.A.E. This
                allows us to have excellent access to the entire MENA region –
                this places us at a strategic advantage since we are also in the
                central hub of the East and West. Our team is composed of
                highly-skilled and experienced professionals from fields such as
                worldwide distribution, manufacturing, retail, corporate mergers
                and acquisitions. By building and cultivating a diverse group of
                talents, we are confident that Sinatra Holding is well on its way
                to becoming UAE’s fastest growing companies in the near future.
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex w-1/2 flex-col text-right space-y-4 min-w-[250px]">
              <a className="text-lg font-medium underline cursor-pointer">
                Sinatra HR Consultant
              </a>
              <a className="text-lg font-medium underline cursor-pointer">
                Sinatra Food
              </a>
              <a className="text-lg font-medium underline cursor-pointer">
                Sinatra Rent a Car
              </a>
              <a className="text-lg font-medium underline cursor-pointer">
                Sinatra Management Consultancy
              </a>

              <a className="text-lg font-semibold mt-6 underline cursor-pointer flex justify-end items-center">
                View All Brands <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
