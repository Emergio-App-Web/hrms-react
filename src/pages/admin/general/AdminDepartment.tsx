import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenSquare } from "lucide-react";
import { Ban } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { ChevronsRight } from "lucide-react";
import { getDepartment, addDepartment, getUser, editDepartment, removeDepartment } from "@/services/admin/apiMethods";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AdminDepartment() {
    interface DepartmentTypes {
        title: string;
        description: string;
        department_head: {
            name: string;
            email: string;
            phone: string;
            role: string;
        };
        updated_by: {
            name: string;
            email: string;
            phone: string;
            role: string;
        };
    }

    interface DepartmentData {
        title: string;
        description: string;
        department_head: number;
    }

    interface User {
        email: string;
        id: number;
        name: string;
        phone: number;
        role: string;
    }

    const [departmentContent, setDepartmentContent] = useState<any[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        getUser()
            .then((response: any) => {
                console.log("user data ::", response.data);
                setUsers(response.data); // Set user data to state
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const { register, handleSubmit, setValue, reset } = useForm<DepartmentData>({
        defaultValues: {
            title: "",
            description: "",
            department_head: 0,
        },
    });

    useEffect(() => {
        getDepartment()
            .then((response: any) => {
                console.log("department data::", response.data);
                const departments: DepartmentTypes[] = response.data;
                setDepartmentContent(departments);
            })
            .catch((error) => {
                console.error("error", error);
            });
    }, []);

    const onSubmit: SubmitHandler<DepartmentData> = (data) => {
        if (editingIndex !== null) {
            console.log("final submit ", data, editingIndex);
            editDepartment(data, editingIndex)
                .then((response: any) => {
                    console.log("response from edit :", response);
                    setDepartmentContent((prev) =>
                        prev.map((item) => (item.id === response.data.id ? response.data : item))
                    );
                })
                .catch((error) => {
                    console.error("error", error);
                });
        } else {
            addDepartment(data)
                .then((response: any) => {
                    console.log("response from add department:", response);
                    setDepartmentContent((prev) => [...prev, response.data]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        reset();
        setEditingIndex(null);
    };

    //Edit Department
    const editDept = (deptKey: number) => {
        console.log("selected dept :", deptKey);

        const currentDept = departmentContent.find((dept) => dept.id === deptKey);
        console.log("edit current dept data::", currentDept);

        if (currentDept) {
            setValue("title", currentDept.title);
            setValue("description", currentDept.description);
            setValue("department_head", currentDept?.updated_by?.id);
            console.log("kkkkkkkk:::", currentDept?.updated_by?.id);

            setEditingIndex(deptKey);
        } else {
            console.error("Department not found :", deptKey);
        }
    };

    //Remove Dept
    const removeDept = async (deptKey: number) => {
        try {
            const response: any = await removeDepartment(deptKey);
            console.log("response from delete", response);
            if (response.status === 200) {
                setDepartmentContent((prev) => prev.filter((dept) => dept.id !== deptKey));
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Reset All
    const resetAll = () => {
        reset();
        setEditingIndex(null);

    }
    return (
        <>
            <div className=" flex items-center gap-3 ml-11">
                <h1 className="font-montserrat font-semibold text-2xl ">Department</h1>
                <p className="font-montserrat font-semibold text-md flex items-center">
                    <ChevronsRight />
                    <div>View/Update global settings for your company</div>
                </p>
            </div>
            <div className="w-full flex flex-col">
                <CardContent className="p-5 lg:flex justify-end">
                    <form
                        action=""
                        onSubmit={handleSubmit(onSubmit)}
                        className="gap-y-3 flex flex-col lg:flex-row gap-3 px-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center ">
                            <input
                                placeholder="Title"
                                type="text"
                                {...register("title")}
                                id="title"
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <input
                                placeholder="Description"
                                type="text"
                                id=""
                                {...register("description")}
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <select
                                style={{ color: "grey" }}
                                {...register("department_head")}
                                onChange={(e) => {
                                    setValue("department_head", parseInt(e.target.value));
                                    e.target.style.color = e.target.value === "0" ? "grey" : "black";
                                }}
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            >
                                <option value={0}>Department Head</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold">
                        Add/Update
                        </button>
                    </form>
                </CardContent>
                <div className="flex justify-end gap-3 items-center text-[14px] px-11">
                    <button className="bg-black px-5 py-2 text-white rounded-3xl font-semibold">Add Details</button>
                    <button onClick={() => resetAll()} className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold">Reset</button>
                </div>
            </div>
            <Table className="bg-[#FBFFF2]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Updated By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {departmentContent
                        .slice()
                        .reverse()
                        .map((value) => (
                            <TableRow key={value?.id}>
                                <TableCell className="font-medium">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{value.title}</TableCell>
                                <TableCell>{value.description}</TableCell>
                                <TableCell className="text-right">{value?.updated_by?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Toggle
                                        onClick={() => editDept(value?.id)}
                                        variant="outline"
                                        aria-label="Toggle italic"
                                    >
                                        <PenSquare />
                                    </Toggle>
                                    <Toggle
                                        onClick={() => removeDept(value?.id)}
                                        variant="outline"
                                        aria-label="Toggle italic"
                                    >
                                        <Ban />
                                    </Toggle>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}
