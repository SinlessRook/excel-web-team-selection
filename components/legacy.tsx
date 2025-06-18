"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"

// Sample legacy data
const legacyYears = [
  {
    year: 2023,
    theme: "Digital Renaissance",
    highlight: "First AI-powered hackathon with 1000+ participants",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    year: 2022,
    theme: "Metaverse Explorers",
    highlight: "Virtual reality showcase with industry partners",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    year: 2021,
    theme: "Tech Resilience",
    highlight: "First fully online edition during the pandemic",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    year: 2020,
    theme: "Quantum Leap",
    highlight: "Introduced quantum computing workshops",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    year: 2019,
    theme: "Sustainable Innovation",
    highlight: "Green tech solutions competition",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    year: 2018,
    theme: "Blockchain Revolution",
    highlight: "First crypto hackathon in the region",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Legacy() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  return (
    <section id="legacy" className="relative py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10" />

      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
            Our Journey
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">SHASTRA Legacy</h2>
          <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            Explore the rich history of SHASTRA and how it has evolved over the years to become one of the premier
            technical festivals in the region.
          </p>
        </div>

        <div ref={targetRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary to-primary/30" />

          {/* Timeline nodes */}
          {legacyYears.map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative mb-24 flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } items-center justify-center gap-8 md:gap-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white">
                <span className="text-xs font-bold">{item.year}</span>
              </div>

              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <h3 className="mb-2 text-2xl font-bold">{item.theme}</h3>
                <p className="text-muted-foreground">{item.highlight}</p>
              </div>

              {/* Image */}
              <div className="w-1/2">
                <div className="overflow-hidden rounded-lg">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`SHASTRA ${item.year}`}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
