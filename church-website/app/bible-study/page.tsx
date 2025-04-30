"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, MapPin } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"

export default function BibleStudyPage() {
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
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/easter_25/DSC_0656.jpg"
          initialOffset={0}
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
                  {language === "en" ? "BIBLE STUDY" : "查经"}
                </h1>
                <p className="text-xl max-w-2xl mx-auto">
                  {language === "en" 
                    ? "Dive deeper into God's Word together"
                    : "一起深入研读神的话语"}
                </p>
        </ParallaxHero>

        {/* Current Study Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {language === "en" ? "Current Study" : "当前学习"}
                  </h2>
                  <p className="text-xl mb-6">
                    {language === "en"
                      ? "Join us as we study the Book of Romans, exploring the foundations of our faith and the transformative power of the Gospel."
                      : "加入我们学习罗马书，探索我们信仰的基础和福音的转化力量。"}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <span>{language === "en" ? "Every Friday at 7:30 PM" : "每周五晚上7:30"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      <span>215 Topaz St, Milpitas, CA 95035</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5" />
                      <span>{language === "en" ? "Current Chapter: Romans 8" : "当前章节：罗马书第8章"}</span>
                    </div>
                  </div>
                </div>
                <div className="aspect-square">
                  <img
                    src="/bible-study-current.jpg"
                    alt="Current Bible Study"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Study Format */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-12">
                {language === "en" ? "What to Expect" : "学习方式"}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Group Discussion" : "小组讨论"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "Interactive discussion in small groups to share insights and questions."
                      : "小组互动讨论，分享见解和问题。"}
                  </p>
                </div>
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Biblical Teaching" : "圣经教导"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "In-depth teaching from experienced leaders and pastors."
                      : "经验丰富的领袖和牧师的深入教导。"}
                  </p>
                </div>
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Prayer Time" : "祷告时间"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "Dedicated time for group prayer and spiritual growth."
                      : "专注于小组祷告和属灵成长的时间。"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
