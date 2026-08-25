"use client"

import { CalendarDays, Clock, MapPin, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  SCHEDULE,
  TIME_SLOTS,
  KIND_TOKENS,
  type Holiday,
} from "@/lib/timetable-data"
import { formatTime, nowMinutes, slotMinutes } from "@/lib/day-order"

function longDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function TodayPanel({
  today,
  dayOrder,
  holiday,
  isWeekend,
}: {
  today: Date
  dayOrder: number | null
  holiday?: Holiday
  isWeekend: boolean
}) {
  const now = nowMinutes(today)
  const periods = TIME_SLOTS.filter((s) => s.type === "period")

  return (
    <section className="rounded-xl border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            {longDate(today)}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-balance">
            {dayOrder ? `Day Order ${dayOrder}` : holiday ? holiday.name : "No Classes"}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          {dayOrder ? (
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {dayOrder}
            </span>
          ) : (
            <Badge variant="secondary" className="text-sm">
              {holiday ? "Holiday" : isWeekend ? "Weekend" : "Off"}
            </Badge>
          )}
        </div>
      </div>

      {dayOrder ? (
        <ul className="mt-5 flex flex-col gap-2">
          {TIME_SLOTS.map((slot) => {
            if (slot.type !== "period") {
              return (
                <li
                  key={slot.id}
                  className="flex items-center gap-3 rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <span className="font-medium uppercase tracking-wide">{slot.label}</span>
                  <span>
                    {formatTime(slot.start)} – {formatTime(slot.end)}
                  </span>
                </li>
              )
            }
            const entry = SCHEDULE[dayOrder]?.[slot.id]
            const isNow = now >= slotMinutes(slot.start) && now < slotMinutes(slot.end)
            return (
              <li
                key={slot.id}
                className={`flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between ${
                  isNow ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "bg-background"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex w-20 shrink-0 flex-col text-xs">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Clock className="size-3" />
                      {formatTime(slot.start)}
                    </span>
                    <span className="text-muted-foreground">{formatTime(slot.end)}</span>
                  </div>
                  <div>
                    {entry ? (
                      <>
                        <p className="font-medium leading-tight">{entry.subject}</p>
                        <p className="text-xs text-muted-foreground">{entry.subjectCode}</p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">Free Period</p>
                    )}
                  </div>
                </div>
                {entry && (
                  <div className="flex flex-wrap items-center gap-2 pl-[5.75rem] sm:pl-0">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="size-3" />
                      {entry.faculty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {entry.room}
                    </span>
                    <Badge variant="outline" className={`border ${KIND_TOKENS[entry.kind]}`}>
                      {entry.kind}
                    </Badge>
                    {isNow && <Badge className="bg-primary text-primary-foreground">Now</Badge>}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <CalendarDays className="size-8 text-muted-foreground" />
          <p className="mt-3 font-medium">
            {holiday ? `${holiday.name} — enjoy the break!` : isWeekend ? "It's the weekend." : "No classes scheduled."}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {periods.length} periods resume on the next working day.
          </p>
        </div>
      )}
    </section>
  )
}
