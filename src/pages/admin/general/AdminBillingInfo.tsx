import { Card, CardContent } from "@/components/ui/card";
import { addBilling, getBilling } from "@/services/admin/apiMethods";
// editBilling
// deleteBilling
import { ChevronsRight } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AdminBillingInfo = () => {
    interface BillingData {
        id: number;
        name: string;
        address: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        };
        gstin: string;
        pan: string;
        country: string;
        updated_by: {
            id: number;
            name: string;
            email: string;
            phone: string;
            role: string;
        };
    }

    const { register, handleSubmit, setValue } = useForm<BillingData>({
        defaultValues: {
            name: "",
            address: {
                additionalProp1: "",
                additionalProp2: "",
                additionalProp3: "",
            },
            gstin: "",
            pan: "",
            country: "",
        },
    });

    useEffect(() => {
        getBilling()
            .then((response: any) => {
                if (response.ok) {
                    setValue("name", response.data.name);
                    setValue("address.additionalProp1", response.data.address?.additionalProp1 || "");
                    setValue("address.additionalProp2", response.data.address?.additionalProp2 || "");
                    setValue("address.additionalProp3", response.data.address?.additionalProp3 || "");
                    setValue("gstin", response.data.gstin);
                    setValue("pan", response.data.pan);
                    setValue("country", response.data.country);
                }
                // console.log("get billing data :", response);
            })
            .catch((error) => {
                console.error("Error occurred :", error);
            });
    }, []);

    const onSubmit: SubmitHandler<BillingData> = async (data) => {
        // console.log("submit billing data :", data);
        try {
            await addBilling(data);
            // console.log("response bill data upon edit:");
        } catch (error) {
            console.error("Error while editing billing:", error);
        }
    };
    return (
        <div>
            <div className=" flex items-center gap-3 ml-11">
                <h1 className="font-montserrat font-semibold text-2xl ">Billing Info</h1>
                <p className="font-montserrat font-semibold text-md flex items-center">
                    <ChevronsRight />
                    <div>View/Update global settings for your Company</div>
                </p>
            </div>
            <Card className="relative w-full max-w-2xl mx-auto rounded-3xl bg-[#fbfff2] lg:mt-6">
                <CardContent className="p-5">
                    <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-3 ">
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center ">
                            <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                Name
                            </label>
                            <input type="text" id="name" className="bg-[#F0F0F0] p-2 rounded-xl" {...register("name")} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                GSTIN
                            </label>
                            <input type="text" id="gstin" {...register("gstin")} className="bg-[#F0F0F0] p-2 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                Pan
                            </label>
                            <input type="text" id="pan" {...register("pan")} className="bg-[#F0F0F0] p-2 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                Address
                            </label>
                            <textarea
                                id="address.additionalProp1"
                                {...register("address.additionalProp1")}
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                            <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                {...register("country")}
                                className="bg-[#F0F0F0] p-2 rounded-xl"
                            />
                        </div>
                        <div className="flex   justify-center gap-10 items-center my-10 text-[14px]">
                            <button
                                type="submit"
                                className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold hover:shadow-md"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminBillingInfo;
