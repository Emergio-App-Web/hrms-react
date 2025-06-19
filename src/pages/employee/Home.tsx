import { Outlet } from "react-router-dom";
import HomeFooter from "../../layouts/Layout/HomeFooter";
import { HomeHeader } from "../../layouts/Layout/HomeHeader";


const Home = () => {
  return (
    <div className=" p-5 md:p-10 flex flex-col min-h-screen gap-5">
      <div>
        <HomeHeader />
      </div>

      <div className="mt-20" >
        <Outlet/>
      </div>

      <div className="pb-5">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
