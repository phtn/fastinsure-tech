import { Icon } from "@/lib/icon"
import { ButtSqx } from "@/ui/button/button"
import { Avatar } from "@nextui-org/react"

interface ChatHeaderProps {
  name?: string
  isTyping?: boolean
  avatarSrc?: string
  onToggleSidebar: () => void
}

export function ChatHeader({ name, isTyping, avatarSrc, onToggleSidebar }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b">
      <ButtSqx icon="siderbar-linear" onClick={onToggleSidebar} shadow="text-macd-gray/20" iconStyle="group-hover/btn:text-indigo-950"/>

      <Avatar size="sm" src={avatarSrc} alt={name}>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-sm font-semibold">{name}</h2>
        {isTyping && (
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 bg-green-500 rounded-full" />
            <span>Typing </span>
            <Icon name="chat-round-dots-linear" className="size-4 text-macl-gray" />
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ButtSqx icon="videocam-linear" shadow="text-macd-gray/20" iconStyle="group-hover/btn:text-indigo-950"/>
        <ButtSqx icon="phone-rounded-linear" shadow="text-macd-gray/20" iconStyle="group-hover/btn:text-indigo-950"/>
        <ButtSqx icon="info-circle-fill" shadow="text-macd-gray/20" iconStyle="text-macd-gray group-hover/btn:text-indigo-950"/>

      </div>
    </div>
  )
}
