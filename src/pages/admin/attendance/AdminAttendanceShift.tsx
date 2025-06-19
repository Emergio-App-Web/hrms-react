import { getShift, postShift } from "@/services/admin/apiMethods";
// updateShift
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const AdminAttendanceShift = () => {
    interface ShiftData {
        organization: number;
        shift_type: string;
        shift_code: string;
        shift_title: string;
        description: string;
        timein: string;
        timeout: string;
        make_default_shift: boolean;
    }

    useEffect(() => {
        getShift().then((response: any) => {
            const status = response.status
            if(status === 200){
                const data = response.data
                Object.keys(data).forEach((key) => {
                    if(typeof data[key] === "object"){
                        Object.keys(data[key]).forEach((nestedKey) => {
                            setValue(`${key}.${nestedKey}` as
                                keyof ShiftData,
                                data[key][nestedKey]
                            )
                        })
                    } else {
                        setValue(key as keyof ShiftData, data[key])
                    }
                })
            }
        });
    }, []);

    const { register, handleSubmit, setValue } = useForm<ShiftData>({
        defaultValues: {
            organization: 0,
            shift_type: "",
            shift_code: "",
            shift_title: "",
            description: "",
            timein: "",
            timeout: "",
            make_default_shift: false,
        },
    });

    const onSubmit: SubmitHandler<ShiftData> = async (data) => {
        console.log("shift data form ::", data);
        try {
            const response = await postShift(data);
            console.log("response :", response);
            // if(response.status:  === "200" | "201"){
            //     toast.success("New Shift added/updated")
        } catch (error) {
            console.error("Error occured while add/update Shift :", error);
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

            <h2 className="text-base font-medium mb-4">Shift</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="bg-[#FBFFF2] p-5 rounded-xl mb-6">
                    <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block mb-1 text-sm">Code</label>
                                <input type="text" {...register("shift_code")} className="w-full p-2 bg-gray-100 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Title</label>
                                <input
                                    type="text"
                                    {...register("shift_title")}
                                    className="w-full p-2 bg-gray-100 rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <label className="block mb-1 text-sm">Description</label>
                                <input
                                    type="text"
                                    {...register("description")}
                                    className="w-full p-2 bg-gray-100 rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Shift type</label>
                                <input type="text" {...register("shift_type")} className="w-full p-2 bg-gray-100 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Timing</label>
                                <div className="flex gap-4">
                                    <input type="time" {...register("timein")} className="w-full p-2 bg-gray-100 rounded" />
                                    <input
                                        type="time"
                                        {...register("timeout")}
                                        className="w-full p-2 bg-gray-100 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex space-x-2">
                            <button
                                // onClick={handleSave}
                                type="submit"
                                className="bg-black text-white px-6 py-1 rounded-xl"
                            >
                                Add/Update
                            </button>
                            <button
                                // onClick={resetForm}
                                className="bg-[#DDFF8F] text-black px-6 py-1 rounded-xl"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="ml-auto flex items-center">
                            <div className="flex items-center mx-4">
                                <input
                                    type="radio"
                                    id="fixed"
                                    name="shiftType"
                                    // checked={isFixed}
                                    // onChange={handleFixedChange}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="fixed" className="text-sm">
                                    Fixed
                                </label>
                            </div>
                            <div className="flex items-center mx-4">
                                <input
                                    type="radio"
                                    id="flexi"
                                    name="shiftType"
                                    // checked={isFlexi}
                                    // onChange={handleFlexiChange}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="flexi" className="text-sm">
                                    Flexi
                                </label>
                            </div>
                            <div className="flex">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="default"
                                        {...register("make_default_shift")}
                                        className="w-4 h-4 mr-2"
                                    />
                                    <label htmlFor="default" className="text-sm">
                                        Make this a default shift
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex justify-end mb-4">
                <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">Next</button>
            </div>

            <div className="overflow-x-auto bg-[#FBFFF2] rounded p-5">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2 px-3">Code</th>
                            <th className="py-2 px-3">Title</th>
                            <th className="py-2 px-3">Start Time</th>
                            <th className="py-2 px-3">End Time</th>
                            <th className="py-2 px-3">Total Hours</th>
                            <th className="py-2 px-3">Start of the Day</th>
                            <th className="py-2 px-3">Allowance</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAttendanceShift;
