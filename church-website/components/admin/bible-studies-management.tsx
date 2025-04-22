"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface BibleStudy {
  id: string
  title: string
  title_cn: string
  description: string
  description_cn: string
  passage: string
  passage_cn: string
  date: string
  time: string
  location: string
  location_cn: string
}

interface BibleStudiesManagementProps {
  language: "en" | "zh"
}

export default function BibleStudiesManagement({ language }: BibleStudiesManagementProps) {
  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBibleStudy, setSelectedBibleStudy] = useState<BibleStudy | null>(null)
  const [newBibleStudy, setNewBibleStudy] = useState<Partial<BibleStudy>>({
    title: "",
    title_cn: "",
    description: "",
    description_cn: "",
    passage: "",
    passage_cn: "",
    date: "",
    time: "",
    location: "",
    location_cn: "",
  })

  const handleAddBibleStudy = async () => {
    // TODO: Implement API call to add bible study
    setIsAddDialogOpen(false)
    setNewBibleStudy({
      title: "",
      title_cn: "",
      description: "",
      description_cn: "",
      passage: "",
      passage_cn: "",
      date: "",
      time: "",
      location: "",
      location_cn: "",
    })
  }

  const handleEditBibleStudy = async () => {
    // TODO: Implement API call to edit bible study
    setIsEditDialogOpen(false)
    setSelectedBibleStudy(null)
  }

  const handleDeleteBibleStudy = async (id: string) => {
    // TODO: Implement API call to delete bible study
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {language === "en" ? "Bible Studies" : "查经"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {language === "en" ? "Add New Bible Study" : "添加新查经"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New Bible Study" : "添加新查经"}
              </DialogTitle>
              <DialogDescription>
                {language === "en"
                  ? "Add a new bible study session"
                  : "添加新的查经课程"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  {language === "en" ? "Title (English)" : "标题（英文）"}
                </Label>
                <Input
                  id="title"
                  value={newBibleStudy.title}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title_cn">
                  {language === "en" ? "Title (Chinese)" : "标题（中文）"}
                </Label>
                <Input
                  id="title_cn"
                  value={newBibleStudy.title_cn}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, title_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  {language === "en" ? "Description (English)" : "描述（英文）"}
                </Label>
                <Textarea
                  id="description"
                  value={newBibleStudy.description}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_cn">
                  {language === "en" ? "Description (Chinese)" : "描述（中文）"}
                </Label>
                <Textarea
                  id="description_cn"
                  value={newBibleStudy.description_cn}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, description_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passage">
                  {language === "en" ? "Bible Passage (English)" : "经文（英文）"}
                </Label>
                <Input
                  id="passage"
                  value={newBibleStudy.passage}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, passage: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passage_cn">
                  {language === "en" ? "Bible Passage (Chinese)" : "经文（中文）"}
                </Label>
                <Input
                  id="passage_cn"
                  value={newBibleStudy.passage_cn}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, passage_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">
                  {language === "en" ? "Date" : "日期"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newBibleStudy.date}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  {language === "en" ? "Time" : "时间"}
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newBibleStudy.time}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, time: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">
                  {language === "en" ? "Location (English)" : "地点（英文）"}
                </Label>
                <Input
                  id="location"
                  value={newBibleStudy.location}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location_cn">
                  {language === "en" ? "Location (Chinese)" : "地点（中文）"}
                </Label>
                <Input
                  id="location_cn"
                  value={newBibleStudy.location_cn}
                  onChange={(e) =>
                    setNewBibleStudy({ ...newBibleStudy, location_cn: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {language === "en" ? "Cancel" : "取消"}
              </Button>
              <Button onClick={handleAddBibleStudy}>
                {language === "en" ? "Add Bible Study" : "添加查经"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "en" ? "Title" : "标题"}</TableHead>
              <TableHead>{language === "en" ? "Passage" : "经文"}</TableHead>
              <TableHead>{language === "en" ? "Date & Time" : "日期和时间"}</TableHead>
              <TableHead>{language === "en" ? "Location" : "地点"}</TableHead>
              <TableHead className="text-right">
                {language === "en" ? "Actions" : "操作"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bibleStudies.map((study) => (
              <TableRow key={study.id}>
                <TableCell>
                  {language === "en" ? study.title : study.title_cn}
                </TableCell>
                <TableCell>
                  {language === "en" ? study.passage : study.passage_cn}
                </TableCell>
                <TableCell>
                  {study.date} {study.time}
                </TableCell>
                <TableCell>
                  {language === "en" ? study.location : study.location_cn}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedBibleStudy(study)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBibleStudy(study.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Edit Bible Study" : "编辑查经"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Edit the bible study details"
                : "编辑查经详情"}
            </DialogDescription>
          </DialogHeader>
          {selectedBibleStudy && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">
                  {language === "en" ? "Title (English)" : "标题（英文）"}
                </Label>
                <Input
                  id="edit-title"
                  value={selectedBibleStudy.title}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title_cn">
                  {language === "en" ? "Title (Chinese)" : "标题（中文）"}
                </Label>
                <Input
                  id="edit-title_cn"
                  value={selectedBibleStudy.title_cn}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      title_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  {language === "en" ? "Description (English)" : "描述（英文）"}
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedBibleStudy.description}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description_cn">
                  {language === "en" ? "Description (Chinese)" : "描述（中文）"}
                </Label>
                <Textarea
                  id="edit-description_cn"
                  value={selectedBibleStudy.description_cn}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      description_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-passage">
                  {language === "en" ? "Bible Passage (English)" : "经文（英文）"}
                </Label>
                <Input
                  id="edit-passage"
                  value={selectedBibleStudy.passage}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      passage: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-passage_cn">
                  {language === "en" ? "Bible Passage (Chinese)" : "经文（中文）"}
                </Label>
                <Input
                  id="edit-passage_cn"
                  value={selectedBibleStudy.passage_cn}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      passage_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">
                  {language === "en" ? "Date" : "日期"}
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedBibleStudy.date}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">
                  {language === "en" ? "Time" : "时间"}
                </Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={selectedBibleStudy.time}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">
                  {language === "en" ? "Location (English)" : "地点（英文）"}
                </Label>
                <Input
                  id="edit-location"
                  value={selectedBibleStudy.location}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location_cn">
                  {language === "en" ? "Location (Chinese)" : "地点（中文）"}
                </Label>
                <Input
                  id="edit-location_cn"
                  value={selectedBibleStudy.location_cn}
                  onChange={(e) =>
                    setSelectedBibleStudy({
                      ...selectedBibleStudy,
                      location_cn: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {language === "en" ? "Cancel" : "取消"}
            </Button>
            <Button onClick={handleEditBibleStudy}>
              {language === "en" ? "Save Changes" : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 