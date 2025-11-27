import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EssenceSection() {
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const bg = bgRef.current;

    const onScroll = () => {
      const maxScroll = content.scrollHeight - content.clientHeight;
      const progress = content.scrollTop / maxScroll; // 0 → 1

      // Smooth zoom mapping
      const targetZoom =
        progress < 0.5
          ? 1 + progress * 0.25 // zoom in (1 → 1.125)
          : 1.125 - (progress - 0.5) * 0.25; // zoom out (1.125 → 1)

      // SMOOTH GSAP tween
      gsap.to(bg, {
        scale: targetZoom,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    content.addEventListener("scroll", onScroll);
    return () => content.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="essence-section"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* FIXED BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('/src/assets/sinatra-stars-bg.jpg')`,
        }}
      />

      {/* SCROLLABLE CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen w-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {/* BLOCK 1 */}
        <div className="h-screen grid grid-rows-2 text-white px-30">
          {/* ROW 1 → LEFT HEADING */}
          <div className="flex items-center">
            <h2 className="text-5xl font-bold">
              The Essence of Sinatra <br /> Holdings
            </h2>
          </div>

          {/* ROW 2 → RIGHT PARAGRAPH */}
          <div className="flex items-center justify-end">
            <p className="max-w-xl leading-relaxed text-right">
              Founded in 2010 and based in Dubai, Sinatra Holding is the
              umbrella for a growing portfolio of premium B2B and B2C brands.
              Our strength is derived from the diversity of our
              investments—spanning mobility, hospitality, events, consulting,
              and more—and a unifying ethos of excellence and integrity.
              Facebook+2SignalHire+2 With a team of experienced leaders and
              dedicated professionals, we partner with growth-oriented
              entrepreneurs to scale enterprises across markets and geographies.
            </p>
          </div>
        </div>

        {/* BLOCK 2 */}
        <div className="h-screen grid grid-rows-2 text-white px-30">
          {/* ROW 1 → LEFT HEADING */}
          <div className="flex items-center">
            <h2 className="text-5xl font-bold">Our Endeavors</h2>
          </div>

          {/* ROW 2 → RIGHT PARAGRAPH */}
          <div className="flex items-center justify-end">
            <p className="max-w-xl leading-relaxed text-right">
              We provide strategic capital, shared services, brand stewardship
              and operational support to our affiliated companies. Our model is
              to let each business maintain its market-specific identity and
              agility—while benefiting from the Sinatra Holding backbone of
              governance, capabilities and strategic oversight. Whether it’s
              launching innovative services, entering new markets, or optimizing
              operations, we act as a partner of choice for ventures looking to
              scale and make a positive impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
