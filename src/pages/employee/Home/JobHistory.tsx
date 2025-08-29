import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { getJobHistory, postJobHistory } from "@/services/user/apiMethods";

interface JobHistory {
  employee?: number;
  employer?: string;
  job_title?: string;
  employee_code?: string;
  joining_date?: string;
  relieving_date?: string;
  tenure?: string;
  last_CTC?: string;
  reason?: string;
  document?: string;
}

interface JobHistoryRecord {
  employee: number;
  employer: string;
  job_title: string;
  employee_code: string;
  joining_date: string;
  relieving_date: string;
  tenure: string;
  last_CTC: string;
  reason: string;
  document: string;
}

export default function EmploymentForm() {
  const [jobHistoryRecords, setJobHistoryRecords] = useState<JobHistoryRecord[]>([]);
  const [jobHistory, setJobHistory] = useState<JobHistory>({}); // Added missing state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchJobHistory();
  }, []);

  const fetchJobHistory = async () => {
    try {
      const response: any = await getJobHistory();
      if (response.status === 200 && response.data) {
        setJobHistoryRecords(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching job history:", err);
      toast.error("Failed to fetch job history");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a FormData object to send multipart/form-data
      const formData = new FormData();

      // Send single job history object (not array)
      formData.append("data", JSON.stringify(jobHistory));

      if (selectedFile) {
        formData.append("document", selectedFile);
      }

      // Make the API call with the FormData object
      const response: any = await postJobHistory(formData);

      if (response.status === 200) {
        toast.success("Job history added successfully");
        // Reset the form after successful submission
        setJobHistory({});
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('document') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        // Re-fetch the job history to update the table
        fetchJobHistory();
      }
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit form");
    }
  };

  const handleReset = () => {
    setJobHistory({});
    setSelectedFile(null);
    const fileInput = document.getElementById('document') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="md:p-8 flex flex-col gap-10">
      <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Job_History_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 max-w-3xl mx-auto p-6 bg-[#fdfff2] rounded-lg text-[14px]">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="employee" className="font-medium">
                  Employee
                </label>
                <input
                  type="number"
                  id="employee"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.employee || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, employee: Number(e.target.value) })
                  }
                />
              </div>

              {/* Employee Code */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="employeeCode" className="font-medium">
                  Employee Code
                </label>
                <input
                  type="text"
                  id="employeeCode"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.employee_code || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, employee_code: e.target.value })
                  }
                />
              </div>

              {/* Employer */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="employer" className="font-medium">
                  Employer
                </label>
                <input
                  type="text"
                  id="employer"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.employer || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, employer: e.target.value })
                  }
                />
              </div>

              {/* Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="jobTitle" className="font-medium">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.job_title || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, job_title: e.target.value })
                  }
                />
              </div>

              {/* Tenure */}
              <div className="grid grid-cols-1 md:grid-cols-[700px_1fr] items-center gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-5 items-center">
                    <label htmlFor="joining_date" className="font-medium">Joining Date</label>
                    <input
                      type="date"
                      id="joining_date"
                      className="px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={jobHistory?.joining_date || ''}
                      onChange={(e) =>
                        setJobHistory({ ...jobHistory, joining_date: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-5 items-center">
                    <label htmlFor="relieving_date" className="font-medium">Relieving Date</label>
                    <input
                      type="date"
                      id="relieving_date"
                      className="px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={jobHistory?.relieving_date || ''}
                      onChange={(e) =>
                        setJobHistory({ ...jobHistory, relieving_date: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Tenure Display */}
              {/* <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="tenure" className="font-medium">
                  Tenure
                </label>
                <input
                  type="text"
                  id="tenure"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.tenure || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, tenure: e.target.value })
                  }
                />
              </div> */}

              {/* Last CTC */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="lastCtc" className="font-medium">
                  Last CTC
                </label>
                <input
                  type="text"
                  id="lastCtc"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.last_CTC || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, last_CTC: e.target.value })
                  }
                />
              </div>

              {/* Reason For Leaving */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <label htmlFor="reasonForLeaving" className="font-medium pt-2">
                  Reason For Leaving
                </label>
                <textarea
                  id="reasonForLeaving"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobHistory?.reason || ''}
                  onChange={(e) =>
                    setJobHistory({ ...jobHistory, reason: e.target.value })
                  }
                />
              </div>

              {/* Upload Document */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label htmlFor="document" className="font-medium">
                  Upload Document
                </label>
                <input
                  name="document"
                  type="file"
                  id="document"
                  className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleFileChange}
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
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">
                    Employer
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">
                    Employee Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm">
                    Relieving Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">
                    Last CTC
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm hidden sm:table-cell">
                    Reason For Leaving
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobHistoryRecords.length > 0 ? (
                  jobHistoryRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm sm:text-base">
                        {record.employer}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base">
                        {record.job_title}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base">
                        {record.employee_code}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base">
                        {record.joining_date}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base">
                        {record.relieving_date}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                        {record.last_CTC}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base hidden sm:table-cell">
                        {record.reason}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No job history records found
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