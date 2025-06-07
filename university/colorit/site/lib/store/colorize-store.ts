import { create } from 'zustand'
import api from '@/lib/api'
import { useGalleryStore } from './gallery-store'

interface ColorizeState {
  originalImage: string | null
  colorizedImage: string | null
  title: string
  rating: number
  dimensions: string | null
  fileSize: number | null
  processingTime: number | null
  galleryId: string | null
  isPublic: boolean,
  uuid: string | null
  setOriginalImage: (src: string) => void
  setColorizedImage: (src: string) => void
  setTitle: (title: string) => void
  setRating: (rating: number) => void
  setDetails: (info: { dimensions: string; fileSize: number; processingTime: number }) => void
  setGalleryId: (id: string) => void
  setIsPublic: (val: boolean) => void
  handleDrop: (files: File[], setProcessing: (v: boolean) => void) => Promise<void>
  reset: () => void
}

export const useColorizeStore = create<ColorizeState>((set, get) => {
  const galleryStore = useGalleryStore.getState()

  return {
    originalImage: null,
    colorizedImage: null,
    title: '',
    rating: 0,
    dimensions: null,
    fileSize: null,
    processingTime: null,
    galleryId: null,
    isPublic: false,

    setOriginalImage: (src) => set({ originalImage: src }),
    setColorizedImage: (src) => set({ colorizedImage: src }),
    setTitle: (title) => {
      const { galleryId } = get()
      if (galleryId) {
        galleryStore.updateTitle(galleryId, title)
      }
      set({ title })
    },
    setRating: (rating) => {
      const { galleryId } = get()
      if (galleryId) {
        galleryStore.updateRating(galleryId, rating)
      }
      set({ rating })
    },
    setDetails: ({ dimensions, fileSize, processingTime }) => set({ dimensions, fileSize, processingTime }),
    setGalleryId: (id) => set({ galleryId: id }),
    setIsPublic: (val) => {
      const { galleryId } = get()
      if (galleryId) {
        galleryStore.updatePublic(galleryId, val)
      }
      set({ isPublic: val })
    },

    reset: () => set({
      originalImage: null,
      colorizedImage: null,
      title: '',
      rating: 0,
      dimensions: null,
      fileSize: null,
      processingTime: null,
      galleryId: null,
      isPublic: false,
      uuid: null
    }),

    handleDrop: async (files, setProcessing) => {
      const file = files[0]
      if (!file) return

      const imageURL = URL.createObjectURL(file)
      set({ originalImage: imageURL })
      setProcessing(true)

      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await api.post('/colorize', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        const { id, colorizedUrl, dimensions, fileSize, processingTime, public: isPublic, title, rating , uuid} = res.data

        set({
          galleryId: id,
          colorizedImage: colorizedUrl,
          dimensions,
          fileSize,
          processingTime,
          isPublic,
          title,
          rating,
          uuid
        })
      } catch (err) {
        console.error('Ошибка раскраски:', err)
        alert('Произошла ошибка при раскраске изображения.')
      } finally {
        setProcessing(false)
      }
    },
  }
})