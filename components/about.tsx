"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="relative py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
              About SHASTRA
            </span>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Celebrating Technology & Innovation
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                SHASTRA is the annual technical festival of our college, bringing together the brightest minds and
                latest technologies in a celebration of innovation, creativity, and technical excellence.
              </p>
              <p>
                From coding competitions and hackathons to workshops and tech talks, SHASTRA offers a platform for
                students to showcase their skills, learn from industry experts, and explore cutting-edge technologies.
              </p>
              <p>
                Join us for an unforgettable experience where technology meets imagination, and where the future is
                shaped by today's innovations.
              </p>
            </div>

            <motion.div className="mt-8 grid grid-cols-3 gap-4" variants={containerVariants}>
              {[
                { number: "10+", label: "Years of Legacy" },
                { number: "50+", label: "Events" },
                { number: "5000+", label: "Participants" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center rounded-lg bg-black/5 p-4 text-center dark:bg-white/5"
                >
                  <span className="text-2xl font-bold text-primary md:text-3xl">{stat.number}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center justify-center">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur-3xl dark:from-primary/20 dark:to-blue-500/20" />
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2 backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="SHASTRA Tech Fest"
                width={600}
                height={600}
                className="h-full w-full rounded-xl object-cover"
              />

              {/* Floating tech elements */}
              {[
                { top: "10%", left: "-5%", delay: 0 },
                { top: "70%", left: "-8%", delay: 0.5 },
                { top: "20%", right: "-5%", delay: 0.2 },
                { bottom: "10%", right: "-8%", delay: 0.7 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute z-10 h-16 w-16 rounded-full bg-gradient-to-r from-primary to-purple-500 p-1 shadow-lg dark:from-primary dark:to-blue-500"
                  style={pos as any}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: pos.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="h-full w-full rounded-full bg-background p-3">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-purple-500 dark:from-primary dark:to-blue-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
