"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Heart } from "lucide-react"
import VideoBackground from "@/components/video-background"
import DailyDevotional from "@/components/daily-devotional"
import EventsCalendar from "@/components/events-calendar"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "./components/main-footer"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [verseData, setVerseData] = useState<DailyBreadData | null>(null)
  interface DailyBreadData {
    verse: string;
    verse_zh: string;
    content: string;
    content_zh: string;
    date: string;
    verses: Verse[];
    verses_zh: Verse[];
  }

  interface Verse {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }


  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const { DateTime } = require('luxon');
  // Get today's date in Pacific Time
  const date = DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd');

  useEffect(() => {
    const fetchVerseData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/daily-bread?date=${date}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch verse data")
        }
        
        const data = await response.json()
        setVerseData(data)
      } catch (error) {
        console.error("Error fetching verse data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerseData()
  }, [date])

  
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en"
    setLanguage(newLanguage)
    
    toast({
      title: newLanguage === "en" ? "Language Changed" : "语言已更改",
      description: newLanguage === "en" ? "Switched to English" : "已切换至中文",
      duration: 2000,
    })
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

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

        {/* Daily Verse Section - New */}
        <section className="pt-12 pb-4 bg-secondary border-b-2">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl font-bold mb-6">
                {language === "en" ? "TODAY'S DAILY BREAD" : "今日经文"}
              </h2>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ) : verseData ? (
                <>
                  <blockquote className="text-2xl italic mb-4">
                    <Link 
                      href={`/daily-bread?date=${verseData.date}`}
                      className="hover:underline"
                    >
                      {language === "en" ? verseData.verse : verseData.verse_zh}
                    </Link>
                  </blockquote>
                </>
              ) : (
                <p className="text-lg text-gray-600">
                  {language === "en" ? "Loading daily bread..." : "加载中..."}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Welcome section */}
        <section className="py-16 bg-white">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4"
          >
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto text-center"
            >
              <h1 className="font-bold text-4xl md:text-6xl mb-4 tracking-tight">
                {language === "en" ? "WELCOME TO YOUR NEW FAMILY IN CHRIST" : "欢迎加入你在基督里的新家庭"}
              </h1>
            </motion.div>
          </motion.div>
        </section>

        {/* Info section */}
        <section className="bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl font-bold mb-4"
              >
                {language === "en" ? "JOIN US FOR WORSHIP" : "加入我们的敬拜"}
              </motion.h2>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-lg font-bold mb-2">{language === "en" ? "SUNDAYS AT 9:30AM" : "周日上午9:30"}</p>
                <p className="mb-6">215 TOPAZ ST, MILPITAS, CA 95035</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-2xl py-10 mx-auto mb-12"
              >
                <p className="text-lg italic mb-4">
                  {language === "en"
                    ? "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
                    : "神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。"}
                </p>
                <p className="font-bold">{language === "en" ? "John 3:16" : "约翰福音 3:16"}</p>
              </motion.div>

              {/* Buttons */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-24 mt-12"
              >
                <Link href="/connect">
                  <Button className="rounded-none min-w-[200px]">
                    {language === "en" ? "Get Connected" : "欢欢欢欢欢欢欢"}
                  </Button>
                </Link>
                <Link href="/events">
                  <Button className="rounded-none min-w-[200px]">
                    {language === "en" ? "Upcoming Events" : "欢欢欢欢欢欢欢"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pastor Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold mb-8 text-center"
              >
                {language === "en" ? "MEET OUR PASTOR" : "欢欢欢欢欢欢欢"}
              </motion.h2>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ministry Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              {language === "en" ? "GET INVOLVED" : "我们的事工"}
            </motion.h2>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Groups */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <Link href="/groups" className="group block">
                  <div className="overflow-hidden relative mb-6">
                    <div className="aspect-square">
                      <img
                        src="/pexels-eberhardgross-691668.jpg?height=400&width=400"
                        alt={language === "en" ? "SMALL GROUPS" : "小组"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Users className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </Link>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "SMALL GROUPS" : "小组"}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {language === "en"
                    ? "Connect with others in our community through small groups where we study, pray, and grow together."
                    : "通过小组与我们社区中的其他人联系，我们一起学习、祈祷和成长。"}
                </p>
              </motion.div>

              {/* Bible Study */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <Link href="/bible-study" className="group block">
                  <div className="overflow-hidden relative mb-6">
                    <div className="aspect-square">
                      <img
                        src="/pexels-lum3n-44775-167699.jpg?height=400&width=400"
                        alt={language === "en" ? "BIBLE STUDY" : "查经"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </Link>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "BIBLE STUDY" : "查经"}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {language === "en"
                    ? "Deepen your understanding of God's Word through our weekly Bible studies and theological discussions."
                    : "通过我们每周的查经和神学讨论，加深您对上帝话语的理解。"}
                </p>
              </motion.div>

              {/* Youth */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <Link href="/youth" className="group block">
                  <div className="overflow-hidden relative mb-6">
                    <div className="aspect-square">
                      <img
                        src="/pexels-markusspiske-113338.jpg?height=400&width=400"
                        alt={language === "en" ? "YOUTH" : "青年"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        className="h-16 w-16 text-white"
                      >
                        <path d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "YOUTH" : "青年"}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {language === "en"
                    ? "Our youth ministry provides a safe and fun environment for teenagers to build friendships and grow in their faith."
                    : "我们的青年事工为青少年提供了一个安全、有趣的环境，让他们建立友谊并在信仰中成长。"}
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <Link href="/mission" className="group block">
                  <div className="overflow-hidden relative mb-6">
                    <div className="aspect-square">
                      <img
                        src="/pexels-sebastian-189349.jpg?height=400&width=400"
                        alt={language === "en" ? "MISSION" : "使命"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </Link>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "MISSION" : "使命"}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {language === "en"
                    ? "We are committed to serving our local community and supporting global missions to share God's love with the world."
                    : "我们致力于服务我们的本地社区，并支持全球使命，与世界分享上帝的爱。"}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Daily devotional */}
              {/* TODO: Subscribe button doesn't work */}
              <DailyDevotional language={language} />
                  
              {/* Events calendar */}
              {/* TODO: Events calendar is offset */}
              {/* TODO: Events calendar doesn't read from DB */}
              <EventsCalendar language={language} />

              {/* Bible Study card */}
              {/* TODO: This needs to be updated from DB */}
              <div className="bg-white border-2 border-black p-6 flex flex-col h-full">
                <h2 className="font-bold text-xl mb-4">{language === "en" ? "Bible Study" : "查经"}</h2>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "Join us this Friday night at 7:30 PM for a Bible study on 1 Timothy 6:3-21. This week we will be discussing the importance of contentment and how it relates to our faith."
                    : "本周学习的经文：提摩太前书 6:3-21。加入我们，一起探讨这段经文的教导和见解。"}
                </p>
                <div className="mt-auto">
                  <Link href="/bible-study">
                    <Button className="w-full rounded-none">{language === "en" ? "Join Bible Study" : "参加查经"}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MainFooter language={language} />
    </div>
  )
}

