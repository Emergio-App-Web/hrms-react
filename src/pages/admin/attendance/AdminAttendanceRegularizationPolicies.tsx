// import { Button } from "@/components/ui/button";
import { getRegularization, postRegularization, updateRegularization } from "@/services/admin/apiMethods";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceRegularizationPolicies = () => {
    interface Regularization {
        organization?: number | { id: number };

        enable_justify_punch: boolean;
        restrict_attendance_justification_days: number;
        enable_request_punch: boolean;
        enable_multiple_punches: boolean;
        restrict_punch_request_days: number;
        punch_approval_status: string;
        // restrict_duty_punch_employee: number;
        // restrict_real_time_justify_employee: number;
        // restrict_punch_request_manager: number;
        // restrict_attendance_approval_manager: number;
        // restrict_late_justify_manager: number;
        // restrict_early_exit_justify_manager: number;
        // restrict_total_time_justify_manager: number;
    }

    useEffect(() => {
      getRegularization()
      .then((response: any) => {
        const status = response.status
        if(status === 200){
          const data = response.data
          Object.keys(data).forEach((key) => {
            if(typeof data[key] === "object"){
              Object.keys(data[key]).forEach((nestedKey) => {
                setValue(`${key}.${nestedKey}` as keyof Regularization,
                  data[key][nestedKey]
                )
              })
            } else {
              setValue(key as keyof Regularization,data[key])
            }
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
    })

    const { register, handleSubmit, setValue } = useForm<Regularization>({
        defaultValues: {
            organization: 0,
            enable_justify_punch: false,
            restrict_attendance_justification_days: 0,
            enable_request_punch: false,
            enable_multiple_punches: false,
            restrict_punch_request_days: 0,
            punch_approval_status: "",
            // restrict_duty_punch_employee: 0,
            // restrict_real_time_justify_employee: 0,
            // restrict_punch_request_manager: 0,
            // restrict_attendance_approval_manager: 0,
            // restrict_late_justify_manager: 0,
            // restrict_early_exit_justify_manager: 0,
            // restrict_total_time_justify_manager: 0,
        },
    });

    const onSubmit: SubmitHandler<Regularization> = async (data) => {
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
            if (orgId) {
                const response: any = await updateRegularization(data, orgId);
                toast.success(response.data.message);
            } else {
                const response: any = await postRegularization(data);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Errror occured at Regularization Policy :", error);
        }
    };

    return (
        <div className="mx-auto p-6 bg-white">
            <div className="flex items-center mb-8">
                <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
                <span className="text-gray-500 flex items-center">
                    <span className="mx-2">»</span>
                    <span>View / Update global settings for your Company</span>
                </span>
            </div>

            <h2 className="text-base font-medium mb-4">Regularization Policies</h2>

            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="p-5 rounded-xl mb-6 space-y-5">
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                id="enable-justify-punch"
                                {...register("enable_justify_punch")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-justify-punch" className="font-medium block mb-1">
                                Enable Justify punch by employee
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        {/* <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div> */}
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-justification-request" className="font-medium block mb-1">
                                    Restrict attendance justification request for past
                                </label>
                                <input
                                    type="text"
                                    {...register("restrict_attendance_justification_days")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="30"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...register("enable_request_punch")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-request-punch" className="font-medium block mb-1">
                                Enable request punch by employee
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...register("enable_multiple_punches")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-multiple-request-punch" className="font-medium block mb-1">
                                Enable multiple Request Punch by employee in a single day
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        {/* <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div> */}
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict Punch request for past
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_punch_request_days")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        {/* <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div> */}
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Enable request punch approval by manager and the status on approval should be
                                </label>
                                <input
                                    type="text"
                                    {...register("punch_approval_status")}
                                    className="w-20 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder=""
                                />
                                {/* <span>days</span> */}
                            </div>
                            <p className="text-gray-600 text-sm ">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    {/* <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Enable request punch approval by manager and the status on approval should be
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_punch_request_manager")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict Duty punch employee
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_duty_punch_employee")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict Real Time request Employee
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_real_time_justify_employee")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict Attendance approval manager
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_attendance_approval_manager")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict Late justify manager
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_late_justify_manager")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict early exit Justrify Manager
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_early_exit_justify_manager")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-punch-request" className="font-medium block mb-1">
                                    Restrict total time Justify Manager
                                </label>
                                <input
                                    type="number"
                                    {...register("restrict_total_time_justify_manager")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div> */}

                        <div className=" mb-4">
                            <button type="submit" className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold">
                                Submit
                            </button>
                        </div>
                </div>
            </form>
            <div className="flex justify-end mb-4">
                <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">Next</button>
            </div>
        </div>
    );
};

export default AdminAttendanceRegularizationPolicies;
