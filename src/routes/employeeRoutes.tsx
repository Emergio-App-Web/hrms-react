import { Navigate, RouteObject } from "react-router-dom";
import { EmployeeLayout } from "@/layouts/employee/EmployeeLayout";

// Page component imports
import EmployeeDashboard from "@/pages/employee/Dashboard/Dashboard";
import Profile from "@/pages/employee/Home/Profile";
import DigitalBusinessCard from "@/pages/employee/Home/DigitalBusinessCard";
import PersonalDetails from "@/pages/employee/Home/PersonalDetails";
import Skills from "@/pages/employee/Home/Skills";
import DocumentUploadForm from "@/pages/employee/Home/documents-form";
import BankForm from "@/pages/employee/Home/bank-form";
import EmploymentForm from "@/pages/employee/Home/JobHistory";
import SeparationForm from "@/pages/employee/Home/seperation-form";
import Education from "@/pages/employee/Home/Education";
import Certification from "@/pages/employee/Home/Certification";
import Family from "@/pages/employee/Home/Family";
import Emergency from "@/pages/employee/Home/Emergency";
import Disciplinary from "@/pages/employee/Home/Disciplinary";
import PasswordChangeForm from "@/pages/employee/Home/password-form";
import ReferenceForm from "@/pages/employee/Home/reference-form";
import EmployeeAttendance from "@/pages/employee/attendance/EmployeeAttendance";
import AttendanceRequestForm from "@/pages/employee/attendance/AttendanceRequestForm";
import { UnderDevelopmentPage } from "@/pages/common/UnderDevelopmentPage";

export const employeeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <EmployeeLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      
      { 
        path: "dashboard", 
        element: <EmployeeDashboard /> 
      },
      
      {
        path: "home",
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
        path: "attendance",
        children: [
          { index: true, element: <Navigate to="summary" replace /> },
          { path: "summary", element: <EmployeeAttendance /> },
          { path: "request-attendance", element: <AttendanceRequestForm /> }
        ]
      },
      
      {
        path: "leaves",
        children: [
          { index: true, element: <Navigate to="apply" replace /> },
          { path: "apply", element: <UnderDevelopmentPage /> },
          { path: "balance", element: <UnderDevelopmentPage /> },
          { path: "history", element: <UnderDevelopmentPage /> }
        ]
      },

      {
        path: "expense",
        children: [
          { index: true, element: <Navigate to="submit" replace /> },
          { path: "submit", element: <UnderDevelopmentPage /> },
          { path: "history", element: <UnderDevelopmentPage /> },
          { path: "approvals", element: <UnderDevelopmentPage /> }
        ]
      },

      {
        path: "compensation",
        children: [
          { index: true, element: <Navigate to="salary" replace /> },
          { path: "salary", element: <UnderDevelopmentPage /> },
          { path: "tax", element: <UnderDevelopmentPage /> },
          { path: "benefits", element: <UnderDevelopmentPage /> }
        ]
      },

      { path: "assets" , element: <UnderDevelopmentPage /> },
      { path: "timesheet" , element: <UnderDevelopmentPage /> },
      { path: "achieve" , element: <UnderDevelopmentPage /> },
      { path: "training" , element: <UnderDevelopmentPage /> },
      { path: "forms" , element: <UnderDevelopmentPage /> },
      { path: "policies" , element: <UnderDevelopmentPage /> },
      { path: "calendar" , element: <UnderDevelopmentPage /> },
      { path: "org-chart" , element: <UnderDevelopmentPage /> },
      { path: "timeline" , element: <UnderDevelopmentPage /> },
      { path: "settings" , element: <UnderDevelopmentPage /> },
    ]
  }
];