"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarDisplayProps {
  speaking?: boolean
  className?: string
}

export function AvatarDisplay({ speaking = false, className }: AvatarDisplayProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (speaking) {
      const interval = setInterval(() => setPulse((p) => !p), 500)
      return () => clearInterval(interval)
    }
    setPulse(false)
  }, [speaking])

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className={cn(
          "absolute rounded-full bg-primary/20 blur-2xl transition-all duration-700",
          speaking ? "w-40 h-40 opacity-80" : "w-32 h-32 opacity-40",
          pulse && "scale-110"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full border-2 border-primary/30 transition-all duration-500",
          speaking ? "w-36 h-36 animate-ping opacity-20" : "w-28 h-28 opacity-0"
        )}
      />
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_30px_var(--glow)]">
        <Image
          src="/images/avatar.jpg"
          alt="AI Assistant"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
