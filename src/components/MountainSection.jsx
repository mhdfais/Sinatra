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
  // pinRef is no longer needed since we kill the trigger in the cleanup
  // const pinRef = useRef(null); 

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const mountainImg = mountainRef.current;
    const sky = skyRef.current;

    // Remove the initial native scroll lock and all native scroll logic,
    // as we are using GSAP transforms now.
    
    // Fade-in animation
    gsap
      .timeline({ delay: 0.25 })
      .fromTo(
        sky,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
      )
      .fromTo(
        mountainImg,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

    // Slide content in ONLY when section becomes visible
    // gsap.fromTo(
    //   content,
    //   { y: 120, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     duration: 1.1,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: section,
    //       start: "top 45%",
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );

    // --- 1. THE SMOOTH SCROLL LOGIC ---
    // Calculate how much the content overflows the screen height
    const getScrollDistance = () => content.scrollHeight - window.innerHeight;

    // Create the smooth scrolling timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // The section stays pinned for the duration of the content height
        end: () => `+=${getScrollDistance() + 100}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8, // <--- THIS CONTROLS SMOOTHNESS (Try 1.5 for a smooth float)
        invalidateOnRefresh: true, // Recalculate heights on resize
        anticipatePin: 1,
        
        // 2. INTEGRATING BACKGROUND ZOOM LOGIC (from the removed useEffect)
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          // We map the ScrollTrigger progress to the background scale animation
          const targetZoom = 1.18 - progress * 0.15; 
          gsap.set(sky, { scale: targetZoom });
        }
      },
    });

    // Animate the content container's Y position
    scrollTl.to(content, {
      y: () => -getScrollDistance(),
      ease: "none", // Must be linear when using scrub
    });

    // --- 3. TRANSITION/ZOOM EFFECT (Mountain Zoom Out) ---
    // This timeline runs immediately AFTER the internal scroll pin is complete.
    gsap.to(mountainImg, {
      scale: 1.8,
      y: 50, // Added slight vertical move for depth
      ease: "none",
      scrollTrigger: {
        trigger: section,
        // Start precisely when the internal scroll pin ends
        start: () => scrollTl.scrollTrigger.end, 
        end: `+=${window.innerHeight * 0.8}`, // Transition duration
        scrub: 1, // Smooth transition
      },
    });

    // Cleanup: Kill all ScrollTriggers created in this effect
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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

        {/* INTERNAL SCROLL CONTENT 
             NOTE: Removed overflow-y-scroll from the className/style 
             since we are using transforms for smooth scrolling now.
        */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 px-10 pt-35"
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

            <div className="flex justify-between opacity-90 px-20">
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