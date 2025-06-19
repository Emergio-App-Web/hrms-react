"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function AttendanceGraph() {
  const data = [
    { month: "Jan", value: 8 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 12 },
    { month: "Apr", value: 10 },
    { month: "May", value: 14 },
    { month: "Jun", value: 22 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full  ">
      <div className="flex items-center justify-start gap-5 mb-8">
        <h2 className="text-xl font-semibold">Attendance</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <span className="text-sm">
              Current Week <span className="font-medium">51 Hrs</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-300"></div>
            <span className="text-sm">
              Previous Week <span className="font-medium">68 Hrs</span>
            </span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#888888" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888888" }} ticks={[0, 10, 20, 30]} />
            <Line type="monotone" dataKey="value" stroke="#93c5fd" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
