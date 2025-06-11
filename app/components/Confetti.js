"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Confetti({ isActive }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Create confetti particles (doubled from 50 to 100)
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
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
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

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
            duration: 4, // Slowed down from 3s to 4s
            ease: "easeOut",
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
} 