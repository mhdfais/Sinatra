import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
// import AboutWrapper from "./pages/AboutWrapper";
// import TestSection from "./pages/TestSection";

export default function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const prev = sessionStorage.getItem("lastRoute");
    const justReloaded = sessionStorage.getItem("justReloaded");

    const reloadRoutes = ["/", "/about"]; // <— ADD THIS

    // Should we reload?
    const shouldReload =
      reloadRoutes.includes(location.pathname) && // If current route requires reload
      prev && // If there's a previous route saved
      prev !== location.pathname && // Only when returning to it
      !justReloaded; // Prevent reload loop

    if (shouldReload) {
      sessionStorage.setItem("justReloaded", "true");
      window.location.reload();
      return;
    }

    // Remove flag after actual reload
    if (justReloaded) {
      sessionStorage.removeItem("justReloaded");
    }

    sessionStorage.setItem("lastRoute", location.pathname);
  }, [location.pathname]);
  

  return (
    <Routes>
      {/* <Route path="/test" element={<TestSection />} /> */}

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}
