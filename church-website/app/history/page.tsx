"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronUp } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import TimelineEvent from "@/components/timeline-event"

export default function HistoryPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const navItems = [
    { en: "About", zh: "关于我们" },
    { en: "Mission", zh: "使命" },
    { en: "Groups", zh: "小组" },
    { en: "Connect", zh: "联系" },
    { en: "History", zh: "历史" },
    { en: "Watch Live", zh: "在线观看" },
    { en: "Bible Study", zh: "查经" },
    { en: "Give", zh: "奉献" },
    { en: "Youth", zh: "青年" },
  ]

  // Timeline events data
  const timelineEvents = [
    {
      year: "1975",
      title: { en: "Church Founded", zh: "教会成立" },
      description: {
        en: "San Jose Christian Assembly was founded by a small group of believers meeting in a living room.",
        zh: "圣何塞基督教会由一小群在客厅聚会的信徒创立。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "1982",
      title: { en: "First Building", zh: "第一座教堂" },
      description: {
        en: "The congregation purchased its first building, a former warehouse that was renovated into a sanctuary.",
        zh: "会众购买了第一座建筑，一个改造成圣所的旧仓库。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "1995",
      title: { en: "Community Outreach", zh: "社区外展" },
      description: {
        en: "SJCA began its community outreach programs, including food drives and after-school programs.",
        zh: "SJCA开始了社区外展计划，包括食品募捐和课后计划。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2003",
      title: { en: "Chinese Ministry", zh: "中文事工" },
      description: {
        en: "The Chinese Ministry was established to serve the growing Chinese community in San Jose.",
        zh: "中文事工成立，为圣何塞不断增长的华人社区服务。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2010",
      title: { en: "New Campus", zh: "新校区" },
      description: {
        en: "SJCA moved to its current location, a larger campus to accommodate the growing congregation.",
        zh: "SJCA搬到了现在的位置，一个更大的校区，以容纳不断增长的会众。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2015",
      title: { en: "Youth Center", zh: "青年中心" },
      description: {
        en: "The Youth Center was built, providing a dedicated space for youth programs and activities.",
        zh: "青年中心建成，为青年项目和活动提供专用空间。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2020",
      title: { en: "Online Services", zh: "在线服务" },
      description: {
        en: "In response to the global pandemic, SJCA launched its online services, reaching people beyond San Jose.",
        zh: "为应对全球疫情，SJCA推出了在线服务，接触到圣何塞以外的人们。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2025",
      title: { en: "Looking Forward", zh: "展望未来" },
      description: {
        en: "As we celebrate our 50th anniversary, we look forward to continuing our mission of growing together in faith, hope, and love.",
        zh: "在我们庆祝50周年之际，我们期待继续我们在信心、盼望和爱中一起成长的使命。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  // Handle scroll events to update timeline progress
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.body.scrollHeight
        const maxScroll = documentHeight - windowHeight

        // Calculate scroll percentage
        const scrollPercentage = Math.min(scrollPosition / maxScroll, 1)
        setScrollProgress(scrollPercentage * 100)

        // Show/hide scroll to top button
        if (scrollToTopRef.current) {
          if (scrollPosition > windowHeight) {
            scrollToTopRef.current.classList.remove("opacity-0")
            scrollToTopRef.current.classList.add("opacity-100")
          } else {
            scrollToTopRef.current.classList.remove("opacity-100")
            scrollToTopRef.current.classList.add("opacity-0")
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

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
                className={`text-sm font-medium hover:underline underline-offset-8 decoration-2 ${
                  item.en === "History" ? "underline" : ""
                }`}
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
                    className={`text-lg font-medium hover:underline underline-offset-8 decoration-2 ${
                      item.en === "History" ? "underline" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === "en" ? item.en : item.zh}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
        {/* Hero section */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-6xl mb-4 tracking-tight">
              {language === "en" ? "Our History" : "我们的历史"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {language === "en"
                ? "The journey of San Jose Christian Assembly through the years"
                : "圣何塞基督教会多年来的旅程"}
            </p>
          </div>
        </section>

        {/* Timeline section */}
        <section className="py-16 relative" ref={timelineRef}>
          <div className="container mx-auto px-4">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full bg-black transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Timeline events */}
            <div className="relative z-10">
              {timelineEvents.map((event, index) => (
                <TimelineEvent
                  key={index}
                  year={event.year}
                  title={language === "en" ? event.title.en : event.title.zh}
                  description={language === "en" ? event.description.en : event.description.zh}
                  image={event.image}
                  isLeft={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      <div ref={scrollToTopRef} className="fixed bottom-8 right-8 z-40 opacity-0 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-2 border-black bg-white"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>

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
                {language === "en" ? "Wednesday Bible Study: 7:00 PM" : "周三查经：晚上7:00"}
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

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()}{" "}
              {language === "en" ? "San Jose Christian Assembly. All rights reserved." : "圣何塞基督教会。版权所有。"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

