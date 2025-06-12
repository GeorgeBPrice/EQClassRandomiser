"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classes, classRaces, genders } from "../lib/data";
import { icons, classIcons, raceIcons, genderIcons } from "../lib/icons";
import Confetti from "./Confetti";

export default function RandomiserCard() {
  const [hero, setHero] = useState({ cls: "", race: "", gender: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [revealedFields, setRevealedFields] = useState({ cls: false, race: false, gender: false });
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [heroesJourneyMode, setHeroesJourneyMode] = useState(false);
  const [threeClasses, setThreeClasses] = useState("");
  const [showHeroesJourney, setShowHeroesJourney] = useState(false);
  const [animatedClasses, setAnimatedClasses] = useState("");

  const getThreeClasses = (baseClass) => {
    const availableClasses = classes.filter(cls => cls !== baseClass);
    const randomClass1 = availableClasses[Math.floor(Math.random() * availableClasses.length)];
    const remainingClasses = availableClasses.filter(cls => cls !== randomClass1);
    const randomClass2 = remainingClasses[Math.floor(Math.random() * remainingClasses.length)];
    return { baseClass, class1: randomClass1, class2: randomClass2 };
  };

  const randomise = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setRevealedFields({ cls: false, race: false, gender: false });
    setShowConfetti(false);
    setThreeClasses("");
    setShowHeroesJourney(false);
    setAnimatedClasses("");

    // Countdown from 3 to 1
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      if (i === 1) {
        // Show "1" for only half a second, then clear it
        await new Promise(resolve => setTimeout(resolve, 500));
        setCountdown(0); // Clear the countdown immediately after 0.5s
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Generate random values with proper restrictions
    const cls = classes[Math.floor(Math.random() * classes.length)];
    const availableRaces = classRaces[cls];
    const race = availableRaces[Math.floor(Math.random() * availableRaces.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    // Generate three classes if Heroes Journey mode is enabled
    if (heroesJourneyMode) {
      const threeClassCombo = getThreeClasses(cls);
      setThreeClasses(threeClassCombo);
    }
    
    // Animate card with hover effect
    setCardHovered(true);
    setTimeout(() => setCardHovered(false), 500);
    
    // Reveal fields one by one
    setHero({ cls, race, gender });
    
    // Reveal gender first
    setTimeout(() => {
      setRevealedFields(prev => ({ ...prev, gender: true }));
    }, 500);
    
    // Reveal race after 1 second
    setTimeout(() => {
      setRevealedFields(prev => ({ ...prev, race: true }));
    }, 1500);
    
    // Reveal class and trigger confetti after 2 seconds (big reveal)
    setTimeout(() => {
      setRevealedFields(prev => ({ ...prev, cls: true }));
      setShowConfetti(true);
    }, 2500);
    
    // Show Heroes Journey display half a second after class reveal
    if (heroesJourneyMode) {
      setTimeout(() => {
        setShowHeroesJourney(true);
        // Start animated class reveal
        const threeClassCombo = getThreeClasses(cls);
        setAnimatedClasses(threeClassCombo.baseClass + "/");
        
        // Add second class after 1 second
        setTimeout(() => {
          setAnimatedClasses(threeClassCombo.baseClass + "/" + threeClassCombo.class1 + "/");
        }, 1000);
        
        // Add third class after 2 seconds
        setTimeout(() => {
          setAnimatedClasses(threeClassCombo.baseClass + "/" + threeClassCombo.class1 + "/" + threeClassCombo.class2);
        }, 2000);
      }, 3000);
    }
    
    // Reset loading state
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(0);
    }, 2800);
  };

  return (
    <>
      <Confetti isActive={showConfetti} />
      
      <motion.div
        className="glass max-w-lg mx-auto"
        animate={cardHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
      <motion.h2
        className="text-4xl font-bold mb-6 text-center"
        animate={{ 
          scale: revealedFields.cls ? 1.05 : 1,
          color: revealedFields.cls ? "#fbbf24" : "#ffffff"
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {revealedFields.cls ? `${hero.cls}!` : "Your Base Class is..."}
      </motion.h2>
        
        {/* Loading/Countdown Section */}
        <AnimatePresence>
          {isLoading && (countdown > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-6">
                <div className="countdown-text spin">
                  {icons.loading}
                </div>
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="countdown-text"
                >
                  {countdown}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hero Fields */}
        <div className="space-y-4">
          {/* Gender Field */}
          <div className="hero-field">
            <div className="hero-field-label">
              {icons.gender} Gender
            </div>
            <AnimatePresence>
              {revealedFields.gender ? (
                <motion.div
                  key="gender-revealed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-reveal"
                >
                  <span className="hero-field-value">
                    {genderIcons[hero.gender]} {hero.gender}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="gender-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  —
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Race Field */}
          <div className="hero-field">
            <div className="hero-field-label">
              {icons.race} Race
            </div>
            <AnimatePresence>
              {revealedFields.race ? (
                <motion.div
                  key="race-revealed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-reveal"
                >
                  <span className="hero-field-value">
                    {raceIcons[hero.race]} {hero.race}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="race-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  —
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Class Field - Big Reveal */}
          <div className="hero-field">
            <div className="hero-field-label">
              {icons.hero} Class
            </div>
            <AnimatePresence>
              {revealedFields.cls ? (
                <motion.div
                  key="class-revealed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-reveal"
                >
                  <span className="hero-field-value">
                    {classIcons[hero.cls]} {hero.cls}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="class-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  —
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Randomise Button */}
        <motion.button
          className={`gradient-button w-full mt-6 text-xl font-bold py-4 px-6 rounded-xl border-2 border-white border-opacity-30 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'
          } text-white transition-all duration-300`}
          onClick={randomise}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.05, boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)" } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="spin">🎲</span>
              Randomising...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              🎲 Randomise Class 🎲
            </span>
          )}
        </motion.button>

        {/* Heroes Journey Toggle */}
        <div className="mt-6 flex items-center justify-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={heroesJourneyMode}
                onChange={(e) => setHeroesJourneyMode(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </div>
            <span className="text-lg font-semibold text-purple-200">
              Heroes Journey (3 Classes)
            </span>
          </label>
        </div>

        {/* Three Classes Display */}
        <AnimatePresence>
          {heroesJourneyMode && showHeroesJourney && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl border-2 border-purple-400 border-opacity-30"
            >
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-yellow-300 tracking-wider" 
                  style={{
                    textShadow: "0 0 15px rgba(255, 215, 0, 0.6)"
                  }}
                  key={animatedClasses}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {animatedClasses}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
