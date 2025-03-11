"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Youtube, Menu, X } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import VideoBackground from "@/components/video-background"
import DailyDevotional from "@/components/daily-devotional"
import EventsCalendar from "@/components/events-calendar"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const navItems = [
    { en: "ABOUT", zh: "关于我们" },
    { en: "MISSION", zh: "使命" },
    { en: "GROUPS", zh: "小组" },
    { en: "CONNECT", zh: "联系" },
    { en: "HISTORY", zh: "历史" },
    { en: "WATCH LIVE", zh: "在线观看" },
    { en: "BIBLE STUDY", zh: "查经" },
    { en: "GIVE", zh: "奉献" },
    { en: "YOUTH", zh: "青年" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl">
            SJCA
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.en}
                href={`/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium hover:underline underline-offset-8 decoration-2"
              >
                {language === "en" ? item.en : item.zh}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="font-bold text-2xl">
                  SJCA
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.en}
                    href={`/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-lg font-medium hover:underline underline-offset-8 decoration-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === "en" ? item.en : item.zh}
                  </Link>
                ))}
              </div>

              <div className="mt-auto mb-8 flex justify-center">
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-none border-2">
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-14">
        {/* Hero section with video background */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <VideoBackground />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-bold text-4xl md:text-6xl mb-4 tracking-tight">
                {language === "en" ? "SAN JOSE CHRISTIAN ASSEMBLY" : "圣何塞基督教会"}
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                {language === "en" ? "GROWING TOGETHER IN FAITH, HOPE, AND LOVE" : "在信心、盼望和爱中一起成长"}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly/streams" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-none">
                    {language === "en" ? "WATCH LIVE" : "在线观看"}
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-none border-2 bg-transparent">
                  {language === "en" ? "JOIN US" : "加入我们"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Info section */}
        <section className="py-16 flex bg-secondary items-center justify-center">
          <div className="container flex flex-col items-center justify-center">
            <div className="text-xl font-bold mb-4">
              {language === "en" ? "SUNDAYS AT 9:30 AM" : "欢欢欢欢欢欢欢欢"}
            </div>
            <div className="text-xl font-bold mb-4">
              {language === "en" ? "215 TOPAZ ST, MILPITAS, CA 95035" : "欢欢欢欢欢欢欢"}
            </div>
            <Link href="https://www.youtube.com/@SanJoseChristianAssembly/streams" target="_blank" rel="noopener noreferrer">
              <div className="text-xl font-semibold underline mb-4 text-tertiary">
                {language === "en" ? "Watch Live Here" : "欢欢欢欢欢欢欢"}
              </div>
            </Link>
            <div className="text-xl font-light italic mb-4 w-1/2 text-center">
              {language === "en" ? "\"For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.\"\nJohn 3:16" : "加入我们，一起崇拜、学习、团契。"}
            </div>
          </div>
          
        </section>

        {/* New Buttons Section */}
        <div className="flex justify-center space-x-8">
          <Link href="/connect">
            <Button className="rounded-none">{language === "en" ? "Get Connected" : "欢欢欢欢欢欢欢"}</Button>
          </Link>
          <Link href="/upcoming-events">
            <Button className="rounded-none">{language === "en" ? "Upcoming Events" : "欢欢欢欢欢欢欢"}</Button>
          </Link>
        </div>

        {/* Pastor Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                {language === "en" ? "MEET OUR PASTOR" : "欢欢欢欢欢欢欢"}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/pastor.jpg?height=400&width=400"
                      alt={language === "en" ? "Pastor John Smith" : "欢欢欢欢欢欢欢"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {language === "en" ? "Pastor Merry Jeng" : "欢欢欢欢欢欢欢"}
                  </h3>
                  <p className="text-muted-foreground italic mb-4">
                    {language === "en" ? "Senior Pastor" : "欢欢欢欢欢欢欢"}
                  </p>
                  <p className="mb-4">
                    {language === "en"
                      ? "Pastor Merry has been serving our congregation for over 15 years. Her passion is to help people grow in their relationship with Jesus Christ and find their purpose in God's plan."
                      : "欢欢欢欢欢欢"}
                  </p>
                  <p>
                    {language === "en"
                      ? "We invite you to join us this Sunday to experience God's love and the warmth of our community."
                      : "欢欢欢欢欢欢欢"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Daily devotional */}
              <DailyDevotional language={language} />

              {/* Events calendar */}
              <EventsCalendar language={language} />

              {/* Connect card */}
              <div className="bg-white border-2 border-black p-6 flex flex-col h-full">
                <h2 className="font-bold text-xl mb-4">{language === "en" ? "Connect With Us" : "与我们联系"}</h2>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "Join our community and stay updated with our latest events and announcements."
                    : "加入我们的社区，了解我们最新的活动和公告。"}
                </p>
                <div className="mt-auto">
                  <Link href="/connect">
                    <Button className="w-full rounded-none">{language === "en" ? "Get Connected" : "保持联系"}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">
                {language === "en" ? "San Jose Christian Assembly" : "圣何塞基督教会"}
              </h3>
              <p className="text-gray-400">
                {language === "en"
                  ? "215 Topaz St, Milpitas, CA 95035"
                  : "加利福尼亚州圣何塞教堂街123号，邮编95123"}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">{language === "en" ? "Service Times" : "礼拜时间"}</h3>
              <p className="text-gray-400">
                {language === "en" ? "Sunday: 9:30 AM" : "周日：上午9:30"}
              </p>
              <p className="text-gray-400">
                {language === "en" ? "Friday Bible Study: 8:00 PM" : "8:00"}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">{language === "en" ? "Follow Us" : "关注我们"}</h3>
              <div className="flex space-x-4">
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-none border-2 bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-white"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

