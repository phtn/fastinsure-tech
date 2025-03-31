import { ButtSqx } from "@/ui/button/button"
import { Input } from "@nextui-org/react"
import { type ChangeEvent } from "react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <ButtSqx icon="plus-sign" iconStyle="group-hover/btn:text-indigo-800" size="lg" shadow="text-macl-gray/20" onClick={onSend} />
        <ButtSqx icon="microphone-linear" iconStyle="group-hover/btn:text-indigo-800" size="lg" shadow="text-macl-gray/20" />
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Input
            value={value}
            onChange={handleChange}
            placeholder="Message"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            classNames={{
              inputWrapper: "border-none shadow-none"
            }}
          />
        </div>
        <ButtSqx icon="arrow-left-02" iconStyle="rotate-90 group-hover/btn:text-white" shadow="text-macl-blue" onClick={onSend} size="lg" />
      </div>
    </div>
  )
}
