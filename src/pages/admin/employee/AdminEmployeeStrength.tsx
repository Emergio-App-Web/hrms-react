import { useEffect, useState } from "react";
import { getEmpSettings, updateEmpSettings } from "@/services/admin/apiMethods";
import { toast } from "react-toastify";

const AdminEmployeeStrength = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [existingId, setExistingId] = useState<number | null>(null);
  const [employeeSettings, setEmployeeSettings] = useState<any>(null);

  const strengthOptions = [
    { id: 'job_history', label: 'Job History' },
    { id: 'education_details', label: 'Education Details' },
    { id: 'family_details', label: 'Family Details' },
    { id: 'bank_details', label: 'Bank Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'emergency_contact', label: 'Emergency Contact' },
    { id: 'certifications', label: 'Certifications / Achievements' },
    { id: 'personal_details', label: 'Personal Details' },
    { id: 'profile_image', label: 'Profile Image' },
  ];
  useEffect(() => {
    const fetchEmployeeSettings = async () => {
      try {
        const response: any = await getEmpSettings();
        if (response && response.status) {
          const profiledata = response.data;
          setExistingId(profiledata.organization?.id);
          setEmployeeSettings(profiledata);
          // Map API mandatory_inputable_fields to local state
          const checkedOptions = strengthOptions
            .filter(opt => profiledata.mandatory_inputable_fields?.[opt.id])
            .map(opt => opt.id);
          setSelectedOptions(checkedOptions);
        }
      } catch (error) {
        toast.error("Failed to load employee settings");
      }
    };
    fetchEmployeeSettings();
  }, []);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId) 
        : [...prev, optionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload;
      // Build mandatory_inputable_fields from selectedOptions
      const mandatoryFields: Record<string, boolean> = {};
      strengthOptions.forEach(opt => {
        mandatoryFields[opt.id] = selectedOptions.includes(opt.id);
      });
      if (employeeSettings) {
        payload = {
          ...employeeSettings,
          mandatory_inputable_fields: mandatoryFields,
        };
      } else {
        payload = {
          mandatory_inputable_fields: mandatoryFields,
        };
      }
      if (existingId) {
        const response: any = await updateEmpSettings(payload, existingId);
        if (response.status === 200) {
          toast.success("Mandatory fields updated successfully");
        } else {
          toast.error("Failed to update mandatory fields");
        }
      } else {
        toast.error("Organization ID not found");
      }
    } catch (error) {
      toast.error("Something went wrong while updating mandatory fields");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Configure Employee Strength</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="bg-[#FBFFF2] p-5 rounded w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold"
          >
            Update Mandatory Fields
          </button>
        </div>
      </form>
    </div>
  );
};


export default AdminEmployeeStrength
