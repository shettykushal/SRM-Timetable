// Core data model for the SRM timetable (day-order based)
// Data transcribed from the SRMIST Student Portal (Batch 2, UG First Year).

export type SlotType = "period"

export interface TimeSlot {
  id: string
  label: string
  start: string // 24h "HH:MM"
  end: string
  type: SlotType
}

export interface ClassEntry {
  subjectCode: string
  subject: string
  faculty: string
  facultyId: string
  credit: number
  slot: string
  location: string
  building: string
  floor: string
  room: string
  kind: "Lecture" | "Lab"
}

// Map of dayOrder (1..N) -> map of TimeSlot.id -> ClassEntry
export type Schedule = Record<number, Record<string, ClassEntry>>

export interface Holiday {
  date: string // ISO "YYYY-MM-DD"
  name: string
}

export interface Semester {
  name: string
  startDate: string
  startDayOrder: number
  totalDayOrders: number
  workingDays: number[] // JS getDay() values (0=Sun..6=Sat)
}

// ---- Seed configuration ---------------------------------------------------

export const DEPARTMENT = {
  college: "SRM Institute of Science & Technology",
  department: "B.Tech — First Year",
  section: "Batch 2",
  room: "University Building",
}

export const SEMESTER: Semester = {
  name: "Odd Semester 2026–27",
  startDate: "2026-07-21",
  startDayOrder: 1,
  totalDayOrders: 5,
  workingDays: [1, 2, 3, 4, 5], // Mon–Fri
}

// SRM portal periods: 12 hours, 08:00 → 18:10.
export const TIME_SLOTS: TimeSlot[] = [
  { id: "p1", label: "Hour 1", start: "08:00", end: "08:50", type: "period" },
  { id: "p2", label: "Hour 2", start: "08:50", end: "09:40", type: "period" },
  { id: "p3", label: "Hour 3", start: "09:45", end: "10:35", type: "period" },
  { id: "p4", label: "Hour 4", start: "10:40", end: "11:30", type: "period" },
  { id: "p5", label: "Hour 5", start: "11:35", end: "12:25", type: "period" },
  { id: "p6", label: "Hour 6", start: "12:30", end: "13:20", type: "period" },
  { id: "p7", label: "Hour 7", start: "13:25", end: "14:15", type: "period" },
  { id: "p8", label: "Hour 8", start: "14:20", end: "15:10", type: "period" },
  { id: "p9", label: "Hour 9", start: "15:10", end: "16:00", type: "period" },
  { id: "p10", label: "Hour 10", start: "16:00", end: "16:50", type: "period" },
  { id: "p11", label: "Hour 11", start: "16:50", end: "17:30", type: "period" },
  { id: "p12", label: "Hour 12", start: "17:30", end: "18:10", type: "period" },
]

// ---- Courses (from the portal's "Timetable Details" table) ----------------

const MAB: ClassEntry = {
  subjectCode: "26MAB1001T",
  subject: "Calculus and Linear Algebra",
  faculty: "Dr. Suvitha V",
  facultyId: "102113",
  credit: 4,
  slot: "B",
  location: "Annexure-II",
  building: "University Building",
  floor: "5th Floor",
  room: "509",
  kind: "Lecture",
}

const CYB_T: ClassEntry = {
  subjectCode: "26CYB1002J",
  subject: "Chemistry for Computer Science",
  faculty: "Dr. P. Panneerselvam",
  facultyId: "101449",
  credit: 4,
  slot: "D",
  location: "Annexure-II",
  building: "University Building",
  floor: "5th Floor",
  room: "509",
  kind: "Lecture",
}

const CYB_L: ClassEntry = {
  ...CYB_T,
  slot: "P23, P24",
  building: "Chemistry Lab Block",
  floor: "1st Floor",
  room: "Chemistry Laboratory 4",
  kind: "Lab",
}

const BTB: ClassEntry = {
  subjectCode: "26BTB1001T",
  subject: "Introduction to Computational Biology",
  faculty: "Saileshwar M",
  facultyId: "104013",
  credit: 2,
  slot: "C",
  location: "Annexure-II",
  building: "University Building",
  floor: "5th Floor",
  room: "509",
  kind: "Lecture",
}

const CSE_T: ClassEntry = {
  subjectCode: "26CSE1002J",
  subject: "Programming for Problem Solving",
  faculty: "Dr. Sorna Lakshmi K",
  facultyId: "102403",
  credit: 3,
  slot: "E",
  location: "Annexure-II",
  building: "University Building",
  floor: "5th Floor",
  room: "509",
  kind: "Lecture",
}

const CSE_L: ClassEntry = {
  ...CSE_T,
  slot: "P39, P40",
  location: "Annexure-I",
  building: "Basic Engineering Lab (BEL)",
  floor: "3rd Floor",
  room: "Programming Lab-1",
  kind: "Lab",
}

const MEE: ClassEntry = {
  subjectCode: "26MEE1001L",
  subject: "Workshop Practice",
  faculty: "Dr. Murugesan R",
  facultyId: "100553",
  credit: 2,
  slot: "P41–P44",
  location: "Annexure-I",
  building: "Basic Engineering Lab (BEL)",
  floor: "Ground Floor",
  room: "Sheet Metal Lab",
  kind: "Lab",
}

