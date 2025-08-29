import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

interface PasswordChangeForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function PasswordChangeForm() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [formData, setFormData] = useState<PasswordChangeForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleReset = () => {
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add password validation and submission logic here
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        switch (field) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-8">
            <Card className="relative w-full max-w-3xl mx-auto bg-[#fbfff2] rounded-3xl before:content-[var(--title)] before:text-[#4F4F4F] before:font-semibold before:text-xl sm:before:text-2xl before:absolute before:-top-14 before:left-4 sm:before:left-0"
                style={{ "--title": "'Change Password'" } as React.CSSProperties}>
                <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] pr-10"
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showCurrentPassword ? 
                                        <EyeOff className="h-4 w-4 text-gray-500" /> : 
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] pr-10"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showNewPassword ? 
                                        <EyeOff className="h-4 w-4 text-gray-500" /> : 
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
                            <Label className="text-sm sm:text-base font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2] pr-10"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showConfirmPassword ? 
                                        <EyeOff className="h-4 w-4 text-gray-500" /> : 
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    }
                                </button>
                            </div>
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