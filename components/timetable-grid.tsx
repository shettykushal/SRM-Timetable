"use client"

import {
  SCHEDULE,
  SEMESTER,
  TIME_SLOTS,
  KIND_TOKENS,
} from "@/lib/timetable-data"
import { formatTime } from "@/lib/day-order"

export function TimetableGrid({ activeDayOrder }: { activeDayOrder: number | null }) {
  const dayOrders = Array.from({ length: SEMESTER.totalDayOrders }, (_, i) => i + 1)

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="sticky left-0 z-10 bg-muted/50 px-3 py-3 text-left font-medium text-muted-foreground">
              Time
            </th>
            {dayOrders.map((d) => (
              <th
                key={d}
                className={`px-3 py-3 text-left font-medium ${
                  d === activeDayOrder ? "text-primary" : "text-foreground"
                }`}
              >
                Day Order {d}
                {d === activeDayOrder && (
                  <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    TODAY
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((slot) => {
            if (slot.type !== "period") {
              return (
                <tr key={slot.id} className="border-b bg-muted/30">
                  <td className="sticky left-0 z-10 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                    {formatTime(slot.start)}
                  </td>
                  <td
                    colSpan={dayOrders.length}
                    className="px-3 py-1.5 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {slot.label}
                  </td>
                </tr>
              )
            }
            return (
              <tr key={slot.id} className="border-b last:border-0">
                <td className="sticky left-0 z-10 bg-card px-3 py-3 align-top">
                  <div className="flex flex-col text-xs">
                    <span className="font-medium">{formatTime(slot.start)}</span>
                    <span className="text-muted-foreground">{formatTime(slot.end)}</span>
                  </div>
                </td>
                {dayOrders.map((d) => {
                  const entry = SCHEDULE[d]?.[slot.id]
                  const isActiveCol = d === activeDayOrder
                  return (
                    <td
                      key={d}
                      className={`px-2 py-2 align-top ${isActiveCol ? "bg-primary/5" : ""}`}
                    >
                      {entry ? (
                        <div
                          className={`rounded-md border p-2 ${KIND_TOKENS[entry.kind]}`}
                        >
                          <p className="text-xs font-semibold leading-tight text-foreground">
                            {entry.subject}
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {entry.faculty}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {entry.room} · {entry.subjectCode}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-md border border-dashed p-2 text-center text-[11px] text-muted-foreground">
                          Free
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
