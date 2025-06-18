import Hero from "@/components/hero"
import About from "@/components/about"
import Events from "@/components/events"
import Team from "@/components/team"
import Sponsors from "@/components/sponsors"
import Legacy from "@/components/legacy"
import Contact from "@/components/contact"
import FloatingMascot from "@/components/floating-mascot"
import EasterEggs from "@/components/easter-eggs"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hidden console easter egg */}
      <EasterEggs />

      {/* Floating mascot that follows scroll */}
      <FloatingMascot />

      {/* Main sections */}
      <Hero />
      <About />
      <Events />
      <Team />
      <Sponsors />
      <Legacy />
      <Contact />
    </main>
  )
}
