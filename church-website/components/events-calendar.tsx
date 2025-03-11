"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

interface EventsCalendarProps {
  language: "en" | "zh"
}

export default function EventsCalendar({ language }: EventsCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Example events - in a real app, these would come from a database
  const events = [
    { date: new Date(2025, 2, 12), title: { en: "Sunday Service", zh: "主日崇拜" } },
    { date: new Date(2025, 2, 15), title: { en: "Bible Study", zh: "查经班" } },
    { date: new Date(2025, 2, 19), title: { en: "Youth Group", zh: "青年小组" } },
    { date: new Date(2025, 2, 22), title: { en: "Prayer Meeting", zh: "祷告会" } },
  ]

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Get events for the selected date
  const selectedDateEvents = events.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  return (
    <div className="border-2 border-black bg-white h-full p-6">
      <div className="pb-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <CalendarIcon className="h-5 w-5" />
          {language === "en" ? "Events Calendar" : "活动日历"}
        </div>
        <div className="text-muted-foreground text-sm">
          {language === "en" ? "Upcoming church events" : "即将举行的教会活动"}
        </div>
      </div>
      <div className="py-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border-2 border-black"
          modifiers={{
            event: (date) => isDayWithEvent(date),
          }}
          modifiersClassNames={{
            event: "bg-black text-white font-bold",
          }}
        />

        {selectedDateEvents.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">{language === "en" ? "Events on this day:" : "当天活动："}</h4>
            <ul className="space-y-2">
              {selectedDateEvents.map((event, index) => (
                <li key={index} className="text-sm border border-black p-2">
                  {language === "en" ? event.title.en : event.title.zh}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="pt-4">
        <Button variant="outline" className="w-full rounded-none border-2">
          {language === "en" ? "View All Events" : "查看所有活动"}
        </Button>
      </div>
    </div>
  )
}

