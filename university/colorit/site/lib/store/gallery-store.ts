import { create } from 'zustand'
import api from '@/lib/api'

interface GalleryItem {
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

interface PaginatedGallery {
  items: GalleryItem[]
  total: number
  page: number
  limit: number
}

interface GalleryState {
  publicGallery: PaginatedGallery
  myGallery: PaginatedGallery
  stats: GalleryStats
  updateTitle: (id: string, title: string) => Promise<void>
  updateRating: (id: string, rating: number) => Promise<void>
  updatePublic: (id: string, isPublic: boolean) => Promise<void>
  fetchByUuid: (uuid: string) => Promise<GalleryItem | null>
  fetchPublicGallery: (page?: number, limit?: number) => Promise<void>
  fetchMyGallery: (page?: number, limit?: number) => Promise<void>
  fetchMyStats: () => Promise<void>
  deleteById: (id: string) => Promise<void>
}

interface GalleryStats {
  totalColorized: number
  averageRating: number
  averageProcessingTime: number
  memberSince: string
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  publicGallery: { items: [], total: 0, page: 1, limit: 12 },
  myGallery: { items: [], total: 0, page: 1, limit: 12 },
  stats: { totalColorized: 0, averageRating: 0, averageProcessingTime: 0, memberSince: '' },

  updateTitle: async (id, title) => {
    try {
      await api.patch(`/gallery/${id}/title`, { title })
      set((state) => ({
        myGallery: {
          ...state.myGallery,
          items: state.myGallery.items.map(item =>
            item.id === id ? { ...item, title } : item
          )
        }
      }))
    } catch (err) {
      console.error('Ошибка обновления названия:', err)
    }
  },

  updateRating: async (id, rating) => {
    try {
      await api.patch(`/gallery/${id}/rating`, { rating })
      set((state) => ({
        myGallery: {
          ...state.myGallery,
          items: state.myGallery.items.map(item =>
            item.id === id ? { ...item, rating } : item
          )
        },
        publicGallery: {
          ...state.publicGallery,
          items: state.publicGallery.items.map(item =>
            item.id === id ? { ...item, rating } : item
          )
        }
      }))
    } catch (err) {
      console.error('Ошибка обновления оценки:', err)
    }
  },

  updatePublic: async (id, isPublic) => {
    try {
      await api.patch(`/gallery/${id}/public`, { public: isPublic })
  
      set((state) => {
        const updatedItem = state.myGallery.items.find(item => item.id === id)
        if (!updatedItem) return state
  
        const newItem = { ...updatedItem, public: isPublic }
        const isAlreadyInPublic = state.publicGallery.items.some(item => item.id === id)
  
        return {
          myGallery: {
            ...state.myGallery,
            items: state.myGallery.items.map(item =>
              item.id === id ? newItem : item
            )
          },
          publicGallery: {
            ...state.publicGallery,
            items: isPublic
              ? (isAlreadyInPublic
                  ? state.publicGallery.items.map(item =>
                      item.id === id ? newItem : item
                    )
                  : [...state.publicGallery.items, newItem])
              : state.publicGallery.items.filter(item => item.id !== id)
          }
        }
      })
    } catch (err) {
      console.error('Ошибка обновления публичности:', err)
    }
  },
  

  fetchByUuid: async (uuid) => {
    try {
      const res = await api.get(`/gallery/uuid/${uuid}`)
      return res.data
    } catch (err) {
      console.error('Ошибка получения элемента по UUID:', err)
      return null
    }
  },

  fetchPublicGallery: async (page = 1, limit = 12) => {
    try {
      const res = await api.get(`/gallery`, {
        params: { page, limit },
      })
      set({ publicGallery: res.data })
    } catch (err) {
      console.error('Ошибка загрузки публичной галереи:', err)
    }
  },

  fetchMyGallery: async (page = 1, limit = 12) => {
    try {
      const res = await api.get(`/gallery/my`, {
        params: { page, limit },
      })
      set({ myGallery: res.data })
    } catch (err) {
      console.error('Ошибка загрузки личной галереи:', err)
    }
  },

  fetchMyStats: async () => {
    try {
      const res = await api.get(`/gallery/stats`)
      set({ stats: res.data })
    } catch (err) {
      console.error('Ошибка загрузки статистики:', err)
    }
  },

  deleteById: async (id) => {
    try {
      await api.delete(`/gallery/${id}`)
  
      set((state) => {
        const isInPublic = state.publicGallery.items.some(item => item.id === id)
        const isInMy = state.myGallery.items.some(item => item.id === id)
  
        return {
          myGallery: {
            ...state.myGallery,
            items: state.myGallery.items.filter(item => item.id !== id),
            total: isInMy ? state.myGallery.total - 1 : state.myGallery.total,
          },
          publicGallery: {
            ...state.publicGallery,
            items: state.publicGallery.items.filter(item => item.id !== id),
            total: isInPublic ? state.publicGallery.total - 1 : state.publicGallery.total,
          }
        }
      })
    } catch (err) {
      console.error('Ошибка удаления элемента:', err)
    }
  },
}))
