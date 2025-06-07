'use client'

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  value: number
  editable?: boolean
  onChange?: (rating: number) => void
}

export const RatingStars = ({ value, editable = false, onChange }: RatingStarsProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
        const active = hoverValue !== null ? val <= hoverValue : val <= value

        return (
          <button
            key={val}
            type="button"
            disabled={!editable}
            onClick={() => editable && onChange?.(val)}
            onMouseEnter={() => editable && setHoverValue(val)}
            onMouseLeave={() => editable && setHoverValue(null)}
            className="focus:outline-none transition"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                active ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
