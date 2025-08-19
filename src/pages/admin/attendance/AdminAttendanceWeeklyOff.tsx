import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getWeeklyOff, postWeeklyOff, updateWeeklyOff } from "@/services/admin/apiMethods";

interface WeeklyOffData {
  organization?: number;
  weekday: string;
  all_weeks: boolean;
  second_week: boolean;
  fifth_week: boolean;
  alternate_weeks: boolean;
  all_but_last: boolean;
  third_week: boolean;
  last_two_weeks: boolean;
  first_week: boolean;
  fourth_week: boolean;
  last_week: boolean;
}

interface WeeklyOffRow {
  day: string;
  selectedOption: keyof Omit<WeeklyOffData, 'organization' | 'weekday'> | null;
}

const AdminAttendanceWeeklyOff = () => {
  const [weeklyOffsRows, setWeeklyOffsRows] = useState<WeeklyOffRow[]>([
    { day: "Monday", selectedOption: null },
  ]);
  
  const [existingData, setExistingData] = useState<WeeklyOffData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const optionLabels = {
    all_weeks: "All Weeks",
    second_week: "Second Week",
    fifth_week: "Fifth Week", 
    alternate_weeks: "Alternate Weeks",
    all_but_last: "All But Last",
    third_week: "Third Week",
    last_two_weeks: "Last Two Weeks",
    first_week: "First Week",
    fourth_week: "Fourth Week",
    last_week: "Last Week"
  };

  const optionKeys = Object.keys(optionLabels) as Array<keyof typeof optionLabels>;

  // Fetch existing weekly off data on component mount
  useEffect(() => {
    const fetchWeeklyOffData = async () => {
      try {
        const response: any = await getWeeklyOff();
        
        if (response.status === 200 && response.data) {
          const dataArray = Array.isArray(response.data) ? response.data : [response.data];
          setExistingData(dataArray);
          
          // Pre-populate the form with existing data
          const populatedRows = weeklyOffsRows.map(row => {
            const existingItem = dataArray.find((item: WeeklyOffData) => 
              item.weekday && item.weekday.toLowerCase() === row.day.toLowerCase()
            );
            
            
            if (existingItem) {
              // Find which option is true
              const selectedOption = optionKeys.find(key => existingItem[key] === true);
              return { ...row, selectedOption: selectedOption || null };
            }
            
            return row;
          });
          
          setWeeklyOffsRows(populatedRows);
        }
      } catch (error) {
        console.error("Error fetching weekly off data:", error);
        toast.error("Failed to load weekly off settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyOffData();
  }, []);

  // Function to handle option selection
  const handleOptionChange = (rowIndex: number, optionKey: keyof typeof optionLabels) => {
    const updatedRows = [...weeklyOffsRows];
    updatedRows[rowIndex].selectedOption = optionKey;
    setWeeklyOffsRows(updatedRows);
  };

  // Function to handle day selection in dropdown
  const handleDayChange = (rowIndex: number, newDay: string) => {
    const updatedRows = [...weeklyOffsRows];
    updatedRows[rowIndex].day = newDay;
    
    // Check if this day already has data and pre-select the option
    const existingItem = existingData.find(item => 
      item.weekday && item.weekday.toLowerCase() === newDay.toLowerCase()
    );
    
    if (existingItem) {
      const selectedOption = optionKeys.find(key => existingItem[key] === true);
      updatedRows[rowIndex].selectedOption = selectedOption || null;
    } else {
      updatedRows[rowIndex].selectedOption = null;
    }
    
    setWeeklyOffsRows(updatedRows);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const promises = weeklyOffsRows.map(async (row) => {
        if (!row.selectedOption) {
          return Promise.resolve(); // Skip rows with no selection
        }

        // Create the data object with only the selected option as true
        const weeklyOffData: Omit<WeeklyOffData, 'organization'> = {
          weekday: row.day,
          all_weeks: false,
          second_week: false,
          fifth_week: false,
          alternate_weeks: false,
          all_but_last: false,
          third_week: false,
          last_two_weeks: false,
          first_week: false,
          fourth_week: false,
          last_week: false
        };

        // Set only the selected option to true
        weeklyOffData[row.selectedOption] = true;


        // Check if this weekday already exists in the existing data
        const existingItem = existingData.find(item => 
          item.weekday && item.weekday.toLowerCase() === row.day.toLowerCase()
        );


        if (existingItem) {
          // Check if organization ID exists, otherwise try other identifiers
          const updateId = existingItem.organization || existingItem.weekday || row.day;
          console.log(`Using update ID: ${updateId}`); // Debug log
          
          return updateWeeklyOff(weeklyOffData, row.day);
        } else {
          // Create new data
          return postWeeklyOff(weeklyOffData);
        }
      });

      const results = await Promise.all(promises);
      console.log("Submit results:", results); // Debug log
      
      // Check if any requests failed
      const hasErrors = results.some((result: any) => result && result.status >= 400);
      
      if (hasErrors) {
        toast.error("Some settings could not be updated. Please check the console for details.");
      } else {
        toast.success("Weekly off settings updated successfully");
      }
      
      // Refresh the data after submission attempt
      const response: any = await getWeeklyOff();
      if (response.status === 200 && response.data) {
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        setExistingData(dataArray);
        
        // Re-populate the form with fresh data
        const populatedRows = weeklyOffsRows.map(row => {
          const existingItem = dataArray.find((item: WeeklyOffData) => 
            item.weekday && item.weekday.toLowerCase() === row.day.toLowerCase()
          );
          
          if (existingItem) {
            const selectedOption = optionKeys.find(key => existingItem[key] === true);
            return { ...row, selectedOption: selectedOption || null };
          }
          
          return row;
        });
        
        setWeeklyOffsRows(populatedRows);
      }
      
    } catch (error) {
      console.error("Error updating weekly off settings:", error);
      toast.error("Failed to update weekly off settings. Check console for details.");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading weekly off settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>
      
      <h2 className="text-base font-medium mb-4">Weekly Offs</h2>
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
        </p>
      </div>

      <div className="mb-6">

        {weeklyOffsRows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-8 flex flex-col md:flex-row gap-5">
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

            {/* Options grid */}
            <div className="grid grid-cols-3 gap-4 flex-1">
              {optionKeys.map((optionKey) => (
                <div key={optionKey} className="flex items-center">
                  <input
                    type="radio"
                    id={`${optionKey}-${rowIndex}`}
                    name={`weekday-${rowIndex}`}
                    checked={row.selectedOption === optionKey}
                    onChange={() => handleOptionChange(rowIndex, optionKey)}
                    className="mr-2 h-5 w-5 bg-gray-100"
                  />
                  <label 
                    htmlFor={`${optionKey}-${rowIndex}`} 
                    className="text-sm font-medium cursor-pointer"
                  >
                    {optionLabels[optionKey]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={handleSubmit}
          className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminAttendanceWeeklyOff;