"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"

const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Zustand", "TanStack Query", "Tailwind CSS", "Shadcn UI", "MUI", "Ant Design"] },
  { category: "Backend", items: ["Node.js", "Express", "Prisma ORM", "REST API"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "SQLite", "MySQL"] },
  { category: "DevOps & Cloud", items: ["Docker", "AWS Amplify", "Vercel", "Railway", "Cloudflare R2", "CI/CD Concepts"] },
  { category: "Testing & Quality", items: ["Playwright", "ESLint", "Prettier"] },
  { category: "Tools", items: ["Git", "Figma", "Jira"] },
  { category: "AI", items: ["n8n", "Make", "OpenClaw (Clawdbot)", "AI Integration"] }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 container max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
        Technical Proficiency
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="h-full">
              <h3 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/10 border border-white/20 text-sm font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
