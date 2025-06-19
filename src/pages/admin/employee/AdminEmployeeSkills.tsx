import { useState } from 'react';

export default function AdminEmployeeSkills() {
  // State for proficiency scale options
  const [proficiencyScale, setProficiencyScale] = useState<string>('1to3');
  
  // State for approval type options
  const [approvalType, setApprovalType] = useState<string>('self');
  
  // State for employees skills
  const [enableSkillsForEmployees, setEnableSkillsForEmployees] = useState<boolean>(false);

  // Handle proficiency scale change
  const handleProficiencyScaleChange = (value: string) => {
    setProficiencyScale(value);
  };

  // Handle approval type change
  const handleApprovalTypeChange = (value: string) => {
    setApprovalType(value);
  };

  // Toggle enable skills for employees
  const toggleEnableSkillsForEmployees = () => {
    setEnableSkillsForEmployees(!enableSkillsForEmployees);
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

      <div className="bg-white rounded-lg">
        <div className="p-6 ">
          <h2 className="text-xl font-semibold mb-4">Employee Skills</h2>
          
          <div className="bg-[#FBFFF2] p-6 rounded-md">
            {/* Proficiency Scale Section */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Proficiency Scale</p>
              <div className="grid grid-cols-4 gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="scale-1to3"
                    name="proficiencyScale"
                    checked={proficiencyScale === '1to3'}
                    onChange={() => handleProficiencyScaleChange('1to3')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="scale-1to3" className="text-sm">1 to 3</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="scale-1to5"
                    name="proficiencyScale"
                    checked={proficiencyScale === '1to5'}
                    onChange={() => handleProficiencyScaleChange('1to5')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="scale-1to5" className="text-sm">1 to 5</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="scale-1to10"
                    name="proficiencyScale"
                    checked={proficiencyScale === '1to10'}
                    onChange={() => handleProficiencyScaleChange('1to10')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="scale-1to10" className="text-sm">1 to 10</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="scale-custom"
                    name="proficiencyScale"
                    checked={proficiencyScale === 'custom'}
                    onChange={() => handleProficiencyScaleChange('custom')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="scale-custom" className="text-sm">
                    Custom ( A. Beginner  B. Advanced  C. Expert )
                  </label>
                </div>
              </div>
            </div>

            {/* Approval Type Section */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Approval Type</p>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="approval-self"
                    name="approvalType"
                    checked={approvalType === 'self'}
                    onChange={() => handleApprovalTypeChange('self')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="approval-self" className="text-sm">Self</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="approval-based"
                    name="approvalType"
                    checked={approvalType === 'approvalBased'}
                    onChange={() => handleApprovalTypeChange('approvalBased')}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="approval-based" className="text-sm">Approval Based</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable-skills"
                    checked={enableSkillsForEmployees}
                    onChange={toggleEnableSkillsForEmployees}
                    className="h-5 w-5 mr-2"
                  />
                  <label htmlFor="enable-skills" className="text-sm">Enable Skills for Employees</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

