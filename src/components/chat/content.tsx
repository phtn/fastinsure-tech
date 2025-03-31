'use client'

import { useState, useRef, useEffect } from "react"
import { ChatHeader } from "./components/chat-header"
import { ChatInput } from "./components/chat-input"
import { ChatList } from "./components/chat-list"
import { ChatMessage } from "./components/chat-message"

const SAMPLE_CHATS = [
  {
    id: "1",
    name: "George Alan",
    lastMessage: "Lorem ipsum dolor sit amet consectetur...",
    timestamp: "4:30 PM",
    unreadCount: 4,
    isOnline: true,
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: "2",
    name: "Uber Cars",
    lastMessage: "Form",
    timestamp: "4:30 PM",
    unreadCount: 1,
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: "3",
    name: "Safiya Fareena",
    lastMessage: "Scheduler",
    timestamp: "4:30 PM",
    unreadCount: 1,
    isOnline: true,
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: "4",
    name: "Robert Allen",
    lastMessage: "You unblocked this user",
    timestamp: "4:30 PM",
    unreadCount: 9,
    isOnline: true,
    isTyping: true,
    avatar: "/placeholder.svg?height=50&width=50"
  },
  {
    id: "5",
    name: "Epic Game",
    lastMessage: "John Paul: @Robert Lorem ips...",
    timestamp: "4:30 PM",
    unreadCount: 24,
    avatar: "/placeholder.svg?height=50&width=50"
  },
]

const SAMPLE_MESSAGES = [
  {
    content: "Sending them over now.",
    timestamp: "4:56 pm",
    isOutgoing: false
  },
  {
    content: "Thanks! Looks good.",
    timestamp: "4:56 pm",
    isOutgoing: true
  },
  {
    content: "I'll take it. Can you ship it?",
    timestamp: "4:56 pm",
    isOutgoing: true
  },
  {
    content: "Absolutely. Just send your address, and I'll ship it out.",
    timestamp: "4:56 pm",
    isOutgoing: false
  },
  {
    content: "Great, I'll send it now. Thanks!",
    timestamp: "4:56 pm",
    isOutgoing: true
  },
  {
    content: "Thank you!",
    timestamp: "4:56 pm",
    isOutgoing: false
  }
]

export function Chats() {
  const [inputValue, setInputValue] = useState("")
  const [selectedChat, setSelectedChat] = useState(SAMPLE_CHATS[0])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="flex h-screen bg-white">
      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          w-96 border-r transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed left-0 top-0 bottom-0 z-30 bg-white
          lg:relative lg:translate-x-0
        `}
      >
        <ChatList
          chats={SAMPLE_CHATS}
          onSelectChat={(id) => {
            const chat = SAMPLE_CHATS.find(c => c.id === id)
            if (chat) {
              setSelectedChat(chat)
              closeSidebar()
            }
          }}
          onClose={closeSidebar}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full lg:w-[calc(100%-24rem)]">
        <ChatHeader
          name={selectedChat?.name}
          isTyping={true}
          avatarSrc={selectedChat?.avatar}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {SAMPLE_MESSAGES.map((message, i) => (
            <ChatMessage key={i} {...message} />
          ))}
        </div>
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={() => {
            if (inputValue.trim()) {
              // Handle sending message
              setInputValue("")
            }
          }}
        />
      </div>
    </div>
  )
}
