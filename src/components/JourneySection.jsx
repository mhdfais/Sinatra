import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingGlobe from "./RotatingGlobe";

// import RotatingGlobe from "./RotatingGlobe";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2010",
    text: "Sinatra Holding is established as a subsidiary of Saudi Gates.",
  },
  {
    year: "2011",
    text: "Sinatra Holding enters a joint venture with IBC International to develop the first Italian hub in UAE.",
  },
  {
    year: "2012",
    text: "The first business centre accommodating 50 Italian brands is unveiled to the public.",
  },
  {
    year: "2013",
    text: "Signs an exclusive agreement with luxury energy drink 3m lpn for the Middle East.",
  },
  {
    year: "2014",
    text: "Signs exclusive deal with Shaikh Abdullah bin saud al thani for product distribution in Qatar.",
  },
  {
    year: "2015",
    text: "Opens a second business centre and becomes a full-fledged Venture Company.",
  },
  {
    year: "2016",
    text: "Sinatra continues to gain traction, opening its third business centre in just a year.",
  },
  {
    year: "2017",
    text: "Sinatra unveils two new service-oriented ventures: Sinatra Rent-a-Car and Sinatra Yachts.",
  },
  {
    year: "2018",
    text: "Sinatra signs a partnership agreement with Maximus, The largest governmental company in the world.",
  },
  {
    year: "2019",
    text: "Sinatra receives its ISO 27001 and ISO 9001 certifications.",
  },
  { year: "2020", text: "Sinatra unveils its own call center, Tawktawk." },
  {
    year: "2021",
    text: "Sinatra owned 21 Chains of Restaurant in UAE associated with Sinatra Foods.",
  },
  {
    year: "2022",
    text: "Sinatra receives its ISO 22000, ISO HACCP, ISO 14001 and ISO 45001 Certifications.",
  },
  {
    year: "2023",
    text: "Sinatra takes a significant step towards fostering educational excellence with the Ministry of Education - Dubai.",
  },
  {
    year: "2024",
    text: "Collaboration with the Ministry of Human Resources & Emiratisation (MOHRE) - Abu Dhabi.",
  },
  {
    year: "2025",
    text: "Sinatra Holding makes waves in the sustainable transportation sector with the launch of Watt Charging Mobilities.",
  },
];

export default function JourneySection() {
  const blocksRef = useRef([]);

  useEffect(() => {
    blocksRef.current.forEach((block, index) => {
      if (!block) return;

      const fromX = index % 2 === 0 ? -100 : 100; // LEFT / RIGHT alternating

      gsap.fromTo(
        block,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%", // when 80% of viewport
            end: "top 0%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black text-white pt-20 pb-20">
      {/* Title */}
      <div className="relative w-full h-[55vh] overflow-hidden flex justify-center">
        {/* Title overlapping on top of globe */}
        <h1 className="absolute top-2 w-full text-center text-5xl  font-semibold tracking-wide z-5">
          Our Journey
        </h1>

        {/* The globe itself */}
        <div className="w-[380px] h-[380px] mt-20 z-10">
          <RotatingGlobe />
        </div>

        {/* Fade the bottom 40% of the globe */}
        <div
          className="
    absolute bottom-0 left-0 w-full h-[40%]
    bg-gradient-to-t from-black to-transparent
    pointer-events-none
    z-20
  "
        ></div>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20" />

        <div className="flex flex-col gap-5 mt-10">
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (blocksRef.current[index] = el)}
              className={`flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`
      w-[45%]
    ${index % 2 === 0 ? "text-right" : ""}
  `}
              >
                <div className="text-xl font-semibold mb-3 opacity-90">
                  {item.year}
                </div>
                <p className="text-sm leading-relaxed opacity-80">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
