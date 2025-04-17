
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme } = useTheme()

  return (
    <Button variant="ghost" size="icon" className="rounded-full" disabled>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:text-white" />
      <span className="sr-only">Dark mode</span>
    </Button>
  )
}
