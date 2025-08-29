import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { getEmergencyDetails, postEmergencyDetails } from "@/services/user/apiMethods";
// import { Search } from 'lucide-react';

// Define the interfaces based on the provided API structure
interface EmergencyRecord {
  id: number;
  employee: number;
  name: string;
  relationship: string;
  dob: string;
  occupation: string;
  phone_number: string;
  address: { [key: string]: any };
}

interface EmergencyFormState {
  employee?: number;
  name?: string;
  relationship?: string;
  dob?: string;
  occupation?: string;
  phone_number?: string;
  address?: { [key: string]: any };
}

export default function Emergency() {
  const [emergencyRecords, setEmergencyRecords] = useState<EmergencyRecord[]>([]);
  const [emergencyForm, setEmergencyForm] = useState<EmergencyFormState>({});

  useEffect(() => {
    fetchEmergencyDetails();
  }, []);

  const fetchEmergencyDetails = async () => {
    try {
      const response: any = await getEmergencyDetails();
      if (response.status === 200 && response.data) {
        setEmergencyRecords(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching emergency details:", err);
      toast.error("Failed to fetch emergency details");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "employee") {
      setEmergencyForm((prev) => ({ ...prev, [id]: Number(value) }));
    } else if (id === "address") {
      // Assuming a single text input for a simple address object
      setEmergencyForm((prev) => ({ ...prev, address: { street: value } }));
    } else {
      setEmergencyForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await postEmergencyDetails(emergencyForm);
      if (response.status === 200) {
        toast.success("Emergency details added successfully");
        setEmergencyForm({});
        fetchEmergencyDetails();
      }
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit form");
    }
  };

  const handleReset = () => {
    setEmergencyForm({});
  };

  return (
    <div className="md:p-8 flex flex-col gap-10">
      <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Emergency_Contact_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 max-w-3xl mx-auto p-6 bg-[#fdfff2] rounded-lg text-[14px]">
              {/* Employee ID */}
              {/* <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="employee" className="font-medium">Employee ID</label>
                <input
                  type="number"
                  id="employee"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.employee || ''}
                  onChange={handleChange}
                />
              </div> */}
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="name" className="font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.name || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Relationship */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="relationship" className="font-medium">Relationship</label>
                <input
                  type="text"
                  id="relationship"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.relationship || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Date of Birth */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="dob" className="font-medium">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.dob || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Occupation */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="occupation" className="font-medium">Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.occupation || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="phone_number" className="font-medium">Phone</label>
                <input
                  type="text"
                  id="phone_number"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.phone_number || ''}
                  onChange={handleChange}
                />
              </div>
              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="address" className="font-medium">Address</label>
                <textarea
                  id="address"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md"
                  value={emergencyForm.address?.street || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center gap-10 items-center my-10 text-[14px]">
              <button type="submit" className="bg-black px-5 py-2 text-white rounded-3xl font-semibold">
                Add Details
              </button>
              <button type="button" onClick={handleReset} className="bg-[#DDFF8F] px-5 py-2 text-black rounded-3xl font-semibold">
                Reset
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Table Section */}
      <div className="w-full max-w-7xl mx-auto md:p-4">
        <div className="rounded-b-lg bg-[#FBFFF2] pb-2">
          {/* Header */}
          <div className="bg-[#e8ffa8] p-4 rounded-2xl md:rounded-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            {/* Show entries */}
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
            {/* <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Search..."
                className="px-4 py-2 rounded-xl border border-gray-300 min-w-[150px] sm:min-w-[250px] text-sm sm:text-base"
              />
              <button className="px-4 py-2 bg-[#e8ffa8] hidden sm:block rounded hover:bg-[#dff59e] font-bold text-sm sm:text-base">
                Search
              </button>
              <Search className="sm:hidden" />
            </div> */}
          </div>
          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Name</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Relationship</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">DOB</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Occupation</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Address</th>
                </tr>
              </thead>
              <tbody>
                {emergencyRecords.length > 0 ? (
                  emergencyRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm sm:text-base">{record.name}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.relationship}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.dob}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.occupation}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.phone_number}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                        {record.address ? record.address.street : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No emergency contact records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="w-full flex justify-end gap-5 mt-4 font-montserrat font-bold text-[10px] sm:text-xs">
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