"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Confetti({ isActive, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Set a 30-second timer to stop the confetti
    const stopTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 30000);

    // Create a continuous rain effect
    const spawnInterval = setInterval(() => {
      setParticles(prevParticles => {
        // Remove particles that have fallen off screen
        const activeParticles = prevParticles.filter(p => p.y < window.innerHeight + 100);
        
        // Add new particle
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: -20,
          rotation: Math.random() * 360,
          color: [
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#96ceb4",
            "#feca57",
            "#ff9ff3",
            "#54a0ff",
            "#5f27cd",
            "#00d2d3",
            "#ff9f43",
          ][Math.floor(Math.random() * 10)],
          size: Math.random() * 8 + 4,
        };
        
        return [...activeParticles, newParticle];
      });
    }, 100); // Spawn a new particle every 100ms

    return () => {
      clearInterval(spawnInterval);
      clearTimeout(stopTimer);
      setParticles([]);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            y: -20,
            x: particle.x,
            rotate: particle.rotation,
          }}
          animate={{
            y: window.innerHeight + 100,
            x: particle.x + (Math.random() - 0.5) * 200,
            rotate: particle.rotation + 360 * 3,
          }}
          transition={{
            duration: 6,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            // Remove particle when animation completes
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }}
        />
      ))}
    </div>
  );
} 