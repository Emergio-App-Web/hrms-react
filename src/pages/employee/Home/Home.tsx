import { Outlet } from "react-router-dom"
import RightBar from "@/components/app-rightsidebar"
import HomeFooter from "@/components/app-bottomnavbar"
import SideBar from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"




export const Home = () => {
  return (
  <div className="flex">
    <SideBar />
    <div className="">
    <Navbar />


    <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4">
      <div className="flex flex-col gap-4">
        {/* Profile Content */}
        <div className="bg-white rounded-xl mt-16">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        {/* <HomeFooter /> */}
      </div>

      {/* Right Sidebar */}
      <aside className="bg-white rounded-xl mt-16 mr-2">
        <RightBar />
      </aside>
        {/* <ProfileBottomNav /> */}
        <HomeFooter />
    </div>
    </div>
    </div>
  );
};
