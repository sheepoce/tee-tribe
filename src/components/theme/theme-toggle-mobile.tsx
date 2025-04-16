
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggleMobile() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button 
      onClick={toggleTheme}
      className="flex flex-col items-center justify-center" 
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs mt-1">Light</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs mt-1">Dark</span>
        </>
      )}
    </button>
  )
}
