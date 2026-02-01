"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const projects = [
  {
    title: "Pramool Quick Extension",
    category: "Chrome Extension",
    description: "Designed for power users, this extension automates the tedious process of real estate auction scraping. It features advanced filtering, search saving, and automated note-taking, saving investors hours of manual work.",
    logo: "/porfolio-images/PramoolQuick/logo.png",
    screenshots: [
      "/porfolio-images/PramoolQuick/0.png",
      "/porfolio-images/PramoolQuick/1.png",
      "/porfolio-images/PramoolQuick/2.png",
    ],
    theme: "light",
    color: "bg-blue-50 dark:bg-slate-900",
    url: "https://chromewebstore.google.com/detail/pramool-quick/mhhpcbegifmfmbcbnopdcmbagdbgnpdc?hl=th"
  },
  {
    title: "Pramool Quick Web",
    category: "Web Platform",
    description: "A comprehensive property aggregation platform for real estate investors. aggregates data from multiple sources, providing analytics and auction tracking tools.",
    logo: "/porfolio-images/PramoolQuick/logo.png",
    screenshots: [
      "/porfolio-images/PramoolQuick/4.png",
      "/porfolio-images/PramoolQuick/5.png",
      "/porfolio-images/PramoolQuick/6.png",
      "/porfolio-images/PramoolQuick/8.png",
      "/porfolio-images/PramoolQuick/9.png",
    ],
    theme: "light",
    color: "bg-indigo-50 dark:bg-slate-900",
    url: "https://www.pramoolquick.com/"
  },
  {
    title: "Summer Car Rent",
    category: "Internal Platform",
    description: "A centralized platform replacing fragmented workflows across Paper, Excel, and LINE. Features include real-time vehicle availability, automated booking management, and a comprehensive dashboard.",
    logo: "/porfolio-images/SummerCarrent/logo.png",
    screenshots: [
      "/porfolio-images/SummerCarrent/25.png",
      "/porfolio-images/SummerCarrent/26.png",
      "/porfolio-images/SummerCarrent/27.png",
      "/porfolio-images/SummerCarrent/28.png",
      "/porfolio-images/SummerCarrent/29.png",
    ],
    theme: "light",
    color: "bg-orange-50 dark:bg-slate-900"
  },
  {
    title: "Banphue Salt POS",
    category: "System Integration",
    description: "A custom Point of Sale & Truck Weighing System integrated with webcam auditing. Digitized the entire cash flow, payroll, and credit management process for a major salt distributor.",
    logo: "/porfolio-images/BPSaltPOS/logo.png",
    screenshots: [
      "/porfolio-images/BPSaltPOS/35.png",
      "/porfolio-images/BPSaltPOS/36.png",
      "/porfolio-images/BPSaltPOS/38.png",
      "/porfolio-images/BPSaltPOS/39.png",
      "/porfolio-images/BPSaltPOS/40.png",
      "/porfolio-images/BPSaltPOS/41.png",
      "/porfolio-images/BPSaltPOS/42.png",
      "/porfolio-images/BPSaltPOS/43.png",
    ],
    theme: "light",
    color: "bg-emerald-50 dark:bg-slate-900"
  },
  {
    title: "Hybiot Legacy",
    category: "Enterprise Security",
    description: "High-performance dashboard for massive real-time CCTV streaming and geospatial mapping. Implemented complex Role-Based Access Control (RBAC) ensuring secure multi-level permissions.",
    logo: "/porfolio-images/Hybiot/logo.png",
    screenshots: [
      "/porfolio-images/Hybiot/30.png",
      "/porfolio-images/Hybiot/31.png",
    ],
    theme: "light",
    color: "bg-cyan-50 dark:bg-slate-900"
  },
  {
    title: "Mubaza",
    category: "E-Commerce",
    description: "An innovative E-Commerce platform featuring a custom interactive clothing design tool, allowing users to visualize and customize their apparel in real-time.",
    logo: "/porfolio-images/Mubaza/logo.png",
    screenshots: [
      "/porfolio-images/Mubaza/49.jpg",
      "/porfolio-images/Mubaza/55.jpg",
      "/porfolio-images/Mubaza/58.jpg",
    ],
    theme: "light",
    color: "bg-pink-50 dark:bg-slate-900"
  },
  {
    title: "The Bizarre Island",
    category: "Food Ordering Platform",
    description: "A LINE OA-integrated food ordering web app enabling dine-in and delivery orders. Features real-time order status tracking via WebSocket, automated backend order management, and seamless customer experience.",
    logo: "/porfolio-images/TheBizarreIsland/logo.png",
    screenshots: [
      "/porfolio-images/TheBizarreIsland/bz1.png",
      "/porfolio-images/TheBizarreIsland/bz2.png",
      "/porfolio-images/TheBizarreIsland/bz3.png",
      "/porfolio-images/TheBizarreIsland/bz4.png",
      "/porfolio-images/TheBizarreIsland/bz5.png",
      "/porfolio-images/TheBizarreIsland/bz6.png",
      "/porfolio-images/TheBizarreIsland/bz7.png",
      "/porfolio-images/TheBizarreIsland/bz8.png",
      "/porfolio-images/TheBizarreIsland/bz9.png",
      "/porfolio-images/TheBizarreIsland/bz10.png",
      "/porfolio-images/TheBizarreIsland/bz11.png",
    ],
    theme: "light",
    color: "bg-purple-50 dark:bg-slate-900",
    aspectRatio: "9/16" // Mobile portrait screenshots
  }
]

