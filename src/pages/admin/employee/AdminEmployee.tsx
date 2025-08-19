import { getEmpSettings, postEmpSettings, updateEmpSettings } from "@/services/admin/apiMethods";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface EmployeeSettingsData {
  manage_employee_profile: string;
  unique_fields: {};
  employee_skills: string;
  custom_skills: {};
  approve_required: boolean;
  employees_addable: boolean;
  filter_search: boolean;
  generally_showable_fields: {};
  officially_showable_fields: {};
  contacts_showable_fields: {};
  other_showable_fields: {};
  mandatory_inputable_fields: {};
}

interface FormData {
  allowProfileUpdates: boolean;
}

export default function AdminEmployee() {
  const [loading, setLoading] = useState(true);
  const [existingId, setExistingId] = useState<number | null>(null);
  const [employeeSettings, setEmployeeSettings] = useState<EmployeeSettingsData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      allowProfileUpdates: false,
    },
  });

  // const allowProfileUpdatesValue = watch("allowProfileUpdates");

  useEffect(() => {
    const fetchEmployeeSettings = async () => {
      try {
        setLoading(true);
        const response: any = await getEmpSettings();
        // Check if response contains data
        if (response && response.status) {
          const profiledata = response.data;
          setExistingId(profiledata.organization?.id);
          setEmployeeSettings(profiledata);
          const allowUpdates = profiledata.manage_employee_profile === "allowed";
          setValue("allowProfileUpdates", allowUpdates);
        }
      } catch (error) {
        console.error("Error fetching employee settings:", error);
        toast.error("Failed to load employee settings");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeSettings();
  }, [setValue]);


  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      let payload: EmployeeSettingsData;
      if (employeeSettings) {
        // Use all fields from fetched data, only update manage_employee_profile
        payload = {
          ...employeeSettings,
          manage_employee_profile: formData.allowProfileUpdates ? "allowed" : "not allowed",
        };
      } else {
        // Fallback: minimal payload if no data fetched
        payload = {
          manage_employee_profile: formData.allowProfileUpdates ? "allowed" : "not allowed",
          unique_fields: {},
          employee_skills: "",
          custom_skills: {},
          approve_required: false,
          employees_addable: false,
          filter_search: false,
          generally_showable_fields: {},
          officially_showable_fields: {},
          contacts_showable_fields: {},
          other_showable_fields: {},
          mandatory_inputable_fields: {},
        };
      }

      let response: any;

      if (existingId) {
        // Update existing settings
        response = await updateEmpSettings(payload, existingId);
      } else {
        // Create new settings
        response = await postEmpSettings(payload);
      }

      if (response.status === 200) {
        toast.success(response.data?.message || "Employee settings updated successfully");

        // If it was a POST request, store the new ID for future updates
        if (!existingId && response.data?.id) {
          setExistingId(response.data.id);
        }
      } else {
        toast.error("Failed to update employee settings");
      }
    } catch (error) {
      console.error("Error updating employee settings:", error);
      toast.error("Something went wrong while updating employee settings");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Employee</h2>

            <div className="space-y-6 bg-[#FBFFF2]">
              <div className="flex items-start p-4 rounded-md">
                <div className="mr-3 mt-1">
                  <input
                    type="checkbox"
                    id="profile-updates"
                    {...register("allowProfileUpdates")}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="profile-updates" className="font-medium block mb-1">
                    Allow Profile updates through Employee self service portal
                  </label>
                  <p className="text-gray-600 text-sm">
                    Employees would be able to add / update personal information through Employee self service Portal.
                    The information submitted will get auto saved in the system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}