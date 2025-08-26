import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBankDetails, postBankDetails } from '@/services/user/apiMethods';
import { toast } from 'react-toastify';

interface BankFormDetails {
    id: number;
    name_of_bank: string;
    account_no: string;
    ifsc: string;
    branch: string;
    account_type: string;
}

export default function BankForm() {
    // const [selectedFile, setSelectedFile] = useState<string>("");
    const [bankDetails, setBankDetails] = useState<BankFormDetails>({
        id: 0,
        name_of_bank: "",
        account_no: "",
        ifsc: "",
        branch: "",
        account_type: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setSelectedFile(file.name);
    //     }
    // };
    const fetchData = async () => {
        try {
            const response: any = await getBankDetails();
            if (response.status === 200) {
                setBankDetails(response.data);
            }
        } catch (err: unknown) {
            console.error("Error fetching bank details:", err);
            toast.error("Failed to fetch bank details");
        }
    }

    const handleReset = () => {
        // setSelectedFile("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!bankDetails.id) {
                const response: any = await postBankDetails(bankDetails);
                if (response.status === 200) {
                    toast.success("Bank details added successfully");
                } else {
                    toast.error("Failed to add bank details");
                }
            }
        } catch (err: unknown) {
            console.error("Error submitting bank details:", err);
            toast.error("Failed to submit bank details");
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-8">
            <Card className="relative w-full max-w-3xl mx-auto bg-[#fbfff2] rounded-3xl before:content-[var(--title)] before:text-[#4F4F4F] before:font-semibold before:text-xl sm:before:text-2xl before:absolute before:-top-14 before:left-4 sm:before:left-0"
                style={{ "--title": "'Bank Account Details'" } as React.CSSProperties}>
                <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Form Fields */}
                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Name of Bank</Label>
                            <Input
                                value={bankDetails.name_of_bank}
                                onChange={(e) => setBankDetails({ ...bankDetails, name_of_bank: e.target.value })}
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Account Number</Label>
                            <Input
                                value={bankDetails.account_no}
                                onChange={(e) => setBankDetails({ ...bankDetails, account_no: e.target.value })}
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">IFSC Code</Label>
                            <Input
                                value={bankDetails.ifsc}
                                onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Branch Address</Label>
                            <Input
                                value={bankDetails.branch}
                                onChange={(e) => setBankDetails({ ...bankDetails, branch: e.target.value })}
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Account type</Label>
                            <Input
                                value={bankDetails.account_type}
                                onChange={(e) => setBankDetails({ ...bankDetails, account_type: e.target.value })}
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        {/* <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Payment Mode</Label>
                            <Select>
                                <SelectTrigger className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]">
                                    <SelectValue placeholder="Select Payment Mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="neft">NEFT</SelectItem>
                                    <SelectItem value="rtgs">RTGS</SelectItem>
                                    <SelectItem value="imps">IMPS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        {/* <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Bank Document</Label>
                            <div className="grid w-full items-center gap-1.5">
                                <Input
                                    type="file"
                                    id="bank-document"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                />
                                <Label
                                    htmlFor="bank-document"
                                    className="bg-[#f0f0f0] text-center text-xs sm:text-sm font-semibold text-[#1F1F1FB2] cursor-pointer h-9 w-full rounded-md border border-input px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium flex items-center justify-center"
                                >
                                    {selectedFile || "Choose File & Upload"}
                                </Label>
                            </div>
                        </div> */}
                    </form>
                </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-4">
                <Button
                    onClick={handleSubmit}  
                    type="submit"
                    className="w-full sm:w-auto rounded-full px-8 py-2 bg-black text-white hover:bg-gray-800"
                >
                    Add Details
                </Button>
                <Button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto rounded-full px-8 py-2 bg-[#d9ff99] text-black hover:bg-[#c8eb8e]"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}