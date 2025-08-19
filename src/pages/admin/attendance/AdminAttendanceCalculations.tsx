import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getCalculation, postCalculation, updateCalculation } from "@/services/admin/apiMethods";

interface CalculationForm {
  organization?: number | { id: number };
  enable_attendance_unit: boolean;
  number_of_unit_for_absent: number;
  deduct_break_hours: boolean;
  daily_auto_attendance_calculation: boolean;
  enable_leave_based_rules: boolean;
  auto_assign_shift: boolean;
}

const AdminAttendanceCalculations = () => {
  const { register, handleSubmit, setValue } = useForm<CalculationForm>({
  defaultValues: {
    organization: 0,
    enable_attendance_unit: false,
    number_of_unit_for_absent: 0,
    deduct_break_hours: false,
    daily_auto_attendance_calculation: false,
    enable_leave_based_rules: false,
    auto_assign_shift: false,
  },
});

  useEffect(() => {
  getCalculation()
    .then((response: any) => {
      if (response.status === 200 && response.data) {
        const data = response.data;
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "object" && data[key] !== null) {
            Object.keys(data[key]).forEach((nestedKey) => {
              setValue(`${key}.${nestedKey}` as keyof CalculationForm, data[key][nestedKey]);
            });
          } else {
            setValue(key as keyof CalculationForm, data[key]);
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, [setValue]);

  const onSubmit: SubmitHandler<CalculationForm> = async (data) => {
  try {
    const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
    let response: any;
    
    if (orgId) {
      response = await updateCalculation(data, orgId);
    } else {
      response = await postCalculation(data);
    }
    
    toast.success(response.data?.message || "Settings updated successfully");
  } catch (error) {
    toast.error("Error updating calculation settings");
    console.error("Error in calculation settings:", error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Calculations</h2>
      <div className="p-5 rounded-xl mb-6 space-y-5">
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              {...register("enable_attendance_unit")}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Enable Attendance Unit
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="number"
              {...register("number_of_unit_for_absent", { valueAsNumber: true })}
              className="h-5 w-8 rounded bg-[#f3f4f6]"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Number of Units for Absent
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              {...register("deduct_break_hours")}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Deduct break hours on Total Time
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              {...register("daily_auto_attendance_calculation")}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Daily automatic attendance calculation
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              {...register("enable_leave_based_rules")}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Enable leave based rules in automatic attendance calculation
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              {...register("auto_assign_shift")}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Auto Assign shifts
            </label>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdminAttendanceCalculations;