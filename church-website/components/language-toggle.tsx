"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  language: "en" | "zh"
  toggleLanguage: () => void
}

export default function LanguageToggle({ language, toggleLanguage }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-none border-2"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "中文" : "English"}</span>
    </Button>
  )
}

