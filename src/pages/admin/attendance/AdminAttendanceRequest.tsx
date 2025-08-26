import { CalendarDays, PenSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const dummyData = [
  {
    empCode: "FTRD01235",
    employee: "Shaheen",
    requestType: "On Duty",
    requestedFor: "Jul 18, 2025",
    punches: ["09:37 AM", "12:37 PM", "05:52 PM"],
    requestedOn: "Jul 18, 2025",
    comments: "No",
    status: "Pending",
    actionBy: "shaheen",
    actionDate: "Jul 18:2024 PM",
  },
  {
    empCode: "FTRD01235",
    employee: "Shaheen",
    requestType: "On Duty",
    requestedFor: "Jul 18, 2025",
    punches: ["09:37 AM", "12:37 PM", "05:52 PM"],
    requestedOn: "Jul 18, 2025",
    comments: "No",
    status: "Pending",
    actionBy: "shaheen",
    actionDate: "Jul 18:2024 PM",
  },
  {
    empCode: "FTRD01235",
    employee: "Shaheen",
    requestType: "On Duty",
    requestedFor: "Jul 18, 2025",
    punches: ["09:37 AM", "12:37 PM", "05:52 PM"],
    requestedOn: "Jul 18, 2025",
    comments: "No",
    status: "Pending",
    actionBy: "shaheen",
    actionDate: "Jul 18:2024 PM",
  },
  {
    empCode: "FTRD01235",
    employee: "Shaheen",
    requestType: "On Duty",
    requestedFor: "Jul 18, 2025",
    punches: ["09:37 AM", "12:37 PM", "05:52 PM"],
    requestedOn: "Jul 18, 2025",
    comments: "No",
    status: "Pending",
    actionBy: "shaheen",
    actionDate: "Jul 18:2024 PM",
  },
];

const AdminAttendanceRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="p-6 bg-white mx-auto">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Request</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>Approve / Reject attendance requests</span>
        </span>
      </div>

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam ipsum porro facilis corporis corrupti quia, quos fugit quae rem veritatis dolores unde dolore labore at.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Start Date</span>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="p-2 pl-8 rounded bg-gray-100"
            />
            <CalendarDays className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">End Date</span>
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
        <button className="bg-[#DDFF8F] text-black px-4 py-2 rounded-xl font-bold">
          Search
        </button> */}
      </div>

      <Table className="bg-[#FBFFF2] w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Emp code</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>Requested for</TableHead>
            <TableHead>Punches</TableHead>
            <TableHead>Request on</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.empCode}</TableCell>
              <TableCell>{row.employee}</TableCell>
              <TableCell>{row.requestType}</TableCell>
              <TableCell>{row.requestedFor}</TableCell>
              <TableCell className="flex flex-col items-center">
                <span className="text-green-700 font-semibold">Present</span>{" "}
                {row.punches.map((p, i) => (
                  <span key={i} className="ml-1">{p}{i < row.punches.length - 1 ? "," : ""}</span>
                ))}
              </TableCell>
              <TableCell>{row.requestedOn}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>
                <span className="text-orange-500 font-semibold">{row.status}</span>
                <br />
                <span className="text-xs">{row.actionBy} {row.actionDate}</span>
              </TableCell>
              <TableCell className="text-right">
                <Toggle variant="outline" aria-label="Edit attendance request">
                  <PenSquare />
                </Toggle>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminAttendanceRequest;