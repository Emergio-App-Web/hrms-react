import { Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { getUserBasic } from '@/services/user/apiMethods';

interface UserBasicResponse {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  employee_code: string;
  reporting_manager: {
    name: string;
  };
  designation: {
    title: string;
  };
  date_of_joining: string;
}

// Define the API response structure
interface ApiResponse {
  status: number;
  data: UserBasicResponse;
  message?: string;
}

interface ProfileUploadProps {
    existingImage?: string;
    serverUrl?: string;
    onImageChange?: (file: File) => void;
    defaultImage?: string;
}

const Profile = ({
    existingImage = "",
    serverUrl = "",
    onImageChange,
    defaultImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}: ProfileUploadProps) => {
    const [preview, setPreview] = useState<string>("");
    const [userBasicData, setUserBasicData] = useState<UserBasicResponse | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Notify parent component
            onImageChange?.(file);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const displayImage = preview ||
        (existingImage ? `${serverUrl}/uploads/${existingImage}` : defaultImage);

    const fetchUserBasicData = async () => {
        try {
            const response = await getUserBasic() as ApiResponse;
            console.log(response.data);

            if (response && response.status === 200) {
                setUserBasicData(response.data);
            }
        } catch (err: unknown) {
            console.error("Error fetching user basic data:", err);
            toast.error("Failed to fetch user data");
        }
    }

    useEffect(() => {
        fetchUserBasicData();
    }, []);

    return (
        <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Profile'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
            <CardContent className="p-6 space-y-10">
                {/* Profile Header */}
                <div className="flex flex-col space-x-8 md:flex-row items-center gap-6">
                    <div className="relative w-fit">
                        <img
                            src={displayImage}
                            alt="Profile"
                            className="w-[170px] h-[170px] rounded-full object-cover"
                        />
                        <label className="absolute bottom-4 -right-5 cursor-pointer">
                            <Input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div className="bg-[#DDFF8F] p-3 rounded-full hover:bg-[#d0f970] transition-colors">
                                <Pencil className="w-6 h-6 text-[#979797]" />
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-col text-center md:text-left">
                        <h1 className="text-2xl font-bold text-[#4F4F4F] font-montserrat">
                            {userBasicData?.user?.name || "Loading..."} 
                            {userBasicData?.employee_code && (
                                <span className="text-lg font-normal">({userBasicData.employee_code})</span>
                            )}
                        </h1>
                        <p className="text-lg font-montserrat">
                            {userBasicData?.designation?.title || "Loading..."}
                        </p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center font-montserrat text-[#4F4F4F]">
                        Details
                    </h2>
                    <div className="space-y-4">
                        {[
                            { 
                                label: "Code", 
                                value: userBasicData?.employee_code || "Not assigned" 
                            },
                            { 
                                label: "Email", 
                                value: userBasicData?.user?.email || "Loading..." 
                            },
                            { 
                                label: "Phone", 
                                value: userBasicData?.user?.phone || "Loading..." 
                            },
                            { 
                                label: "Reporting manager", 
                                value: userBasicData?.reporting_manager?.name || "Not assigned" 
                            },
                            { 
                                label: "Date of Joining", 
                                value: userBasicData?.date_of_joining 
                                    ? new Date(userBasicData.date_of_joining).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                    : "Loading..." 
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:gap-4">
                                <dt className="text-[#4F4F4F] font-bold text-lg md:w-[200px] shrink-0">{item.label}</dt>
                                <dd className="text-base font-medium break-words">{item.value}</dd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details To be Completed Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold font-montserrat text-[#4F4F4F]">
                        Details To be Completed
                    </h2>
                    <div className="space-y-4">
                        {["Documents", "Education Documents", "Family Details"].map((item, index) => (
                            <p key={index} className="text-lg text-[#4F4F4F] font-bold">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;