import { CalendarDays } from "lucide-react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const attendanceData = [
  {
    empCode: "FTRD01235",
    employee: "Shaheen",
    attendance: ["A", 9.5, "A", 9.5, "A", "W", "W", 9.5, 9.5, 9.5, 9.5, 9.5, 9.5],
    weekOff: 2,
  },
  // ...repeat as needed for demo
];

const days = [
  { date: 1, day: "Mon" },
  { date: 2, day: "Tue" },
  { date: 3, day: "Wed" },
  { date: 4, day: "Thu" },
  { date: 5, day: "Fri" },
  { date: 6, day: "Sat" },
  { date: 8, day: "Sun" },
  { date: 9, day: "Mon" },
  { date: 10, day: "Tue" },
  { date: 11, day: "Wed" },
  { date: 12, day: "Thu" },
  { date: 13, day: "Fri" },
];

const departmentList = ["Select Department", "IT", "HR", "Finance"];
const designationList = ["Select Designations", "Manager", "Developer", "HR"];
const employeeList = ["All Employees", "Shaheen", "John", "Priya"];

const AdminAttendance = () => {
  const [department, setDepartment] = useState(departmentList[0]);
  const [designation, setDesignation] = useState(designationList[0]);
  const [employee, setEmployee] = useState(employeeList[0]);
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-07-14");

  return (
    <div className="p-6 bg-white mx-auto">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View Employee Attendance</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={employee}
          onChange={e => setEmployee(e.target.value)}
          className="p-2 rounded bg-gray-100 text-sm"
        >
          {employeeList.map(emp => (
            <option key={emp} value={emp}>{emp}</option>
          ))}
        </select>
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="p-2 rounded bg-gray-100 text-sm"
        >
          {departmentList.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        <select
          value={designation}
          onChange={e => setDesignation(e.target.value)}
          className="p-2 rounded bg-gray-100 text-sm"
        >
          {designationList.map(des => (
            <option key={des} value={des}>{des}</option>
          ))}
        </select>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-sm">Date Range</span>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="p-2 pl-8 rounded bg-gray-100"
            />
            <CalendarDays className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          </div>
          <span className="mx-1">-</span>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="p-2 pl-8 rounded bg-gray-100"
            />
            <CalendarDays className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        {/* <button className="flex items-center bg-[#DDFF8F] text-black px-4 py-2 rounded-xl font-bold">
          <Filter className="mr-2 w-4 h-4" /> Filter
        </button>
        <button className="bg-[#DDFF8F] text-black px-4 py-2 rounded-xl font-bold">Search</button> */}
        <button className="bg-gray-100 text-black px-4 py-2 rounded-xl font-bold">Manually Adjust</button>
        <button className="bg-gray-100 text-black px-4 py-2 rounded-xl font-bold">Total Hours</button>
      </div>

      <Table className="bg-[#FBFFF2] w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Emp code</TableHead>
            <TableHead>Employee</TableHead>
            {days.map((d, idx) => (
              <TableHead key={idx}>{d.date} <span className="text-xs">{d.day}</span></TableHead>
            ))}
            <TableHead>week off</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.empCode}</TableCell>
              <TableCell>{row.employee}</TableCell>
              {row.attendance.map((att, i) => (
                <TableCell
                  key={i}
                  className={
                    att === "A"
                      ? "text-red-500 font-bold"
                      : att === "W"
                      ? "text-orange-500 font-bold"
                      : "text-green-500 font-bold"
                  }
                >
                  {att}
                </TableCell>
              ))}
              <TableCell className="text-red-500 font-bold">{row.weekOff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={days.length + 3}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
export default AdminAttendance;