// Personal schedule keyed by day order (from "My Timetable").
// Day 1 has no scheduled classes for this batch.
export const SCHEDULE: Schedule = {
  1: {},
  2: { p1: MAB, p2: MAB },
  3: { p3: CYB_L, p4: CYB_L, p6: BTB, p7: BTB, p9: CYB_T, p10: MAB },
  4: { p1: CYB_T, p2: CYB_T, p3: MAB, p4: CSE_T, p5: BTB, p9: CSE_L, p10: CSE_L },
  5: { p1: MEE, p2: MEE, p3: MEE, p4: MEE, p6: CSE_T, p7: CSE_T, p8: BTB, p10: CYB_T },
}

// Unique course rows for the "Course Details" view (theory + lab listed separately).
export const COURSES: ClassEntry[] = [MAB, CYB_T, CYB_L, BTB, CSE_T, CSE_L, MEE]

// ---- SRM academic calendar (explicit day orders) --------------------------
// Working days mapped to their exact day order, straight from the portal
// calendar (21-Jul-2026 → 07-Dec-2026). Only working days appear here.
export const DAY_ORDER_CALENDAR: Record<string, number> = {
  "2026-07-21": 1, "2026-07-22": 2, "2026-07-23": 3, "2026-07-24": 4, "2026-07-27": 5,
  "2026-07-28": 1, "2026-07-29": 2, "2026-07-30": 3, "2026-07-31": 4, "2026-08-03": 5,
  "2026-08-04": 1, "2026-08-05": 2, "2026-08-06": 3, "2026-08-07": 4, "2026-08-10": 5,
  "2026-08-11": 1, "2026-08-12": 2, "2026-08-13": 3, "2026-08-14": 4, "2026-08-17": 5,
  "2026-08-18": 1, "2026-08-19": 2, "2026-08-20": 3, "2026-08-21": 4, "2026-08-25": 5,
  "2026-08-27": 1, "2026-08-28": 2, "2026-08-31": 3, "2026-09-01": 4, "2026-09-02": 5,
  "2026-09-03": 1, "2026-09-07": 2, "2026-09-08": 3, "2026-09-09": 4, "2026-09-10": 5,
  "2026-09-11": 1, "2026-09-15": 2, "2026-09-16": 3, "2026-09-17": 4, "2026-09-18": 5,
  "2026-09-21": 1, "2026-09-22": 2, "2026-09-23": 3, "2026-09-24": 4, "2026-09-25": 5,
  "2026-09-28": 1, "2026-09-29": 2, "2026-09-30": 3, "2026-10-01": 4, "2026-10-05": 5,
  "2026-10-06": 1, "2026-10-07": 2, "2026-10-08": 3, "2026-10-09": 4, "2026-10-12": 5,
  "2026-10-13": 1, "2026-10-14": 2, "2026-10-15": 3, "2026-10-16": 4, "2026-10-21": 5,
  "2026-10-22": 1, "2026-10-23": 2, "2026-10-26": 3, "2026-10-27": 4, "2026-10-28": 5,
  "2026-10-29": 1, "2026-10-30": 2, "2026-11-02": 3, "2026-11-03": 4, "2026-11-04": 5,
  "2026-11-05": 1, "2026-11-06": 2, "2026-11-09": 3, "2026-11-10": 4, "2026-11-11": 5,
  "2026-11-12": 1, "2026-11-13": 2, "2026-11-16": 3, "2026-11-17": 4, "2026-11-18": 5,
  "2026-11-19": 1, "2026-11-20": 2, "2026-11-23": 3, "2026-11-24": 4, "2026-11-25": 5,
  "2026-11-26": 1, "2026-11-27": 2, "2026-11-30": 3, "2026-12-01": 4, "2026-12-02": 5,
  "2026-12-03": 1, "2026-12-04": 2, "2026-12-07": 3,
}

// Special remarks for specific working days.
export const CALENDAR_NOTES: Record<string, string> = {
  "2026-11-20": "Last Working Day — PG",
  "2026-12-07": "Last Working Day — UG First Year",
}

// Named holidays (weekends excluded — those are detected automatically).
export const HOLIDAYS: Holiday[] = [
  { date: "2026-08-24", name: "Classes Suspended" },
  { date: "2026-08-26", name: "Milad-un-Nabi" },
  { date: "2026-09-04", name: "Krishna Jayanthi" },
  { date: "2026-09-14", name: "Vinayagar Chaturthi" },
  { date: "2026-10-02", name: "Gandhi Jayanthi" },
  { date: "2026-10-19", name: "Ayutha Pooja" },
  { date: "2026-10-20", name: "Vijaya Dasami" },
]

export const KIND_TOKENS: Record<ClassEntry["kind"], string> = {
  Lecture: "bg-primary/10 text-primary border-primary/20",
  Lab: "bg-chart-3/15 text-chart-3 border-chart-3/25",
}
