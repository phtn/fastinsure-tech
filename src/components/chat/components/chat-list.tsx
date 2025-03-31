import { Icon } from "@/lib/icon"
import { ButtSqx } from "@/ui/button/button"
import { Avatar, Input } from "@nextui-org/react"

interface ChatPreview {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  isOnline?: boolean
  type?: string
}

interface ChatListProps {
  chats: ChatPreview[]
  onSelectChat: (id: string) => void
  onClose: () => void
}

export function ChatList({ chats, onSelectChat, onClose }: ChatListProps) {
  return (
    <div className="w-full min-w-[320px] h-full flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-inst tracking-tight font-bold">Chats</h1>
        <div className="flex items-center gap-2">
          <ButtSqx icon="plus-sign" iconStyle="group-hover/btn:text-indigo-950" shadow="text-macd-gray/10" />
          <ButtSqx icon="square-arrow-left" iconStyle="group-hover/btn:text-indigo-950" shadow="text-macd-gray/10" onClick={onClose} className="md:hidden" />
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <Input placeholder="Search"  classNames={{
            inputWrapper: 'w-full border border-macl-gray/40 bg-chalk',
          }}  startContent={<Icon name="search" className="size-4"/>} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors"
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="relative flex-shrink-0">
              <Avatar src={chat.avatar} alt={chat.name} size="sm"/>

              {chat.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold truncate">{chat.name}</span>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount && (
              <span className="bg-[#6B4EFF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 ml-2">
                {chat.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
