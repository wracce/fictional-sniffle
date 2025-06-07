"use client"

import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useColorizeStore } from "@/lib/store/colorize-store"
import { Upload, Download, Share2 } from "lucide-react"
import { useGalleryStore } from "@/lib/store/gallery-store"
import { Switch } from "@/components/ui/switch"
import { useUIStore } from "@/lib/store/ui-store"
import { ShareModal } from "@/components/share-modal"
import { RatingStars } from "@/components/ui/rating-stars"
import { formatBytes } from "@/lib/utils/format-bytes"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"

export default function ColorizePage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const {
    originalImage,
    colorizedImage,
    title,
    rating,
    dimensions,
    fileSize,
    processingTime,
    galleryId,
    uuid,
    isPublic,
    setOriginalImage,
    setColorizedImage,
    setTitle,
    setRating,
    setIsPublic,
    handleDrop,
    reset
  } = useColorizeStore()

    const router = useRouter()
    const { user, accessToken, fetchProfile} = useAuthStore()
    const { fetchMyStats } = useGalleryStore()
    const { showLoader, hideLoader } = useUIStore()
    useEffect(() => {
      if (!accessToken) {
        router.push('/login')
      } else {
        showLoader()
        fetchProfile()
        fetchMyStats()
        hideLoader()
      }
    }, [accessToken])
  

    useEffect(() => {
      if (!accessToken) {
        router.push('/login')
      } else {
        showLoader()
        fetchProfile()
        fetchMyStats()
        hideLoader()
      }
    }, [accessToken])
  

  const { openModal } = useUIStore()

  const handleShareClick = () => {
    if (!galleryId) return
    const shareUrl = `${window.location.origin}/gallery/${galleryId}`
    openModal(<ShareModal shareUrl={shareUrl} />)
  }

  const { updateTitle, updateRating, updatePublic } = useGalleryStore()

  const onDrop = useCallback((files: File[]) => {
    handleDrop(files, setIsProcessing)
  }, [handleDrop])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  })

  useEffect(() => {
    reset()
  }, []) // ⬅ Очистка при монтировании

  useEffect(() => {
    if (galleryId) {
      updateTitle(galleryId, title)
    }
  }, [title])

  useEffect(() => {
    if (galleryId) {
      updateRating(galleryId, rating)
    }
  }, [rating])

  useEffect(() => {
    if (galleryId !== null) {
      updatePublic(galleryId, isPublic)
    }
  }, [isPublic])

  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Колоризация</CardTitle>
          <CardDescription>
            Превратите свои чёрно-белые фотографии в яркие изображения с помощью нейросети
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6" {...getRootProps()}>
              <div className={`
                flex flex-col items-center justify-center min-h-[300px]
                rounded-lg border-2 border-dashed transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
                ${originalImage ? 'p-0' : 'p-8'}
              `}>
                <input {...getInputProps()} />
                {originalImage ? (
                  <img src={originalImage} alt="Исходное" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <div className="text-center space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {isDragActive ? "Отпустите изображение здесь" : "Перетащите изображение сюда или нажмите для выбора"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 min-h-[300px] rounded-lg bg-muted/50 flex items-center justify-center">
              {isProcessing ? (
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                  <p className="text-muted-foreground">Обработка изображения...</p>
                </div>
              ) : colorizedImage ? (
                <img src={colorizedImage} alt="Раскрашенное" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <p className="text-muted-foreground text-center">Раскрашенное изображение появится здесь</p>
              )}
            </div>
          </div>

          {colorizedImage && (
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4 text-sm text-muted-foreground">
                <span className="font-medium">Размер:</span> {fileSize ? formatBytes(fileSize) : '—'}
              </div>
              <div className="col-span-12 md:col-span-4 text-sm text-muted-foreground">
                <span className="font-medium">Время обработки:</span> {processingTime} сек.
              </div>
              <div className="col-span-12 md:col-span-4 text-sm text-muted-foreground">
                <span className="font-medium">Разрешение:</span> {dimensions}
              </div>

              <div className="col-span-12">
                <label htmlFor="title" className="text-sm font-medium">
                  Название изображения
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название..."
                />
              </div>

              <div className="col-span-12">
                <label className="text-sm font-medium block text-center mb-2">Оценка</label>
                <RatingStars value={rating} editable onChange={(val) => setRating(val)} />
              </div>

              <div className="col-span-12 flex justify-center items-center gap-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={(val) => setIsPublic(val)}
                />
                <label htmlFor="public" className="text-sm">
                  Опубликовать в галерее
                </label>
              </div>
            </div>
          )}
        </CardContent>

        {colorizedImage && (
          <CardFooter className="flex flex-wrap justify-center gap-4">
            <a href={colorizedImage} download>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Скачать
              </Button>
            </a>
            <Button className="" onClick={handleShareClick}>
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
          </CardFooter>
        )}
      </Card>
    </main>
  )
}
