import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ban } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PenSquare } from "lucide-react";
import { addBand, getBand, editBand, removeBand } from "@/services/admin/apiMethods";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AdminBrandOrGrades() {
    interface BandTypes {
        id: number;
        title: string;
        rank: string;
        updated_by: {
            id: number;
            name: string;
            email: string;
            phone: string;
            role: string;
        };
    }

    interface BandData {
        title: string;
        rank: string;
    }

    const [BandContent, setBandContent] = useState<any[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const grades = [
        { id: 1, grade: "Grade A" },
        {
            id: 2,
            grade: "Grade B",
        },
        {
            id: 3,
            grade: "Grade C",
        },
    ];

    const { register, handleSubmit, setValue, reset } = useForm<BandData>({
        defaultValues: {
            title: "",
            rank: "",
        },
    });

    useEffect(() => {
        getBand()
            .then((response: any) => {
                console.log("Band data::", response.data);
                const Bands: BandTypes[] = response.data;
                setBandContent(Bands);
            })
            .catch((error) => {
                console.error("error", error);
            });
    }, []);

    const onSubmit: SubmitHandler<BandData> = (data) => {
        if (editingIndex !== null) {
            console.log("final submit ", data, editingIndex);
            editBand(data, editingIndex)
                .then((response: any) => {
                    console.log("response from edit :", response);
                    setBandContent((prev) => prev.map((item) => (item.id === response.data.id ? response.data : item)));
                })
                .catch((error) => {
                    console.error("error", error);
                });
        } else {
            addBand(data)
                .then((response: any) => {
                    console.log("response from add Band:", response);
                    setBandContent((prev) => [...prev, response.data]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        reset();
        setEditingIndex(null);
    };

    //Edit Band
    const editDept = (desigKey: number) => {
        console.log("selected dept :", desigKey);

        const currentBand = BandContent.find((dept) => dept.id === desigKey);
        console.log("edit current dept data::", currentBand);

        if (currentBand) {
            setValue("title", currentBand.title);
            setValue("rank", currentBand?.rank);
            console.log("kkkkkkkk:::", currentBand?.updated_by?.id);

            setEditingIndex(desigKey);
        } else {
            console.error("Band not found :", desigKey);
        }
    };

    //Remove Dept
    const removeDept = async (desigKey: number) => {
        try {
            const response: any = await removeBand(desigKey);
            console.log("response from delete", response);
            if (response.status === 200) {
                setBandContent((prev) => prev.filter((dept) => dept.id !== desigKey));
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Reset All
    const resetAll = () => {
        reset();
        setEditingIndex(null);
    };

    return (
        <>
            <div className=" flex items-center gap-3 ml-11">
                <h1 className="font-montserrat font-semibold text-2xl ">Bands / Grades</h1>
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
                            <select
                                style={{ color: "grey" }}
                                {...register("rank")}
                                onChange={(e) => {
                                    setValue("rank", e.target.value);
                                    e.target.style.color = e.target.value === "" ? "grey" : "black";
                                }}
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            >
                                <option value={0}>Add Band </option>

                                {grades.map((grade) => (
                                    <option key={grade.id} value={grade.grade}>
                                        {grade.grade}
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
                    <button
                        onClick={() => resetAll()}
                        className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <Table className="bg-[#FBFFF2]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Position</TableHead>

                        <TableHead className="text-right">Updated By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {BandContent.slice()
                        .reverse()
                        .map((value) => (
                            <TableRow key={value?.id}>
                                <TableCell className="font-medium">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{value.title}</TableCell>
                                <TableCell>{value.rank}</TableCell>
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

            <div className="flex justify-end mt-6">
                <button className="bg-lime-300 hover:bg-lime-400 text-black px-8 py-2 rounded-2xl font-medium">Next</button>
            </div>
        </>
    );
}
