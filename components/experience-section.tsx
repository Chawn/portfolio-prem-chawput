"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

const fullTimeExperiences = [
  {
    company: "Hybiot Co., Ltd.",
    role: "Team Lead & Front-End Developer",
    period: "March 2023 - July 2025",
    description: [
      "Led a team of 5 developers, setting strict code quality rules and conducting daily reviews.",
      "Developed an Enterprise Security System with real-time CCTV streaming, geospatial mapping, and complex RBAC.",
      "Mentored junior developers on React/TypeScript best practices."
    ],
    tech: ["React", "TypeScript", "Video Streaming", "RBAC"]
  },
  {
    company: "Pramool Quick",
    role: "Founder & Full Stack Developer",
    period: "January 2020 - Present",
    description: [
      "Developed a Chrome extension for real estate auction scraping with advanced filters.",
      "Architected a B2C SaaS platform for property management with membership lifecycle logic."
    ],
    tech: ["Chrome Extension", "SaaS", "Full Stack"]
  },
  {
    company: "Mubaza",
    role: "Co-Founder & Developer",
    period: "Dec 2014 - Sep 2016",
    description: [
      "Co-founded a Tech Startup with a team of 3 developers.",
      "Built an E-Commerce platform featuring a custom interactive clothing design tool."
    ],
    tech: ["Startup", "E-Commerce"]
  },
  {
    company: "True Information Technology",
    role: "Intern",
    period: "May 2013 - September 2013",
    description: [
      "Optimized algorithms for high-volume CSV data processing and categorization systems."
    ],
    tech: ["Algorithm", "Data Processing"]
  }
]

const contractExperiences = [
  {
    company: "Summer Car Rent",
    role: "Full Stack Developer (Contract)",
    period: "Oct 2025 - Present",
    description: [
      "Developing a centralized Car Rental Platform to replace fragmented workflows.",
      "Designed to reduce manual workload by ~80%."
    ],
    tech: ["Full Stack", "Process Automation"]
  },
  {
    company: "Banphue Salt",
    role: "Full Stack Developer (Contract)",
    period: "Aug 2025 - October 2025",
    description: [
      "Developed a Point of Sale (POS) & Truck Weighing System with webcam audit.",
      "Digitized cash flow, payroll, and credit management."
    ],
    tech: ["POS", "System Integration"]
  }
]

function TimelineItem({ exp, index, isLast }: { exp: typeof fullTimeExperiences[0], index: number, isLast: boolean }) {
  // Extract year from period. Tries to match a 4-digit year.
  const years = exp.period.match(/\d{4}/g);
  const startYear = years ? years[0] : "";
  const endYear = years && years.length > 1 ? years[1] : "";
  const displayYear = endYear ? endYear : startYear; // Show end year or single year

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-4 md:gap-8"
    >
      {/* Year Column - Hidden on small mobile, visible on larger */}
      <div className="hidden md:flex flex-col items-end w-32 shrink-0 pt-5">
        <span className="text-2xl font-bold text-indigo-500/80 dark:text-indigo-400 font-mono">
          {displayYear || "Present"}
        </span>
      </div>

      {/* Timeline Line/Dot Column */}
      <div className="relative flex flex-col items-center">
        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 absolute top-0" />
        <div className="w-4 h-4 bg-indigo-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 mt-6 relative" />
      </div>

      {/* Content Column */}
      <div className="flex-1 pb-12 min-w-0">
        <GlassCard className="relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="text-6xl font-black text-indigo-600">
              {displayYear}
            </span>
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2 w-fit border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 md:hidden">
                {exp.period}
              </Badge>
              <span className="hidden md:inline-block text-sm text-slate-500 mb-2">{exp.period}</span>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.company}</h3>
              <p className="text-base text-indigo-600 dark:text-indigo-400 font-semibold">{exp.role}</p>
            </div>

            <ul className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-300">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              {exp.tech.map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 container max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
        Professional Journey
      </h2>

      {/* Full Time Experience */}
      <div className="mb-24">
        <h3 className="text-xl font-semibold mb-8 pl-4  text-slate-500 uppercase tracking-widest border-l-4 border-indigo-500/20">Full-Time Roles</h3>
        <div>
          {fullTimeExperiences.map((exp, index) => (
            <TimelineItem
              key={index}
              exp={exp}
              index={index}
              isLast={index === fullTimeExperiences.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Contract Experience */}
      <div>
        <h3 className="text-xl font-semibold mb-8 pl-4  text-slate-500 uppercase tracking-widest border-l-4 border-purple-500/20">Contract & Projects</h3>
        <div>
          {contractExperiences.map((exp, index) => (
            <TimelineItem
              key={index}
              exp={exp}
              index={index}
              isLast={index === contractExperiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
