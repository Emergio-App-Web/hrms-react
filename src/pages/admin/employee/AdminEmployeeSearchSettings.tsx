import { useState } from "react";

const AdminEmployeeSearchSettings = () => {
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  return (
    <div className=" mx-auto p-6 bg-white">

      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Configure Employee Search</h2>
      
      <div className="bg-[#FBFFF2] p-5 rounded">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Filter</span>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="activeOnly"
                checked={showActiveOnly}
                onChange={() => setShowActiveOnly(!showActiveOnly)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="activeOnly" className="text-sm">Show only Active Employee</label>
            </div>
          </div>
          
          <div className="mb-4 text-right">
            <span className="text-sm">Mandatory</span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Employee Name</span>
          </div>
          
          <div className="mb-4 text-right">
            <span className="text-sm">Optional</span>
          </div>
          
          {/* General row */}
          <div className="flex mb-4">
            <div className="w-1/6">
              <span className="text-sm font-medium">General</span>
            </div>
            <div className="w-5/6 grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Email</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Employee Status</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Profile Image</span>
              </div>
            </div>
          </div>
          
          {/* Official row */}
          <div className="flex mb-4">
            <div className="w-1/6">
              <span className="text-sm font-medium">Official</span>
            </div>
            <div className="w-5/6 grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Employee code</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Department</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Designation</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Location</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Joining Date</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Reporting Manager</span>
              </div>
            </div>
          </div>
          
          {/* Contact row */}
          <div className="flex mb-4">
            <div className="w-1/6">
              <span className="text-sm font-medium">Contact</span>
            </div>
            <div className="w-5/6 grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Mobile Number</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Address</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Personal Email Id</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Skype / Imo</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Linked In</span>
              </div>
            </div>
          </div>
          
          {/* Others row */}
          <div className="flex mb-4">
            <div className="w-1/6">
              <span className="text-sm font-medium">Others</span>
            </div>
            <div className="w-5/6 grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">About me</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Skills</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Attendance Status</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Employment Type</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-sm">Service Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeSearchSettings;

