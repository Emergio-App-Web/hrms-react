import { useState, useEffect } from "react";
import { postPunchIn, getLastPunch } from "@/services/user/apiMethods";
import { toast } from "react-toastify";

const TimeInBtn = () => {
  const [lastPunchData, setLastPunchData] = useState<any>(null);

  // Fetch last punch data on component mount
  useEffect(() => {
    fetchLastPunch();
  }, []);

  const fetchLastPunch = async () => {
    try {
      const response: any = await getLastPunch();
      if (response.status === 200 && response.data) {
        setLastPunchData(response.data);
      }
    } catch (error) {
      console.error("Error fetching last punch:", error);
    }
  };

  // Display values
  const lastInOut = lastPunchData 
    ? `Last ${lastPunchData.type}: ${lastPunchData.last_punch_time}`
    : "--";
  
  // Button: If last punch type is "IN", show Time Out; else show Time In
  const isCurrentlyIn = lastPunchData && lastPunchData.type === "IN";
  const buttonLabel = isCurrentlyIn ? "Time Out" : "Time In";

  const handlePunches = async () => {
    try {
      const response: any = await postPunchIn();
      if (response.status === 200 && response.data) {
        toast.success(`Time ${isCurrentlyIn ? "out" : "in"} successfully`);
        // Refresh last punch data after successful punch
        fetchLastPunch();
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
        <p className="text-white font-bold text-sm">{lastInOut}</p>
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

export default TimeInBtn;