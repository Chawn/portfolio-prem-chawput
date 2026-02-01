"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Send, Sparkles } from "lucide-react"
import { useChatContext } from "@/context/chat-context"
import { cn } from "@/lib/utils"

const PLACEHOLDERS = [
  "Ask about my work experience...",
  "Ask about my tech stack...",
  "How can I contact you?",
  "What is your latest project?",
  "Ask me anything!",
]

export function ChatInputTrigger() {
  const { openChatWithMessage } = useChatContext()
  const [input, setInput] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    openChatWithMessage(input)
    setInput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-xl mx-auto mt-8 px-4"
    >
      <div className={cn(
        "relative group rounded-full p-1 bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl transition-all duration-300",
        isFocused ? "p-[2px] from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/20" : "hover:bg-white/5"
      )}>
        <form onSubmit={handleSubmit} className="relative flex items-center bg-white/10 dark:bg-black/40 rounded-full border border-white/20 overflow-hidden backdrop-blur-xl">
          <div className="pl-4 text-muted-foreground/50">
            <Sparkles className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-none px-4 py-4 text-base md:text-lg focus:outline-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-transparent z-10"
          />

          <AnimatePresence mode="wait">
            {!input && (
              <motion.div
                key={placeholderIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute left-14 pointer-events-none text-slate-500 dark:text-slate-400 text-base md:text-lg"
              >
                {PLACEHOLDERS[placeholderIndex]}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-0 disabled:scale-75 transition-all duration-200 z-20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs md:text-sm text-slate-500 mt-3 font-medium"
      >
        Try asking me about my projects or schedule a call!
      </motion.p>
    </motion.div>
  )
}
