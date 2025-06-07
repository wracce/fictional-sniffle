'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { useUIStore } from '@/lib/store/ui-store'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { loading, isModalOpen, modalContent, closeModal } = useUIStore()

  return (
    <html lang="ru" suppressHydrationWarning>
      <Head>
        <title>Colorizer – Раскрась чёрно-белые фото</title>
        <meta name="description" content="Преобразите свои чёрно-белые фотографии в яркие изображения с помощью нейросети." />
        <meta property="og:title" content="Colorizer – Раскрась чёрно-белые фото" />
        <meta property="og:description" content="Преобразите свои чёрно-белые фотографии в яркие изображения с помощью нейросети." />
        <meta property="og:image" content="https://colorization.wracce.ru/preview.png" />
        <meta property="og:url" content="https://colorization.wracce.ru" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colorizer – Раскрась чёрно-белые фото" />
        <meta name="twitter:description" content="Преобразите свои чёрно-белые фотографии в яркие изображения с помощью нейросети." />
        <meta name="twitter:image" content="https://colorization.wracce.ru/preview.png" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />

          {loading && (
            <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
              <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
              onClick={closeModal}
            >
              <div
                className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {modalContent}
              </div>
            </div>
          )}

          <main className="min-h-screen pt-16">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
