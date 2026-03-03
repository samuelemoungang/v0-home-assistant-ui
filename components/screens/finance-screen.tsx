"use client"

import { TrendingUp, PieChart, Landmark, ArrowLeft } from "lucide-react"
import { GlassCard } from "@/components/dashboard/glass-card"
import { AvatarDisplay } from "@/components/dashboard/avatar-display"
import type { Screen } from "@/lib/navigation"

interface FinanceScreenProps {
  onNavigate: (screen: Screen) => void
}

const cornerConfig = {
  "top-left": { label: "Income / Expenses", icon: TrendingUp, target: "income" as Screen },
  "top-right": { label: "Budgets", icon: PieChart, target: "budgets" as Screen },
  "bottom-left": { label: "Savings", icon: Landmark, target: "savings" as Screen },
  "bottom-right": { label: "Back", icon: ArrowLeft, target: "home" as Screen },
}

export function FinanceScreen({ onNavigate }: FinanceScreenProps) {
  return (
    <div className="relative w-full h-full">
      {/* Corner cards */}
      {(Object.keys(cornerConfig) as Array<keyof typeof cornerConfig>).map((position) => {
        const config = cornerConfig[position]
        const Icon = config.icon
        return (
          <GlassCard
            key={position}
            position={position}
            onClick={() => onNavigate(config.target)}
          >
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-foreground">{config.label}</span>
          </GlassCard>
        )
      })}

      {/* Center - Avatar + title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="text-lg font-semibold text-foreground mb-4">Finance</h2>
        <AvatarDisplay />
        <p className="mt-4 text-sm text-muted-foreground max-w-xs text-center">
          Manage your income, expenses, budgets, and savings goals.
        </p>
      </div>
    </div>
  )
}
