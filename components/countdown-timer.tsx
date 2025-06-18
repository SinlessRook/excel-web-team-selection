"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Calculate target date (10 days from now)
    const now = new Date()
    const target = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, []) // No dependencies needed since target is calculated internally

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex flex-col items-center"
        >
          <div className="relative overflow-hidden rounded-lg bg-black/20 px-4 py-2 backdrop-blur-sm dark:bg-white/10">
            <motion.span
              key={unit.value}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="block text-3xl font-bold md:text-4xl"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          <span className="mt-2 text-xs text-muted-foreground">{unit.label}</span>
        </motion.div>
      ))}
    </div>
  )
}