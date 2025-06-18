"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"

// Sample team data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Festival Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Samantha Lee",
    role: "Technical Lead",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "Design Head",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Sharma",
    role: "Events Manager",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Wilson",
    role: "Marketing Lead",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Aisha Patel",
    role: "Sponsorship Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

export default function Team() {
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

  return (
    <section id="team" className="relative py-20 md:py-32">
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
            Meet The Crew
          </motion.span>
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Our Team
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            The passionate individuals behind SHASTRA who work tirelessly to make this festival a success.
          </motion.p>

          <motion.div variants={containerVariants} className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-white/5"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay with social links */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
                  <p className="mb-4 text-sm text-white/80">{member.role}</p>
                  <div className="flex gap-4">
                    <a
                      href={member.social.twitter}
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-primary"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-primary"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-primary"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Info bar at bottom */}
                <div className="p-4 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-500 dark:from-primary dark:to-blue-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
