"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MainNav from "@/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import BibleStudiesManagement from "@/components/admin/bible-studies-management"
import DailyBreadManagement from "@/components/admin/daily-bread-management"
import EventsManagement from "@/components/admin/events-management"
import UsersManagement from "@/components/admin/users-management"

export default function AdminPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [activeTab, setActiveTab] = useState("bible-studies")
  const router = useRouter()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (!userData.isAdmin) {
      router.push("/profile")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav language={language} toggleLanguage={toggleLanguage} currentPage="Admin" />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === "en" ? "Admin Dashboard" : "管理面板"}
              </h1>
              <p className="text-gray-600">
                {language === "en" 
                  ? "Manage church content and users"
                  : "管理教会内容和用户"}
              </p>
            </div>

            <Tabs defaultValue="bible-studies" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bible-studies">
                  {language === "en" ? "Bible Studies" : "圣经学习"}
                </TabsTrigger>
                <TabsTrigger value="daily-bread">
                  {language === "en" ? "Daily Bread" : "每日灵粮"}
                </TabsTrigger>
                <TabsTrigger value="events">
                  {language === "en" ? "Events" : "活动"}
                </TabsTrigger>
                <TabsTrigger value="users">
                  {language === "en" ? "Users" : "用户"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bible-studies">
                <BibleStudiesManagement language={language} />
              </TabsContent>

              <TabsContent value="daily-bread">
                <DailyBreadManagement language={language} />
              </TabsContent>

              <TabsContent value="events">
                <EventsManagement language={language} />
              </TabsContent>

              <TabsContent value="users">
                <UsersManagement language={language} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 