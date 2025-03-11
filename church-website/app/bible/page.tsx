"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, ChevronLeft, ChevronRight, Search, Bookmark, Share2, ArrowLeft, ArrowRight } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import BibleNavigation from "@/components/bible-navigation"
import { bibleData, type BibleBook } from "@/lib/bible-data"

export default function BibleStudyPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(bibleData[0])
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [fontSize, setFontSize] = useState(16)

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

  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book)
    setSelectedChapter(1)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter)
  }

  const nextChapter = () => {
    if (!selectedBook) return

    if (selectedChapter < selectedBook.chapters.length) {
      setSelectedChapter(selectedChapter + 1)
    } else {
      // Move to next book
      const currentBookIndex = bibleData.findIndex((book) => book.id === selectedBook.id)
      if (currentBookIndex < bibleData.length - 1) {
        setSelectedBook(bibleData[currentBookIndex + 1])
        setSelectedChapter(1)
      }
    }
  }

  const previousChapter = () => {
    if (!selectedBook) return

    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
    } else {
      // Move to previous book
      const currentBookIndex = bibleData.findIndex((book) => book.id === selectedBook.id)
      if (currentBookIndex > 0) {
        const prevBook = bibleData[currentBookIndex - 1]
        setSelectedBook(prevBook)
        setSelectedChapter(prevBook.chapters.length)
      }
    }
  }

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2)
    }
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
                  item.en === "Bible Study" ? "underline" : ""
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
                      item.en === "Bible Study" ? "underline" : ""
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

      <main className="flex-1 pt-20 flex">
        {/* Bible navigation sidebar */}
        <div
          className={`fixed top-20 bottom-0 bg-white border-r border-black z-40 transition-all duration-300 ${
            sidebarOpen ? "left-0" : "-left-30"
          } w-80 md:relative md:top-0 md:left-0 md:z-0`}
        >
          <div className="p-4 border-b border-black">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={language === "en" ? "Search Bible" : "搜索圣经"}
                className="pl-10 rounded-none border-2 border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <BibleNavigation
            books={bibleData}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            onBookSelect={handleBookSelect}
            onChapterSelect={handleChapterSelect}
            language={language}
            searchQuery={searchQuery}
          />
        </div>

        {/* Toggle sidebar button (mobile only) */}
        <button
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 z-30 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {/* Bible content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-40" : "ml-0"}`}>
          {selectedBook && (
            <div className="p-4 md:p-8">
              {/* Bible reading controls */}
              <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={previousChapter}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-bold">
                    {selectedBook.name} {selectedChapter}
                  </h2>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={nextChapter}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={decreaseFontSize}
                  >
                    <span className="text-sm">A-</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={increaseFontSize}
                  >
                    <span className="text-sm">A+</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-none border-2 border-black">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-none border-2 border-black">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bible text */}
              <div className="max-w-3xl mx-auto" style={{ fontSize: `${fontSize}px` }}>
                {selectedBook.chapters[selectedChapter - 1].verses.map((verse) => (
                  <div key={verse.number} className="mb-4">
                    <span className="font-bold text-sm align-super mr-2">{verse.number}</span>
                    <span>{verse.text}</span>
                  </div>
                ))}
              </div>

              {/* Chapter navigation */}
              <div className="flex justify-between items-center mt-12 max-w-3xl mx-auto">
                <Button variant="outline" className="rounded-none border-2 border-black" onClick={previousChapter}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  {language === "en" ? "Previous Chapter" : "上一章"}
                </Button>
                <Button variant="outline" className="rounded-none border-2 border-black" onClick={nextChapter}>
                  {language === "en" ? "Next Chapter" : "下一章"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">
                {language === "en" ? "San Jose Christian Assembly" : "圣何塞基督教会"}
              </h3>
              <p className="text-gray-400">
                {language === "en"
                  ? "123 Church Street, San Jose, CA 95123"
                  : "加利福尼亚州圣何塞教堂街123号，邮编95123"}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">{language === "en" ? "Service Times" : "礼拜时间"}</h3>
              <p className="text-gray-400">
                {language === "en" ? "Sunday: 9:00 AM & 11:00 AM" : "周日：上午9:00和上午11:00"}
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

