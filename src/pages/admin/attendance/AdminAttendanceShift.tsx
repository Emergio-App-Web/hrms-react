import { getShift, postShift, updateShift } from "@/services/admin/apiMethods";
import { PenSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const AdminAttendanceShift = () => {
    interface OrganizationType {
        id: number;
        name: string;
    }

    interface ShiftTypes {
        id: number;
        organization: OrganizationType;
        shift_type: string;
        shift_code: string;
        shift_title: string;
        description: string;
        timein: string;
        timeout: string;
        make_default_shift: boolean;
    }

    interface ShiftData {
        shift_type: string;
        shift_code: string;
        shift_title: string;
        description: string;
        timein: string;
        timeout: string;
        make_default_shift: boolean;
    }

    const [shiftContent, setShiftContent] = useState<ShiftTypes[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const { register, handleSubmit, setValue, reset } = useForm<ShiftData>({
        defaultValues: {
            shift_type: "fixed",
            shift_code: "",
            shift_title: "",
            description: "",
            timein: "",
            timeout: "",
            make_default_shift: false,
        },
    });

    // Watch shift_type to handle radio button selection

    // Fetch shifts data on component mount
    useEffect(() => {
        getShift()
            .then((response: any) => {
                // console.log("shift data::", response.data);
                const shifts: ShiftTypes[] = Array.isArray(response.data) ? response.data : [response.data];
                setShiftContent(shifts);
            })
            .catch((error) => {
                console.error("Error fetching shifts:", error);
            });
    }, []);

    const onSubmit: SubmitHandler<ShiftData> = async (data) => {
        // console.log("shift data form ::", data);
        
        if (editingIndex !== null) {
            // Update existing shift
            try {
                const currentShift = shiftContent.find((shift) => shift.id === editingIndex);
                if (currentShift) {
                    const response: any = await updateShift(data);
                // console.log("response from update:", response);
                setShiftContent((prev) =>
                    prev.map((item) => (item.id === response.data.id ? response.data : item))
                );
                }
            } catch (error) {
                console.error("Error updating shift:", error);
            }
        } else {
            // Create new shift
            try {
                const response: any = await postShift(data);
                // console.log("response from add shift:", response);
                setShiftContent((prev) => [...prev, response.data]);
            } catch (error) {
                console.error("Error creating shift:", error);
            }
        }
        
        reset();
        setEditingIndex(null);
    };

    // Edit Shift
    const editShift = (shiftId: number) => {
        // console.log("selected shift:", shiftKey);

        const currentShift = shiftContent.find((shift) => shift.id === shiftId);
        // console.log("edit current shift data::", currentShift);

        if (currentShift) {
            setValue("shift_type", currentShift.shift_type);
            setValue("shift_code", currentShift.shift_code);
            setValue("shift_title", currentShift.shift_title);
            setValue("description", currentShift.description);
            setValue("timein", currentShift.timein);
            setValue("timeout", currentShift.timeout);
            setValue("make_default_shift", currentShift.make_default_shift);

            setEditingIndex(shiftId);
        } else {
            console.error("Shift not found:", shiftId);
        }
    };

    // Reset All
    const resetAll = () => {
        reset();
        setEditingIndex(null);
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div>
                                <label className="block mb-1 text-sm">Description</label>
                                <input
                                    type="text"
                                    {...register("description")}
                                    className="w-full p-2 bg-gray-100 rounded"
                                />
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

                    <div className="flex flex-col-reverse md:flex-row items-start">
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-1 rounded-xl"
                            >
                                {editingIndex !== null ? "Update" : "Add"}
                            </button>
                            <button
                                type="button"
                                onClick={resetAll}
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
                                    value="fixed"
                                    {...register("shift_type")}
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
                                    value="flexi"
                                    {...register("shift_type")}
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

            <Table className="bg-[#FBFFF2]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Shift Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shiftContent
                        .slice()
                        .reverse()
                        .map((shift) => (
                            <TableRow key={shift.id}>
                                <TableCell>{shift.shift_code}</TableCell>
                                <TableCell>{shift.shift_title}</TableCell>
                                <TableCell>{shift.timein}</TableCell>
                                <TableCell>{shift.timeout}</TableCell>
                                <TableCell className="capitalize">{shift.shift_type}</TableCell>
                                <TableCell>{shift.make_default_shift ? "Yes" : "No"}</TableCell>
                                <TableCell className="text-right">
                                    <Toggle
                                        onClick={() => editShift(shift.id)}
                                        variant="outline"
                                        aria-label="Edit shift"
                                    >
                                        <PenSquare />
                                    </Toggle>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}></TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default AdminAttendanceShift;