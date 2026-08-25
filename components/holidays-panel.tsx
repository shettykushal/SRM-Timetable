"use client"

import { PartyPopper } from "lucide-react"
import { HOLIDAYS } from "@/lib/timetable-data"
import { parseISO, toISO } from "@/lib/day-order"

export function HolidaysPanel({ today }: { today: Date }) {
  const todayIso = toISO(today)
  const sorted = [...HOLIDAYS].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="rounded-xl border bg-card p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <PartyPopper className="size-5 text-primary" />
        <h3 className="text-lg font-semibold">Holiday Calendar</h3>
      </div>
      <ul className="flex flex-col">
        {sorted.map((h) => {
          const d = parseISO(h.date)
          const past = h.date < todayIso
          return (
            <li
              key={h.date}
              className="flex items-center gap-4 border-b py-3 last:border-0"
            >
              <div
                className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-lg border ${
                  past ? "opacity-50" : "bg-primary/5"
                }`}
              >
                <span className="text-[10px] uppercase text-muted-foreground">
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-lg font-semibold leading-none">{d.getDate()}</span>
              </div>
              <div className={past ? "opacity-50" : ""}>
                <p className="font-medium">{h.name}</p>
                <p className="text-xs text-muted-foreground">
                  {d.toLocaleDateString("en-US", { weekday: "long" })}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
