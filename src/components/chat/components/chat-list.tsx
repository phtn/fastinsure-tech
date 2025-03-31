import { Icon } from "@/lib/icon"
import { cn } from "@/lib/utils"
import { ButtSqx } from "@/ui/button/button"
import { getInitials } from "@/utils/helpers"
import { Avatar, Input } from "@nextui-org/react"

interface ChatPreview {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  isOnline?: boolean
  isTyping?: boolean
}

interface ChatListProps {
  chats: ChatPreview[]
  onSelectChat: (id: string) => void
  onClose: () => void
}

export function ChatList({ chats, onSelectChat, onClose }: ChatListProps) {
  return (
    <div className="w-full min-w-[360px] h-full flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-inst tracking-tight font-bold">Chats</h1>
        <div className="flex items-center gap-2">
          <ButtSqx icon="plus-sign" iconStyle="group-hover/btn:text-indigo-950" shadow="text-macd-gray/10" />
          <ButtSqx icon="square-arrow-left" iconStyle="group-hover/btn:text-indigo-950" shadow="text-macd-gray/10" onClick={onClose} className="md:hidden" />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="relative">
          <Input placeholder="Search" classNames={{
            inputWrapper: 'w-full border-[0.33px] border-macl-gray/60 bg-[#FEFEFE]',
            input: "placeholder:text-macl-gray/80 placeholder:tracking-tight"
          }}  startContent={<Icon name="search" className="size-3.5 text-macl-gray/80"/>} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full p-4 flex items-center hover:bg-gray-100 transition-colors"
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="relative flex-shrink-0">
              <Avatar src={chat.avatar} alt={chat.name} size="sm" fallback={getInitials(chat.name)} />

              {chat.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0 ps-3">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-start space-x-1.5 font-semibold tracking-tight truncate">
                  <span>{chat.name}</span>
                  <Icon name="chat-round-dots-linear" className={cn("size-3.5 text-primary/80", {"hidden": !chat.isTyping})} />
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-left text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            <div className="size-7 flex items-center justify-end">
              <span className={cn("bg-macl-blue animate-enter text-white text-[10px] font-medium rounded-full size-5 flex items-center justify-center flex-shrink-0", {"hidden": !chat.unreadCount})}>
                {chat.unreadCount}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
