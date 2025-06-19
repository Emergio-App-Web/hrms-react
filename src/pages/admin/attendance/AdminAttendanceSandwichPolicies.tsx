import { getSandwitchPolicy, postSandwitchPolicy, updateSandwitchPolicy } from "@/services/admin/apiMethods";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceSandwichPolicies = () => {
    interface Sandwich {
        organization?: number;
        enable_sandwich_rules: boolean;
        week_off_holidays_between_absents: boolean;
        week_off_holidays_after_absent: boolean;
        week_off_holidays_before_absent: boolean;
        absent_week_offs_holidays_beginning_month: boolean;
        absent_week_offs_holidays_end_month: boolean;
    }

    useEffect(() => {
        getSandwitchPolicy()
            .then((response: any) => {
                const status = response.status;
                if (status === 200) {
                    const data = response.data;
                    Object.keys(data).forEach((key) => {
                        setValue(key as keyof Sandwich, data[key]);
                    });
                }
            })
            .catch((error) => {
                console.error("Error in Sandwich Policy :", error);
            });
    }, []);

    const { register, handleSubmit, setValue } = useForm<Sandwich>({
        defaultValues: {
            enable_sandwich_rules: false,
            week_off_holidays_between_absents: false,
            week_off_holidays_after_absent: false,
            week_off_holidays_before_absent: false,
            absent_week_offs_holidays_beginning_month: false,
            absent_week_offs_holidays_end_month: false,
        },
    });

    const onSubmit: SubmitHandler<Sandwich> = async (data) => {
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization;
            if (orgId) {
                const sandwichResp: any = await updateSandwitchPolicy(data, orgId);
                toast.success(sandwichResp.data.message);
            } else {
                const sandwichResp: any = await postSandwitchPolicy(data);
                toast.success(sandwichResp.data.message);
            }
        } catch (error) {
            console.error("Error in Sandwich Policy :", error);
        }
    };
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto p-6 bg-white">
                <div className="flex items-center mb-8">
                    <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
                    <span className="text-gray-500 flex items-center">
                        <span className="mx-2">»</span>
                        <span>View / Update global settings for your Company</span>
                    </span>
                </div>

                <h2 className="text-base font-medium mb-4">Sandwich Policies</h2>

                <div className="p-5 rounded-xl mb-6 space-y-5">
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...register("enable_sandwich_rules")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="enable-sandwich-rules" className="font-medium block mb-1">
                                Enable Sandwich rules
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
                                {...register("week_off_holidays_between_absents")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="week-off-between-absents" className="font-medium block mb-1">
                                Week off / Holidays in between Absents
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
                                {...register("week_off_holidays_after_absent")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="week-off-after-absents" className="font-medium block mb-1">
                                Week off / Holidays in After Absents
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
                                {...register("week_off_holidays_before_absent")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="week-off-before-absents" className="font-medium block mb-1">
                                Week off / Holidays in Before Absents
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
                                {...register("absent_week_offs_holidays_beginning_month")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="absent-week-offs-beginning-month" className="font-medium block mb-1">
                                Absent and week offs / holidays at the beginning of the month (WAP / AWP )
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
                                {...register("absent_week_offs_holidays_end_month")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="absent-week-offs-end-month" className="font-medium block mb-1">
                                Absent and week offs / holidays at the end of the month (PAW)
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default AdminAttendanceSandwichPolicies;
