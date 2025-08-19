import { useState } from "react";
import { postPunchIn } from "@/services/user/apiMethods";
import { toast } from "react-toastify";

const TimeInBtn = () => {
  const [punchData, setPunchData] = useState<any>(null);

  // Helper to get last punch
  const getLastPunch = (punches: any[]) => {
    if (!punches || punches.length === 0) return null;
    return punches[punches.length - 1];
  };

  // Display values
  const lastPunch = punchData ? getLastPunch(punchData.punches) : null;
  const lastInOut = lastPunch
    ? `In: ${lastPunch.in_time || "--"} / Out: ${lastPunch.out_time || "--"}`
    : "--";
  // Button: If last punch has out_time, show Time In; else show Time Out
  const isCurrentlyIn = lastPunch && !lastPunch.out_time;
  const buttonLabel = isCurrentlyIn ? "Time Out" : "Time In";

  const handlePunches = async () => {
    try {
      const response: any = await postPunchIn();
      if (response.status === 200 && response.data) {
        setPunchData(response.data);
        toast.success(`Time ${isCurrentlyIn ? "out" : "in"} successfully`);
      } else {
        toast.error("Error punching in/out");
      }
    } catch (error) {
      console.error("Error punching in/out:", error);
      toast.error("Error punching in/out");
    }
  };

  return (
    <div className="flex items-center">
      <div className="sm:ml-10 lg:ml-0">
        <p className="text-white font-bold text-sm">Last {lastInOut}</p>
      </div>
      <button
        className="bg-white ml-16 text-lime-500 font-semibold px-4 py-2 rounded"
        onClick={handlePunches}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default TimeInBtn