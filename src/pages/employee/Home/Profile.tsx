import { MdOutlineModeEdit } from "react-icons/md";

const Profile = () => {
  return (
    <div className="flex-grow w-[646px] h-[695px] bg-[#FBFFF2] rounded-2xl my-10 px-10 py-5">
      {/* image and name */}
      <div className="flex justify-around">
        <div className="relative">
          <img
            src="/demoimg.png"
            className="w-[170px] h-[170px] rounded-full"
            alt=""
          />
          <div className="absolute bg-[#DDFF8F] p-3 rounded-full bottom-4 -right-5">
            <MdOutlineModeEdit className="text-[25px] text-[#979797]" />
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <h1 className="text-[24px] font-bold text-[#4F4F4F] font-montserrat">
            Mr vishak ps{" "}
            <span className="text-[19px] font-normal">(UIUX01274)</span>
          </h1>
          <p className="text-[19px] font-montserrat">
            Associate UI/ UX Designer
          </p>
          
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-10">
        <p className="flex justify-center text-[24px] font-semibold font-montserrat text-[#4F4F4F]">
          Details
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-y-4 ">
          <dt className="text-[#4F4F4F] font-bold text-[18px]">Code</dt>
          <dd className="break-all sm:break-normal text-[16px]">UIUX01274</dd>

          <dt className="text-[#4F4F4F] font-bold text-[18px]">Email</dt>
          <dd className="break-all sm:break-normal text-[16px]">
            Visakhps69@gmail.com
          </dd>

          <dt className="text-[#4F4F4F] font-bold text-[18px]">Phone</dt>
          <dd className="break-all sm:break-normal text-[16px]">
            +91 8590329953
          </dd>

          <dt className="text-[#4F4F4F] font-bold text-[18px]">
            Reporting manager
          </dt>
          <dd className="break-all sm:break-normal text-[16px]">Benin John</dd>

          <dt className="text-[#4F4F4F] font-bold text-[18px]">
            Date of Joining
          </dt>
          <dd className="break-all sm:break-normal text-[16px]">Nov 23,2024</dd>
        </dl>
        {/* Details To be Completed */}
        <div className="flex flex-col gap-5">
          <p className="flex justify-start text-[24px] font-semibold font-montserrat text-[#4F4F4F]">
            Details To be Completed
          </p>
          <div className="grid gap-y-4 text-[18px] ">
            <p className="text-[#4F4F4F] font-bold">Documents</p>
            <p className="text-[#4F4F4F] font-bold">Education Documents</p>
            <p className="text-[#4F4F4F] font-bold">Family Details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
