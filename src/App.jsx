import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
   useEffect(() => {
    // Configure ScrollTrigger globally for better performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true, // Prevents unnecessary refreshes on mobile
    });

    // Debounced refresh function
    let refreshTimeout;
    const debouncedRefresh = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    const afterRender = () => {
      // Wait for images to load
      const images = document.querySelectorAll("img");
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        debouncedRefresh();
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener("load", () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              debouncedRefresh();
            }
          });
          img.addEventListener("error", () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              debouncedRefresh();
            }
          });
        }
      });

      if (loadedImages === totalImages) {
        debouncedRefresh();
      }
    };

    if (document.readyState === "complete") {
      afterRender();
    } else {
      window.addEventListener("load", afterRender);
    }

    // Handle resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("load", afterRender);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
