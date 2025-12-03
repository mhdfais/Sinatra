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
  const afterRender = () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  if (document.readyState === "complete") {
    afterRender();
  } else {
    window.addEventListener("load", afterRender);
  }

  return () => window.removeEventListener("load", afterRender);
}, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
