import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getAttendance } from "../../../services/user/apiMethods";
import ProgressBar from "./ProgressBar";

type AttendanceDay = {
  date: string;
  day_name: string;
  punches: any[];
  total_time: string | null;
  status: string;
};

type Props = {
  employeeId?: number;
};

const CalendarView: React.FC<Props> = ({ employeeId }) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [attendanceData, setAttendanceData] = useState<AttendanceDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  // Removed unused start and end variables
    // getAttendance currently takes no arguments, so we fetch all and filter client-side
    getAttendance()
      .then((response: any) => {
        // Filter attendances for current month
        const filtered = (response.attendances || []).filter((d: any) => {
          return dayjs(d.date).isSame(currentMonth, "month");
        });
        setAttendanceData(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentMonth, employeeId]);

  const getDayData = (date: dayjs.Dayjs) =>
    attendanceData.find((d) => dayjs(d.date).isSame(date, "day"));

  const getDayColor = (date: dayjs.Dayjs) => {
    const dayData = getDayData(date);
    if (dayData?.punches?.length) return "bg-green-500";
    if ([6, 0].includes(date.day())) return "bg-blue-500";
    return "bg-red-500";
  };

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = currentMonth.startOf("month").day();
  const calendarDays: dayjs.Dayjs[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(currentMonth.startOf("month").subtract(firstDayOfWeek - i, "day"));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(currentMonth.date(i));
  }
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(calendarDays[calendarDays.length - 1].add(1, "day"));
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <button
          className="p-2 rounded-full border hover:bg-gray-100"
          onClick={() => setCurrentMonth((m: Dayjs) => m.subtract(1, "month"))}
        >
          &lt;
        </button>
        <span className="font-medium text-slate-700">
          {currentMonth.format("MMMM YYYY")}
        </span>
        <button
          className="p-2 rounded-full border hover:bg-gray-100"
          onClick={() => setCurrentMonth((m: Dayjs) => m.add(1, "month"))}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-bold text-slate-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, idx) => {
          const isCurrentMonth = date.month() === currentMonth.month();
          const dayData = getDayData(date);
          return (
            <button
              key={idx}
              className={`rounded-lg p-2 flex flex-col items-center justify-center border
                ${isCurrentMonth ? "" : "bg-gray-100 text-slate-400"}
                ${selectedDate === date.format("YYYY-MM-DD") ? "border-violet-500" : "border-transparent"}
                ${getDayColor(date)}
                `}
              onClick={() => isCurrentMonth && setSelectedDate(date.format("YYYY-MM-DD"))}
              disabled={!isCurrentMonth}
            >
              <span className="font-bold">{date.date()}</span>
              {dayData?.punches?.length ? (
                <span className="text-xs text-white">Present</span>
              ) : [6, 0].includes(date.day()) ? (
                <span className="text-xs text-white">Off</span>
              ) : (
                <span className="text-xs text-white">Absent</span>
              )}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4 p-4 bg-violet-50 rounded-lg">
          <h3 className="font-semibold mb-2">
            {dayjs(selectedDate).format("dddd, MMM D, YYYY")}
          </h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            (() => {
              const dayData = getDayData(dayjs(selectedDate));
              if (!dayData)
                return <div className="text-slate-500">No attendance data.</div>;
              const workedHours = dayData.total_time
                ? (() => {
                    const [h, m, s] = dayData.total_time.split(":");
                    return parseFloat(h) + parseFloat(m) / 60 + parseFloat(s) / 3600;
                  })()
                : 0;
              return (
                <div>
                  <ProgressBar
                    progress={Math.min(workedHours / 9, 1)}
                    color={getDayColor(dayjs(selectedDate))}
                  />
                  <div className="flex justify-between text-xs mt-2 text-slate-600">
                    <span>
                      Punch In: {dayData.punches?.[0]?.in_time
                        ? dayjs(`1970-01-01T${dayData.punches[0].in_time}`).format("h:mm A")
                        : "--"}
                    </span>
                    <span>
                      Punch Out: {dayData.punches?.[dayData.punches.length - 1]?.out_time
                        ? dayjs(`1970-01-01T${dayData.punches[dayData.punches.length - 1].out_time}`).format("h:mm A")
                        : "--"}
                    </span>
                  </div>
                  <div className="text-right font-bold text-green-700 mt-2">
                    Total: {workedHours ? workedHours.toFixed(2) : "00.00"} hrs
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
