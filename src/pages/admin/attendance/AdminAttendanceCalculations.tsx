import { useState, ChangeEvent } from "react";

interface WeeklyOffOption {
  all: boolean;
  allButLast: boolean;
  first: boolean;
}

interface WeeklyOffRow {
  day: string;
  options: WeeklyOffOption[];
}

const AdminAttendanceCalculations = () => {
  // State for calculations settings
  const [enableLeaveBasedRules, setEnableLeaveBasedRules] = useState(false);
  const [autoAssignShifts, setAutoAssignShifts] = useState(false);
  
  // State for weekly offs table
  const [weeklyOffsRows, setWeeklyOffsRows] = useState<WeeklyOffRow[]>([
    { 
      day: "Monday", 
      options: [
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false }
      ] 
    },
    { 
      day: "Monday", 
      options: [
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false },
        { all: false, allButLast: false, first: false }
      ] 
    }
  ]);

  // Function to handle option selection in weekly offs
  const handleOptionChange = (rowIndex: number, optionIndex: number, type: keyof WeeklyOffOption) => {
    const updatedRows = [...weeklyOffsRows];
    
    // Reset all options in this position first
    updatedRows[rowIndex].options[optionIndex] = {
      all: false,
      allButLast: false,
      first: false
    };
    
    // Set the selected option
    updatedRows[rowIndex].options[optionIndex][type] = true;
    
    setWeeklyOffsRows(updatedRows);
  };

  // Function to handle day selection in dropdown
  const handleDayChange = (rowIndex: number, newDay: string) => {
    const updatedRows = [...weeklyOffsRows];
    updatedRows[rowIndex].day = newDay;
    setWeeklyOffsRows(updatedRows);
  };

  // Function to add a new row
  const addRow = () => {
    setWeeklyOffsRows([
      ...weeklyOffsRows,
      { day: "Monday", options: Array(4).fill({ all: false, allButLast: false, first: false }) }
    ]);
  };

  // Function to delete a row
  const deleteRow = () => {
    if (weeklyOffsRows.length > 1) {
      const updatedRows = [...weeklyOffsRows];
      updatedRows.pop();
      setWeeklyOffsRows(updatedRows);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Calculations</h2>
      <div className="p-5 rounded-xl mb-6 space-y-5">
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="enable-leave-based-rules"
              checked={enableLeaveBasedRules}
              onChange={() => setEnableLeaveBasedRules(!enableLeaveBasedRules)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="enable-leave-based-rules" className="font-medium block mb-1">
              Enable leave based rules in automatic attendance calculation
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="auto-assign-shifts"
              checked={autoAssignShifts}
              onChange={() => setAutoAssignShifts(!autoAssignShifts)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="auto-assign-shifts" className="font-medium block mb-1">
              Auto Assign shifts
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-base font-medium mb-4">Weekly Offs</h2>
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
        </p>
      </div>

      <div className="mb-6">
        {weeklyOffsRows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-8 flex gap-5">
            {/* Day selection dropdown */}
            <div className="mb-4">
              <select 
                value={row.day}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDayChange(rowIndex, e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-md bg-gray-100"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            
            {/* Four rows of options */}
            <div className="grid grid-cols-1 gap-4">
              {row.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex space-x-20">
                  {/* All option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`all-${rowIndex}-${optionIndex}`}
                      checked={option.all}
                      onChange={() => handleOptionChange(rowIndex, optionIndex, "all")}
                      className="mr-2 h-5 w-5 bg-gray-100"
                    />
                    <label htmlFor={`all-${rowIndex}-${optionIndex}`} className="text-sm font-medium">All</label>
                  </div>
                  
                  {/* All But Last option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`allButLast-${rowIndex}-${optionIndex}`}
                      checked={option.allButLast}
                      onChange={() => handleOptionChange(rowIndex, optionIndex, "allButLast")}
                      className="mr-2 h-5 w-5 bg-gray-100"
                    />
                    <label htmlFor={`allButLast-${rowIndex}-${optionIndex}`} className="text-sm font-medium">All But Last</label>
                  </div>
                  
                  {/* First option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`first-${rowIndex}-${optionIndex}`}
                      checked={option.first}
                      onChange={() => handleOptionChange(rowIndex, optionIndex, "first")}
                      className="mr-2 h-5 w-5 bg-gray-100"
                    />
                    <label htmlFor={`first-${rowIndex}-${optionIndex}`} className="text-sm font-medium">First</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-6">
        <button 
          className="bg-black text-white px-4 py-2 rounded-full mr-2"
          onClick={deleteRow}
        >
          Delete
        </button>
        <button 
          className="bg-[#DDFF8F] px-4 py-2 rounded-full"
          onClick={addRow}
        >
          Add Row
        </button>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAttendanceCalculations;