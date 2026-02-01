"use client"

import { useChatContext } from "@/context/chat-context"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"

export function ChatWidget() {
  /* REMOVED: const [isOpen, setIsOpen] = useState(false) */
  const { isOpen, setIsOpen, initialMessage, setInitialMessage } = useChatContext()
  const { messages, sendMessage, status, error } = useChat()
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoading = status === "submitted" || status === "streaming"

  // Auto-send initial message if present when chat opens
  useEffect(() => {
    if (isOpen && initialMessage) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        sendMessage({ role: 'user', content: initialMessage } as any)
        setInitialMessage("") // Clear it so it doesn't send again
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, initialMessage, sendMessage, setInitialMessage])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      }

      let id = getCookie('chat_user_id');
      if (!id) {
        id = crypto.randomUUID();
        document.cookie = `chat_user_id=${id}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const messageContent = input
    setInput("")
    await sendMessage({ role: 'user', content: messageContent } as any)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] sm:w-[400px]"
          >
            <Card className="border-slate-200/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute right-0 bottom-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900" />
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                      <AvatarImage src="/profile2.jpg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">Chat with Chawput (AI)</CardTitle>
                    <p className="text-xs text-muted-foreground">Ask me about my work!</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4 pr-4" ref={scrollRef}>
                  {messages.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground mt-12">
                      <Bot className="h-12 w-12 opacity-20" />
                      <p className="text-sm">Hi! I'm Chawput's AI assistant.<br />Ask me anything about his experience.</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    {messages.map((m: any) => (
                      <div
                        key={m.id}
                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          {m.role === "user" ? (
                            <><AvatarImage className="hidden" /><AvatarFallback className="bg-slate-200 dark:bg-slate-700"><User className="h-4 w-4" /></AvatarFallback></>
                          ) : (
                            <><AvatarImage src="/profile2.jpg" /><AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">AI</AvatarFallback></>
                          )}
                        </Avatar>

                        <div
                          className={`rounded-2xl px-4 py-2 text-sm shadow-sm max-w-[80%] ${m.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                            }`}
                        >
                          {m.content ? (
                            <div className="prose dark:prose-invert text-sm break-words leading-relaxed [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-2 [&>p]:mb-2 last:[&>p]:mb-0 [&>strong]:font-bold text-left">
                              <ReactMarkdown>
                                {m.content}
                              </ReactMarkdown>
                            </div>
                          ) : m.parts ? m.parts.map((part: any, i: number) => {
                            if (part.type === 'text') return (
                              <div key={i} className="prose dark:prose-invert text-sm break-words leading-relaxed [&>ul]:list-disc [&>ul]:pl-4 [&>p]:mb-2 last:[&>p]:mb-0 text-left">
                                <ReactMarkdown>
                                  {part.text}
                                </ReactMarkdown>
                              </div>
                            )
                            return null
                          }) : null}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src="/profile2.jpg" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src="/profile2.jpg" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl px-4 py-2 text-sm bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 text-red-600 dark:text-red-400">
                          Sorry, something went wrong. Please try again.
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center gap-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus-visible:ring-indigo-500"
                  />
                  <Button type="submit" size="icon" className="rounded-full h-10 w-10 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  )
}
