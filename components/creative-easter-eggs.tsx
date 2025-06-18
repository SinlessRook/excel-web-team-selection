"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster, toast } from "sonner"

export default function CreativeEasterEggs() {
  const [showMatrix, setShowMatrix] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [secretMode, setSecretMode] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  useEffect(() => {
    let konamiSequence: string[] = []
    let clickTimer: NodeJS.Timeout

    // Enhanced console easter eggs
    console.log(
      "%c🚀 SHASTRA 2025 - DEVELOPER CONSOLE 🚀",
      "color: #3b82f6; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
    )
    console.log("%c🎮 Available Commands:", "color: #10b981; font-size: 16px; font-weight: bold;")
    console.log("%c• shastra.matrix() - Activate Matrix mode", "color: #10b981;")
    console.log("%c• shastra.hack() - Hacker mode", "color: #10b981;")
    console.log("%c• shastra.love() - Show some love", "color: #10b981;")
    console.log("%c• shastra.reset() - Reset all effects", "color: #10b981;")

    // Global functions
    ;(window as any).shastra = {
      matrix: () => {
        setShowMatrix(true)
        toast.success("Matrix mode activated! 🕶️", { duration: 3000 })
        setTimeout(() => setShowMatrix(false), 10000)
      },
      hack: () => {
        setSecretMode(true)
        document.body.classList.add("hacker-mode")
        toast.success("🔥 Hacker mode engaged!", { duration: 3000 })
        setTimeout(() => {
          setSecretMode(false)
          document.body.classList.remove("hacker-mode")
        }, 15000)
      },
      love: () => {
        setShowHeart(true)
        toast.success("💖 Sending love!", { duration: 3000 })
        setTimeout(() => setShowHeart(false), 5000)
      },
      reset: () => {
        setShowMatrix(false)
        setSecretMode(false)
        setShowHeart(false)
        document.body.classList.remove("hacker-mode")
        toast.success("All effects reset!", { duration: 2000 })
      },
    }

    // Konami Code (↑↑↓↓←→←→BA)
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ]

    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence.push(e.code)
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence = konamiSequence.slice(-konamiCode.length)
      }

      if (konamiSequence.join(",") === konamiCode.join(",")) {
        ;(window as any).shastra.matrix()
        konamiSequence = []
      }

      // Secret key combinations
      if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
        e.preventDefault()
        ;(window as any).shastra.hack()
      }

      if (e.altKey && e.code === "KeyL") {
        e.preventDefault()
        ;(window as any).shastra.love()
      }
    }

    // Double click on logo easter egg
    const handleLogoDoubleClick = () => {
      const logos = document.querySelectorAll("h1")
      logos.forEach((logo) => {
        logo.addEventListener("dblclick", () => {
          logo.style.transform = "scale(0.5)"
          logo.style.transition = "transform 1s ease"
          toast.success("🎉 Double click!", { duration: 2000 })
          setTimeout(() => {
            logo.style.transform = "rotate(0deg)"
          }, 1000)
        })
      })
    }

    // Secret sequence typing
    let typedSequence = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      typedSequence += e.key.toLowerCase()
      if (typedSequence.length > 10) {
        typedSequence = typedSequence.slice(-10)
      }

      if (typedSequence.includes("shastra")) {
        ;(window as any).shastra.hack()
        typedSequence = ""
      }
    }

    // Mouse trail effect
    const createMouseTrail = (e: MouseEvent) => {
      if (secretMode) {
        const trail = document.createElement("div")
        trail.className = "mouse-trail"
        trail.style.left = e.clientX + "px"
        trail.style.top = e.clientY + "px"
        document.body.appendChild(trail)

        setTimeout(() => {
          if (document.body.contains(trail)) {
            document.body.removeChild(trail)
          }
        }, 1000)
      }
    }

    // Event listeners
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keypress", handleKeyPress)
    document.addEventListener("mousemove", createMouseTrail)

    // Initialize logo double click after component mounts
    setTimeout(handleLogoDoubleClick, 1000)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keypress", handleKeyPress)
      document.removeEventListener("mousemove", createMouseTrail)
      clearTimeout(clickTimer)
    }
  }, [clickCount, secretMode])

  return (
    <>
      <Toaster position="top-center" />

      {/* Matrix Effect */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Effect */}
      <AnimatePresence>
        {showHeart && (
          <div className="fixed inset-0 z-[9997] pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: -100,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="absolute text-4xl"
              >
                💖
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Secret floating elements */}
      {secretMode && (
        <div className="fixed inset-0 z-[9996] pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              {["🚀", "💻", "⚡", "🔥", "✨"][i % 5]}
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}

// Matrix Rain Component
function MatrixRain() {
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.zIndex = "9999"
    canvas.style.pointerEvents = "none"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const matrix = "SHASTRA2024ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}\\".split("")
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
    }
  }, [])

  return null
}
