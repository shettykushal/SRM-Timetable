"use client"

import { BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { COURSES, KIND_TOKENS } from "@/lib/timetable-data"

export function CourseDetails() {
  const totalCredits = Array.from(new Map(COURSES.map((c) => [c.subjectCode, c.credit])).values()).reduce(
    (sum, credit) => sum + credit,
    0,
  )

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">Course Details</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {totalCredits} Credits
        </Badge>
      </div>

      {/* Table for md+ */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Cr</th>
              <th className="px-4 py-3 font-medium">Slot</th>
              <th className="px-4 py-3 font-medium">Faculty</th>
              <th className="px-4 py-3 font-medium">Room</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c, i) => (
              <tr key={`${c.subjectCode}-${i}`} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono text-xs font-medium">{c.subjectCode}</td>
                <td className="px-4 py-3">
                  <p className="font-medium leading-tight">{c.subject}</p>
                  <Badge variant="outline" className={`mt-1 border text-[10px] ${KIND_TOKENS[c.kind]}`}>
                    {c.kind}
                  </Badge>
                </td>
                <td className="px-4 py-3 tabular-nums">{c.credit}</td>
                <td className="px-4 py-3 font-mono text-xs">{c.slot}</td>
                <td className="px-4 py-3">
                  <p className="leading-tight">{c.faculty}</p>
                  <p className="text-xs text-muted-foreground">[{c.facultyId}]</p>
                </td>
                <td className="px-4 py-3">
                  <p className="leading-tight">{c.room}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.building} · {c.floor}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <ul className="flex flex-col md:hidden">
        {COURSES.map((c, i) => (
          <li key={`${c.subjectCode}-${i}`} className="border-b p-4 last:border-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium leading-tight">{c.subject}</p>
                <p className="font-mono text-xs text-muted-foreground">{c.subjectCode}</p>
              </div>
              <Badge variant="outline" className={`shrink-0 border text-[10px] ${KIND_TOKENS[c.kind]}`}>
                {c.kind}
              </Badge>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Credit / Slot</dt>
                <dd className="font-medium">
                  {c.credit} · {c.slot}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Faculty</dt>
                <dd className="font-medium">{c.faculty}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Room</dt>
                <dd className="font-medium">
                  {c.room} — {c.building}, {c.floor}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
