"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MissionPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const missions = [
    {
      title: { en: "Local Outreach", zh: "本地外展" },
      description: {
        en: "Serving our local community through food drives, after-school programs, and community events.",
        zh: "通过食品募捐、课后计划和社区活动服务我们的本地社区。"
      },
      image: "/local-outreach.jpg"
    },
    {
      title: { en: "Global Missions", zh: "全球宣教" },
      description: {
        en: "Supporting missionaries and churches around the world to spread the Gospel.",
        zh: "支持世界各地的传教士和教会传播福音。"
      },
      image: "/global-missions.jpg"
    },
    {
      title: { en: "Disaster Relief", zh: "灾难救援" },
      description: {
        en: "Providing emergency assistance and support to communities affected by natural disasters.",
        zh: "为受自然灾害影响的社区提供紧急援助和支持。"
      },
      image: "/disaster-relief.jpg"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-6xl mb-4">
              {language === "en" ? "OUR MISSION" : "我们的使命"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {language === "en" 
                ? "Sharing God's love through service and outreach"
                : "通过服务和外展分享上帝的爱"}
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-8">
                {language === "en" ? "Our Vision" : "我们的愿景"}
              </h2>
              <p className="text-xl mb-8">
                {language === "en"
                  ? "To be a beacon of hope and love in our community, sharing the transformative power of Christ's message through action and service."
                  : "成为我们社区中希望和爱的灯塔，通过行动和服务分享基督信息的转化力量。"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Areas */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {missions.map((mission, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white border-2 border-black p-6"
                >
                  <div className="aspect-video mb-4 overflow-hidden">
                    <img
                      src={mission.image}
                      alt={language === "en" ? mission.title.en : mission.title.zh}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? mission.title.en : mission.title.zh}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === "en" ? mission.description.en : mission.description.zh}
                  </p>
                  <Button className="w-full rounded-none">
                    {language === "en" ? "Learn More" : "了解更多"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8">
                {language === "en" ? "Get Involved" : "参与其中"}
              </h2>
              <p className="text-xl mb-8">
                {language === "en"
                  ? "Join us in making a difference in our community and around the world."
                  : "加入我们，为我们的社区和世界带来改变。"}
              </p>
              <Link href="/connect">
                <Button size="lg" className="rounded-none">
                  {language === "en" ? "Contact Us" : "联系我们"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 