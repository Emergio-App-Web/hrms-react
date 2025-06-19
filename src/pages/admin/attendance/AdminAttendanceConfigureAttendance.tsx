import { getAttendance, postAttendance, updateAttendance } from "@/services/admin/apiMethods";
import { ConfigAttendanceValidation } from "@/validations/ConfigAttendanceValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceConfigureAttendance = () => {
    interface ConfigAttendance {
        organization?: number | { id: number };
        enable_attendance: boolean;
        default_attendance_status: string;
        deduct_salary_for_absent_days: string;
        company_start_time: string;
        company_end_time: string;
        hide_total_hours: boolean;
        hide_attendance_punches: boolean;
        disable_web_attendance: boolean;
        enable_ip_restrictions: boolean;
        disable_mobile_attendance: boolean;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await getAttendance();
                if (response.status === 200) {
                    const data = response.data;
                    Object.keys(data).forEach((key) => {
                        if (typeof data[key] === "object") {
                            Object.keys(data[key]).forEach((nestedKey) => {
                                setValue(`${key}.${nestedKey}` as keyof ConfigAttendance, data[key][nestedKey]);
                            });
                        } else {
                            setValue(key as keyof ConfigAttendance, data[key]);
                        }
                    });
                }
                console.log("response1 :", response);
            } catch (error) {
                console.error("Error occurent in Attendance Config:", error);
            }
        };
        fetchData();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ConfigAttendance>({
        defaultValues: {
            organization: 0,
            enable_attendance: false,
            default_attendance_status: "",
            deduct_salary_for_absent_days: "",
            company_start_time: "",
            company_end_time: "",
            hide_total_hours: false,
            hide_attendance_punches: false,
            disable_web_attendance: false,
            enable_ip_restrictions: false,
            disable_mobile_attendance: false,
        },
        resolver: yupResolver(ConfigAttendanceValidation) as Resolver<ConfigAttendance>,
    });

    const onSubmit: SubmitHandler<ConfigAttendance> = async (data) => {
        console.log("config data @form ::", data);
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
            if (orgId) {
                const configResponse: any = await updateAttendance(data, orgId);
                console.log("response::", configResponse.data.message);
                toast.success(configResponse.data.message);
            } else {
                const configResponse: any = await postAttendance(data);
                console.log("response::", configResponse);
            }
        } catch (error) {
            console.error("Error in Attendance configuration :", error);
        }
    };

    const ResetAttendance = () => {
        reset();
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

            <h2 className="text-base font-medium mb-4">Configure Attendance</h2>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-[#FBFFF2] p-5 rounded-xl mb-6">
                    <div className="mb-6">
                        <div className="flex items-start p-2">
                            <div className="mr-3 mt-1">
                                <input
                                    type="checkbox"
                                    id="enable_attendance"
                                    {...register("enable_attendance")}
                                    className="h-5 w-5 rounded border-gray-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="enable-attendance" className="font-medium block mb-1">
                                    Enable Attendance Module
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block mb-1 text-sm">Default Attendance status</label>
                            <input
                                type="text"
                                id="default_attendance_status"
                                {...register("default_attendance_status")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                            {errors.default_attendance_status && (
                                <p className="text-red-500 text-sm">{errors.default_attendance_status.message}</p>
                            )}
                        </div>
                        <div className="flex gap-5 items-center">
                            <label className="block mb-1 text-sm">Timing</label>
                            <div className="flex flex-col">
                                <input
                                    type="time"
                                    {...register("company_start_time")}
                                    className="w-full p-2 bg-gray-100 rounded"
                                />
                                {errors.company_start_time && (
                                    <p className="text-red-500 text-sm">{errors.company_start_time.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="time"
                                    {...register("company_end_time")}
                                    className="w-full p-2 bg-gray-100 rounded"
                                />
                                {errors.company_end_time && (
                                    <p className="text-red-500 text-sm">{errors.company_end_time.message}</p>
                                )}
                            </div>
                        </div>
                          <div className="mb-6">
                        <div>
                            <label className="block mb-1 text-sm">Deduct Salary For Absent days</label>
                            <input
                                type="text"
                                {...register("deduct_salary_for_absent_days")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                    </div>
                    </div>

                    <div className="flex mb-4">
                        <button type="submit" className="bg-black text-white px-6 py-1 rounded-xl mr-2">
                            Submit
                        </button>
                        <button onClick={() => ResetAttendance()} className="bg-[#DDFF8F] text-black px-6 py-1 rounded-xl">
                            Reset
                        </button>
                    </div>
                </div>

                <h2 className="text-base font-medium mb-4">Web Attendance</h2>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                id="disable_web_attendance"
                                {...register("disable_web_attendance")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="disable_web_attendance" className="font-medium block mb-1">
                                Disable web based Attendance
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id egiet aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-base font-medium mb-4">Mobile Attendance</h2>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                id="disable_mobile_attendance"
                                {...register("disable_mobile_attendance")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="disable_mobile_attendance" className="font-medium block mb-1">
                                Disable Mobile based Attendance
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id egiet aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-base font-medium mb-4">IP Resitriction</h2>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...register("enable_ip_restrictions")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-roster" className="font-medium block mb-1">
                                IP Restriction
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id egiet aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                id="hide_total_hours"
                                {...register("hide_total_hours")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-roster" className="font-medium block mb-1">
                                Hide total hours
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id egiet aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                id="hide_attendance_punches"
                                {...register("hide_attendance_punches")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-roster" className="font-medium block mb-1">
                                Hide attendance punches
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id egiet aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex justify-end mb-4">
                {/* <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">
          Next
        </button> */}
            </div>
        </div>
    );
};

export default AdminAttendanceConfigureAttendance;
