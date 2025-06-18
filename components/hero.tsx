"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import CountdownTimer from "./countdown-timer"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Particle background - fixed position prevents scroll interference */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60, // Reduced for better performance
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab", // Gentle interaction
                },
                onClick: {
                  enable: true,
                  mode: "push", // Minimal interaction
                },
              },
              modes: {
                grab: {
                  distance: 100,
                  links: {
                    opacity: 0.5
                  }
                },
                push: {
                  quantity: 2 // Fewer particles affected
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 120, // Reduced distance
                enable: true,
                opacity: 0.3, // More subtle
                width: 0.8, // Thinner
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 0.5, // Slower movement
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60, // Fewer particles
              },
              opacity: {
                value: 0.3, // More transparent
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 2.5 }, // Smaller range
              },
            },
            detectRetina: true,
          }}
          className="h-full w-full"
        />
      </div>

      {/* Content that moves with parallax effect */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y: scrollY * -0.3 }}
          className="text-center"
        >
          <motion.h1
            className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SHASTRA 2025
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Where Technology Meets Imagination
          </motion.p>

          <CountdownTimer targetDate="2024-03-15T00:00:00" />

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl dark:from-primary dark:to-blue-500"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-primary bg-transparent px-8 py-3 font-medium text-primary shadow-lg transition-all hover:bg-primary/10 hover:shadow-xl dark:border-primary dark:text-primary"
            >
              Explore Events
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-muted-foreground">Scroll Down</span>
          <div className="h-10 w-6 rounded-full border-2 border-primary p-1">
            <motion.div
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}