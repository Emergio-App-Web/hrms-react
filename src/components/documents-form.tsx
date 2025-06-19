import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./date-picker";

interface DocumentSection {
  title: string;
  requiresDates: boolean;
  requiresIdentification: boolean;
  requiresFileUpload: boolean;
  page: number;
}

interface FileState {
    [key: string]: string;
  }

const documents: DocumentSection[] = [
  {
    title: "Aadhar Card",
    requiresDates: true,
    requiresIdentification: true,
    requiresFileUpload: true,
    page: 1
  },
  {
    title: "Driving License",
    requiresDates: true,
    requiresIdentification: true,
    requiresFileUpload: true,
    page: 1
  },
  {
    title: "HR Handbook Acknowledgement",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 1
  },
  {
    title: "Pan Card",
    requiresDates: true,
    requiresIdentification: true,
    requiresFileUpload: true,
    page: 1
  },
  {
    title: "Passport",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "Self Declaration Acknowledgement",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "DGV Consent Acknowledgement",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "Emi Consent Acknowledgment",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "NDA Acknowledgemnt",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "Signed Offer Letter",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "Workspace Asset Provison Aggrement Acknowledgement",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  },
  {
    title: "Documents",
    requiresDates: false,
    requiresIdentification: false,
    requiresFileUpload: true,
    page: 2
  }
];

export default function DocumentUploadForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<FileState>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docTitle: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [docTitle]: file.name
      }));
    }
  };

  const handleNext = () => {
    setCurrentPage(2);
  };

  const handlePrevious = () => {
    setCurrentPage(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const currentDocuments = documents.filter(doc => doc.page === currentPage);

  return (
    <>
        <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Documents'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
          <CardContent className="p-6">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {currentDocuments.map((doc, index) => (
                <div key={index} className="grid md:grid-cols-[200px,1fr] gap-4 items-start">
                  <Label className="text-base font-medium mt-2">{doc.title}</Label>
                  <div className="space-y-4">
                    {doc.requiresFileUpload && (
                      <div className="grid w-full items-center gap-1.5">
                      <Input
                        type="file"
                        id={`file-upload-${index}`}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, doc.title)}
                      />
                      <Label
                        htmlFor={`file-upload-${index}`}
                        className="bg-[#f0f0f0] text-center text-xs font-semibold text-[#1F1F1FB2] cursor-pointer h-9 w-full rounded-md border border-input px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex items-center justify-center"
                      >
                        {selectedFiles[doc.title] || "Choose File and Upload"}
                      </Label>
                    </div>
                    )}
                    {doc.requiresDates && (
                      <>
                        <DatePicker label="Issue Date" />
                        <DatePicker label="Expire Date" />
                      </>
                    )}
                    {doc.requiresIdentification && (
                      <Input 
                        type="text" 
                        placeholder="Identification" 
                        className="bg-[#f0f0f0] text-center text-xs font-semibold text-[#1F1F1FB2]" 
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-4">
                {currentPage === 2 && (
                  <Button 
                    type="button"
                    onClick={handlePrevious}
                    className="rounded-full px-5 lg:px-10 bg-black text-white hover:bg-gray-800"
                  >
                    Previous
                  </Button>
                )}
                {currentPage === 1 ? (
                  <Button 
                    type="button"
                    onClick={handleNext}
                    className="rounded-full px-5 lg:px-10 bg-black text-white hover:bg-gray-800"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="rounded-full px-5 lg:px-10 bg-[#ddff8f] text-black hover:bg-[#d0f970] hover:text-black"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
    </>
  );
}