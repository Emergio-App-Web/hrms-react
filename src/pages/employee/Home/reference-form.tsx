import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { getReferences, postReferences } from "@/services/user/apiMethods";

interface ReferenceRecord {
  id: number;
  name: string;
  job_title: string;
  company: string;
  email: string;
  mobile_no: string;
}

interface ReferenceFormState {
  name?: string;
  job_title?: string;
  company?: string;
  email?: string;
  mobile_no?: string;
}

export default function ReferenceForm() {
  const [referenceRecords, setReferenceRecords] = useState<ReferenceRecord[]>([]);
  const [formData, setFormData] = useState<ReferenceFormState>({});

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response: any = await getReferences();
      if (response.status === 200 && response.data) {
        setReferenceRecords(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching references:", err);
      toast.error("Failed to fetch references");
    }
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await postReferences(formData);
      if (response.status === 200) {
        toast.success("Reference added successfully");
        setFormData({});
        fetchReferences();
      }
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit form");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <Card
        className="relative w-full max-w-3xl mx-auto bg-[#fbfff2] rounded-3xl before:content-[var(--title)] before:text-[#4F4F4F] before:font-semibold before:text-xl sm:before:text-2xl before:absolute before:-top-14 before:left-4 sm:before:left-0"
        style={{ "--title": "'Reference'" } as React.CSSProperties}
      >
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <Label className="text-sm sm:text-base font-medium">Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <Label className="text-sm sm:text-base font-medium">Job Title</Label>
              <Input
                type="text"
                name="job_title"
                value={formData.job_title || ''}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <Label className="text-sm sm:text-base font-medium">Company</Label>
              <Input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <Label className="text-sm sm:text-base font-medium">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <Label className="text-sm sm:text-base font-medium">Mobile Number</Label>
              <Input
                type="tel"
                name="mobile_no"
                value={formData.mobile_no || ''}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm text-[#1F1F1FB2]"
              />
            </div>
            <div className="flex items-center justify-center gap-4 pt-4 px-4">
              <Button
                type="submit"
                className="w-full sm:w-auto rounded-full px-8 py-2 bg-black text-white hover:bg-gray-800"
              >
                Add Details
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto rounded-full px-8 py-2 bg-[#d9ff99] text-black hover:bg-[#c8eb8e]"
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Table Section */}
      <div className="w-full max-w-7xl mx-auto md:p-4">
        <div className="rounded-b-lg bg-[#FBFFF2] pb-2">
          {/* Header */}
          <div className="bg-[#e8ffa8] p-4 rounded-2xl md:rounded-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">Show</span>
              <select className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-sm sm:text-base">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="font-bold">Entries</span>
            </div>
            {/* Search, if needed */}
          </div>
          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Name</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Company</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Email</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {referenceRecords.length > 0 ? (
                  referenceRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm sm:text-base">{record.name}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.job_title}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.company}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.email}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.mobile_no}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No reference records found
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