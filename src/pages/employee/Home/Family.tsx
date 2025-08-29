import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { getFamilyDetails, postFamilyDetails } from "@/services/user/apiMethods";

// Define the interface for a single family record based on the API structure
interface FamilyRecord {
  id: number;
  employee: number;
  name: string;
  relationship: string;
  date_of_birth: string;
  occupation: string;
  phone: string;
  address: { [key: string]: any }; // Use a generic object for the address
}

// Define the interface for the form state
interface FamilyFormState {
  employee?: number;
  name?: string;
  relationship?: string;
  date_of_birth?: string;
  occupation?: string;
  phone?: string;
  address?: { [key: string]: any };
}

export default function Family() {
  const [familyRecords, setFamilyRecords] = useState<FamilyRecord[]>([]);
  const [familyForm, setFamilyForm] = useState<FamilyFormState>({});

  useEffect(() => {
    fetchFamilyDetails();
  }, []);

  const fetchFamilyDetails = async () => {
    try {
      const response: any = await getFamilyDetails();
      if (response.status === 200 && response.data) {
        setFamilyRecords(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching family details:", err);
      toast.error("Failed to fetch family details");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Handle employee field as a number, and other fields as strings
    if (id === "employee") {
      setFamilyForm((prev) => ({ ...prev, [id]: Number(value) }));
    } else if (id === "address") {
      // Assuming a simple text input for address for this example
      // In a real application, this should be a structured object
      setFamilyForm((prev) => ({ ...prev, address: { street: value } }));
    } else {
      setFamilyForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // The API is application/json, so no need for FormData
      const response: any = await postFamilyDetails(familyForm);

      if (response.status === 200) {
        toast.success("Family details added successfully");
        setFamilyForm({});
        fetchFamilyDetails(); // Refresh the table
      }
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit form");
    }
  };

  const handleReset = () => {
    setFamilyForm({});
  };

  return (
    <div className="md:p-8 flex flex-col gap-10">
      <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:absolute before:content-['Family_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:-top-14">
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Employee ID - Assuming it's needed for the API */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="employee" className="text-[14px] font-montserrat font-bold">Employee ID</label>
              <input
                type="number"
                id="employee"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.employee || ''}
                onChange={handleChange}
              />
            </div> */}
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="name" className="text-[14px] font-montserrat font-bold">Name</label>
              <input
                type="text"
                id="name"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.name || ''}
                onChange={handleChange}
              />
            </div>
            {/* Relationship */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="relationship" className="text-[14px] font-montserrat font-bold">Relationship</label>
              <input
                type="text"
                id="relationship"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.relationship || ''}
                onChange={handleChange}
              />
            </div>
            {/* Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="date_of_birth" className="text-[14px] font-montserrat font-bold">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.date_of_birth || ''}
                onChange={handleChange}
              />
            </div>
            {/* Occupation */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="occupation" className="text-[14px] font-montserrat font-bold">Occupation</label>
              <input
                type="text"
                id="occupation"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.occupation || ''}
                onChange={handleChange}
              />
            </div>
            {/* Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="phone" className="text-[14px] font-montserrat font-bold">Phone</label>
              <input
                type="text"
                id="phone"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.phone || ''}
                onChange={handleChange}
              />
            </div>
            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="address" className="text-[14px] font-montserrat font-bold">Address</label>
              <textarea
                id="address"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={familyForm.address?.street || ''}
                onChange={handleChange}
              />
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
          </div>
          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Name</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Relationship</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Occupation</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Phone</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Address</th>
                </tr>
              </thead>
              <tbody>
                {familyRecords.length > 0 ? (
                  familyRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm sm:text-base">{record.name}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.relationship}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.date_of_birth}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.occupation}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.phone}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                        {record.address ? record.address.street : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No family records found
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