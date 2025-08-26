import {
    getRosterShift,
    postRosterShift,
    postShiftChange,
    updateRosterShift,
    updateShiftChange,
    getShiftChange
} from "@/services/admin/apiMethods";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AdminAttendanceRosterShift = () => {
    interface RoasterData {
        organization?: number | { id: number };
        enable_roster_shifts: boolean;
        allow_managers_assign_shifts: boolean;
        restrict_shift_change_days: number;
        restrict_week_off_per_month: number;
        restrict_week_off_per_week: number;
    }

    interface ShiftChange {
        organization?: number | { id: number };
        allow_employee_shift_change_request: boolean;
        enable_manager_approval: boolean;
        default_approval_status: string;
    }

    // FIRST FORM: Roster Shift
    const {
        register: registerRoster,
        handleSubmit: handleSubmitRoster,
        setValue: setValueRoster,
    } = useForm<RoasterData>({
        defaultValues: {
            organization: 0,
            enable_roster_shifts: false,
            allow_managers_assign_shifts: false,
            restrict_shift_change_days: 0,
            restrict_week_off_per_month: 0,
            restrict_week_off_per_week: 0,
        },
    });

    // SECOND FORM: Shift Change
    const {
        register: registerShift,
        handleSubmit: handleSubmitShift,
        setValue: setValueShift,
    } = useForm<ShiftChange>({
        defaultValues: {
            organization: 0,
            allow_employee_shift_change_request: false,
            enable_manager_approval: false,
            default_approval_status: "",
        },
    });

    useEffect(() => {
        getRosterShift()
            .then((response: any) => {
                if (response.status === 200) {
                    const data = response.data;
                    Object.keys(data).forEach((key) => {
                        if (typeof data[key] === "object") {
                            Object.keys(data[key]).forEach((nestedKey) => {
                                setValueRoster(`${key}.${nestedKey}` as any, data[key][nestedKey]);
                            });
                        } else {
                            setValueRoster(key as any, data[key]);
                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        getShiftChange()
            .then((response: any) => {
                if (response.status === 200) {
                    const data = response.data;
                    Object.keys(data).forEach((key) => {
                        if (typeof data[key] === "object") {
                            Object.keys(data[key]).forEach((nestedKey) => {
                                setValueShift(`${key}.${nestedKey}` as any, data[key][nestedKey]);
                            });
                        } else {
                            setValueShift(key as any, data[key]);
                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onSubmitRoster: SubmitHandler<RoasterData> = async (data) => {
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
            if (orgId) {
                const configResponse: any = await updateRosterShift(data, orgId);
                toast.success(configResponse.data.message);
            } else {
                const rosterResponse: any = await postRosterShift(data);
                toast.success(rosterResponse.data.message);
            }
        } catch (error) {
            console.error("Error in Roster Shift :", error);
        }
    };

    const onSubmitShift: SubmitHandler<ShiftChange> = async (data) => {
        try {
            const orgId = typeof data.organization === "number" ? data.organization : data?.organization?.id;
            if (orgId) {
                const configResponse: any = await updateShiftChange(data, orgId);
                toast.success(configResponse.data.message);
            } else {
                const shiftResponse: any = await postShiftChange(data);
                toast.success(shiftResponse.data.message);
            }
        } catch (error) {
            console.error("Error in Shift change :", error);
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

            <h2 className="text-base font-medium mb-4">Roster Shift</h2>
            <form onSubmit={handleSubmitRoster(onSubmitRoster)}>
                <div className="p-5 rounded-xl mb-6">
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...registerRoster("allow_managers_assign_shifts")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="allow-managers" className="font-medium block mb-1">
                                Allow Managers to Assign Shifts
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
                                {...registerRoster("enable_roster_shifts")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="allow-managers" className="font-medium block mb-1">
                                Enable Roster Shift
                            </label>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            {/* <input
                            type="checkbox"
                            id="restrict-week-off-month"
                            className="h-5 w-5 rounded border-gray-300"
                        /> */}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-week-off-month" className="font-medium block mb-1">
                                    Restrict Week Off assignment by manager to
                                </label>
                                <input
                                    type="number"
                                    {...registerRoster("restrict_week_off_per_month")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days in month</span>
                            </div>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            {/* <input
                            type="checkbox"
                            id="restrict-week-off-week"
                            className="h-5 w-5 rounded border-gray-300"
                        /> */}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-week-off-week" className="font-medium block mb-1">
                                    Restrict Week Off assignment by manager to
                                </label>
                                <input
                                    type="text"
                                    {...registerRoster("restrict_week_off_per_week")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="0"
                                />
                                <span>days in a week</span>
                            </div>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <label htmlFor="restrict-week-off-month" className="font-medium block mb-1">
                                    Restric shift change
                                </label>
                                <input
                                    type="text"
                                    {...registerRoster("restrict_shift_change_days")}
                                    className="w-16 p-1 mx-2 bg-gray-100 rounded"
                                    placeholder="5"
                                />
                                <span>days in month</span>
                            </div>
                            <p className="text-gray-600 text-sm text-center">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold">
                            Submit Roster Shift
                        </button>
                    </div>
                </div>
            </form>

            <h2 className="text-base font-medium mb-4">Shift Change</h2>
            <form onSubmit={handleSubmitShift(onSubmitShift)}>
                <div className="p-5 rounded-xl  space-y-5">
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...registerShift("allow_employee_shift_change_request")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="allow_employee_shift_change_request" className="font-medium block mb-1">
                                    Allow Employees to request for shift change
                                </label>
                            </div>
                            <p className="text-gray-600 text-sm ">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                            {/* <div className="bg-gray-100 px-4 py-2 rounded ml-auto w-24">{approvalStatus}</div> */}
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="mr-3 mt-1">
                            <input
                                type="checkbox"
                                {...registerShift("enable_manager_approval")}
                                className="h-5 w-5 rounded border-gray-300"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center ">
                                <label htmlFor="enable_manager_approval" className="font-medium block mb-1">
                                    Enable requested shift change approval by the manager and the status on approval should
                                    be
                                </label>
                                <input
                                    type="text"
                                    {...registerShift("default_approval_status")}
                                    className="w-20 p-1 mx-2 bg-gray-100 rounded "
                                    placeholder="5"
                                />
                            </div>
                            <p className="text-gray-600 text-sm ">
                                Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam
                                adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
                            </p>
                            {/* <div className="bg-gray-100 px-4 py-2 rounded ml-auto w-24">{approvalStatus}</div> */}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold">
                            Submit Shift Change
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminAttendanceRosterShift;
