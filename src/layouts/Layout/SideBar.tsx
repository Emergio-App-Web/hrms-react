import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[275px] bg-[#000000E0] text-white p-4 h-screen">
      <h2 className="text-lg font-bold">Sidebar</h2>
      <ul>
        <li className="mt-2">
          <Link to="/">Dashbord</Link>
        </li>
        <li className="mt-2">
          <Link to="/home">Home</Link>
        </li>

        <li className="mt-2">Item 3</li>
      </ul>
    </div>
  );
};

export default SideBar;
