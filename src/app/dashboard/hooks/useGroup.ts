import { useWindow } from "@/ui/window/useWindow"
import { useToggle } from "@/utils/hooks/useToggle"

export const useGroup = () => {
  const t = useToggle()
  const {open, setOpen} = useWindow({open: t.open, setOpen: t.toggle})

  return { open, setOpen, toggle: t.toggle }
}
