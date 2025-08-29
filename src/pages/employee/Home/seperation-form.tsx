import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// interface SeparationRequest {
//     reasonForSeparation: string;
//     desiredRelievingDate: string;
//     feedback: string;
//     confidentialFeedback: string;
//     experience: string;
// }

export default function SeparationForm() {
    const handleReset = () => {
        // Reset form logic here
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit form logic here
    };

    return (
        <div className="w-full px-2">
            <Card className="relative w-full max-w-3xl mx-auto bg-[#fbfff2] rounded-3xl before:content-[var(--title)] before:text-[#4F4F4F] before:font-semibold before:text-xl sm:before:text-2xl before:absolute before:-top-14 before:left-4 sm:before:left-0"
                style={{ "--title": "'Separation Request'" } as React.CSSProperties}>
                <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start">
                            <Label className="text-sm sm:text-base font-medium">
                                Reason for Separation
                            </Label>
                            <Textarea 
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] min-h-[100px]"
                                placeholder=""
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start">
                            <Label className="text-sm sm:text-base font-medium">
                                Desired Relieving Date
                            </Label>
                            <input
                                type="text"
                                className="flex h-9 w-full rounded-md border border-input bg-[#f0f0f0] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start">
                            <Label className="text-sm sm:text-base font-medium">
                                Feedback
                            </Label>
                            <Textarea 
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] min-h-[100px]"
                                placeholder=""
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start">
                            <Label className="text-sm sm:text-base font-medium">
                                Confidential Feedback
                            </Label>
                            <Textarea 
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] min-h-[100px]"
                                placeholder=""
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start">
                            <Label className="text-sm sm:text-base font-medium">
                                Experience
                            </Label>
                            <Textarea 
                                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] min-h-[100px]"
                                placeholder=""
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-4 pt-4 lg:pt-12  px-4">
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