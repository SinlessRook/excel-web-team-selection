"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tab } from "@headlessui/react"
import { Code, Cpu, Gamepad2, Lightbulb, Rocket, Users } from "lucide-react"

// Sample event data
const eventCategories = [
  {
    name: "Coding",
    icon: <Code className="h-5 w-5" />,
    events: [
      {
        title: "Hackathon",
        description: "24-hour coding competition to build innovative solutions",
        date: "March 15, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Code Golf",
        description: "Solve problems with the shortest code possible",
        date: "March 16, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Bug Bounty",
        description: "Find and fix bugs in our challenge applications",
        date: "March 17, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    name: "Robotics",
    icon: <Cpu className="h-5 w-5" />,
    events: [
      {
        title: "Robo Race",
        description: "Navigate robots through challenging obstacle courses",
        date: "March 15, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Bot Battle",
        description: "Robot vs Robot in an epic showdown",
        date: "March 16, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    name: "Gaming",
    icon: <Gamepad2 className="h-5 w-5" />,
    events: [
      {
        title: "CS:GO Tournament",
        description: "5v5 competitive Counter-Strike tournament",
        date: "March 17, 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "FIFA Showdown",
        description: "Show off your football skills in FIFA 24",
        date: "March 18, 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    name: "Workshops",
    icon: <Lightbulb className="h-5 w-5" />,
    events: [
      {
        title: "AI/ML Workshop",
        description: "Learn the basics of artificial intelligence and machine learning",
        date: "March 15, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Web3 Development",
        description: "Introduction to blockchain and decentralized applications",
        date: "March 16, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    name: "Startup",
    icon: <Rocket className="h-5 w-5" />,
    events: [
      {
        title: "Pitch Perfect",
        description: "Pitch your startup idea to a panel of investors",
        date: "March 17, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Business Model Canvas",
        description: "Workshop on creating effective business models",
        date: "March 18, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    name: "Team",
    icon: <Users className="h-5 w-5" />,
    events: [
      {
        title: "Treasure Hunt",
        description: "Tech-themed treasure hunt across campus",
        date: "March 19, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Quiz Bowl",
        description: "Test your knowledge in our tech quiz competition",
        date: "March 20, 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
]

export default function Events() {
  const [selectedIndex, setSelectedIndex] = useState(0)
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
    <section id="events" className="relative py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl dark:bg-blue-500/30" />
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
            Competitions & Activities
          </motion.span>
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Exciting Events
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mb-12 max-w-2xl text-muted-foreground">
            From coding competitions to workshops, SHASTRA offers a diverse range of events for tech enthusiasts.
            Showcase your skills, learn something new, and win exciting prizes!
          </motion.p>

          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <motion.div variants={itemVariants}>
              <Tab.List className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2 rounded-full bg-black/5 p-1 dark:bg-white/5">
                {eventCategories.map((category, index) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selected
                          ? "bg-primary text-white shadow-lg"
                          : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                      }`
                    }
                  >
                    {category.icon}
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </motion.div>

            <Tab.Panels>
              {eventCategories.map((category, idx) => (
                <Tab.Panel key={idx} className="focus:outline-none">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {category.events.map((event, index) => (
                      <motion.div
                        key={event.title}
                        variants={itemVariants}
                        className="group relative overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-white/5"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                          <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                            <button className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white transition-all hover:bg-primary/90">
                              Register
                            </button>
                          </div>
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/20 dark:to-blue-500/20" />
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <motion.div variants={itemVariants} className="mt-12">
            <button className="rounded-full border border-primary bg-transparent px-8 py-3 font-medium text-primary shadow-lg transition-all hover:bg-primary/10 hover:shadow-xl dark:border-primary dark:text-primary">
              View All Events
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
