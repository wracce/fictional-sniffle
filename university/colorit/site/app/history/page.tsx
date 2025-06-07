"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Image, Star } from "lucide-react";

export default function HistoryPage() {
  // This is a placeholder for the actual history data
  const historyItems = [
    {
      id: 1,
      date: "2024-03-20",
      originalImage: "https://images.unsplash.com/photo-1598411072028-c4642d98352c?w=300&h=300&fit=crop&q=80",
      colorizedImage: "https://images.unsplash.com/photo-1682687220742-aba19b51f36e?w=300&h=300&fit=crop&q=80",
      rating: 4,
    },
    {
      id: 2,
      date: "2024-03-19",
      originalImage: "https://images.unsplash.com/photo-1598411072028-c4642d98352c?w=300&h=300&fit=crop&q=80",
      colorizedImage: "https://images.unsplash.com/photo-1682687220742-aba19b51f36e?w=300&h=300&fit=crop&q=80",
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <HistoryIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Colorization History</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {historyItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image className="absolute top-2 left-2 h-5 w-5 text-white z-10" />
                    <img
                      src={item.originalImage}
                      alt="Original image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">Original</p>
                </div>
                <div className="space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={item.colorizedImage}
                      alt="Colorized image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">Colorized</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}