import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ProgressBar from "./ProgressBar";
import CalendarView from "./CalendarView";
import { getAttendance } from "../../../services/user/apiMethods";

const STANDARD_HOURS = 9;

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

const EmployeeAttendance: React.FC<Props> = ({ apiUrl, employeeId }) => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [attendanceData, setAttendanceData] = useState<AttendanceDay[]>([]);
  const [loading, setLoading] = useState(false);

  // Calculate week range
  const getWeekRange = (date: Dayjs) => {
    const start = date.startOf("week").add(1, "day"); // Monday
    const end = start.add(5, "day"); // Saturday
    return { start, end };
  };

  // Fetch attendance data for week
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response: any = await getAttendance();
      console.log("API Response:", response); // Debug log
      
      // Extract attendance data from Axios response
      const attendanceResponse = response.data as AttendanceResponse;
      
      // Filter attendances for current week
      const { start, end } = getWeekRange(currentDate);
      
      const weekDates: { day_name: string; date: string }[] = [];
      for (let i = 0; i < 6; i++) {
        const dateObj = start.add(i, "day");
        weekDates.push({
          day_name: dateObj.format("dddd"),
          date: dateObj.format("YYYY-MM-DD"),
        });
      }
      
      console.log("Week dates:", weekDates); // Debug log
      
      // Map attendance data by date for accurate lookup
      const attendanceMap = new Map<string, AttendanceDay>();
      (attendanceResponse.attendances || []).forEach((d) => {
        attendanceMap.set(d.date, d);
        console.log("Mapped attendance for date:", d.date, "total_time:", d.total_time); // Debug log
      });
      
      // Fill missing days with default absent/off
      const filledWeek: AttendanceDay[] = weekDates.map(({ day_name, date }) => {
        const found = attendanceMap.get(date);
        if (found) {
          console.log("Found data for", date, "total_time:", found.total_time); // Debug log
          return found;
        }
        // Default absent/off object
        return {
          date,
          day_name,
          punches: [],
          total_time: null,
          status: ["Saturday", "Sunday"].includes(day_name) ? "off" : "absent",
          is_justified: false,
        };
      });
      
      console.log("Final attendance data:", filledWeek); // Debug log
      setAttendanceData(filledWeek);
    } catch (err) {
      console.error("Error fetching attendance:", err); // Debug log
      setAttendanceData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view === "week") fetchAttendance();
    // eslint-disable-next-line
  }, [currentDate, view]);

  // Navigation handlers
  const handlePrevWeek = () => setCurrentDate((d) => d.subtract(1, "week"));
  const handleNextWeek = () => setCurrentDate((d) => d.add(1, "week"));
  const handleToday = () => setCurrentDate(dayjs());

  // Helper: Calculate worked hours from total_time string
  const getWorkedHours = (total_time: string | null) => {
    if (!total_time) return 0;
    console.log("Calculating hours for total_time:", total_time); // Debug log
    const [h, m, s] = total_time.split(":");
    const hours = parseFloat(h) + parseFloat(m) / 60 + parseFloat(s.split('.')[0]) / 3600;
    console.log("Calculated hours:", hours); // Debug log
    return hours;
  };

  // Helper: Get punch-in/out times
  const getPunchTimes = (punches: AttendancePunch[]) => {
    if (!punches || punches.length === 0) return { in: "--", out: "--" };
    const validPunches = punches.filter((p) => p.in_time && p.out_time);
    if (validPunches.length === 0) return { in: "--", out: "--" };
    return {
      in: validPunches[0].in_time || "--",
      out: validPunches[validPunches.length - 1].out_time || "--",
    };
  };

  // Helper: Progress bar color logic
  const getProgressColor = (day: AttendanceDay) => {
    if (day.punches && day.punches.length > 0) return "bg-green-500";
    if (["Saturday", "Sunday"].includes(day.day_name)) return "bg-blue-500";
    return "bg-red-500";
  };

  // Weekdays for display
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
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
                weekDays.map((dayName, idx) => {
                  const currentWeekDate = weekRange.start.add(idx, "day").format("YYYY-MM-DD");
                  const dayData = attendanceData.find((d) => d.date === currentWeekDate);
                  const workedHours = getWorkedHours(dayData?.total_time || null);
                  const punchTimes = getPunchTimes(dayData?.punches || []);
                  const progress = Math.min(workedHours / STANDARD_HOURS, 1);
                  
                  console.log(`Day ${dayName} (${currentWeekDate}):`, {
                    dayData: dayData?.total_time,
                    workedHours,
                    progress,
                    hasData: !!dayData
                  }); // Debug log
                  return (
                    <div
                      key={dayName}
                      className="grid grid-cols-3 items-center py-4 rounded-lg "
                    >
                      {/* Date */}
                      <div>
                        <span className="font-semibold">{dayName}</span>
                        <br />
                        <span className="text-xs text-slate-500">
                          {dayjs(currentWeekDate).format("MMM D, YYYY")}
                        </span>
                      </div>
                      {/* Progress bar + punch times */}
                      <div>
                        <ProgressBar
                          progress={progress}
                          color={dayData ? getProgressColor(dayData) : "bg-blue-500"}
                        />
                        <div className="flex justify-between text-xs mt-1 text-slate-600">
                          <span>{punchTimes.in !== "--" ? dayjs(`1970-01-01T${punchTimes.in}`).format("h:mm A") : "--"}</span>
                          <span>{punchTimes.out !== "--" ? dayjs(`1970-01-01T${punchTimes.out}`).format("h:mm A") : "--"}</span>
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
    </div>
  );
};

export default EmployeeAttendance;