function ProjectRow({ project, index }: { project: typeof projects[0] & { url?: string }, index: number }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for image
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative z-10 w-full py-24 px-6 md:px-12 rounded-[3rem] overflow-hidden mb-8",
        project.color
      )}
      style={{ opacity }}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex flex-col gap-12 items-center",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}>
        {/* Text Side */}
        <div className="flex-1 lg:flex-[0.8] space-y-8 text-center md:text-left z-20 min-w-[300px]">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white shadow-sm p-3 flex items-center justify-center">
              {project.logo ? <Image src={project.logo} width={48} height={48} alt="logo" className="object-contain" /> : <span className="text-2xl">⚡️</span>}
            </div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-60 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          <div>
            <h3 className={cn("text-4xl md:text-6xl font-black tracking-tighter mb-4", project.theme === 'dark' ? "text-white" : "text-slate-900 dark:text-white")}>
              {project.title}
            </h3>
            <p className={cn("text-lg md:text-xl leading-relaxed max-w-xl", project.theme === 'dark' ? "text-slate-300" : "text-slate-600 dark:text-slate-300")}>
              {project.description}
            </p>
          </div>

          {project.url && (
            <Button size="lg" asChild className="rounded-full px-8 text-base bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Case Study <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        {/* Image Side - Carousel */}
        <div className={cn(
          "flex-1 w-full",
          project.aspectRatio === "9/16" ? "lg:flex-[0.6] max-w-md mx-auto" : "lg:flex-[1.2]"
        )}>
          <motion.div
            style={{ y }}
            className={cn(
              "relative w-full rounded-2xl shadow-2xl overflow-hidden border-8 border-white/20 dark:border-white/5 bg-slate-900",
              project.aspectRatio === "9/16" ? "aspect-[9/16]" : "aspect-[16/10]"
            )}
          >
            <Carousel className="w-full h-full" opts={{ loop: true }}>
              <CarouselContent className="h-full">
                {project.screenshots.map((src, i) => (
                  <CarouselItem key={i} className="h-full w-full">
                    <div className="relative h-full w-full">
                      <Image src={src} alt={`${project.title} shot ${i}`} fill className="object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/30 border-none text-white backdrop-blur-md" />
              <CarouselNext className="right-4 bg-white/10 hover:bg-white/30 border-none text-white backdrop-blur-md" />
            </Carousel>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 to-purple-500/0 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="mb-24 px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Selected Work.
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover the stories behind the platforms.
        </p>
      </div>

      <div className="w-full px-4 lg:px-8">
        {projects.map((project, index) => (
          <ProjectRow key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
