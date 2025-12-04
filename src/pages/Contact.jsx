
import { useEffect, useRef } from "react";
import ContactContent from "../components/ContactContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Contact = () => {
  const smootherRef = useRef(null);
   useEffect(() => {
    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.3,        // inertia amount
      effects: true,      // enables parallax
    });

    // Refresh ScrollTrigger after ScrollSmoother is created
    // This ensures all ScrollTrigger instances work properly with ScrollSmoother
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      ScrollTrigger.refresh();
    };
  }, []);
  return (
    <>
    <div id="smooth-wrapper">
        <div id="smooth-content">
      <ContactContent />
        </div>
      </div>
      {/* <Footers /> */}
    </>
  );
};

export default Contact;
