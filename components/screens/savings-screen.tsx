"use client"

import { ArrowLeft, Target } from "lucide-react"
import { GlassCard } from "@/components/dashboard/glass-card"
import type { Screen } from "@/lib/navigation"

interface SavingsScreenProps {
  onNavigate: (screen: Screen) => void
}

const savingsGoals = [
  { name: "Emergency Fund", target: 10000, saved: 7500, color: "var(--chart-1)" },
  { name: "Vacation", target: 3000, saved: 1800, color: "var(--chart-2)" },
  { name: "New Laptop", target: 2500, saved: 2500, color: "var(--accent)" },
  { name: "Car Down Payment", target: 15000, saved: 4200, color: "var(--chart-3)" },
  { name: "Education", target: 5000, saved: 1250, color: "var(--chart-4)" },
]

const totalSaved = savingsGoals.reduce((a, b) => a + b.saved, 0)
const totalTarget = savingsGoals.reduce((a, b) => a + b.target, 0)

export function SavingsScreen({ onNavigate }: SavingsScreenProps) {
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
        <h2 className="text-lg font-semibold text-foreground">Savings Goals</h2>

        {/* Total summary */}
        <div className="flex items-center gap-3 rounded-lg border border-glass-border bg-glass backdrop-blur-xl px-4 py-2">
          <Target className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Total Saved</p>
            <p className="text-lg font-bold text-primary">
              {totalSaved.toLocaleString()} / {totalTarget.toLocaleString()} CHF
            </p>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto space-y-3 pr-2">
          {savingsGoals.map((goal) => {
            const percent = Math.round((goal.saved / goal.target) * 100)
            const isComplete = percent >= 100

            return (
              <div
                key={goal.name}
                className="rounded-lg border border-glass-border bg-glass backdrop-blur-xl p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{goal.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {goal.saved.toLocaleString()} / {goal.target.toLocaleString()} CHF
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                      background: goal.color,
                    }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {percent}%{isComplete && " - Goal reached!"}
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
