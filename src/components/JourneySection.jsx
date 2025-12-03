import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingGlobe from "./RotatingGlobe";

// import RotatingGlobe from "./RotatingGlobe";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2010",
    text: "Sinatra Holding is established as <br/> a subsidiary of Saudi Gates.",
  },
  {
    year: "2011",
    text: "Sinatra Holding enters a joint venture <br/> with IBC International to develop the <br/> first Italian hub in UAE.",
  },
  {
    year: "2012",
    text: "The first business centre, which can <br/> accommodate 50 Italian brands, is <br/> unveiled to the public.",
  },
  {
    year: "2013",
    text: "Signs an exclusive <br/> agreement with luxury energy drink <br/> 3m lpn for the Middle East.",
  },
  {
    year: "2014",
    text: "Signs exclusive deal <br/> with Shaikh Abdullah bin saud al thani <br/> for product distribution in Qatar.",
  },
  {
    year: "2015",
    text: "Opens a second <br/> business centre and becomes a full- <br/> fledged Venture Company.",
  },
  {
    year: "2016",
    text: "Sinatra continues to gain traction,  <br/> opening its third business centre in just <br/> a year.",
  },
  {
    year: "2017",
    text: "Sinatra unveils two new service-  <br/> oriented ventures: Sinatra Rent-a-Car <br/> and Sinatra Yachts.",
  },
  {
    year: "2018",
    text: "Sinatra signs a partnership agreement <br/> with Maximus, The largest <br/> governmental company in the world.",
  },
  {
    year: "2019",
    text: "Sinatra receives its ISO 27001 and ISO <br/> 9001 certifications.",
  },
  { year: "2020", text: "Sinatra unveils its own call center, <br/> Tawktawk." },
  {
    year: "2021",
    text: "Sinatra owned 21 Chains of Restaurant <br/> in UAE associated with Sinatra Foods.",
  },
  {
    year: "2022",
    text: "Sinatra receives its ISO 22000, ISO <br/> HACCP, ISO 14001 and ISO 45001 <br/> Certifications.",
  },
  {
    year: "2023",
    text: "Sinatra takes a significant step towards <br/> fostering educational excellence with <br/> the Ministry of Education - Dubai.",
  },
  {
    year: "2024",
    text: "Collaboration with the Ministry of <br/> Human Resources & Emiratisation <br/> (MOHRE) - Abu Dhabi.",
  },
  {
    year: "2025",
    text: "Sinatra Holding makes waves in the <br/> sustainable transportation sector with <br/> the launch of Watt Charging Mobilities.",
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
            start: "top 97%", // when 80% of viewport
            end: "top 0%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section  id="journey-section"  className="relative w-full min-h-screen bg-black text-white pt-8 pb-20">
      {/* Title */}
      <div className="relative w-full h-[70vh] overflow-hidden flex justify-center">
        {/* Title overlapping on top of globe */}
        <h1 className="absolute top-2 w-full text-center text-9xl  font-normal tracking-wide z-5 text-gray-400">
          Our Journey
        </h1>

        {/* The globe itself */}
        <div className="w-[500px] h-[500px] mt-38 z-10">
          <RotatingGlobe />
        </div>

        {/* Fade the bottom 40% of the globe */}
        <div
          className="
    absolute bottom-0 left-0 w-full h-[70%]
    bg-gradient-to-t from-black to-transparent
    pointer-events-none
    z-20
  "
        ></div>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-6xl mx-auto px-6 ">
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
                <div className="text-2xl font-semibold mb-3 opacity-90">
                  {item.year}
                </div> 
               <p
  className="  leading-5  opacity-80"
  dangerouslySetInnerHTML={{ __html: item.text }}
/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
