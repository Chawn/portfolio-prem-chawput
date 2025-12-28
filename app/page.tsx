import MainLayout from "@/components/layout/main-layout"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"

import { ResumeSection } from "@/components/resume-section"
import { ChatWidget } from "@/components/chat-widget"
import InstagramSection from "../components/instagra-section"

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full space-y-12">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        {/* <ResumeSection /> */}
        <ChatWidget />

        {/* Footer placeholder */}
        <footer className="py-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Chawput Nawakalanu. Crafted with Next.js & Tailwind.</p>
        </footer>
      </div>
    </MainLayout>
  )
}
