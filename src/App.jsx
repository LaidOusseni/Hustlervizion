import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import IntroSection from './components/IntroSection';
import Navigation from './components/Navigation';
import HeroLanding from './components/HeroLanding';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import VisualShowcase from './components/VisualShowcase';
import SocialProof from './components/SocialProof';
import ContactFooter from './components/ContactFooter';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showIntro]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroSection key="intro" onEnter={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="main-content"
          >
            <div className="watermark-bg">
              <img src="/assets/Design_sans_titre__1_-removebg-preview.png" alt="" />
            </div>
            
            <Navigation />
            
            <main>
              <HeroLanding />
              <Portfolio />
              <Services />
              <VisualShowcase />
              <SocialProof />
              <ContactFooter />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
