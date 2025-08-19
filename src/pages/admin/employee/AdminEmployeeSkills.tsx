import { useEffect, useState } from 'react';
import { getEmpSettings, updateEmpSettings } from "@/services/admin/apiMethods";
import { toast } from "react-toastify";

export default function AdminEmployeeSkills() {
  const [proficiencyScale, setProficiencyScale] = useState<string>('1to3');
  const [approvalType, setApprovalType] = useState<string>('self');
  const [enableSkillsForEmployees, setEnableSkillsForEmployees] = useState<boolean>(false);
  const [customSkills, setCustomSkills] = useState<{ key: string; value: string }[]>([]);
  const [customKey, setCustomKey] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [existingId, setExistingId] = useState<number | null>(null);
  const [employeeSettings, setEmployeeSettings] = useState<any>(null);

  useEffect(() => {
    const fetchEmployeeSettings = async () => {
      try {
        const response: any = await getEmpSettings();
        if (response && response.status) {
          const profiledata = response.data;
          setExistingId(profiledata.organization?.id);
          setEmployeeSettings(profiledata);
          // Set proficiency scale
          if (profiledata.employee_skills === '1 to 3') setProficiencyScale('1to3');
          else if (profiledata.employee_skills === '1 to 5') setProficiencyScale('1to5');
          else if (profiledata.employee_skills === '1 to 10') setProficiencyScale('1to10');
          else if (profiledata.employee_skills === '' && profiledata.custom_skills && Object.keys(profiledata.custom_skills).length > 0) setProficiencyScale('custom');
          // Set custom skills
          if (profiledata.custom_skills && Object.keys(profiledata.custom_skills).length > 0) {
            setCustomSkills(Object.entries(profiledata.custom_skills).map(([key, value]) => ({ key, value: value as string })));
          }
          // Set approval type
          setApprovalType(profiledata.approve_required ? 'approvalBased' : 'self');
          // Set enable skills
          setEnableSkillsForEmployees(!!profiledata.employees_addable);
        }
      } catch (error) {
        toast.error("Failed to load employee settings");
      }
    };
    fetchEmployeeSettings();
  }, []);

  const handleProficiencyScaleChange = (value: string) => {
    setProficiencyScale(value);
    if (value !== 'custom') {
      setCustomSkills([]);
    }
  };

  const handleApprovalTypeChange = (value: string) => {
    setApprovalType(value);
  };

  const toggleEnableSkillsForEmployees = () => {
    setEnableSkillsForEmployees(!enableSkillsForEmployees);
  };

  const handleAddCustomSkill = () => {
    if (customKey.trim() && customValue.trim()) {
      setCustomSkills(prev => [...prev, { key: customKey.trim(), value: customValue.trim() }]);
      setCustomKey('');
      setCustomValue('');
    }
  };

  const handleRemoveCustomSkill = (key: string) => {
    setCustomSkills(prev => prev.filter(skill => skill.key !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload;
      let employee_skills = '';
      let custom_skills: Record<string, string> = {};
      if (proficiencyScale === '1to3') employee_skills = '1 to 3';
      else if (proficiencyScale === '1to5') employee_skills = '1 to 5';
      else if (proficiencyScale === '1to10') employee_skills = '1 to 10';
      else if (proficiencyScale === 'custom') {
        employee_skills = '';
        custom_skills = customSkills.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {} as Record<string, string>);
      }
      if (employeeSettings) {
        payload = {
          ...employeeSettings,
          employee_skills,
          custom_skills,
          approve_required: approvalType === 'approvalBased',
          employees_addable: enableSkillsForEmployees,
        };
      } else {
        payload = {
          employee_skills,
          custom_skills,
          approve_required: approvalType === 'approvalBased',
          employees_addable: enableSkillsForEmployees,
        };
      }
      if (existingId) {
        const response: any = await updateEmpSettings(payload, existingId);
        if (response.status === 200) {
          toast.success("Employee skills settings updated successfully");
        } else {
          toast.error("Failed to update employee skills settings");
        }
      } else {
        toast.error("Organization ID not found");
      }
    } catch (error) {
      toast.error("Something went wrong while updating employee skills settings");
    }
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

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg">
          <div className="p-6 ">
            <h2 className="text-xl font-semibold mb-4">Employee Skills</h2>
            <div className="bg-[#FBFFF2] p-6 rounded-md">
              {/* Proficiency Scale Section */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Proficiency Scale</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {proficiencyScale === 'custom' && (
                  <div className="mt-4">
                    <div className="flex flex-col md:flex-row gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Skill Key"
                        value={customKey}
                        onChange={e => setCustomKey(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Skill Value"
                        value={customValue}
                        onChange={e => setCustomValue(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                      <button type="button" onClick={handleAddCustomSkill} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Add</button>
                    </div>
                    <div>
                      {customSkills.map(skill => (
                        <div key={skill.key} className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{skill.key}: {skill.value}</span>
                          <button type="button" onClick={() => handleRemoveCustomSkill(skill.key)} className="text-red-500 text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Approval Type Section */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Approval Type</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                  <div className="flex items-center w-96">
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
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold"
          >
            Update Employee Skills
          </button>
        </div>
      </form>
    </div>
  );
}

