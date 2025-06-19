import { Card, CardContent } from "@/components/ui/card";

const Education = () => {
  return (
    <div>
      <Card  className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:absolute before:content-['Educational_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl  before:-top-14">
        <CardContent className="p-5">
          <form action="" className="flex flex-col gap-3 ">

                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center "> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">Degree</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">Specialization</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">College/School</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">University</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">Year of Passing</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">Percentage / CGPA</label>
                    <input type="text" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center"> 
                    <label htmlFor="" className="text-[14px] font-montserrat font-bold">Upload Document</label>
                    <input type="file" name="" id="" className="bg-[#F0F0F0] p-2 rounded-xl" />
                </div>

          </form>
        </CardContent>
      </Card>
      <div className="flex   justify-center gap-10 items-center my-10 text-[14px]">
              <button className="bg-black px-5 py-2 text-white rounded-3xl font-semibold">
                Add Details
              </button>
              <button className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold">
                Reset
              </button>
            </div>

    </div>
  );
};

export default Education;
