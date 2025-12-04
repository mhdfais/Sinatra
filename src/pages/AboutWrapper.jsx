import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import LayerImages from "./LayerImages";
// import PageHero from "./PageHero";
// import PageEssence from "./PageEssence";
// import PageApproach from "./PageApproach";

import bg from "../assets/sinatra-stars-bg.jpg";
import far from "../assets/sinatra-about-rock.png";
import mid from "../assets/sinatra-about-land.png";
import front from "../assets/sinatra-about-toprock.png";
// import fog1 from "../assets/fog1.png";
// import fog2 from "../assets/fog2.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutWrapper() {
  const wrapperRef = useRef(null);
  const layersRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const layers = layersRef.current;

    gsap.fromTo(".page-essence",
  { opacity: 0 },
  { opacity: 1,
    scrollTrigger: {
      trigger: wrapper,
      start: "33% top",
      end: "55% top",
      scrub: true
    }
  }
);

    // Pin the entire scene
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "+=350%",     // total scroll length
      scrub: true,
      pin: true,
    });

    // PARALLAX MOVE (main Mont-Fort feel)
    gsap.to(layers.querySelector(".mountain-far"), {
      y: -80,
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(layers.querySelector(".mountain-mid"), {
      y: -160,
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(layers.querySelector(".mountain-front"), {
      y: -240,
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // FOG horizontal drift
    gsap.to(layers.querySelector(".fog-1"), {
      x: 200,
      opacity: 0.8,
      scrollTrigger: { trigger: wrapper, scrub: true },
    });

    gsap.to(layers.querySelector(".fog-2"), {
      x: -150,
      opacity: 0.6,
      scrollTrigger: { trigger: wrapper, scrub: true },
    });

  }, []);

  return (
    <section
      ref={wrapperRef}
      id="montfort-2d-scene"
      className=" w-full h-screen overflow-hidden bg-black"
    >
      {/* LAYERS (background + mountains + fog) */}
      <div
        ref={layersRef}
        className="absolute inset-0 pointer-events-none"
      >
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* MOUNTAIN LAYERS */}
      <img
        src={far}
        className="mountain-far absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-10"
      />

      <img
        src={mid}
        className="mountain-mid absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-20"
      />

      <img
        src={front}
        className="mountain-front absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-30"
      />

      {/* FOG LAYERS */}
      {/* <img
        src={fog1}
        className="fog-1 absolute bottom-20 left-0 w-full opacity-40 z-40"
      />

      <img
        src={fog2}
        className="fog-2 absolute bottom-10 right-0 w-full opacity-40 z-40"
      /> */}
      </div>

      {/* SCENE TEXT PAGES */}
      <div className="relative h-[350vh] w-full">
        <div className="sticky top-0 h-screen">
          {/* Page 1 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center pointer-events-none">
      <h1 className="text-6xl font-bold">Redefining Excellence</h1>
      <p className="mt-4 max-w-xl">
        At Sinatra Holding, we envision a world where opportunity meets innovation.
      </p>
    </div>

          {/* Page 2 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center opacity-0 page-essence">
      <h1 className="text-5xl font-bold mb-4">The Essence of Sinatra</h1>
      <p className="max-w-2xl">
        Founded in 2010, Sinatra Holding drives transformation across industries.
      </p>
    </div>

          {/* Page 3 */}
          {/* <PageApproach /> */}
        </div>
      </div>
    </section>
  );
}
