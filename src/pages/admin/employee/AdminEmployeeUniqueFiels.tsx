import { useEffect, useState } from 'react';
import { getEmpSettings, updateEmpSettings } from "@/services/admin/apiMethods";
import { toast } from "react-toastify";

export default function AdminEmployeeUniqueFiels() {
  const [settings, setSettings] = useState({
    employeeCode: false,
    employeeEmail: false,
    enrollmentNo: false,
    pan: false,
    aadhar: false
  });
  const [existingId, setExistingId] = useState<number | null>(null);
  const [employeeSettings, setEmployeeSettings] = useState<any>(null);

  const handleToggleSettings = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  useEffect(() => {
    const fetchEmployeeSettings = async () => {
      try {
        const response: any = await getEmpSettings();
        if (response && response.status) {
          const profiledata = response.data;
          setExistingId(profiledata.organization?.id);
          setEmployeeSettings(profiledata);
          // Map API unique_fields to local state
          setSettings({
            employeeCode: profiledata.unique_fields?.employee_code || false,
            employeeEmail: profiledata.unique_fields?.email || false,
            enrollmentNo: profiledata.unique_fields?.enrollment_no || false,
            pan: profiledata.unique_fields?.pancard || false,
            aadhar: profiledata.unique_fields?.aadhar_card || false,
          });
        }
      } catch (error) {
        toast.error("Failed to load employee settings");
      }
    };
    fetchEmployeeSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload;
      if (employeeSettings) {
        payload = {
          ...employeeSettings,
          unique_fields: {
            email: settings.employeeEmail,
            employee_code: settings.employeeCode,
            pancard: settings.pan,
            aadhar_card: settings.aadhar,
            enrollment_no: settings.enrollmentNo,
          },
        };
      } else {
        payload = {
          unique_fields: {
            email: settings.employeeEmail,
            employee_code: settings.employeeCode,
            pancard: settings.pan,
            aadhar_card: settings.aadhar,
            enrollment_no: settings.enrollmentNo,
          },
        };
      }
      if (existingId) {
        const response: any = await updateEmpSettings(payload, existingId);
        if (response.status === 200) {
          toast.success("Unique fields updated successfully");
        } else {
          toast.error("Failed to update unique fields");
        }
      } else {
        toast.error("Organization ID not found");
      }
    } catch (error) {
      toast.error("Something went wrong while updating unique fields");
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
        <div className="bg-[#FBFFF2] rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Unique Field</h2>
            <div className="bg-[#FBFFF2] p-6 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-items-start md:justify-items-center">
                <div className="flex justify-center gap-2 md:flex-col md:items-center">
                  <div className="md:mb-2">
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

                <div className="flex justify-center gap-2 md:flex-col md:items-center">
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

                <div className="flex justify-center gap-2 md:flex-col md:items-center">
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

                <div className="flex justify-center gap-2 md:flex-col md:items-center">
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

                <div className="flex justify-center gap-2 md:flex-col md:items-center">
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
        <div className="mt-6">
          <button
            type="submit"
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold"
          >
            Update Unique Fields
          </button>
        </div>
      </form>
    </div>
  );
}

