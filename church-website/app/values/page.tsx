"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Globe, Users, Book, Cross, Lightbulb } from "lucide-react"

export default function ValuesPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const coreValues = [
    {
      title: { en: "Faith", zh: "信心" },
      description: {
        en: "We believe in the transformative power of faith in Jesus Christ and the authority of God's Word.",
        zh: "我们相信耶稣基督的信心和上帝话语的权威具有转化力量。"
      },
      details: {
        en: "Our faith in Jesus Christ is the foundation of everything we do. We believe in the power of prayer, the guidance of the Holy Spirit, and the transformative work of God in our lives. Through faith, we find strength, hope, and purpose.",
        zh: "我们对耶稣基督的信心是我们一切事工的基础。我们相信祷告的力量，圣灵的引导，以及上帝在我们生命中的转化工作。通过信心，我们找到力量、盼望和目标。"
      },
      image: "/pexels-sebastian-189349.jpg"
    },
    {
      title: { en: "Community", zh: "社区" },
      description: {
        en: "We value authentic relationships and support one another in our spiritual journey.",
        zh: "我们重视真实的关系，并在属灵旅程中相互支持。"
      },
      details: {
        en: "We are a family of believers who care for one another deeply. Through small groups, fellowship events, and regular gatherings, we build meaningful relationships that encourage spiritual growth and provide support in times of need.",
        zh: "我们是一个彼此深切关怀的信徒家庭。通过小组、团契活动和定期聚会，我们建立有意义的关系，促进属灵成长，并在需要时提供支持。"
      },
      image: "/pexels-eberhardgross-691668.jpg"
    },
    {
      title: { en: "Service", zh: "服务" },
      description: {
        en: "We are committed to serving others with humility and love, following Christ's example.",
        zh: "我们致力于以谦卑和爱心服务他人，效法基督的榜样。"
      },
      details: {
        en: "Following Jesus's example of servant leadership, we actively seek opportunities to serve our church family and the broader community. Through various ministries and outreach programs, we demonstrate God's love through practical actions.",
        zh: "效法耶稣仆人式领导的榜样，我们积极寻找机会服务我们的教会家庭和更广泛的社区。通过各种事工和外展计划，我们通过实际行动彰显上帝的爱。"
      },
      image: "/pexels-lum3n-44775-167699.jpg"
    },
    {
      title: { en: "Growth", zh: "成长" },
      description: {
        en: "We encourage continuous spiritual growth through study, prayer, and fellowship.",
        zh: "我们鼓励通过学习、祷告和团契不断在属灵上成长。"
      },
      details: {
        en: "We believe that spiritual growth is a lifelong journey. Through Bible studies, discipleship programs, and mentoring relationships, we equip believers to grow deeper in their faith and develop their God-given gifts.",
        zh: "我们相信属灵成长是一生的旅程。通过查经、门徒训练计划和导师关系，我们装备信徒在信仰上更深地成长，并发展上帝所赐的恩赐。"
      },
      image: "/pexels-markusspiske-113338.jpg"
    },
    {
      title: { en: "Outreach", zh: "外展" },
      description: {
        en: "We reach out to our local community with God's love through various programs and initiatives.",
        zh: "我们通过各种计划和倡议，以上帝的爱接触我们的本地社区。"
      },
      details: {
        en: "Our outreach efforts extend beyond our church walls into the community. We partner with local organizations, provide resources for those in need, and create opportunities for meaningful engagement with our neighbors.",
        zh: "我们的外展工作延伸到教会之外进入社区。我们与本地组织合作，为有需要的人提供资源，并为与邻居有意义的互动创造机会。"
      },
      image: "/pexels-eberhardgross-691668.jpg"
    },
    {
      title: { en: "Biblical Teaching", zh: "圣经教导" },
      description: {
        en: "We are committed to sound biblical teaching that equips believers for life and ministry.",
        zh: "我们致力于健全的圣经教导，装备信徒过生活和事奉。"
      },
      details: {
        en: "We believe in teaching God's Word with accuracy, relevance, and practical application. Our teaching ministry includes Sunday sermons, Bible studies, and educational programs designed to help believers understand and apply biblical truth.",
        zh: "我们相信以准确、相关和实际应用来教导上帝的话语。我们的教导事工包括主日讲道、查经和教育计划，旨在帮助信徒理解并应用圣经真理。"
      },
      image: "/pexels-lum3n-44775-167699.jpg"
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
              {language === "en" ? "OUR VALUES" : "我们的价值观"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {language === "en" 
                ? "The principles that guide our church community"
                : "指导我们教会社区的原则"}
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                {language === "en" ? "Core Values" : "核心价值观"}
              </h2>
              <p className="text-xl">
                {language === "en"
                  ? "The foundational principles that guide everything we do"
                  : "指导我们所做一切的基础原则"}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  // variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden aspect-[4/3]"
                >
                  <img
                    src={value.image}
                    alt={language === "en" ? value.title.en : value.title.zh}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
                  {/* Default Label */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-bold text-white text-center">
                      {language === "en" ? value.title.en : value.title.zh}
                    </h3>
                  </div>
                  {/* Hover Content */}
                  <div className="absolute inset-0 bg-white/95 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-black">
                      {language === "en" ? value.title.en : value.title.zh}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === "en" ? value.description.en : value.description.zh}
                    </p>
                    <p className="text-gray-600">
                      {language === "en" ? value.details.en : value.details.zh}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 