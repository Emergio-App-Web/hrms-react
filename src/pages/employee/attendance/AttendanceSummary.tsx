import React, { useEffect, useState } from "react";
import { getAttendanceSummary } from "@/services/user/apiMethods";

type AttendanceSummaryData = {
  month: string;
  year: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  early_left_days: number;
  half_days: number;
  holiday_days: number;
  weekend_days: number;
  total_working_hours: string;
  expected_working_hours: string;
  discrepancy_hours: string;
};

type Props = {
  month: number;
  year: number;
};

const AttendanceSummary: React.FC<Props> = ({ month, year }) => {
  const [summaryData, setSummaryData] = useState<AttendanceSummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceSummary = async () => {
    setLoading(true);
    try {
      const response :any = await getAttendanceSummary(month, year);
      setSummaryData(response.data);
    } catch (error) {
      console.error("Error fetching attendance summary:", error);
      setSummaryData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendanceSummary();
  }, [month, year]);

  // Summary items configuration with their respective colors
  const summaryItems = [
    {
      key: 'present_days',
      label: 'Present',
      bgColor: 'bg-green-500',
      value: summaryData?.present_days || 0
    },
    {
      key: 'absent_days',
      label: 'Absent',
      bgColor: 'bg-red-500',
      value: summaryData?.absent_days || 0
    },
    {
      key: 'late_days',
      label: 'Late',
      bgColor: 'bg-teal-400',
      value: summaryData?.late_days || 0
    },
    {
      key: 'early_left_days',
      label: 'Early Left',
      bgColor: 'bg-gray-400',
      value: summaryData?.early_left_days || 0
    },
    {
      key: 'half_days',
      label: 'Half Days',
      bgColor: 'bg-emerald-500',
      value: summaryData?.half_days || 0
    },
    {
      key: 'holiday_days',
      label: 'Holidays',
      bgColor: 'bg-yellow-500',
      value: summaryData?.holiday_days || 0
    },
    {
      key: 'weekend_days',
      label: 'Weekends',
      bgColor: 'bg-violet-500',
      value: summaryData?.weekend_days || 0
    }
  ];

  if (loading) {
    return (
      <div className="flex gap-4 flex-wrap p-5">
        <div className="text-center">Loading summary...</div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap p-5">
      {summaryItems.map((item) => (
        <div
          key={item.key}
          className={`${item.bgColor} rounded-3xl flex justify-between p-3 font-semibold text-white items-center min-w-32`}
        >
          <h1>{item.label}</h1>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default AttendanceSummary;