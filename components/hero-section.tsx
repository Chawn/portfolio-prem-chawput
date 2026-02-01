"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Github, Phone } from "lucide-react"
import { HeatmapBackground } from "@/components/ui/heatmap-background"
import { ChatInputTrigger } from "@/components/chat-input-trigger"

export function HeroSection() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 text-center overflow-hidden">
      {/* Background Heatmap Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden mask-image-gradient">
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background z-10" />

        <HeatmapBackground />
      </div>

      {/* Main Content (Z-Index increased to sit on top) */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-40 dark:opacity-50 rounded-full animate-pulse"></div>
          <Avatar className="h-[200px] w-[200px] border-4 border-white/20 shadow-2xl">
            {/* Placeholder until we get a real profile pic, or use initials */}
            <AvatarImage src="/profile2.jpg" width={128} height={128} className="object-cover" />
            <AvatarFallback className="text-3xl bg-linear-to-br from-indigo-500 to-purple-600 text-white">CN</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 sm:text-7xl mb-4 drop-shadow-sm"
        >
          Chawput Nawakalanu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed font-medium"
        >
          Full Stack Developer with 6+ years of experience. <br className="hidden sm:block" />
          Building scalable SaaS platforms and delivering premium user experiences.
        </motion.p>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl hover:bg-white/50 dark:hover:bg-black/50 dark:text-white transition-all duration-300 shadow-lg" onClick={() => window.location.href = 'mailto:chawput@gmail.com'}>
            <Mail className="mr-2 h-4 w-4" /> chawput@gmail.com
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl hover:bg-white/50 dark:hover:bg-black/50 dark:text-white transition-all duration-300 shadow-lg" onClick={() => window.open('https://github.com/chawn', '_blank')}>
            <Github className="mr-2 h-4 w-4" /> Github
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl hover:bg-white/50 dark:hover:bg-black/50 dark:text-white transition-all duration-300 shadow-lg" onClick={() => window.location.href = 'tel:+66954212774'}>
            <Phone className="mr-2 h-4 w-4" /> +66 95 421 2774
          </Button>
        </motion.div>

        <ChatInputTrigger />


      </div>
    </section>
  )
}
