"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ChatContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  openChatWithMessage: (message: string) => void
  initialMessage: string
  setInitialMessage: (message: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMessage, setInitialMessage] = useState("")

  const openChatWithMessage = (message: string) => {
    setInitialMessage(message)
    setIsOpen(true)
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openChatWithMessage,
        initialMessage,
        setInitialMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}
