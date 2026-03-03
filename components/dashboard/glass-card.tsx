"use client"

import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

const positionClasses = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
}

export function GlassCard({ children, className, onClick, position }: GlassCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border border-glass-border bg-glass backdrop-blur-xl",
        "p-4 transition-all duration-300",
        "hover:bg-glass/80 hover:border-primary/30 hover:shadow-[0_0_20px_var(--glow)]",
        "active:scale-95 cursor-pointer",
        "flex flex-col items-center justify-center gap-2 text-center",
        "w-[160px] h-[100px]",
        position && `absolute ${positionClasses[position]}`,
        className
      )}
    >
      {children}
    </button>
  )
}
