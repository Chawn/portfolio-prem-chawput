"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import Image from "next/image"

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 container max-w-4xl mx-auto px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full flex flex-col items-center gap-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Resume
        </h2>

        <div className="relative w-full aspect-[210/297] rounded-xl overflow-hidden shadow-2xl border border-slate-200/20 bg-white/5">
          <Image
            src="/ChawputResume.png"
            alt="Chawput Nawakalanu Resume"
            fill
            className="object-contain"
            quality={100}
            priority={false}
          />
        </div>

        <Button asChild size="lg" className="rounded-full gap-2 px-8 shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-12 text-lg">
          <a href="/ChawputResume.pdf" download="Chawput_Nawakalanu_Resume.pdf">
            <Download className="h-5 w-5" /> Download Resume PDF
          </a>
        </Button>
      </motion.div>
    </section>
  )
}
