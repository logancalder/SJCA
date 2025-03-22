"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WatchLivePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
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
        {/* Live Stream Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">
                {language === "en" ? "WATCH LIVE" : "在线观看"}
              </h1>
              <p className="text-xl text-gray-600">
                {language === "en" 
                  ? "Join us for our live service every Sunday at 9:30 AM PST"
                  : "每周日上午9:30（太平洋时间）加入我们的在线崇拜"}
              </p>
            </motion.div>

            {/* YouTube Embed */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-video w-full mb-8"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/@SanJoseChristianAssembly/live"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* Past Services */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Past Services" : "往期崇拜"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Watch our previous services and special events on our YouTube channel."
                    : "在我们的YouTube频道观看往期崇拜和特别活动。"}
                </p>
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly/videos" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-none">
                    {language === "en" ? "View Archive" : "查看存档"}
                  </Button>
                </Link>
              </div>

              {/* Subscribe */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Stay Connected" : "保持联系"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Subscribe to our YouTube channel to receive notifications for upcoming live streams."
                    : "订阅我们的YouTube频道，获取直播通知。"}
                </p>
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-none">
                    {language === "en" ? "Subscribe" : "订阅"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
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
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly" target="_blank" rel="noopener noreferrer">
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
