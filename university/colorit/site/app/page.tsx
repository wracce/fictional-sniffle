import { Button } from "@/components/ui/button";
import { ArrowRight, Image, History, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Оживите чёрно-белые фотографии
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Превратите старые снимки в яркие и живые воспоминания с помощью нашего ИИ-алгоритма раскраски.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/colorize">
            {/* <Button size="lg">
              Начать раскраску
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}
          </Link>
          <Link href="/gallery">
            <Button variant="outline" size="lg">
              Посмотреть галерею
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center col-span-1">
              <div className="rounded-full bg-primary/10 p-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Мгновенная раскраска",
    description: "Просто загрузите чёрно-белое фото и получите цветной результат за считанные секунды.",
    icon: Image,
  },
  {
    title: "История изображений",
    description: "Получите доступ ко всем ранее раскрашенным фотографиям в одном месте.",
    icon: History,
  },
  {
    title: "Оцените результат",
    description: "Оставьте отзыв и помогите нам улучшить алгоритм раскраски.",
    icon: Star,
  },
];
