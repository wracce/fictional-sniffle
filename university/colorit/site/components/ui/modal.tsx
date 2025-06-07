'use client'

import { useUIStore } from '@/lib/store/ui-store'

export function Modal() {
  const { modalContent, closeModal } = useUIStore()

  if (!modalContent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur">
      <div className="bg-popover rounded-lg shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
        {modalContent}
      </div>
    </div>
  )
}
