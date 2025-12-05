import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import starbg from "../assets/sinatra-stars-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function EssenceSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  // Function to set up the ScrollTrigger Pinning and parallax
  const setupScrollTrigger = () => {
    // Kill existing ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach((t) => t.kill());
    
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;

    if (!section || !content || !bg) return;

    // Reset transform properties used in entry animation
    gsap.set(content, { y: 0, clearProps: "transform" }); 

    // Calculate how much the content overflows the screen
    const getScrollDistance = () => content.scrollHeight - window.innerHeight;

    // Create the Timeline with smooth scrolling
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance() + 100}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8, 
        // invalidateOnRefresh: true,
        //  anticipatePin: 1,
        
        // Background zoom logic integrated into ScrollTrigger
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          // Background zoom out as we scroll: Starts at ~1.15, ends at ~1.00
          // The formula maintains the scale linked to the scroll progress
          const targetZoom = 1.15 - progress * 0.15;
          gsap.set(bg, { scale: targetZoom });
        },
      },
    });

    // Move the Content Up as we scroll
    scrollTl.to(content, {
      y: () => -getScrollDistance(),
      ease: "none", 
    });
  };


  // ===== INITIAL ENTRY ANIMATIONS & SETUP =====
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;

    if (!section || !content || !bg) return;
    
    // --- SETUP INITIAL STATE ---
    // Background starts slightly more zoomed and invisible
    gsap.set(bg, { scale: 1.25, opacity: 0 }); 
    // Content starts offset and invisible
    gsap.set(content, { y: 100, opacity: 0 });

    // A. Background & Content Entry (On Load)
    const entryTl = gsap.timeline({ 
        delay: 0.25,
        // *THE FIX*: Initialize ScrollTrigger only after entry is complete
        onComplete: () => {
             // A slight delay helps ensure DOM is fully painted before ScrollTrigger calculates layout
             setTimeout(setupScrollTrigger, 50); 
        }
    });
    
    // 1. Background Animates TO the ScrollTrigger Start Scale (1.15)
    entryTl.to(
      bg,
      { scale: 1.15, opacity: 1, duration: 1.4, ease: "power2.out" }
    );

    // 2. Content Animates In (Integrated into the main timeline)
    entryTl.to(
      content,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1.0" // Start content animation towards the end of the background entry
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    // ... JSX remains the same ...
     <div className="relative z-10">
      <section
        id="essence-section"
        ref={sectionRef}
        className="essence-section relative w-full h-screen overflow-hidden"
      >
        {/* BACKGROUND */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: `url(${starbg})` }}
        />
        <div
          className="
          absolute top-0 left-0 w-full h-[20%]
          pointer-events-none
          bg-gradient-to-b
          from-black
          to-transparent
          z-30
        "
        />
        <div
          className="
    absolute bottom-0 left-0 w-full h-[10%]
    pointer-events-none
    bg-gradient-to-t
    from-black
    to-transparent
    z-30
  "
        ></div>

        {/* SCROLLING CONTENT CONTAINER */}
        {/* Important: overflow is HIDDEN now. We move this div via Transform. */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col px-10 h-full"
        >
          {/* BLOCK 1 */}
          <div className="h-screen grid grid-rows-2 text-white px-30 pb-30 pt-10">
            <div className="flex items-center">
              <h2 className="text-5xl font-bold">
                The Essence of Sinatra <br /> Holdings
              </h2>
            </div>

            <div className="flex items-center justify-end">
              <p className="max-w-xl leading-relaxed text-right">
                Founded in 2010 and based in Dubai, Sinatra Holding is the
                umbrella <br /> for a growing portfolio of premium B2B and B2C
                brands. Our <br /> strength is derived from the diversity of our
                investments—spanning <br /> mobility, hospitality, events,
                consulting, and more—and a unifying <br /> ethos of excellence
                and integrity. Facebook+2SignalHire+2 <br /> With a team of
                experienced leaders and dedicated professionals, <br /> we
                partner with growth-oriented entrepreneurs to scale enterprises
                <br /> across markets and geographies.
              </p>
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="h-screen grid grid-rows-2 text-white px-30 pb-30">
            <div className="flex items-center">
              <h2 className="text-5xl font-bold">Our Endeavors</h2>
            </div>

            <div className="flex items-center justify-end">
              <p className="max-w-xl leading-relaxed text-right">
                We provide strategic capital, shared services, brand stewardship
                <br />
                and operational support to our affiliated companies. Our model
                is to <br /> let each business maintain its market-specific
                identity and agility— <br />
                while benefiting from the Sinatra Holding backbone of
                governance, <br /> capabilities and strategic oversight. <br />
                Whether it’s launching innovative services, entering new
                markets, <br /> or optimizing operations, we act as a partner of
                choice for ventures <br /> looking to scale and make a positive
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}