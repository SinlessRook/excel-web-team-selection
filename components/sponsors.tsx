"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Sample sponsor categories
  const sponsorCategories = [
    {
      tier: "Platinum",
      sponsors: [
        { name: "TechCorp", logo: "/placeholder-logo.svg" },
        { name: "InnovateSoft", logo: "/placeholder-logo.svg" },
      ],
    },
    {
      tier: "Gold",
      sponsors: [
        { name: "DevWorks", logo: "/placeholder-logo.svg" },
        { name: "CloudNine", logo: "/placeholder-logo.svg" },
        { name: "ByteForge", logo: "/placeholder-logo.svg" },
      ],
    },
    {
      tier: "Silver",
      sponsors: [
        { name: "CodeCraft", logo: "/placeholder-logo.svg" },
        { name: "PixelPerfect", logo: "/placeholder-logo.svg" },
        { name: "DataDrive", logo: "/placeholder-logo.svg" },
        { name: "NetNexus", logo: "/placeholder-logo.svg" },
      ],
    },
  ]

  return (
    <section id="sponsors" className="relative py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl dark:bg-blue-500/30" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.span
            variants={itemVariants}
            className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20"
          >
            Our Partners
          </motion.span>
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Sponsors & Partners
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            SHASTRA is made possible by the generous support of our sponsors and partners. We are grateful for their
            contribution to making this festival a success.
          </motion.p>

          <motion.div variants={containerVariants} className="space-y-16">
            {sponsorCategories.map((category) => (
              <motion.div key={category.tier} variants={itemVariants} className="space-y-6">
                <h3 className="inline-block rounded-full bg-black/5 px-6 py-2 text-lg font-bold dark:bg-white/10">
                  {category.tier} Sponsors
                </h3>

                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {category.sponsors.map((sponsor) => (
                    <motion.div
                      key={sponsor.name}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center rounded-lg bg-white/50 dark:bg-gray-200 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md" >
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        width={150}
                        height={80}
                        className="h-12 w-auto object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary/90"
            >
              Become a Sponsor
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
