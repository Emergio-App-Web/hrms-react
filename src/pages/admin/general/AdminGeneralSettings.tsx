import { Card, CardContent } from "@/components/ui/card";
import { editGeneral, getGeneral } from "@/services/admin/apiMethods";
import { ChevronsRight } from "lucide-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const AdminGeneralSettings = () => {
    interface SettingsData {
        organization_name: string;
        domain: string;
        address: {
            pin: string;
            place: string;
            address: string;
        };
        fax: string;
        timezone: string;
    }

    const { register, handleSubmit, setValue } = useForm<SettingsData>({
        defaultValues: {
            organization_name: "",
            domain: "",
            address: {
                pin: "",
                place: "",
                address: "",
            },
            fax: "",
            timezone: "",
        },
    });

    useEffect(() => {
        getGeneral()
            .then((response: any) => {
                console.log("general get data", response);
                const data = response.data;
                // Set default values dynamically
                Object.keys(data).forEach((key) => {
                    if (typeof data[key] === "object") {
                        Object.keys(data[key]).forEach((nestedKey) => {
                            setValue(`${key}.${nestedKey}` as keyof SettingsData, data[key][nestedKey]);
                        });
                    } else {
                        setValue(key as keyof SettingsData, data[key]);
                    }
                });
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [setValue]);

    const onSubmit: SubmitHandler<SettingsData> = (data) => {
        console.log("Submitted Data:", data);
        editGeneral(data)
            .then((response) => {
                console.log("response from edit::", response);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div>
            <div className=" flex items-center gap-3 ml-11">
                <h1 className="font-montserrat font-semibold text-2xl ">General Settings</h1>
                <p className="font-montserrat font-semibold text-md flex items-center">
                    <ChevronsRight />
                    <div>View/Update global settings for your Company</div>
                </p>
            </div>
            <Card className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#fbfff2] lg:mt-6">
                <CardContent className="p-5">
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 ">
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center ">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="organization_name"
                                    {...register("organization_name")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Website
                                </label>
                                <input
                                    type="text"
                                    id="domain"
                                    {...register("domain")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Email
                                </label>
                                <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Address
                                </label>
                                <textarea
                                    id="address.address"
                                    {...register("address.address")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                ></textarea>{" "}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Place
                                </label>
                                <input
                                    type="text"
                                    id="address.place"
                                    {...register("address.place")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="address.country"
                                    {...register("address.place")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Pin
                                </label>
                                <input
                                    type="text"
                                    id="address.pin"
                                    {...register("address.pin")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Fax
                                </label>
                                <input type="text" id="fax" {...register("fax")} className="bg-[#F0F0F0] p-2 rounded-xl" />{" "}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Phone
                                </label>
                                <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Company Logo
                                </label>
                                <input type="file" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Employee Code
                                </label>
                                <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
                                <label htmlFor="" className="text-[14px] font-montserrat font-bold">
                                    Time Zone
                                </label>
                                <input
                                    type="text"
                                    id="timezone"
                                    {...register("timezone")}
                                    className="bg-[#F0F0F0] p-2 rounded-xl"
                                />{" "}
                            </div>
                            <div className="flex   justify-center gap-10 items-center my-10 text-[14px]">
                                <button
                                    type="submit"
                                    className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold hover:shadow-md"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminGeneralSettings;
