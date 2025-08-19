import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import EmployeeFooter from "@/components/app-bottomnavbar";
import EmployeeSidebar from "@/components/app-sidebar-employee";
import RightBar from "@/components/app-rightsidebar";

export const EmployeeLayout = () => {
    const location = window.location.pathname;
    return (
        <div className="flex">
            <EmployeeSidebar />

            <div className="flex flex-col w-full ">
                <div className="w-full">
                    <Navbar />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4">
                    <div className="flex flex-col gap-4 p-4">
                        {/*Content */}
                        <div className="bg-white rounded-xl mt-14">
                            {/* <h1 className="text-3xl font-bold">Employee Dashboard</h1> */}
                            <Outlet />
                            {/* <h1>Footer</h1> */}
                        </div>

                    </div>
                    {/* Right Sidebar */}
                    {location !== "/dashboard" && location !== "/" &&
                        (<aside className="bg-white rounded-xl mt-16 mr-2">
                            <RightBar />
                        </aside>)
                    }

                    {/* Bottom Navigation */}
                    <div className="px-6">
                        <EmployeeFooter />
                    </div>
                </div>
            </div>
        </div>
    );
};
