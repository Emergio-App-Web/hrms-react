import { getRestrictions, postRestrictions } from "@/services/admin/apiMethods";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceRestrictAttendance = () => {
  const [loading, setLoading] = useState(true);

  interface RestrictionData {
    enable_duty_punch_employee: boolean;
    restrict_duty_punch_employee: number;
    enable_real_time_justify_employee: boolean;
    restrict_real_time_justify_employee: number;
    enable_punch_request_manager: boolean;
    restrict_punch_request_manager: number;
    enable_attendance_approval_manager: boolean;
    restrict_attendance_approval_manager: number;
    enable_late_justify_manager: boolean;
    restrict_late_justify_manager: number;
    enable_early_exit_justify_manager: boolean;
    restrict_early_exit_justify_manager: number;
    enable_total_time_justify_manager: boolean;
    restrict_total_time_justify_manager: number;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<RestrictionData>({
    defaultValues: {
      enable_duty_punch_employee: false,
      restrict_duty_punch_employee: 0,
      enable_real_time_justify_employee: false,
      restrict_real_time_justify_employee: 0,
      enable_punch_request_manager: false,
      restrict_punch_request_manager: 0,
      enable_attendance_approval_manager: false,
      restrict_attendance_approval_manager: 0,
      enable_late_justify_manager: false,
      restrict_late_justify_manager: 0,
      enable_early_exit_justify_manager: false,
      restrict_early_exit_justify_manager: 0,
      enable_total_time_justify_manager: false,
      restrict_total_time_justify_manager: 0,
    },
  });

  // Watch form values to enable/disable inputs
  const watchedValues = watch();

  useEffect(() => {
    const fetchRestrictions = async () => {
      try {
        setLoading(true);
        const response: any = await getRestrictions();
        if (response.status === 200) {
          const data = response.data;
          Object.keys(data).forEach((key) => {
            if (typeof data[key] === "object") {
              Object.keys(data[key]).forEach((nestedKey) => {
                setValue(`${key}.${nestedKey}` as any, data[key][nestedKey]);
              });
            } else {
              setValue(key as any, data[key]);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching restrictions:", error);
        toast.error("Failed to load restriction settings");
      } finally {
        setLoading(false);
      }
    };

    fetchRestrictions();
  }, [setValue]);

  const onSubmit: SubmitHandler<RestrictionData> = async (data) => {
    try {
      const response: any = await postRestrictions(data);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update restrictions");
      }
    } catch (error) {
      console.error("Error updating restrictions:", error);
      toast.error("Something went wrong while updating restrictions");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <div>
        <h2 className="text-base font-medium mb-4">Restrict Attendance Action for Employee</h2>

        <div className="p-5 rounded-xl mb-6 space-y-5">
          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-duty-punch-employee"
                {...register("enable_duty_punch_employee")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-duty-punch-employee" className="font-medium block mb-1">
                  Restrict on Duty / Punch Request by employee to
                </label>
                <input
                  type="number"
                  {...register("restrict_duty_punch_employee", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_duty_punch_employee}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="5"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-real-time-justify-employee"
                {...register("enable_real_time_justify_employee")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-real-time-justify-employee" className="font-medium block mb-1">
                  Restrict Real time justify Request by employee to
                </label>
                <input
                  type="number"
                  {...register("restrict_real_time_justify_employee", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_real_time_justify_employee}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="5"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-base font-medium mb-4">Restrict Attendance Action for Manager</h2>

        <div className="p-5 rounded-xl mb-6 space-y-5">
          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-punch-request-manager"
                {...register("enable_punch_request_manager")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-punch-request-manager" className="font-medium block mb-1">
                  Restrict Attendance Punch request approval by manager to
                </label>
                <input
                  type="number"
                  {...register("restrict_punch_request_manager", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_punch_request_manager}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="10"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-attendance-approval-manager"
                {...register("enable_attendance_approval_manager")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-attendance-approval-manager" className="font-medium block mb-1">
                  Restrict Attendance approval by manager to
                </label>
                <input
                  type="number"
                  {...register("restrict_attendance_approval_manager", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_attendance_approval_manager}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="10"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-late-justify-manager"
                {...register("enable_late_justify_manager")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-late-justify-manager" className="font-medium block mb-1">
                  Restrict Late Justify by manager to
                </label>
                <input
                  type="number"
                  {...register("restrict_late_justify_manager", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_late_justify_manager}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="10"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-early-exit-justify-manager"
                {...register("enable_early_exit_justify_manager")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-early-exit-justify-manager" className="font-medium block mb-1">
                  Restrict Early Exit Justify by manager to
                </label>
                <input
                  type="number"
                  {...register("restrict_early_exit_justify_manager", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_early_exit_justify_manager}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="10"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="mr-3 mt-1">
              <input
                type="checkbox"
                id="enable-total-time-justify-manager"
                {...register("enable_total_time_justify_manager")}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <label htmlFor="enable-total-time-justify-manager" className="font-medium block mb-1">
                  Restrict Total Time Justify by manager to
                </label>
                <input
                  type="number"
                  {...register("restrict_total_time_justify_manager", { 
                    valueAsNumber: true,
                    min: 0 
                  })}
                  disabled={!watchedValues.enable_total_time_justify_manager}
                  className="w-16 p-1 mx-2 bg-gray-100 rounded disabled:opacity-50"
                  placeholder="10"
                />
                <span>Request per Month</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button 
            type="button"
            className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendanceRestrictAttendance;