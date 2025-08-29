import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { getEducation, postEducation } from "@/services/user/apiMethods";

interface EducationRecord {
  id: number;
  employee: number;
  degree: string;
  specialization: string;
  college: string;
  university: string;
  year_of_passing: string;
  gpa: string;
  document: string;
}

interface EducationFormState {
  employee?: number;
  degree?: string;
  specialization?: string;
  college?: string;
  university?: string;
  year_of_passing?: string;
  gpa?: string;
  document?: string;
}

export default function Education() {
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
  const [educationForm, setEducationForm] = useState<EducationFormState>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchEducationHistory();
  }, []);

  const fetchEducationHistory = async () => {
    try {
      const response: any = await getEducation();
      if (response.status === 200 && response.data) {
        setEducationRecords(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching education history:", err);
      toast.error("Failed to fetch education history");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setEducationForm((prev) => ({
      ...prev,
      [id]: id === "employee" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // The 'data' field is a JSON object stringified
    formData.append("data", JSON.stringify(educationForm));

   
    if (selectedFile) {
      formData.append("document", selectedFile);
    } else {
      
      formData.append("document", new Blob([]), "");
    }

    const response: any = await postEducation(formData);

    console.log(formData.get("data"));
    console.log(formData.get("document"));

    if (response.status === 200) {
      toast.success("Education details added successfully");
      setEducationForm({});
      setSelectedFile(null);
      const fileInput = document.getElementById('document') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      fetchEducationHistory();
    }
  } catch (err: unknown) {
    console.error("Error submitting form:", err);
    toast.error("Failed to submit form");
  }
};

  const handleReset = () => {
    setEducationForm({});
    setSelectedFile(null);
    const fileInput = document.getElementById('document') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="md:p-8 flex flex-col gap-10">
      <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:absolute before:content-['Educational_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:-top-14">
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Employee ID */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="employee" className="text-[14px] font-montserrat font-bold">Employee ID</label>
              <input
                type="number"
                id="employee"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.employee || ''}
                onChange={handleChange}
              />
            </div> */}
            {/* Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="degree" className="text-[14px] font-montserrat font-bold">Degree</label>
              <input
                type="text"
                id="degree"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.degree || ''}
                onChange={handleChange}
              />
            </div>
            {/* Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="specialization" className="text-[14px] font-montserrat font-bold">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.specialization || ''}
                onChange={handleChange}
              />
            </div>
            {/* College/School */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="college" className="text-[14px] font-montserrat font-bold">College/School</label>
              <input
                type="text"
                id="college"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.college || ''}
                onChange={handleChange}
              />
            </div>
            {/* University */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="university" className="text-[14px] font-montserrat font-bold">University</label>
              <input
                type="text"
                id="university"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.university || ''}
                onChange={handleChange}
              />
            </div>
            {/* Year of Passing */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="year_of_passing" className="text-[14px] font-montserrat font-bold">Year of Passing</label>
              <input
                type="text"
                id="year_of_passing"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.year_of_passing || ''}
                onChange={handleChange}
              />
            </div>
            {/* GPA */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="gpa" className="text-[14px] font-montserrat font-bold">Percentage / CGPA</label>
              <input
                type="text"
                id="gpa"
                className="bg-[#F0F0F0] p-2 rounded-xl"
                value={educationForm.gpa || ''}
                onChange={handleChange}
              />
            </div>
            {/* Upload Document */}
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-center">
              <label htmlFor="document" className="text-[14px] font-montserrat font-bold">Upload Document</label>
              <input
                name="document"
                type="file"
                id="document"
                className="bg-[#F0F0F0] p-2 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
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
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Degree</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">College</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">University</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">Year of Passing</th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">GPA</th>
                </tr>
              </thead>
              <tbody>
                {educationRecords.length > 0 ? (
                  educationRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm sm:text-base">{record.degree}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.specialization}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.college}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.university}</td>
                      <td className="px-6 py-4 text-sm sm:text-base">{record.year_of_passing}</td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">{record.gpa}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No education records found
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