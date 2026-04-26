import React, { useEffect } from "react";
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
import { I18nProvider, setActiveLang, useT } from "./landing/i18n";

function LandingShell() {
  useForceLightTheme();
  useFadeInOnScroll();
  const { lang } = useT();

  // Keep the static translator (used inside non-component helpers like toast)
  // in sync with the active context language.
  useEffect(() => {
    setActiveLang(lang);
  }, [lang]);

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

function App() {
  return (
    <I18nProvider>
      <LandingShell />
    </I18nProvider>
  );
}

export default App;
