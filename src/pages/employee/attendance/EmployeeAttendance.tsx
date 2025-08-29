import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ProgressBar from "./ProgressBar";
import CalendarView from "./CalendarView";
import { getAttendance } from "../../../services/user/apiMethods";
import AttendanceSummary from "./AttendanceSummary";
import { Link } from "react-router-dom";

type AttendancePunch = {
  id: number;
  in_time: string | null;
  out_time: string | null;
  duration: string | null;
  is_manual: boolean;
  device_info: string;
};

type AttendanceDay = {
  date: string;
  day_name: string;
  punches: AttendancePunch[];
  total_time: string | null;
  percentage: number;
  status: string;
  is_justified: boolean;
};

type AttendanceResponse = {
  employee_id: number;
  start_date: string | null;
  end_date: string | null;
  attendances: AttendanceDay[];
};

type Props = {
  apiUrl?: string;
  employeeId?: number;
};

const EmployeeAttendance: React.FC<Props> = ({ employeeId }) => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [attendanceData, setAttendanceData] = useState<AttendanceDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month() + 1); // dayjs months are 0-based
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());

  // Calculate week range (Monday to Sunday)
  const getWeekRange = (date: Dayjs) => {
    const start = date.startOf("week").add(1, "day"); // Monday
    const end = start.add(6, "day"); // Sunday
    return { start, end };
  };

  // Fetch attendance data for week
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const { start, end } = getWeekRange(currentDate);
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");

      const response: any = await getAttendance(startDate, endDate);

      // Extract attendance data from Axios response
      const attendanceResponse = response.data as AttendanceResponse;

      // Since API now returns preset days in correct order, use them directly
      setAttendanceData(attendanceResponse.attendances || []);
    } catch (err) {
      setAttendanceData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view === "week") fetchAttendance();
    // eslint-disable-next-line
  }, [currentDate, view]);
  // Year and month
  useEffect(() => {
  setCurrentMonth(currentDate.month() + 1);
  setCurrentYear(currentDate.year());
}, [currentDate]);

  // Navigation handlers
  const handlePrevWeek = () => setCurrentDate((d) => d.subtract(1, "week"));
  const handleNextWeek = () => setCurrentDate((d) => d.add(1, "week"));
  const handleToday = () => setCurrentDate(dayjs());

  // Helper: Get all punch times for display
  const getAllPunchTimes = (punches: AttendancePunch[]) => {
    if (!punches || punches.length === 0) return { inTimes: [], outTimes: [] };

    const inTimes: string[] = [];
    const outTimes: string[] = [];

    punches.forEach((punch) => {
      if (punch.in_time) {
        inTimes.push(punch.in_time);
      }
      if (punch.out_time) {
        outTimes.push(punch.out_time);
      }
    });

    return { inTimes, outTimes };
  };

  // Helper: Progress bar color logic based on status
  const getProgressColor = (day: AttendanceDay) => {
    const status = day.status.toLowerCase();

    switch (status) {
      case "present":
        return "bg-green-500";
      case "half_day":
        return "bg-emerald-500";
      case "absent":
        return "bg-red-500";
      case "late":
        return "bg-teal-400";
      case "early_left":
      case "early left":
        return "bg-gray-400";
      case "weekend/off day":
        return "bg-violet-500";
      case "leave":
        return "bg-blue-500";
      case "holiday":
        return "bg-yellow-500";
      case "coming day":
        return "bg-gray-200";
      default:
        return "bg-gray-300";
    }
  };

  // Helper: Get progress value based on status
  const getProgressValue = (day: AttendanceDay) => {
    const status = day.status.toLowerCase();

    // For statuses that should show 100% regardless of percentage
    if (["absent", "weekend/off day", "leave", "holiday"].includes(status)) {
      return 1; // 100%
    }

    // For coming days, show empty progress
    if (status === "coming day") {
      return 0;
    }

    // For all other statuses, use percentage from API
    return Math.min(day.percentage / 100, 1);
  };

  // Helper: Format worked hours from percentage
  const getWorkedHours = (percentage: number) => {
    const standardHours = 9;
    return (percentage * standardHours) / 100;
  };


  // Format week range for header
  const weekRange = getWeekRange(currentDate);
  const weekHeader = `${weekRange.start.format("MMM D, YYYY")} - ${weekRange.end.format("MMM D, YYYY")}`;

  return (
    <div className="w-full mx-auto p-2">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View Attendance</span>
        </span>
      </div>
      <div className="flex flex-col-reverse gap-4 sm:flex-row justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-full text-sm" onClick={handleToday}>
            Today
          </button>
          <button
            className={`px-3 py-1 border rounded-l-full text-sm ${view === "week" ? "bg-violet-100" : ""}`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 border rounded-r-full text-sm ${view === "month" ? "bg-violet-100" : ""}`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
        <div>
          <Link to="/attendance/request-attendance" className="p-3 border font-medium rounded-full text-sm bg-[#ddff8f]">
            Attendance Request
          </Link>
        </div>
      </div>
      {view === "week" && (
        <div className="bg-[#fbfff2] rounded-xl p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <button
              className="p-2 rounded-full border hover:bg-gray-100"
              onClick={handlePrevWeek}
              aria-label="Previous week"
            >
              &lt;
            </button>
            <span className="font-medium text-slate-700">{weekHeader}</span>
            <button
              className="p-2 rounded-full border hover:bg-gray-100"
              onClick={handleNextWeek}
              aria-label="Next week"
            >
              &gt;
            </button>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4">
              {/* Table header */}
              <div className="grid grid-cols-3 items-center py-2 font-bold text-slate-600 border-b">
                <span>Date</span>
                <span>Hours</span>
                <span className="text-right">Total</span>
              </div>
              {/* Attendance rows */}
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                attendanceData.map((dayData) => {
                  const punchTimes = getAllPunchTimes(dayData.punches || []);
                  const progress = getProgressValue(dayData);
                  const workedHours = getWorkedHours(dayData.percentage);

                  return (
                    <div
                      key={dayData.date}
                      className="grid grid-cols-3 items-center py-4 rounded-lg"
                    >
                      {/* Date */}
                      <div>
                        <span className="font-semibold">{dayData.day_name}</span>
                        <br />
                        <span className="text-xs text-slate-500">
                          {dayjs(dayData.date).format("MMM D, YYYY")}
                        </span>
                      </div>
                      {/* Progress bar + punch times */}
                      <div>
                        <ProgressBar
                          progress={progress}
                          color={getProgressColor(dayData)}
                        />
                        <div className="flex justify-between text-xs mt-1 text-slate-600">
                          {/* All punch in times on the left */}
                          <div className="flex flex-col items-start">
                            {punchTimes.inTimes.length > 0 ? (
                              punchTimes.inTimes.map((inTime, index) => (
                                <span key={`in-${index}`}>
                                  {dayjs(`1970-01-01T${inTime}`).format("h:mm A")}
                                </span>
                              ))
                            ) : (
                              <span>--</span>
                            )}
                          </div>
                          {/* All punch out times on the right */}
                          <div className="flex flex-col items-end">
                            {punchTimes.outTimes.length > 0 ? (
                              punchTimes.outTimes.map((outTime, index) => (
                                <span key={`out-${index}`}>
                                  {dayjs(`1970-01-01T${outTime}`).format("h:mm A")}
                                </span>
                              ))
                            ) : (
                              <span>--</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Total worked hours */}
                      <div className="text-right font-bold text-green-700">
                        {workedHours ? workedHours.toFixed(2) : "00.00"}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
      {view === "month" && (
        <CalendarView employeeId={employeeId} />
      )}

      {/* AttendanceSummary */}
      <AttendanceSummary month={currentMonth} year={currentYear} />
    </div>
  );
};

export default EmployeeAttendance;