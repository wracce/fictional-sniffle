"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useGalleryStore } from "@/lib/store/gallery-store"
import { GalleryItem } from "@/components/gallery-item"
import { useAuthStore } from "@/lib/store/auth-store" // 👈 добавляем

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [visibleItems, setVisibleItems] = useState(3)

  const {
    publicGallery,
    myGallery,
    fetchPublicGallery,
    fetchMyGallery,
  } = useGalleryStore()

  const { accessToken } = useAuthStore() // 👈 используем auth store

  useEffect(() => {
    fetchPublicGallery()
    if (accessToken) {
      fetchMyGallery()
    }
  }, [accessToken])

  const loadMore = () => {
    setVisibleItems((prev) => prev + 3)
  }

  const GalleryContent = ({ items, total, canEdit = false }: { items: typeof publicGallery.items, total: number, canEdit?: boolean }) => {
    const displayedItems = items.slice(0, visibleItems)
    const hasMore = items.length > displayedItems.length
    const totalPages = Math.ceil(total / 3)
    const currentPage = Math.ceil(visibleItems / 3)

    return (
      <div className="space-y-8">
        {displayedItems.map((item) => (
          <GalleryItem key={item.id} item={item} canEdit={canEdit} />
        ))}

        {hasMore && (
          <div className="flex flex-col items-center py-8 gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="min-w-[200px]"
            >
              Загрузить ещё
            </Button>
            <span className="text-sm text-muted-foreground">
              Страница {currentPage} из {totalPages}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => {
          setActiveTab(value)
          setVisibleItems(3)
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-6">Галерея</h1>

          {accessToken && (
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="all">Все изображения</TabsTrigger>
              <TabsTrigger value="my">Мои изображения</TabsTrigger>
            </TabsList>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <TabsContent value="all" className="m-0">
            <GalleryContent
              items={publicGallery.items}
              total={publicGallery.total}
            />
          </TabsContent>

          {accessToken && (
            <TabsContent value="my" className="m-0">
              <GalleryContent
                items={myGallery.items}
                total={myGallery.total}
                canEdit={true}
              />
            </TabsContent>
          )}
        </ScrollArea>
      </Tabs>
    </main>
  )
}
