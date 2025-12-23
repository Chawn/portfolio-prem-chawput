"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Bot, MessageCircle, Clock, Globe } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ChatSession {
  id: string
  fingerprint: string
  ipAddress: string | null
  userAgent: string | null
  createdAt: string
  updatedAt: string
  _count: {
    logs: number
  }
}

interface ChatLog {
  id: string
  role: string
  content: string
  createdAt: string
}

interface SessionWithLogs extends ChatSession {
  logs: ChatLog[]
}

export default function ChatLogsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<SessionWithLogs | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/chat-logs')
      const data = await res.json()
      // Ensure data is an array before setting
      setSessions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  const fetchSessionLogs = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/chat-logs/${sessionId}`)
      const data = await res.json()
      setSelectedSession(data)
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Chat Logs Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <Card className="lg:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Sessions ({sessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {sessions.length === 0 ? (
                  <div className="p-4 text-center text-slate-500">
                    No chat sessions yet
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => fetchSessionLogs(session.id)}
                      className={`p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selectedSession?.id === session.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {session._count.logs} messages
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {formatDate(session.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Globe className="h-3 w-3" />
                        <span className="truncate">{session.ipAddress || 'Unknown'}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 truncate">
                        {session.fingerprint.slice(0, 8)}...
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                {selectedSession ? (
                  <span>Conversation - {formatDate(selectedSession.createdAt)}</span>
                ) : (
                  <span>Select a session to view</span>
                )}
              </CardTitle>
              {selectedSession && (
                <div className="text-sm text-slate-500">
                  IP: {selectedSession.ipAddress} | UA: {selectedSession.userAgent?.slice(0, 50)}...
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[550px] pr-4">
                {!selectedSession ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <MessageCircle className="h-16 w-16 mb-4 opacity-20" />
                    <p>Click on a session to view the conversation</p>
                  </div>
                ) : selectedSession.logs.length === 0 ? (
                  <div className="text-center text-slate-500">
                    No messages in this session
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {selectedSession.logs.map((log) => (
                      <div
                        key={log.id}
                        className={`flex gap-3 ${log.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className={
                            log.role === 'user'
                              ? 'bg-slate-200 dark:bg-slate-700'
                              : 'bg-indigo-100 dark:bg-indigo-900'
                          }>
                            {log.role === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-2xl px-4 py-2 text-sm shadow-sm max-w-[80%] ${log.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50'
                            }`}
                        >
                          {log.role === 'user' ? (
                            <p>{log.content}</p>
                          ) : (
                            <div className="prose dark:prose-invert text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-4 [&>p]:mb-2">
                              <ReactMarkdown>{log.content}</ReactMarkdown>
                            </div>
                          )}
                          <div className={`text-xs mt-1 ${log.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                            }`}>
                            {formatDate(log.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
