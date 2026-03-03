"use client"

import { ArrowLeft } from "lucide-react"
import { GlassCard } from "@/components/dashboard/glass-card"
import type { Screen } from "@/lib/navigation"
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
} from "recharts"

interface IncomeExpenseScreenProps {
  onNavigate: (screen: Screen) => void
}

const expenseData = [
  { name: "Food", value: 450, fill: "var(--chart-1)" },
  { name: "Rent", value: 1200, fill: "var(--chart-2)" },
  { name: "Transport", value: 180, fill: "var(--chart-3)" },
  { name: "Extras", value: 320, fill: "var(--chart-4)" },
  { name: "Utilities", value: 150, fill: "var(--chart-5)" },
]

const monthlyData = [
  { month: "Jan", income: 5200, expenses: 2300 },
  { month: "Feb", income: 5200, expenses: 2100 },
  { month: "Mar", income: 5400, expenses: 2500 },
  { month: "Apr", income: 5200, expenses: 1900 },
  { month: "May", income: 5600, expenses: 2800 },
  { month: "Jun", income: 5200, expenses: 2200 },
]

const totalIncome = 5200
const totalExpenses = expenseData.reduce((a, b) => a + b.value, 0)

export function IncomeExpenseScreen({ onNavigate }: IncomeExpenseScreenProps) {
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

      <div className="flex flex-col items-center gap-4 h-full">
        <h2 className="text-lg font-semibold text-foreground">Income & Expenses</h2>

        {/* Summary */}
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Monthly Income</p>
            <p className="text-xl font-bold text-accent">
              {totalIncome.toLocaleString()} CHF
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Monthly Expenses</p>
            <p className="text-xl font-bold text-destructive">
              {totalExpenses.toLocaleString()} CHF
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Net</p>
            <p className="text-xl font-bold text-primary">
              {(totalIncome - totalExpenses).toLocaleString()} CHF
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="flex gap-6 flex-1 w-full max-w-3xl">
          {/* Pie chart */}
          <div className="flex-1 flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-2">Expenses by Category</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {expenseData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value} CHF`]}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {expenseData.map((e) => (
                <div key={e.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: e.fill }} />
                  <span className="text-[10px] text-muted-foreground">{e.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex-1 flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-2">Monthly Overview</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value} CHF`]}
                />
                <Bar dataKey="income" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-chart-2" />
                <span className="text-[10px] text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-chart-5" />
                <span className="text-[10px] text-muted-foreground">Expenses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
