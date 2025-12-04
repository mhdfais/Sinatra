import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useRef } from "react";
import AppRoutes from "./AppRoutes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  // const smootherRef = useRef(null);

  // useEffect(() => {
  //   // Create ScrollSmoother instance
  //   smootherRef.current = ScrollSmoother.create({
  //     wrapper: "#smooth-wrapper",
  //     content: "#smooth-content",
  //     smooth: 1.3,        // inertia amount
  //     effects: true,      // enables parallax
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     if (smootherRef.current) {
  //       smootherRef.current.kill();
  //       smootherRef.current = null;
  //     }
  //   };
  // }, []);

  return (
    <BrowserRouter>
      {/* <div id="smooth-wrapper">
        <div id="smooth-content"> */}
          <AppRoutes />
        {/* </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;