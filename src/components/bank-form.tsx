import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// interface BankDetails {
//     bankName: string;
//     accountNumber: string;
//     ifscCode: string;
//     branchAddress: string;
//     accountType: string;
//     paymentMode: string;
//     bankDocument: string;
// }

export default function BankForm() {
    const [selectedFile, setSelectedFile] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    const handleReset = () => {
        setSelectedFile("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Account Number</Label>
                            <Input
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">IFSC Code</Label>
                            <Input
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Branch Address</Label>
                            <Input
                                type="text"
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">Account type</Label>
                            <Select>
                                <SelectTrigger className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]">
                                    <SelectValue placeholder="Select Account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="savings">Savings</SelectItem>
                                    <SelectItem value="current">Current</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
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
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
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
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-4">
                <Button
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