
import { Moon } from "lucide-react"

export function ThemeToggleMobile() {
  return (
    <div className="flex flex-col items-center justify-center opacity-50 cursor-not-allowed">
      <Moon className="h-5 w-5 text-muted-foreground" />
      <span className="text-xs mt-1">Dark</span>
    </div>
  )
}
