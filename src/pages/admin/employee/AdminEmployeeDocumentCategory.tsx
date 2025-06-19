import { useState } from "react";

type DocumentCategory = {
  title: string;
  module: string;
  document: string;
  expiry: string;
  issue: string;
  mandatory: string;
  identification: string;
  toBeUploadedBy: string;
  updatedBy: string;
};

const AdminEmployeeDocumentCategory = () => {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [description, setDescription] = useState("");
  const [noOfDocuments, setNoOfDocuments] = useState("");
  const [applicableTo, setApplicableTo] = useState("");
  const [expiryDate, setExpiryDate] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [identification, setIdentification] = useState(false);
  const [issueDate, setIssueDate] = useState(false);

  const [categories, setCategories] = useState<DocumentCategory[]>([
    {
      title: "Signed offer Letter",
      module: "Generic",
      document: "1",
      expiry: "No",
      issue: "No",
      mandatory: "No",
      identification: "No",
      toBeUploadedBy: "Anyone",
      updatedBy: "Nisha chandran"
    },
    {
      title: "Signed offer Letter",
      module: "Generic",
      document: "1",
      expiry: "No",
      issue: "No",
      mandatory: "No",
      identification: "No",
      toBeUploadedBy: "Anyone",
      updatedBy: "Nisha chandran"
    },
    {
      title: "Signed offer Letter",
      module: "Generic",
      document: "1",
      expiry: "No",
      issue: "No",
      mandatory: "No",
      identification: "No",
      toBeUploadedBy: "Anyone",
      updatedBy: "Nisha chandran"
    },
    {
      title: "Signed offer Letter",
      module: "Generic",
      document: "1",
      expiry: "No",
      issue: "No",
      mandatory: "No",
      identification: "No",
      toBeUploadedBy: "Anyone",
      updatedBy: "Nisha chandran"
    },
    {
      title: "Signed offer Letter",
      module: "Generic",
      document: "1",
      expiry: "No",
      issue: "No",
      mandatory: "No",
      identification: "No",
      toBeUploadedBy: "Anyone",
      updatedBy: "Nisha chandran"
    }
  ]);

  const handleSubmit = () => {
    const newCategory: DocumentCategory = {
      title,
      module,
      document: noOfDocuments,
      expiry: expiryDate ? "Yes" : "No",
      issue: issueDate ? "Yes" : "No",
      mandatory: mandatory ? "Yes" : "No",
      identification: identification ? "Yes" : "No",
      toBeUploadedBy: applicableTo,
      updatedBy: "Current User" // This would be replaced with actual logged-in user
    };

    setCategories([...categories, newCategory]);

    // Reset form
    setTitle("");
    setModule("");
    setDescription("");
    setNoOfDocuments("");
    setApplicableTo("");
    setExpiryDate(false);
    setMandatory(false);
    setIdentification(false);
    setIssueDate(false);
  };

  return (
    <div className=" mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Add New Document Category</h2>

      <div className="bg-[#FBFFF2] p-5 rounded-xl mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Module</label>
            <input
              type="text"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">No of Documents</label>
            <input
              type="text"
              value={noOfDocuments}
              onChange={(e) => setNoOfDocuments(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Applicable To</label>
            <input
              type="text"
              value={applicableTo}
              onChange={(e) => setApplicableTo(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded"
            />
          </div>
          <div className="flex items-center mt-6 space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="expiryDate"
                checked={expiryDate}
                onChange={() => setExpiryDate(!expiryDate)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="expiryDate" className="text-sm">Expiry Date</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mandatory"
                checked={mandatory}
                onChange={() => setMandatory(!mandatory)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="mandatory" className="text-sm">Mandatory</label>
            </div>
          </div>
        </div>

        <div className="flex mb-4 ml-2">
          <div className="flex items-center mr-6">
            <input
              type="checkbox"
              id="identification"
              checked={identification}
              onChange={() => setIdentification(!identification)}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="identification" className="text-sm">Identification</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="issueDate"
              checked={issueDate}
              onChange={() => setIssueDate(!issueDate)}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="issueDate" className="text-sm">Issue Date</label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-1 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">
          Next
        </button>
      </div>

      <div className="overflow-x-auto bg-[#FBFFF2] rounded p-5">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Module</th>
              <th className="py-2 px-3">Document</th>
              <th className="py-2 px-3">Expiry</th>
              <th className="py-2 px-3">Issue</th>
              <th className="py-2 px-3">Mandatory</th>
              <th className="py-2 px-3">Identification</th>
              <th className="py-2 px-3">To Be Uploaded By</th>
              <th className="py-2 px-3">Updated By</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-3">{category.title}</td>
                <td className="py-2 px-3">{category.module}</td>
                <td className="py-2 px-3">{category.document}</td>
                <td className="py-2 px-3">{category.expiry}</td>
                <td className="py-2 px-3">{category.issue}</td>
                <td className="py-2 px-3">{category.mandatory}</td>
                <td className="py-2 px-3">{category.identification}</td>
                <td className="py-2 px-3">{category.toBeUploadedBy}</td>
                <td className="py-2 px-3">{category.updatedBy}</td>
                <td className="py-2 px-3 flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    ✏️
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    ↻
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};


export default AdminEmployeeDocumentCategory
