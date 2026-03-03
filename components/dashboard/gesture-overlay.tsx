"use client"

import { useState } from "react"
import { Hand, Camera, CameraOff } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Screen } from "@/lib/navigation"

interface GestureOverlayProps {
  onNavigate: (screen: Screen) => void
}

const gestureMap: Record<number, { label: string; target: Screen }> = {
  1: { label: "Finance", target: "finance" },
  2: { label: "Home", target: "home" },
  3: { label: "Offline AI", target: "offline-ai" },
  4: { label: "Raspberry Home", target: "home" },
}

export function GestureOverlay({ onNavigate }: GestureOverlayProps) {
  const [isActive, setIsActive] = useState(false)
  const [detectedFingers, setDetectedFingers] = useState<number | null>(null)

  const toggleCamera = () => {
    setIsActive((prev) => !prev)
    if (isActive) {
      setDetectedFingers(null)
    }
  }

  // Simulate gesture detection for demo (in production: MediaPipe Hands)
  const simulateGesture = (fingers: number) => {
    setDetectedFingers(fingers)
    const mapping = gestureMap[fingers]
    if (mapping) {
      setTimeout(() => {
        onNavigate(mapping.target)
        setDetectedFingers(null)
      }, 800)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {/* Gesture status */}
      {isActive && (
        <div className="rounded-lg border border-glass-border bg-glass backdrop-blur-xl p-3 mb-1">
          <div className="flex items-center gap-2 mb-2">
            <Hand className="w-4 h-4 text-primary" />
            <span className="text-xs text-foreground font-medium">Gesture Control Active</span>
          </div>

          {detectedFingers !== null ? (
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">{detectedFingers}</span>
              <p className="text-[10px] text-muted-foreground mt-1">
                Navigating to {gestureMap[detectedFingers]?.label}...
              </p>
            </div>
          ) : (
            <p className="text-[10px] text-muted-foreground">Show 1-4 fingers to navigate</p>
          )}

          {/* Demo buttons */}
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => simulateGesture(n)}
                className="w-7 h-7 rounded-md bg-secondary text-secondary-foreground text-xs font-mono hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={toggleCamera}
        className={cn(
          "p-2.5 rounded-full border transition-all duration-300",
          isActive
            ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_var(--glow)]"
            : "border-glass-border bg-glass text-muted-foreground hover:text-foreground"
        )}
        aria-label={isActive ? "Disable gesture control" : "Enable gesture control"}
      >
        {isActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
      </button>
    </div>
  )
}
