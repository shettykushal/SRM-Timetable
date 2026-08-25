"use client"

import type { UpcomingDay } from "@/lib/day-order"

export function UpcomingStrip({ days }: { days: UpcomingDay[] }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Next 7 days</h3>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const weekday = d.date.toLocaleDateString("en-US", { weekday: "short" })
          const dayNum = d.date.getDate()
          const isToday = i === 0
          return (
            <div
              key={d.iso}
              className={`flex min-w-[76px] flex-col items-center gap-1 rounded-lg border p-2 text-center ${
                isToday ? "border-primary bg-primary/5" : "bg-card"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {weekday}
              </span>
              <span className="text-lg font-semibold leading-none">{dayNum}</span>
              {d.dayOrder ? (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                  DO {d.dayOrder}
                </span>
              ) : d.holiday ? (
                <span className="line-clamp-1 rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-medium text-destructive">
                  Holiday
                </span>
              ) : (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  Off
                </span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
