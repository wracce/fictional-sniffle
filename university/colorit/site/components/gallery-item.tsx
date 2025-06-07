"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Share2, Timer, Image as ImageIcon, File, MoreVertical } from "lucide-react"
import { useUIStore } from "@/lib/store/ui-store"
import { ShareModal } from "@/components/share-modal"
import { formatBytes } from "@/lib/utils/format-bytes"
import { RatingStars } from "./ui/rating-stars"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useGalleryStore } from "@/lib/store/gallery-store"
import { Switch } from "./ui/switch"

interface GalleryItemProps {
  item: {
    id: string
    title: string
    uuid: string
    createdAt: string
    originalUrl: string
    colorizedUrl: string
    dimensions: string
    fileSize: number
    processingTime: number
    rating: number
    public: boolean
    author: {
      fullName: string
      avatarUrl: string
      id: string
    }
  }
  canEdit?: boolean
}

function TogglePublicForm({ id, initial }: { id: string, initial: boolean }) {
  const [value, setValue] = useState(initial)
  const { updatePublic } = useGalleryStore()
  const { closeModal } = useUIStore()

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Switch id="public" checked={value} onCheckedChange={setValue} />
        <label htmlFor="public" className="text-sm">Опубликовать в галерее</label>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => closeModal()}>Отмена</Button>
        <Button onClick={() => {
          updatePublic(id, value)
          closeModal()
        }}>Сохранить</Button>
      </div>
    </div>
  )
}

function EditRatingForm({ id, initial }: { id: string, initial: number }) {
  const [value, setValue] = useState(initial)
  const { updateRating } = useGalleryStore()
  const { closeModal } = useUIStore()

  return (
    <div className="space-y-4 p-4">
      <p className="text-sm font-medium text-center">Новая оценка</p>
      <div className="flex justify-center">
        <RatingStars value={value} editable onChange={setValue} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => closeModal()}>Отмена</Button>
        <Button onClick={() => { updateRating(id, value); closeModal() }}>Сохранить</Button>
      </div>
    </div>
  )
}

function ConfirmDeleteForm({ id }: { id: string }) {
  const { deleteById } = useGalleryStore()
  const { closeModal } = useUIStore()

  return (
    <div className="space-y-4 p-4">
      <p className="text-sm font-medium text-center text-destructive">Вы уверены, что хотите удалить изображение?</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => closeModal()}>Отмена</Button>
        <Button variant="destructive" onClick={() => { deleteById(id); closeModal() }}>Удалить</Button>
      </div>
    </div>
  )
}

export function GalleryItem({ item, canEdit = false }: GalleryItemProps) {
  const { openModal, closeModal } = useUIStore()
  const { updateTitle, updateRating, updatePublic } = useGalleryStore()
  const [isPublic, setIsPublic] = useState(item.public)


  const handleShare = () => {
    const shareUrl = `${window.location.origin}/gallery/${item.id}`
    openModal(<ShareModal shareUrl={shareUrl} />)
  }

  const handleEditTitle = () => {
    let newTitle = item.title
    openModal(
      <div className="space-y-4 p-4">
        <p className="text-sm font-medium">Новое название</p>
        <input
          className="w-full border rounded p-2"
          defaultValue={item.title}
          onChange={(e) => (newTitle = e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => closeModal()}>Отмена</Button>
          <Button onClick={() => { updateTitle(item.id, newTitle); closeModal() }}>Сохранить</Button>
        </div>
      </div>
    )
  }

  const handleEditRating = () => {
    openModal(<EditRatingForm id={item.id} initial={item.rating} />)
  }

  const handleTogglePublic = () => {
    openModal(<TogglePublicForm id={item.id} initial={isPublic} />)
  }

  const handleDelete = () => {
    openModal(<ConfirmDeleteForm id={item.id} />)
  }

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={item.author.avatarUrl} alt={item.author.fullName} />
              <AvatarFallback>{item.author.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{item.title || "Без названия"}</CardTitle>
              <p className="text-sm text-muted-foreground">by {item.author.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <time className="text-sm text-muted-foreground">
              {format(new Date(item.createdAt), "dd.MM.yyyy", { locale: ru })}
            </time>
            {canEdit && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleTogglePublic}>
                    {item.public ? "Сделать приватным" : "Сделать публичным"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEditRating}>Изменить оценку</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEditTitle}>Переименовать</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="relative overflow-hidden rounded-l-lg md:rounded-r-none">
            <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              Оригинал
            </span>
            <img
              src={item.originalUrl}
              alt="Original"
              className="w-full h-full object-contain rounded-l-lg md:rounded-r-none"
              style={{ aspectRatio: '3/2' }}
            />
          </div>
          <div className="relative overflow-hidden rounded-r-lg md:rounded-l-none">
            <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              Обработка
            </span>
            <img
              src={item.colorizedUrl}
              alt="Colorized"
              className="w-full h-full object-contain rounded-r-lg md:rounded-l-none"
              style={{ aspectRatio: '3/2' }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {item.processingTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Timer className="h-5 w-5" />
              <span className="text-sm">{item.processingTime.toFixed(1)} сек</span>
            </div>
          )}

          {item.dimensions && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm">{item.dimensions}</span>
            </div>
          )}

          {item.fileSize > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <File className="h-5 w-5" />
              <span className="text-sm">{formatBytes(item.fileSize)}</span>
            </div>
          )}

          {item.rating > 0 && <RatingStars value={item.rating} />}

          <div className="flex gap-2">
            <a href={item.colorizedUrl} download>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
            </a>
            <Button onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
