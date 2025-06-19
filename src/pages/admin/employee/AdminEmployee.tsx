import { useState } from 'react';

export default function AdminEmployee() {
  const [settings, setSettings] = useState({
    allowProfileUpdates: false,
    // Add other settings as needed
  });

  const handleToggleSettings = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className=" mx-auto p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <div className="bg-white rounded-lg ">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Employee</h2>
          
          <div className="space-y-6 bg-[#FBFFF2]">
            {/* Profile Updates Settings - Repeated three times as in the image */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start  p-4 rounded-md">
                <div className="mr-3 mt-1">
                  <input
                    type="checkbox"
                    id={`profile-updates-${item}`}
                    checked={settings.allowProfileUpdates}
                    onChange={() => handleToggleSettings('allowProfileUpdates')}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor={`profile-updates-${item}`} className="font-medium block mb-1">
                    Allow Profile updates through Employee self service portal
                  </label>
                  <p className="text-gray-600 text-sm">
                    Employees would be able to add / update personal information through Employee self service Portal.
                    The information submitted will get auto saved in the system
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

