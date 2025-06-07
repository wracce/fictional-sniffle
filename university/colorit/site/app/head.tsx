"use client"

import Head from "next/head"

export default function HomePage() {
  return (
    <>
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

      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Добро пожаловать в Colorizer!</h1>
        {/* остальная часть страницы */}
      </main>
    </>
  )
}
