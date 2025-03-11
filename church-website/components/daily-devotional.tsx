"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Book } from "lucide-react"

interface DailyDevotionalProps {
  language: "en" | "zh"
}

export default function DailyDevotional({ language }: DailyDevotionalProps) {
  const [verse, setVerse] = useState({
    en: {
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      reference: "John 3:16",
    },
    zh: {
      text: "神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。",
      reference: "约翰福音 3:16",
    },
  })

  const [devotion, setDevotion] = useState({
    en: "Take a moment today to reflect on God's incredible love for you. How might this change how you approach your day?",
    zh: "今天花点时间思考上帝对你的无比的爱。这如何改变你对待一天的方式？",
  })

  return (
    <div className="border-2 border-black bg-white h-full p-6">
      <div className="pb-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Book className="h-5 w-5" />
          {language === "en" ? "Daily Bread" : "每日灵修"}
        </div>
        <div className="text-muted-foreground text-sm">
          {language === "en" ? "Today's verse and reflection" : "今日经文与反思"}
        </div>
      </div>
      <div className="py-4">
        <blockquote className="border-l-4 border-black pl-4 italic mb-4">
          <p className="text-gray-700">{language === "en" ? verse.en.text : verse.zh.text}</p>
          <footer className="text-sm text-gray-500 mt-1">
            {language === "en" ? verse.en.reference : verse.zh.reference}
          </footer>
        </blockquote>
        <p className="text-muted-foreground">{language === "en" ? devotion.en : devotion.zh}</p>
      </div>
      <div className="pt-4">
        <Button variant="outline" className="w-full rounded-none border-2">
          {language === "en" ? "Subscribe to Daily Devotions" : "订阅每日灵修"}
        </Button>
      </div>
    </div>
  )
}

