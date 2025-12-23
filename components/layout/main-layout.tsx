"use client"

import * as React from "react"
import { Dock, DockIcon } from "@/components/ui/dock"
import {
  Home,
  Briefcase,
  FolderOpen,
  User,
  Mail,
  Linkedin,
  Github,
  Monitor,
  Sun,
  Moon
} from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "system") setTheme("light")
    else if (theme === "light") setTheme("dark")
    else setTheme("system")
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Abstract Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black opacity-80" />

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Main Content Area */}
      <main className="pb-32 pt-12">
        {children}
      </main>

      {/* Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider>
          <Dock className="shadow-2xl dark:shadow-slate-900/50 border border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
            <DockIcon onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Home className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </TooltipTrigger>
                <TooltipContent><p>Home</p></TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Briefcase className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </TooltipTrigger>
                <TooltipContent><p>Experience</p></TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FolderOpen className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </TooltipTrigger>
                <TooltipContent><p>Projects</p></TooltipContent>
              </Tooltip>
            </DockIcon>
            {/* Divider or spacer could be added here */}

            <DockIcon onClick={cycleTheme}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    {!mounted ? (
                      <Monitor className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                    ) : theme === 'light' ? (
                      <Sun className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                    ) : theme === 'dark' ? (
                      <Moon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                    ) : (
                      <Monitor className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{!mounted ? "System" : theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  )
}
