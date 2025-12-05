import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import desert from "../assets/sinatra-desert2.png";

gsap.registerPlugin(ScrollTrigger);

export default function DesertSection({smoother}) {
  const sectionRef = useRef(null);
  const desertRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  // ===== 1. INITIAL ENTRY ANIMATIONS =====
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;
    const desertImg = desertRef.current;

    // A. Background & Desert Image Entry (On Load)
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      bg,
      { scale: 1.06 },
      { scale: 1, duration: 1.4, ease: "power2.out" }
    );

    tl.fromTo(
      desertImg,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=1"
    );

    // B. Text Content Entry (When section comes into view)
    // gsap.fromTo(
    //   content,
    //   { y: 100, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     // duration: 0.2,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: section,
    //       start: "top 80%", // Triggers slightly before the pinning starts
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );
  }, []);

  // ===== 2. SMOOTH SCROLL LOGIC (The Fix) =====
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const desertImg = desertRef.current;

    // Calculate how much the content overflows the screen
    // We scroll ONLY the amount that is hidden
    const getScrollDistance = () => content.scrollHeight - window.innerHeight;
    // gsap.set(content, { y: 0, clearProps: "transform" });
    // Create the Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // The pin lasts for the length of the content scroll + some buffer
        end: () => `+=${getScrollDistance() + 100}`, 
        pin: true,
        pinSpacing: true,
        scrub: 0.8, // <--- This creates the smooth "weight"
        invalidateOnRefresh: true, 
        anticipatePin: 1
      },
    });

    // 1. Move the Content Up
    tl.to(content, {
      y: () => -getScrollDistance(),
      ease:"none", // Scrub controls easing, so this must be linear
    });

    // Optional: Make the desert image move slightly slower for depth (Parallax)
    // If you don't want the desert image to move at all, remove this part.
    // tl.to(
    //   desertImg,
    //   {
    //     y: -50, // Moves up slightly while scrolling
    //     ease: "none",
    //   },
    //   "<" // Start at same time as content scroll
    // );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* TOP FADE */}
        <div className="absolute top-0 left-0 w-full h-[9%] pointer-events-none bg-gradient-to-b from-white to-transparent z-30" />

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
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-[10%] pointer-events-none bg-gradient-to-t from-white to-transparent z-30"></div>

        {/* SCROLLING CONTENT CONTAINER */}
        {/* Important: overflow is HIDDEN now. We move this div via Transform. */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center px-6 pt-10 h-full "
        >
          {/* main heading + intro */}
          <h1 className="text-4xl font-bold mb-4 text-black">About Sinatra</h1>

          <p className="max-w-3xl text-black leading-relaxed mb-8 text-center ">
            Sinatra Holding is a holding company for an array of sub companies
            with related but distinct <br /> products, services, markets and
            opportunities. <br /> Established in January 2010, we started as an
            investment opportunity within the UAE <br /> marketplace, with the
            primary aim of providing a diverse mix of high-end tailored services
            for <br /> our valued customer base. <br /> Each Sinatra Holding
            sub-company offers high-quality customer service, branded consumer
            <br /> products, and distinct lines of specialist products and
            secondary services to concierge each <br /> division's efforts.
            Currently, we are operating as a corporation under the laws of the
            United <br /> Arab Emirates.
          </p>

          {/* Extra Content */}
          <div className="w-full max-w-7xl mx-auto py-16 px-6 pb-40">
            <div className="flex justify-between items-center gap-16">
              {/* LEFT COLUMN */}
              <div className="flex flex-col w-1/2 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">
                  Brands under Sinatra <br /> Holding include
                </h2>

                <p className="text-black font-semibold leading-6">
                  Our head office is located in the heart of Dubai, U.A.E. This <br />
                  allows us to have excellent access to the entire MENA region <br /> –
                  this places us at a strategic advantage since we are also <br /> in
                  the central hub of the East and West. Our team is <br /> composed of
                  highly-skilled and experienced professionals <br /> from fields such
                  as worldwide distribution, manufacturing, <br /> retail, corporate
                  mergers and acquisitions. By building and <br /> cultivating a
                  diverse group of talents, we are confident that <br /> Sinatra
                  Holding is well on its way to becoming UAE’s fastest <br /> growing
                  companies in the near future.
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
            
            {/* Spacer Div: 
               This ensures the calculation allows you to scroll 
               past the last element comfortably.
            */}
            <div className="h-[15vh]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}