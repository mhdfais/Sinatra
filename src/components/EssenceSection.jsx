import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import starbg from "../assets/sinatra-stars-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function EssenceSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const pinTriggerRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const bg = bgRef.current;

    const onScroll = () => {
      const maxScroll = content.scrollHeight - content.clientHeight;
      const progress = content.scrollTop / maxScroll;

      const targetZoom =
        progress < 0.5 ? 1 + progress * 0.25 : 1.125 - (progress - 0.5) * 0.25;

      gsap.to(bg, {
        scale: targetZoom,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    content.addEventListener("scroll", onScroll);
    return () => content.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    content.style.overflowY = "hidden";

    const getPinEnd = () =>
      "+=" + (Math.max(content.scrollHeight, window.innerHeight) + 50);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: getPinEnd,
      pin: true,
        pinReparent: true,
      pinSpacing: true,
      anticipatePin: 1,

      onEnter: () => {
        content.style.overflowY = "auto";
      },
      onLeave: () => {
        content.style.overflowY = "hidden";
      },
      onEnterBack: () => {
        content.style.overflowY = "auto";
      },
      onLeaveBack: () => {
        content.style.overflowY = "hidden";
      },
    });

    pinTriggerRef.current = trigger;

    setTimeout(() => ScrollTrigger.refresh(true), 150);

    return () => {
      if (pinTriggerRef.current) pinTriggerRef.current.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div>
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
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

      {/* SCROLLABLE CONTENT */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 h-full overflow-hidden px-10"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {/* BLOCK 1 */}
        <div className="h-screen grid grid-rows-2 text-white px-30">
          <div className="flex items-center">
            <h2 className="text-5xl font-bold">
              The Essence of Sinatra <br /> Holdings
            </h2>
          </div>

          <div className="flex items-center justify-end">
            <p className="max-w-xl leading-relaxed text-right">
              Founded in 2010 and based in Dubai, Sinatra Holding is the
              umbrella <br /> for a growing portfolio of premium B2B and B2C brands.
              Our <br /> strength is derived from the diversity of our
              investments—spanning <br /> mobility, hospitality, events, consulting,
              and more—and a unifying <br /> ethos of excellence and integrity.
              Facebook+2SignalHire+2 <br /> With a team of experienced leaders and
              dedicated professionals, <br /> we partner with growth-oriented
              entrepreneurs to scale enterprises <br /> across markets and geographies.
            </p>
          </div>
        </div>

        {/* BLOCK 2 */}
        <div className="h-screen grid grid-rows-2 text-white px-30">
          <div className="flex items-center">
            <h2 className="text-5xl font-bold">Our Endeavors</h2>
          </div>

          <div className="flex items-center justify-end">
            <p className="max-w-xl leading-relaxed text-right">
              We provide strategic capital, shared services, brand stewardship <br />
              and operational support to our affiliated companies. Our model is
              to <br /> let each business maintain its market-specific identity and
              agility— <br />while benefiting from the Sinatra Holding backbone of
              governance, <br /> capabilities and strategic oversight. <br /> Whether it’s
              launching innovative services, entering new markets, <br /> or optimizing
              operations, we act as a partner of choice for ventures <br /> looking to
              scale and make a positive impact.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
