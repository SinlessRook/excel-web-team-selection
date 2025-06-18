"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
    <section id="contact" className="relative py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10" />

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
            Get In Touch
          </motion.span>
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Contact Us
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mb-16 max-w-2xl text-muted-foreground">
            Have questions about SHASTRA? Want to sponsor or participate? We'd love to hear from you!
          </motion.p>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-left">
                <h3 className="mb-6 text-2xl font-bold">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-muted-foreground">
                        College of Engineering
                        <br />
                        Tech Campus, Innovation Street
                        <br />
                        City, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+91 1234567890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">info@shastra2024.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-white/5"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-white/5"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-white/5"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-white/5"
                    placeholder="Tell us more..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
