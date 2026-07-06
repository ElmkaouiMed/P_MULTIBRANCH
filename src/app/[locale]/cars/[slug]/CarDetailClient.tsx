"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Car } from "@/types";

interface Props {
  car: Car;
}

export function CarDetailClient({ car }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = car.images.length > 0 ? car.images : [];

  if (images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-none bg-ink-900 border border-ink-800/50">
      <div className="aspect-[16/9] w-full">
        <img
          src={images[imgIndex]}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-none bg-ink-950/60 text-ink-200 shadow backdrop-blur-sm border border-ink-700/30 transition-all hover:bg-ink-900 hover:text-ink-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-none bg-ink-950/60 text-ink-200 shadow backdrop-blur-sm border border-ink-700/30 transition-all hover:bg-ink-900 hover:text-ink-50"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`h-2 rounded-none transition-all ${
                  i === imgIndex
                    ? "w-6 bg-gold-500"
                    : "w-2 bg-ink-500/50 hover:bg-ink-400"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
