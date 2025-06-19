import { useState } from 'react';

export default function AdminEmployeeUniqueFiels() {
  const [settings, setSettings] = useState({
    allowProfileUpdates: false,
    employeeCode: false,
    employeeEmail: false,
    enrollmentNo: false,
    pan: false,
    aadhar: false
  });

  const handleToggleSettings = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <div className="bg-[#FBFFF2] rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Unique Field</h2>
          
          <div className="bg-[#FBFFF2] p-6 rounded-md">
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="employee-code"
                    checked={settings.employeeCode}
                    onChange={() => handleToggleSettings('employeeCode')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <label htmlFor="employee-code" className="text-sm font-medium">
                  Employee code
                </label>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="employee-email"
                    checked={settings.employeeEmail}
                    onChange={() => handleToggleSettings('employeeEmail')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <label htmlFor="employee-email" className="text-sm font-medium">
                  Employee Email
                </label>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="enrollment-no"
                    checked={settings.enrollmentNo}
                    onChange={() => handleToggleSettings('enrollmentNo')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <label htmlFor="enrollment-no" className="text-sm font-medium">
                  Enrollment No
                </label>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="pan"
                    checked={settings.pan}
                    onChange={() => handleToggleSettings('pan')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <label htmlFor="pan" className="text-sm font-medium">
                  Pan
                </label>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="aadhar"
                    checked={settings.aadhar}
                    onChange={() => handleToggleSettings('aadhar')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <label htmlFor="aadhar" className="text-sm font-medium">
                  Aadhar
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

