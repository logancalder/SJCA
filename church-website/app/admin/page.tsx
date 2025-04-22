"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, Book, Users, Settings } from "lucide-react"

export default function AdminPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [activeTab, setActiveTab] = useState("verses")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav language={language} toggleLanguage={toggleLanguage} currentPage="Admin" />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Admin Dashboard" : "管理面板"}
            </h1>
            <p className="text-gray-600">
              {language === "en" 
                ? "Manage website content and user access"
                : "管理网站内容和用户访问权限"}
            </p>
          </div>

          <Tabs defaultValue="verses" className="space-y-6">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="verses" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                {language === "en" ? "Verses" : "经文"}
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === "en" ? "Events" : "活动"}
              </TabsTrigger>
              <TabsTrigger value="bible-studies" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                {language === "en" ? "Bible Studies" : "查经"}
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === "en" ? "Users" : "用户"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Daily Verses" : "每日经文"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Manage the daily verses displayed on the homepage"
                      : "管理首页显示的每日经文"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {language === "en" ? "Add New Verse" : "添加新经文"}
                  </Button>
                  {/* Verse management table will go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Events" : "活动"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Manage church events and activities"
                      : "管理教会活动和事件"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {language === "en" ? "Add New Event" : "添加新活动"}
                  </Button>
                  {/* Events management table will go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bible-studies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Bible Studies" : "查经"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Manage bible study sessions and materials"
                      : "管理查经课程和材料"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {language === "en" ? "Add New Bible Study" : "添加新查经"}
                  </Button>
                  {/* Bible studies management table will go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Users" : "用户"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Manage user accounts and permissions"
                      : "管理用户账户和权限"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {language === "en" ? "Add New User" : "添加新用户"}
                  </Button>
                  {/* Users management table will go here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 