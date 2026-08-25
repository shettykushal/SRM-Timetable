import { DAY_ORDER_CALENDAR, type Holiday, type Semester } from "./timetable-data"

export function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function isHoliday(iso: string, holidays: Holiday[]): Holiday | undefined {
  return holidays.find((h) => h.date === iso)
}

export function isWorkingDay(d: Date): boolean {
  return toISO(d) in DAY_ORDER_CALENDAR
}

/**
 * Returns the day order for a date directly from the SRM academic calendar.
 * Weekends, holidays, and any non-working day return null.
 */
export function getDayOrder(date: Date): number | null {
  return DAY_ORDER_CALENDAR[toISO(date)] ?? null
}

export interface UpcomingDay {
  date: Date
  iso: string
  dayOrder: number | null
  holiday?: Holiday
  isWeekend: boolean
}

/** Returns the next `count` calendar days starting today, annotated with status. */
export function getUpcomingDays(
  from: Date,
  count: number,
  sem: Semester,
  holidays: Holiday[],
): UpcomingDay[] {
  const out: UpcomingDay[] = []
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  for (let i = 0; i < count; i++) {
    const iso = toISO(cursor)
    out.push({
      date: new Date(cursor),
      iso,
      dayOrder: getDayOrder(cursor),
      holiday: isHoliday(iso, holidays),
      isWeekend: !sem.workingDays.includes(cursor.getDay()),
    })
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
}

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const hr = h % 12 === 0 ? 12 : h % 12
  return `${hr}:${String(m).padStart(2, "0")} ${period}`
}

export function nowMinutes(d: Date): number {
  return d.getHours() * 60 + d.getMinutes()
}

export function slotMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}
