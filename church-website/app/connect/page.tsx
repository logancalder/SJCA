"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ConnectPage() {
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
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-6xl mb-4">
              {language === "en" ? "CONNECT WITH US" : "联系我们"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {language === "en" 
                ? "WE'D LOVE TO HEAR FROM YOU AND HELP YOU GET CONNECTED TO OUR COMMUNITY"
                : "我们期待听到您的声音，帮助您融入我们的社区"}
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className="text-center p-8 border-2 border-black"
              >
                <Phone className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "PHONE" : "电话"}
                </h3>
                <p>(408) 945-1095</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 border-2 border-black"
              >
                <Mail className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "EMAIL" : "电子邮件"}
                </h3>
                <p>pastor@sjca.org</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-8 border-2 border-black"
              >
                <MapPin className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "ADDRESS" : "地址"}
                </h3>
                <p>215 Topaz St<br />Milpitas, CA 95035</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {language === "en" ? "SEND US A MESSAGE" : "发送消息"}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Name" : "姓名"}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Email" : "电子邮件"}
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border-2 border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Message" : "消息"}
                  </label>
                  <textarea
                    className="w-full p-3 border-2 border-black h-32"
                    required
                  ></textarea>
                </div>
                <Button className="w-full rounded-none">
                  {language === "en" ? "Send Message" : "发送"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 