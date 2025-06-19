import { getTimePolicy, postTimePolicy, updateTimePolicy } from "@/services/admin/apiMethods";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceOverTime = () => {
    interface TimeManage {
        organization?: number | { id: number };

        enable_overtime: boolean;
        overtime_approval_status: string;
        round_off_minutes: boolean;
        rounding_method: string;
        rounding_value: number;
        convert_overtime_to_compensation: boolean;
        comp_off_request_on_overtime: boolean;
        default_overtime_rule: string;
        enable_undertime: boolean;
        enable_attendance_rules: boolean;
    }

    useEffect(() => {
        getTimePolicy()
            .then((response: any) => {
                const status = response.status;
                if (status === 200) {
                    const data = response.data;
                    Object.keys(data).forEach((key) => {
                        if (typeof data[key] === "object") {
                            Object.keys(data[key]).forEach((nestedKey) => {
                                setValue(`${key}.${nestedKey}` as keyof TimeManage, data[key][nestedKey]);
                            });
                        } else {
                            setValue(key as keyof TimeManage, data[key]);
                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

    const { register, handleSubmit, setValue } = useForm<TimeManage>({
        defaultValues: {
            organization: 0,
            enable_overtime: false,
            overtime_approval_status: "",
            round_off_minutes: false,
            rounding_method: "",
            rounding_value: 0,
            convert_overtime_to_compensation: false,
            comp_off_request_on_overtime: false,
            default_overtime_rule: "",
            enable_undertime: false,
            enable_attendance_rules: false,
        },
    });

    const onSubmit: SubmitHandler<TimeManage> = async (data) => {
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
            if (orgId) {
                const response: any = await updateTimePolicy(data, orgId);
                toast.success(response.data.message);
            } else {
                const response: any = await postTimePolicy(data);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Errror occured at Time management Policy :", error);
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

            <h2 className="text-base font-medium mb-4">Over Time</h2>
            <div className="p-5 rounded-xl mb-6 space-y-5">
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            {...register("enable_overtime")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="enable-overtime-approval" className="font-medium block mb-1">
                            Enable Overtime Approval to Manage overtime of the Employee
                        </label>
                    </div>
                </div>

                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <div className="h-5 w-5"></div>
                    </div>
                    <div>
                        <label htmlFor="overtime_approval_status" className="font-medium block mb-1">
                            Overtime approval status
                            <select
                                className="w-24 p-1 mx-2 bg-gray-100 rounded"
                                defaultValue=""
                                {...register("overtime_approval_status")}
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="pending">Pending</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            {...register("round_off_minutes")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="rounding_method" className="font-medium block mb-1">
                            Round off minutes
                        </label>
                    </div>
                </div>
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <div className="h-5 w-5"></div>
                    </div>
                    <div>
                        <label htmlFor="overtime_approval_status" className="font-medium block mb-1">
                            Round off method
                            <select
                                className="w-24 p-1 mx-2 bg-gray-100 rounded"
                                defaultValue=""
                                {...register("rounding_method")}
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="approved">method 1</option>
                                <option value="rejected">method 2</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <div className="h-5 w-5"></div>
                    </div>
                    <div>
                        <label htmlFor="rounding_value" className="font-medium block mb-1">
                            Round off value
                            <input type="text" className="w-16 p-1 mx-2 bg-gray-100 rounded" />
                        </label>
                    </div>
                </div>

                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            {...register("convert_overtime_to_compensation")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="convert_overtime_to_compensation" className="font-medium block mb-1">
                            Convert Approved Overtime into Compensation as per the Overtime Compensation Rules
                        </label>
                    </div>
                </div>

                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            {...register("comp_off_request_on_overtime")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="comp_off_request_on_overtime" className="font-medium block mb-1">
                            Automatically raise Comp Off request against approved Overtime as per Auto compoff Rules
                        </label>
                    </div>
                </div>
            </div>

            <h2 className="text-base font-medium mb-4">OverTime Rule</h2>
            <div className="p-5 rounded-xl mb-6 space-y-5">
                <div className="flex items-start mb-6">
                    <div className="flex items-center">
                        <label htmlFor="default_overtime_rule" className="font-medium block mb-1">
                            Enable Overtime Rule
                        </label>
                         <select
                                className="w-24 p-1 mx-2 bg-gray-100 rounded"
                                defaultValue=""
                                {...register("default_overtime_rule")}
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="approved">rule 1</option>
                                <option value="rejected">rule 2</option>
                                <option value="rejected">rule 3</option>
                            </select>
                    </div>
                </div>
            </div>
            <h2 className="text-base font-medium mb-4">Under Time</h2>
            <div className="p-5 rounded-xl mb-6 space-y-5">
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            id="enable_undertime"
                            {...register("enable_undertime")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="enable_undertime" className="font-medium block mb-1">
                            Enable Undertime Configure Undertime Rule
                        </label>
                    </div>
                </div>
            </div>

            <h2 className="text-base font-medium mb-4">Advance Rules</h2>
            <div className="p-5 rounded-xl mb-6 space-y-5">
                <div className="flex items-start mb-6">
                    <div className="mr-3 mt-1">
                        <input
                            type="checkbox"
                            id="enable_attendance_rules"
                            {...register("enable_attendance_rules")}
                            className="h-5 w-5 rounded border-gray-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="enable_attendance_rules" className="font-medium block mb-1">
                            Enable attendance rules based on Shift
                        </label>
                    </div>
                </div>
            </div>

            <div className=" mb-4">
                <button type="submit" className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AdminAttendanceOverTime;
