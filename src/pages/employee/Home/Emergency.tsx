import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {Search} from 'lucide-react'


const Emergency = () => {
    const [formData, setFormData] = useState({
        employer: "",
        jobTitle: "",
        employeeCode: "",
        tenureStart: "",
        tenureEnd: "", 
        lastCtc: "",
        reasonForLeaving: "",
        document: null,
      });
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
      };
    
      const data = [
        {
          employer: "raju",
          jobTitle: "father",
          employeeCode: "0/4/1889",
          tenure: "Business ",
          lastCtc: "987467893",
          reasonForLeaving: "mannath , malloor",
        }, 
        // Add more records as needed
      ];
    
      return (
        <div className="md:p-8 flex flex-col gap-10">
          <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Emergency_Contact_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6 max-w-3xl mx-auto p-6 bg-[#fdfff2] rounded-lg text-[14px]">
                
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="employer" className="font-medium">
                    Name
                    </label>
                    <input
                      type="text"
                      id="employer"
                      className="w-full px-4 py-2 bg-gray-50 rounded-md "
                      value={formData.employer}
                      onChange={(e) =>
                        setFormData({ ...formData, employer: e.target.value })
                      }
                    />
                  </div>
    
          
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="jobTitle" className="font-medium">
                    Relationship                    </label>
                    <select name="" id="" className="w-full px-4 py-2 bg-gray-50 rounded-md ">
                        <option value="">Father</option>
                        <option value="">Mother</option>
                        <option value="">Wife</option>
                        <option value="">Husbend</option>
                        <option value="">Son</option>
                        <option value="">Daughter</option>
                    </select>
                  </div>
    
                
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="employeeCode" className="font-medium">
                    Date of Birth
                    </label>
                    <input type="Date" className="w-full px-4 py-2 bg-gray-50 rounded-md " />
                  </div>
    
    
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="document" className="font-medium">
                    Occupation
                    </label>
                   <input type="text" name="" id="" className="w-full px-4 py-2 bg-gray-50 rounded-md " />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="document" className="font-medium">
                    Phone
                    </label>
                    <input type="text" name="" id="" className="w-full px-4 py-2 bg-gray-50 rounded-md " />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label htmlFor="document" className="font-medium">
                    Address
                    </label>
                    <textarea name="" id="" className="w-full px-4 py-2 bg-gray-50 rounded-md "></textarea>
                  </div>
                </div>
                <div className="flex   justify-center gap-10 items-center my-10 text-[14px]">
                  <button className="bg-black px-5 py-2 text-white rounded-3xl font-semibold">
                    Add Details
                  </button>
                  <button className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold">
                    Reset
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
    
          {/* Table Section header */}
    
          <div className="w-full max-w-7xl mx-auto md:p-4 ">
            <div className=" rounded-b-lg bg-[#FBFFF2] pb-2">
    
              {/* head */}
              <div className="bg-[#e8ffa8] p-4 rounded-2xl  md:rounded-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                
                {/* show */}
                <div className="flex items-center gap-2">
                  <span className="font-bold">Show</span>
                  <select className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-sm sm:text-base">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="font-bold">Entries</span>
                </div>
                
                {/* search */}
                <div className="flex items-center gap-2">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="px-4 py-2 rounded-xl border border-gray-300 min-w-[150px] sm:min-w-[250px] text-sm sm:text-base"
                  />
                  <button className="px-4 py-2 bg-[#e8ffa8] hidden sm:block rounded hover:bg-[#dff59e] font-bold text-sm sm:text-base">
                    Search
                  </button>
                  <Search className="sm:hidden"/>
                </div>
              </div>
    
              {/* Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-xs sm:text-sm">
                      Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs sm:text-sm">
                      Relationship
                      </th>
                      <th className="px-6 py-3 text-left text-xs sm:text-sm">
                      Date of Birth
                      </th>
                      <th className="px-6 py-3 text-left text-xs sm:text-sm">
                      Occupation
                      </th>
                      <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">
                      Phone number
                      </th>
                      <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">
                      Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((record, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm sm:text-base">
                          {record.employer}
                        </td>
                        <td className="px-6 py-4 text-sm sm:text-base">
                          {record.jobTitle}
                        </td>
                        <td className="px-6 py-4 text-sm sm:text-base">
                          {record.employeeCode}
                        </td>
                        <td className="px-6 py-4 text-sm sm:text-base">
                          {record.tenure}
                        </td>
                        <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                          {record.lastCtc}
                        </td>
                        <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                          {record.reasonForLeaving}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    
              {/* Pagination */}
              <div className="w-full flex justify-end gap-5 mt-4  font-montserrat font-bold text-[10px] sm:text-xs ">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700">
                  Previous
                </button>
                <button className="px-4 py-2 bg-[#e8ffa8] rounded-full hover:bg-[#dff59e] mr-2">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Emergency
