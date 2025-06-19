import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReferenceForm {
    name: string;
    emailId: string;
    mobileNumber: string;
    occupation: string;
    jobTitle: string;
    company: string;
}

export default function ReferenceForm() {
    const [formData, setFormData] = useState<ReferenceForm>({
        name: '',
        emailId: '',
        mobileNumber: '',
        occupation: '',
        jobTitle: '',
        company: ''
    });

    const handleReset = () => {
        setFormData({
            name: '',
            emailId: '',
            mobileNumber: '',
            occupation: '',
            jobTitle: '',
            company: ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-8">
            <Card className="relative w-full max-w-3xl mx-auto bg-[#fbfff2] rounded-3xl before:content-[var(--title)] before:text-[#4F4F4F] before:font-semibold before:text-xl sm:before:text-2xl before:absolute before:-top-14 before:left-4 sm:before:left-0"
                style={{ "--title": "'Reference'" } as React.CSSProperties}>
                <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Email ID
                            </Label>
                            <Input
                                type="email"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Mobile Number
                            </Label>
                            <Input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Occupation
                            </Label>
                            <Input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Job Title
                            </Label>
                            <Input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Company
                            </Label>
                            <Input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-4 pt-4 px-4">
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