"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Bot, X } from "lucide-react"

export default function FloatingMascot() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Random movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        controls.start({
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          transition: { duration: 2, ease: "easeInOut" },
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [controls, isOpen])

  // Update position based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercentage = scrollY / maxScroll

      // Move from bottom right to top right as user scrolls
      setPosition({
        x: 0,
        y: -scrollPercentage * 200, // Move up to 200px up as user scrolls to bottom
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const messages = [
    "Hello! I'm BYTE, your SHASTRA guide!",
    "Check out our hackathon event!",
    "Don't miss the robotics competition!",
    "Have you registered for the workshops yet?",
    "Try clicking on the stars in the background for a surprise!",
  ]

  const [messageIndex, setMessageIndex] = useState(0)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Change message when opening
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }
  }

  return (
    <motion.div className="fixed bottom-5 right-5 z-40" style={{ y: position.y }} animate={controls}>
      {isOpen ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="mb-4 w-64 rounded-lg bg-black/80 p-4 text-white backdrop-blur-md dark:bg-white/20"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">BYTE</span>
            </div>
            <button onClick={toggleOpen} className="text-white/70 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-sm">{messages[messageIndex]}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setMessageIndex((prev) => (prev + 1) % messages.length)}
              className="rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
            >
              Next Tip
            </button>
            <button
              className="rounded bg-primary px-3 py-1 text-xs hover:bg-primary/90"
              onClick={() => (window.location.href = "#events")}
            >
              View Events
            </button>
          </div>
        </motion.div>
      ) : null}

      <motion.button
        onClick={toggleOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg transition-all hover:scale-110 dark:from-primary dark:to-blue-500"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Bot className="h-6 w-6" />

        {/* Pulsing effect when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        )}
      </motion.button>
    </motion.div>
  )
}
