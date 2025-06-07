// lib/store/ui-store.ts
import { create } from 'zustand'

interface UIState {
  loading: boolean
  isModalOpen: boolean
  modalContent: React.ReactNode | null
  showLoader: () => void
  hideLoader: () => void
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  isModalOpen: false,
  modalContent: null,
  showLoader: () => set({ loading: true }),
  hideLoader: () => set({ loading: false }),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}))
