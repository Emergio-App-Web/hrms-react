import { useState } from "react";

const AdminEmployeeStrength = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const strengthOptions = [
    { id: 'jobHistory', label: 'Job History' },
    { id: 'educationDetails', label: 'Education Details' },
    { id: 'familyDetails', label: 'Family Details' },
    { id: 'bankDetails', label: 'Bank Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'emergencyContact', label: 'Emergency Contact' },
    { id: 'certifications', label: 'Certifications / Achievements' },
    { id: 'personalDetails', label: 'Personal Details' },
    { id: 'profileImage', label: 'Profile Image' },
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId) 
        : [...prev, optionId]
    );
  };

  return (
    <div className=" mx-auto p-6 bg-white">
    <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Configure Employee Strength</h2>
      
      <div className="flex justify-center">
      <div className="bg-[#FBFFF2] p-5 rounded w-[50%]">
        <div className="grid grid-cols-1 gap-4">
          {strengthOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => toggleOption(option.id)}
                className="w-5 h-5 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor={option.id} className="text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </div>
  );
};


export default AdminEmployeeStrength
