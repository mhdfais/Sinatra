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

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = backgroundRef.current;
    const fg = foregroundRef.current;

    // 1. Initial Animations (Fade in)
    const entryTl = gsap.timeline({ delay: 0.2 });

    entryTl.fromTo(
      bg,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }
    );

    entryTl.fromTo(
      fg,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1"
    );

    // Content entry
    // gsap.fromTo(
    //   content,
    //   { y: 250, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     duration: 1.2,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: section,
    //       start: "top 60%", // Trigger slightly earlier
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );

    // 2. THE SMOOTH SCROLL LOGIC
    const getScrollDistance = () => content.scrollHeight - window.innerHeight;

    // Create the smooth scrolling timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance() + 100}`, 
        pin: true,
        pinSpacing: true,
        scrub: 0.8, // Smoothness control
        invalidateOnRefresh: true, 
        anticipatePin: 1,
        
        // Re-integrating your WOBBLE and ZOOM effects using progress
        onUpdate: (self) => {
          const progress = self.progress; 

          // Background Zoom Logic
          const targetZoom = 1.18 - progress * 0.15;
          gsap.set(bg, { scale: targetZoom });

          // Foreground Wobble Logic
          const wobbleX = Math.sin(progress * Math.PI * 10) * 2;
          
          gsap.set(fg, { 
            scale: 1.01,
            x: wobbleX, 
            duration:0.03
          });
        }
      },
    });

    // Move the content UP as we scroll DOWN
    scrollTl.to(content, {
      y: () => -getScrollDistance(), 
      ease: "none",
    });

    // --- NEW: TRANSITION/ZOOM EFFECT ---
    // This timeline runs immediately AFTER the 'scrollTl' finishes pinning.
    gsap.to(fg, {
      y: -150, // Move up slightly
      scale: 1.8, // Zoom in
      ease: "none",
      scrollTrigger: {
        trigger: section,
        // Start precisely when the internal scroll pin ends
        start: () => scrollTl.scrollTrigger.end, 
        end: `+=${window.innerHeight * 0.8}`, // Transition duration
        scrub: 1, // Smooth transition
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* TOP GRADIENT */}
        <div className="absolute top-0 left-0 w-full h-[12%] bg-gradient-to-b from-white to-transparent z-30 pointer-events-none" />

        {/* BACKGROUND */}
        <img
          ref={backgroundRef}
          src={forestBack}
          alt="Forest Background"
          className="absolute inset-0 w-full h-[120vh] object-cover z-0"
        />

        {/* FOREGROUND (The image that zooms out) */}
        <img
          ref={foregroundRef}
          src={forestFront}
          alt="Forest Foreground"
          className="absolute bottom-0 left-0 w-full h-[115vh] z-30 pointer-events-none"
        />
        
        <div className="absolute bottom-0 left-0 w-full h-[20%] pointer-events-none bg-gradient-to-t from-white to-transparent z-30"></div>

        {/* CONTENT CONTAINER */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 pt-10 px-10"
        >
          <h1 className="text-4xl font-bold mb-10 text-black">Our Values</h1>

          <div className="flex justify-end w-full">
            <div className="w-[55%] pr-6">
              <div className="grid grid-cols-2 gap-10 text-black">
                
                {/* YOUR VALUES CONTENT HERE */}
                <div className="border-b-2 pb-4 ">
                  <h2 className="text-2xl font-semibold mb-2">Sustainable</h2>
                  <p className=" leading-relaxed ">
                    Sustainability is at the core of what we do. Everytime we
                    invest and empower a business in UAE and the MENA region, We
                    ask ourselves, how de we ensure longevity?
                  </p>
                </div>
                {/* ... other value blocks ... */}
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
                    growth, cost effectiveness, and efficient delivery of
                    services
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
                    Assuming ownership and taking full accountability for all
                    our actions is deeply ingrained in every indivitual in
                    Sinatra Holding
                  </p>
                </div>
                <div className="border-b-2 pb-4">
                  <h2 className="text-2xl font-semibold mb-3">Ambition</h2>
                  <p className=" leading-relaxed ">
                    Assisting our partners so they can reach greater heights is
                    our primary objective
                  </p>
                </div>

                {/* Spacer to ensure the last item rises high enough to be seen */}
                <div className="col-span-2 pb-[45vh]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}