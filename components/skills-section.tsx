"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"

const skills = [
  { category: "Front-End", items: ["React", "Next.js", "TypeScript", "Zustand", "React Hook Form", "Zod", "Tailwind CSS", "SASS", "MUI", "Ant Design", "Shadcn/ui"] },
  { category: "Back-End", items: ["Node.js", "Express", "Golang", "PHP", "Laravel", "Python", "Prisma"] },
  { category: "Mobile", items: ["Flutter (iOS & Android)"] },
  { category: "Database", items: ["PostgreSQL", "MySQL", "MSSQL", "MongoDB", "Kafka", "MinIO", "Cloudflare R2"] },
  { category: "Testing", items: ["Playwright", "Jest", "Cypress"] },
  { category: "DevOps", items: ["Git", "Docker", "Vercel", "Railway", "AWS Amplify", "Cloudflare", "CI/CD"] },
  { category: "Tools", items: ["Webpack", "Babel", "Stitch", "Jira"] },
  { category: "Practices", items: ["Agile / Scrum", "Code Review", "TDD", "REST API Design", "Frontend Architecture", "Team Leadership"] },
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
