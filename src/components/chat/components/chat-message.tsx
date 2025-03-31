import { cn } from "@/lib/utils"

interface ChatMessageProps {
  content: string
  timestamp: string
  isOutgoing?: boolean
}

export function ChatMessage({ content, timestamp, isOutgoing }: ChatMessageProps) {
  return (
    <div className={cn("flex", isOutgoing ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
          isOutgoing
            ? "bg-[#6B4EFF] text-white"
            : "bg-gray-100 text-gray-900"
        )}
      >
        <p>{content}</p>
        <p className={cn(
          "text-xs mt-1",
          isOutgoing ? "text-white/70" : "text-gray-500"
        )}>
          {timestamp}
        </p>
      </div>
    </div>
  )
}
