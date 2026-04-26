import React from "react";
import { Toaster } from "sonner";
import "./App.css";

import Audience from "./landing/Audience";
import Features from "./landing/Features";
import FinalCTA from "./landing/FinalCTA";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Nav from "./landing/Nav";
import TrustStrip from "./landing/TrustStrip";
import { useFadeInOnScroll, useForceLightTheme } from "./landing/hooks";

function App() {
  useForceLightTheme();
  useFadeInOnScroll();

  return (
    <div className="App">
      <Toaster position="top-center" richColors closeButton theme="light" />
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <Audience />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
