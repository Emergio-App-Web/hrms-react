import { Outlet } from "react-router-dom";
import SideBar from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import AdminFooterNav from "@/components/app-bottomnavbar-admin";

export const AdminLayout = () => {
    return (
        <div className="flex">
            <SideBar />

            <div className="flex flex-col w-full ">
                <div className="w-full">
                    <Navbar />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4">
                    <div className="flex flex-col gap-4">
                        {/* Profile Content */}
                        <div className="bg-white rounded-xl mt-5">
                            <Outlet />
                        </div>

                        {/* Bottom Navigation */}
                        <div className="px-6">
                            <AdminFooterNav />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
