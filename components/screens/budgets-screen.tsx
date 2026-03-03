"use client"

import { ArrowLeft, AlertTriangle } from "lucide-react"
import { GlassCard } from "@/components/dashboard/glass-card"
import type { Screen } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface BudgetsScreenProps {
  onNavigate: (screen: Screen) => void
}

const budgets = [
  { category: "Food", budget: 300, spent: 300, color: "var(--chart-1)" },
  { category: "Transport", budget: 200, spent: 120, color: "var(--chart-2)" },
  { category: "Entertainment", budget: 150, spent: 180, color: "var(--chart-5)" },
  { category: "Clothing", budget: 100, spent: 45, color: "var(--chart-3)" },
  { category: "Extras", budget: 200, spent: 160, color: "var(--chart-4)" },
  { category: "Utilities", budget: 250, spent: 230, color: "var(--accent)" },
]

export function BudgetsScreen({ onNavigate }: BudgetsScreenProps) {
  return (
    <div className="relative w-full h-full p-4">
      {/* Back button */}
      <GlassCard
        position="bottom-right"
        onClick={() => onNavigate("finance")}
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-foreground">Back</span>
      </GlassCard>

      <div className="flex flex-col items-center gap-4 h-full max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-foreground">Monthly Budgets</h2>
        <p className="text-xs text-muted-foreground">Track your spending against set limits</p>

        <div className="w-full flex-1 overflow-y-auto space-y-3 pr-2">
          {budgets.map((b) => {
            const percent = Math.round((b.spent / b.budget) * 100)
            const isOver = percent > 100
            const isWarning = percent >= 90

            return (
              <div key={b.category} className="rounded-lg border border-glass-border bg-glass backdrop-blur-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: b.color }} />
                    <span className="text-sm font-medium text-foreground">{b.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(isOver || isWarning) && (
                      <AlertTriangle className={cn(
                        "w-3.5 h-3.5",
                        isOver ? "text-destructive" : "text-chart-4"
                      )} />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {b.spent} / {b.budget} CHF
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isOver ? "bg-destructive" : isWarning ? "bg-chart-4" : ""
                    )}
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                      background: !isOver && !isWarning ? b.color : undefined,
                    }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className={cn(
                    "text-[10px] font-mono",
                    isOver ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {percent}%{isOver && " - Over budget!"}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
