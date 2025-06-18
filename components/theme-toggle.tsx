"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed right-5 top-5 z-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/80 p-2">
          <div className="h-6 w-6" />
        </div>
      </div>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  const toggleTheme = () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Create smooth expanding circle animation
    const button = document.querySelector("[data-theme-toggle]") as HTMLElement
    if (button) {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Create animated overlay with better performance
      const overlay = document.createElement("div")
      overlay.style.cssText = `
        position: fixed;
        top: ${centerY}px;
        left: ${centerX}px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${isDark ? "hsl(0 0% 100%)" : "hsl(222.2 84% 4.9%)"};
        transform: translate(-50%, -50%) scale(0);
        z-index: 9999;
        pointer-events: none;
        will-change: transform;
      `

      document.body.appendChild(overlay)

      // Use requestAnimationFrame for smooth animation
      let startTime: number
      const maxScale = Math.max(window.innerWidth, window.innerHeight) / 12

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / 500, 1) // 500ms duration

        // Smooth easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const scale = easeOutQuart * maxScale

        overlay.style.transform = `translate(-50%, -50%) scale(${scale})`

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Clean up
          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay)
            }
            setIsAnimating(false)
          }, 100)
        }
      }

      requestAnimationFrame(animate)

      // Change theme at 40% of animation for smoother transition
      setTimeout(() => {
        setTheme(isDark ? "light" : "dark")
      }, 200)
    }
  }

  return (
    <div className="fixed right-5 top-5 z-50">
      <motion.button
        data-theme-toggle
        onClick={toggleTheme}
        disabled={isAnimating}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/90 to-primary shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed"
        whileHover={!isAnimating ? { scale: 1.05 } : {}}
        whileTap={!isAnimating ? { scale: 0.95 } : {}}
        animate={
          isAnimating
            ? {
                rotate: [0, 180],
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentTheme}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: isDark ? -90 : 90,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotate: isDark ? 90 : -90,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-white drop-shadow-sm" />
              ) : (
                <Moon className="h-5 w-5 text-white drop-shadow-sm" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Pulse effect during animation */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
