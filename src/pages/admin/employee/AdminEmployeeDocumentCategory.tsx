import { getDocSettings, postDocSettings, updateDocSettings } from "@/services/admin/apiMethods";
import { PenSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const AdminEmployeeDocumentCategory = () => {
    interface DocumentCategoryType {
        id: number;
        title: string;
        module: string;
        description: string;
        applicable_to: string;
        no_of_document: number;
        expiry_date: boolean;
        mandatory: boolean;
        identification: boolean;
        issue_date: boolean;
        updated_by_id: number;
    }

    interface DocumentCategoryData {
        title: string;
        module: string;
        description: string;
        applicable_to: string;
        no_of_document: number;
        expiry_date: boolean;
        mandatory: boolean;
        identification: boolean;
        issue_date: boolean;
    }

    const [docCategories, setDocCategories] = useState<DocumentCategoryType[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const { register, handleSubmit, setValue, reset } = useForm<DocumentCategoryData>({
        defaultValues: {
            title: "",
            module: "",
            description: "",
            applicable_to: "",
            no_of_document: 0,
            expiry_date: false,
            mandatory: false,
            identification: false,
            issue_date: false,
        },
    });

    // Fetch document categories data on component mount
    useEffect(() => {
        getDocSettings()
            .then((response: any) => {
                // console.log("doc settings data::", response.data);
                const categories: DocumentCategoryType[] = Array.isArray(response.data) ? response.data : [response.data];
                setDocCategories(categories);
            })
            .catch((error) => {
                console.error("Error fetching document categories:", error);
            });
    }, []);

    const onSubmit: SubmitHandler<DocumentCategoryData> = async (data) => {
        // console.log("doc category data form ::", data);
        
        if (editingIndex !== null) {
            // Update existing document category
            try {
                const currentCategory = docCategories.find((category) => category.id === editingIndex);
                if (currentCategory) {
                    const response: any = await updateDocSettings(data, editingIndex);
                    // console.log("response from update:", response);
                    setDocCategories((prev) =>
                        prev.map((item) => (item.id === response.data.id ? response.data : item))
                    );
                }
            } catch (error) {
                console.error("Error updating document category:", error);
            }
        } else {
            // Create new document category
            try {
                const response: any = await postDocSettings(data);
                // console.log("response from add doc category:", response);
                setDocCategories((prev) => [...prev, response.data]);
            } catch (error) {
                console.error("Error creating document category:", error);
            }
        }
        
        reset();
        setEditingIndex(null);
    };

    // Edit Document Category
    const editDocCategory = (categoryId: number) => {
        // console.log("selected category:", categoryId);

        const currentCategory = docCategories.find((category) => category.id === categoryId);
        // console.log("edit current category data::", currentCategory);

        if (currentCategory) {
            setValue("title", currentCategory.title);
            setValue("module", currentCategory.module);
            setValue("description", currentCategory.description);
            setValue("applicable_to", currentCategory.applicable_to);
            setValue("no_of_document", currentCategory.no_of_document);
            setValue("expiry_date", currentCategory.expiry_date);
            setValue("mandatory", currentCategory.mandatory);
            setValue("identification", currentCategory.identification);
            setValue("issue_date", currentCategory.issue_date);

            setEditingIndex(categoryId);
        } else {
            console.error("Document category not found:", categoryId);
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
                <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
                <span className="text-gray-500 flex items-center">
                    <span className="mx-2">»</span>
                    <span>View / Update global settings for your Company</span>
                </span>
            </div>

            <h2 className="text-base font-medium mb-4">Add New Document Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="bg-[#FBFFF2] p-5 rounded-xl mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-1 text-sm">Title</label>
                            <input
                                type="text"
                                {...register("title")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Module</label>
                            <input
                                type="text"
                                {...register("module")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-1 text-sm">Description</label>
                            <input
                                type="text"
                                {...register("description")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">No of Documents</label>
                            <input
                                type="number"
                                {...register("no_of_document", { valueAsNumber: true })}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-1 text-sm">Applicable To</label>
                            <input
                                type="text"
                                {...register("applicable_to")}
                                className="w-full p-2 bg-gray-100 rounded"
                            />
                        </div>
                        <div className="flex items-center mt-6 space-x-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="expiryDate"
                                    {...register("expiry_date")}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="expiryDate" className="text-sm">Expiry Date</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="mandatory"
                                    {...register("mandatory")}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="mandatory" className="text-sm">Mandatory</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-4 ml-2">
                        <div className="flex items-center mr-6">
                            <input
                                type="checkbox"
                                id="identification"
                                {...register("identification")}
                                className="w-4 h-4 mr-2"
                            />
                            <label htmlFor="identification" className="text-sm">Identification</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="issueDate"
                                {...register("issue_date")}
                                className="w-4 h-4 mr-2"
                            />
                            <label htmlFor="issueDate" className="text-sm">Issue Date</label>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2">
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
                </div>
            </form>

            <div className="flex justify-end mb-4">
                <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">
                    Next
                </button>
            </div>

            <Table className="bg-[#FBFFF2]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Applicable To</TableHead>
                        <TableHead>No of Documents</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Mandatory</TableHead>
                        <TableHead>Identification</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {docCategories
                        .slice()
                        .reverse()
                        .map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.title}</TableCell>
                                <TableCell>{category.module}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>{category.applicable_to}</TableCell>
                                <TableCell>{category.no_of_document}</TableCell>
                                <TableCell>{category.expiry_date ? "Yes" : "No"}</TableCell>
                                <TableCell>{category.issue_date ? "Yes" : "No"}</TableCell>
                                <TableCell>{category.mandatory ? "Yes" : "No"}</TableCell>
                                <TableCell>{category.identification ? "Yes" : "No"}</TableCell>
                                <TableCell className="text-right">
                                    <Toggle
                                        onClick={() => editDocCategory(category.id)}
                                        variant="outline"
                                        aria-label="Edit document category"
                                    >
                                        <PenSquare />
                                    </Toggle>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={9}></TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default AdminEmployeeDocumentCategory;