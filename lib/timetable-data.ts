// Core data model for the college timetable (day-order based)

export type SlotType = "period" | "break" | "lunch"

export interface TimeSlot {
  id: string
  label: string // e.g. "Period 1", "Short Break", "Lunch"
  start: string // 24h "HH:MM"
  end: string
  type: SlotType
}

export interface ClassEntry {
  subjectCode: string
  subject: string
  faculty: string
  room: string
  kind: "Lecture" | "Lab" | "Tutorial" | "Elective"
}

// Map of dayOrder (1..N) -> map of TimeSlot.id -> ClassEntry
export type Schedule = Record<number, Record<string, ClassEntry>>

export interface Holiday {
  date: string // ISO "YYYY-MM-DD"
  name: string
}

export interface Semester {
  name: string
  startDate: string // ISO date the day-order cycle begins on
  startDayOrder: number // day order assigned to startDate
  totalDayOrders: number // number of day orders in the cycle (e.g. 5)
  workingDays: number[] // JS getDay() values that are working days (0=Sun..6=Sat)
}

// ---- Seed configuration ---------------------------------------------------

export const DEPARTMENT = {
  college: "SRM Institute of Science & Technology",
  department: "Computer Science & Engineering",
  section: "III Year — Section A",
  room: "Tech Park",
}

export const SEMESTER: Semester = {
  name: "Odd Semester 2026–27",
  startDate: "2026-08-03", // a Monday
  startDayOrder: 1,
  totalDayOrders: 5,
  workingDays: [1, 2, 3, 4, 5], // Mon–Fri
}

export const TIME_SLOTS: TimeSlot[] = [
  { id: "p1", label: "Period 1", start: "08:00", end: "08:50", type: "period" },
  { id: "p2", label: "Period 2", start: "08:50", end: "09:40", type: "period" },
  { id: "b1", label: "Short Break", start: "09:40", end: "09:55", type: "break" },
  { id: "p3", label: "Period 3", start: "09:55", end: "10:45", type: "period" },
  { id: "p4", label: "Period 4", start: "10:45", end: "11:35", type: "period" },
  { id: "ln", label: "Lunch", start: "11:35", end: "12:20", type: "lunch" },
  { id: "p5", label: "Period 5", start: "12:20", end: "13:10", type: "period" },
  { id: "p6", label: "Period 6", start: "13:10", end: "14:00", type: "period" },
  { id: "p7", label: "Period 7", start: "14:00", end: "14:50", type: "period" },
  { id: "p8", label: "Period 8", start: "14:50", end: "15:40", type: "period" },
]

// Reusable faculty + subject definitions
const CS3001: ClassEntry = { subjectCode: "CS3001", subject: "Design & Analysis of Algorithms", faculty: "Dr. Anitha Rao", room: "C-201", kind: "Lecture" }
const CS3002: ClassEntry = { subjectCode: "CS3002", subject: "Database Management Systems", faculty: "Prof. Mohan Kumar", room: "C-202", kind: "Lecture" }
const CS3003: ClassEntry = { subjectCode: "CS3003", subject: "Computer Networks", faculty: "Dr. Fatima Sheikh", room: "C-203", kind: "Lecture" }
const CS3004: ClassEntry = { subjectCode: "CS3004", subject: "Operating Systems", faculty: "Dr. Ramesh Iyer", room: "C-201", kind: "Lecture" }
const CS3005: ClassEntry = { subjectCode: "CS3005", subject: "Theory of Computation", faculty: "Prof. Leela Nair", room: "C-204", kind: "Lecture" }
const HS3001: ClassEntry = { subjectCode: "HS3001", subject: "Professional Ethics", faculty: "Dr. George Mathew", room: "C-210", kind: "Tutorial" }
const CS3091: ClassEntry = { subjectCode: "CS3091", subject: "DBMS Laboratory", faculty: "Prof. Mohan Kumar", room: "Lab-1", kind: "Lab" }
const CS3092: ClassEntry = { subjectCode: "CS3092", subject: "Networks Laboratory", faculty: "Dr. Fatima Sheikh", room: "Lab-2", kind: "Lab" }
const CS3081: ClassEntry = { subjectCode: "CS3081", subject: "Open Elective — Cloud Computing", faculty: "Dr. Priya Venkat", room: "C-301", kind: "Elective" }

// Schedule keyed by day order. Lab blocks span two consecutive periods.
export const SCHEDULE: Schedule = {
  1: { p1: CS3001, p2: CS3002, p3: CS3003, p4: CS3004, p5: CS3005, p6: HS3001, p7: CS3081, p8: CS3081 },
  2: { p1: CS3002, p2: CS3003, p3: CS3091, p4: CS3091, p5: CS3001, p6: CS3004, p7: CS3005, p8: HS3001 },
  3: { p1: CS3004, p2: CS3005, p3: CS3001, p4: CS3002, p5: CS3092, p6: CS3092, p7: CS3003, p8: CS3081 },
  4: { p1: CS3003, p2: CS3001, p3: CS3004, p4: CS3005, p5: CS3002, p6: CS3081, p7: HS3001, p8: CS3001 },
  5: { p1: CS3005, p2: CS3004, p3: CS3002, p4: CS3003, p5: CS3091, p6: CS3091, p7: CS3001, p8: CS3005 },
}

export const HOLIDAYS: Holiday[] = [
  { date: "2026-08-15", name: "Independence Day" },
  { date: "2026-09-05", name: "Teachers' Day (Institutional)" },
  { date: "2026-10-02", name: "Gandhi Jayanti" },
  { date: "2026-10-20", name: "Deepavali" },
  { date: "2026-10-21", name: "Deepavali Holiday" },
  { date: "2026-11-14", name: "Founder's Day" },
  { date: "2026-12-25", name: "Christmas" },
]

export const KIND_TOKENS: Record<ClassEntry["kind"], string> = {
  Lecture: "bg-primary/10 text-primary border-primary/20",
  Lab: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  Tutorial: "bg-muted text-muted-foreground border-border",
  Elective: "bg-secondary text-secondary-foreground border-border",
}
