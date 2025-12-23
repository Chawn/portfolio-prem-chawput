"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function HeatmapBackground() {
  const [columns, setColumns] = useState(0)
  const rows = 7 // Days in a week logic, keeping it familiar

  useEffect(() => {
    // Calculate how many columns fit
    const calculateColumns = () => {
      const width = window.innerWidth
      const colWidth = 16 // roughly 12px + gap
      setColumns(Math.ceil(width / colWidth))
    }

    calculateColumns()
    window.addEventListener("resize", calculateColumns)
    return () => window.removeEventListener("resize", calculateColumns)
  }, [])

  // Generate deterministic random values based on index to avoid hydration mismatch
  // or just use a simple randomized array on client only
  const [data, setData] = useState<number[][]>([])

  useEffect(() => {
    if (columns === 0) return

    const newData = Array.from({ length: rows }).map(() =>
      Array.from({ length: columns }).map(() => {
        // Biased towards 0 (empty) to look like a realistic contribution graph
        const rand = Math.random()
        if (rand > 0.9) return 4
        if (rand > 0.8) return 3
        if (rand > 0.7) return 2
        if (rand > 0.5) return 1
        return 0
      })
    )
    setData(newData)
  }, [columns])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-indigo-200 dark:bg-indigo-900/30"
      case 2: return "bg-indigo-300 dark:bg-indigo-800/50"
      case 3: return "bg-indigo-400 dark:bg-indigo-600/70"
      case 4: return "bg-indigo-500 dark:bg-indigo-500"
      default: return "bg-slate-100 dark:bg-slate-800/20"
    }
  }

  if (columns === 0) return null

  return (
    <div className="flex flex-col gap-1.5 p-4 opacity-40 dark:opacity-20 scale-110 rotate-3 md:rotate-6 transform origin-center transition-all duration-500">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 justify-center">
          {row.map((level, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (colIndex * 0.02) + (rowIndex * 0.05),
                duration: 0.5,
                type: "spring"
              }}
              className={cn(
                "w-3 h-3 rounded-[2px] transition-colors duration-1000",
                getLevelColor(level)
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
