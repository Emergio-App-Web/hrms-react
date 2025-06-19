import { RouteObject } from "react-router-dom";
import { Home } from "@/pages/employee/Home/Home";
import Dashboard from "@/pages/employee/Dashboard/Dashboard";
import DocumentUploadForm from "@/components/documents-form";
import BankForm from "@/components/bank-form";
import SeparationForm from "@/components/seperation-form";
import PasswordChangeForm from "@/components/password-form";
import ReferenceForm from "@/components/reference-form";
import Profile from "@/components/Profile";
import DigitalBusinessCard from "@/pages/employee/DigitalBusinessCard";
import PersonalDetails from "@/pages/employee/PersonalDetails";
import Skills from "@/pages/employee/Skills";
import EmploymentForm from "@/pages/employee/JobHistory";
import Education from "@/pages/employee/Education";
import Certification from "@/pages/employee/Certification";
import Family from "@/pages/employee/Family";
import Emergency from "@/pages/employee/Emergency";
import Disciplinary from "@/pages/employee/Disciplinary";

export const employeeRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            { path: "", element: <Profile /> },
            { path: "digitalbusinesscard", element: <DigitalBusinessCard /> },
            { path: "details", element: <PersonalDetails /> },
            { path: "skills", element: <Skills /> },
            { path: "documents", element: <DocumentUploadForm /> },
            { path: "bank", element: <BankForm /> },
            { path: "jobhistory", element: <EmploymentForm /> }, //nveify
            { path: "seperationrequest", element: <SeparationForm /> },
            { path: "education", element: <Education /> },
            { path: "certification", element: <Certification /> },
            { path: "family", element: <Family /> },
            { path: "emergency", element: <Emergency /> },
            { path: "disciplinary", element: <Disciplinary /> },
            { path: "changepassword", element: <PasswordChangeForm /> },
            { path: "reference", element: <ReferenceForm /> },
        ],
    },
];
