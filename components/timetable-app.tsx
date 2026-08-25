"use client"

import { GraduationCap, LayoutGrid, CalendarClock, PartyPopper } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TodayPanel } from "@/components/today-panel"
import { TimetableGrid } from "@/components/timetable-grid"
import { UpcomingStrip } from "@/components/upcoming-strip"
import { HolidaysPanel } from "@/components/holidays-panel"
import { DEPARTMENT, SEMESTER, HOLIDAYS } from "@/lib/timetable-data"
import { getDayOrder, getUpcomingDays, isHoliday, toISO } from "@/lib/day-order"

export function TimetableApp() {
  // Single source of truth for "now". In a real deployment this is the server
  // date; here it drives the day-order computation deterministically.
  const today = new Date()

  const dayOrder = getDayOrder(today, SEMESTER, HOLIDAYS)
  const holiday = isHoliday(toISO(today), HOLIDAYS)
  const isWeekend = !SEMESTER.workingDays.includes(today.getDay())
  const upcoming = getUpcomingDays(today, 7, SEMESTER, HOLIDAYS)

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">
              {DEPARTMENT.college}
            </h1>
            <p className="text-sm text-muted-foreground">
              {DEPARTMENT.department} · {DEPARTMENT.section}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {SEMESTER.name}
        </Badge>
      </header>

      <div className="mb-6">
        <UpcomingStrip days={upcoming} />
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="today">
            <CalendarClock className="mr-1.5 size-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="week">
            <LayoutGrid className="mr-1.5 size-4" />
            Full Timetable
          </TabsTrigger>
          <TabsTrigger value="holidays">
            <PartyPopper className="mr-1.5 size-4" />
            Holidays
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <TodayPanel
            today={today}
            dayOrder={dayOrder}
            holiday={holiday}
            isWeekend={isWeekend}
          />
        </TabsContent>

        <TabsContent value="week">
          <TimetableGrid activeDayOrder={dayOrder} />
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <LegendDot className="bg-primary/40" label="Lecture" />
            <LegendDot className="bg-chart-3/60" label="Lab" />
            <LegendDot className="bg-muted-foreground/40" label="Tutorial" />
            <LegendDot className="bg-secondary-foreground/40" label="Elective" />
          </div>
        </TabsContent>

        <TabsContent value="holidays">
          <HolidaysPanel today={today} />
        </TabsContent>
      </Tabs>

      <footer className="mt-8 border-t pt-4 text-xs text-muted-foreground">
        Day orders advance only on working days ({SEMESTER.workingDays.length}/week).
        Weekends and holidays are skipped automatically, so the rotation always
        resumes where it left off.
      </footer>
    </div>
  )
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`size-3 rounded-full ${className}`} />
      {label}
    </span>
  )
}
