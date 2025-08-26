import { Navigate, RouteObject } from "react-router-dom";
import DocumentUploadForm from "@/pages/employee/Home/documents-form";
import BankForm from "@/pages/employee/Home/bank-form";
import SeparationForm from "@/components/seperation-form";
import PasswordChangeForm from "@/components/password-form";
import ReferenceForm from "@/components/reference-form";
// import Profile from "@/components/Profile";
import DigitalBusinessCard from "@/pages/employee/Home/DigitalBusinessCard";
import PersonalDetails from "@/pages/employee/Home/PersonalDetails";
import Skills from "@/pages/employee/Home/Skills";
import EmploymentForm from "@/pages/employee/Home/JobHistory";
import Education from "@/pages/employee/Home/Education";
import Certification from "@/pages/employee/Home/Certification";
import Family from "@/pages/employee/Home/Family";
import Emergency from "@/pages/employee/Home/Emergency";
import Disciplinary from "@/pages/employee/Home/Disciplinary";
import { EmployeeLayout } from "@/layouts/employee/EmployeeLayout";
import EmployeeDashboard from "@/pages/employee/Dashboard/Dashboard";
import EmployeeAttendance from "@/pages/employee/attendance/EmployeeAttendance";
import Profile from "@/pages/employee/Home/Profile";

export const employeeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <EmployeeLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <EmployeeDashboard /> }
    ]
  },
  {
    path: "/home",
    element: <EmployeeLayout />,
    children: [
      { index: true, element: <Navigate to="profile" replace /> },
      { path: "profile", element: <Profile /> },
      { path: "digitalbusinesscard", element: <DigitalBusinessCard /> },
      { path: "details", element: <PersonalDetails /> },
      { path: "skills", element: <Skills /> },
      { path: "documents", element: <DocumentUploadForm /> },
      { path: "bank", element: <BankForm /> },
      { path: "jobhistory", element: <EmploymentForm /> },
      { path: "seperationrequest", element: <SeparationForm /> },
      { path: "education", element: <Education /> },
      { path: "certification", element: <Certification /> },
      { path: "family", element: <Family /> },
      { path: "emergency", element: <Emergency /> },
      { path: "disciplinary", element: <Disciplinary /> },
      { path: "changepassword", element: <PasswordChangeForm /> },
      { path: "reference", element: <ReferenceForm /> }
    ]
  },
  {
    path: "/attendance",
    element: <EmployeeLayout />,
    children: [
      { index: true, element: <Navigate to="summary" replace /> },
      { path: "summary", element: <EmployeeAttendance /> }
    ]
  }
];
