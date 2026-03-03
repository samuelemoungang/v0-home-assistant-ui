"use client"

import { DollarSign, Home, Bot, Monitor } from "lucide-react"
import { GlassCard } from "@/components/dashboard/glass-card"
import { AvatarDisplay } from "@/components/dashboard/avatar-display"
import { WeatherTime } from "@/components/dashboard/weather-time"
import { ChatPanel } from "@/components/dashboard/chat-panel"
import { useState } from "react"
import type { Screen } from "@/lib/navigation"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

const cornerIcons = {
  "top-left": DollarSign,
  "top-right": Home,
  "bottom-left": Bot,
  "bottom-right": Monitor,
}

const cornerConfig = {
  "top-left": { label: "Finance", target: "finance" as Screen },
  "top-right": { label: "Home", target: "home" as Screen },
  "bottom-left": { label: "Offline AI", target: "offline-ai" as Screen },
  "bottom-right": { label: "Raspberry Home", target: null as Screen | null },
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  return (
    <div className="relative w-full h-full">
      {/* Corner cards */}
      {(Object.keys(cornerConfig) as Array<keyof typeof cornerConfig>).map((position) => {
        const config = cornerConfig[position]
        const Icon = cornerIcons[position]
        return (
          <GlassCard
            key={position}
            position={position}
            onClick={() => {
              if (config.target) onNavigate(config.target)
            }}
          >
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-foreground">{config.label}</span>
          </GlassCard>
        )
      })}

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Weather and Time */}
        <div className="pointer-events-auto mb-4">
          <WeatherTime />
        </div>

        {/* Avatar */}
        <div className="pointer-events-auto mb-4">
          <AvatarDisplay speaking={isSpeaking} />
        </div>

        {/* Chat panel */}
        <div className="pointer-events-auto w-full max-w-md">
          <div className="mx-4 rounded-xl border border-glass-border bg-glass backdrop-blur-xl overflow-hidden">
            <ChatPanel
              compact
              onSpeakingChange={setIsSpeaking}
              placeholder="Ask your Pi Assistant..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
