"use client"

import { useEffect, useState } from "react"
import { useGalleryStore } from "@/lib/store/gallery-store"
import { GalleryItem } from "@/components/gallery-item"

export default function GalleryItemPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useGalleryStore.getState().fetchByUuid(params.id)
        setItem(data)
      } catch (err) {
        console.error("Ошибка загрузки элемента галереи:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) return <div className="text-center py-8">Загрузка...</div>
  if (!item) return <div className="text-center py-8 text-muted-foreground">Изображение не найдено</div>

  return (
    <div className="container mx-auto py-8 px-4">
      <GalleryItem item={item} />
    </div>
  )
}
