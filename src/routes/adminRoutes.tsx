import { RouteObject, Navigate } from "react-router-dom";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import AdminBillingInfo from "@/pages/admin/general/AdminBillingInfo";
import AdminBrandOrGrades from "@/pages/admin/general/AdminBrandOrGrades";
// import AdminDashboard from "@/pages/admin/general/AdminDashboard";
import AdminDashboard from "@/pages/admin/general/Dashboard/Dashboard";
import AdminDepartment from "@/pages/admin/general/AdminDepartment";
import AdminDesignation from "@/pages/admin/general/AdminDesignation";
import AdminGeneralSettings from "@/pages/admin/general/AdminGeneralSettings";
import AdminBusinessUnit from "@/pages/admin/general/AdminBusinessUnit";
import AdminEmployee from "@/pages/admin/employee/AdminEmployee";
import AdminEmployeeUniqueFiels from "@/pages/admin/employee/AdminEmployeeUniqueFiels";
import AdminEmployeeSkills from "@/pages/admin/employee/AdminEmployeeSkills";
import AdminEmployeeSearchSettings from "@/pages/admin/employee/AdminEmployeeSearchSettings";
import AdminEmployeeStrength from "@/pages/admin/employee/AdminEmployeeStrength";
import AdminEmployeeDocumentCategory from "@/pages/admin/employee/AdminEmployeeDocumentCategory";
// import LoadingWave from "@/pages/admin/Test";
import AdminAttendanceShift from "@/pages/admin/attendance/AdminAttendanceShift";
import AdminAttendanceConfigureAttendance from "@/pages/admin/attendance/AdminAttendanceConfigureAttendance";
import AdminAttendanceRosterShift from "@/pages/admin/attendance/AdminAttendanceRosterShift";
import AdminAttendanceSandwichPolicies from "@/pages/admin/attendance/AdminAttendanceSandwichPolicies";
import AdminAttendanceRegularizationPolicies from "@/pages/admin/attendance/AdminAttendanceRegularizationPolicies";
import AdminAttendanceRestrictAttendance from "@/pages/admin/attendance/AdminAttendanceRestrictAttendance";
import AdminAttendanceOverTime from "@/pages/admin/attendance/AdminAttendanceOverTime";
import AdminAttendanceCalculations from "@/pages/admin/attendance/AdminAttendanceCalculations";
import AdminAttendanceWeeklyOff from "@/pages/admin/attendance/AdminAttendanceWeeklyOff";
import AdminAddEmployee from "@/pages/admin/general/AdminAddEmployee";
import AdminAttendanceRequest from "@/pages/admin/attendance/AdminAttendanceRequest";
import AdminShiftCard from "@/pages/admin/attendance/AdminShiftCard";
import AdminAttendace from "@/pages/admin/attendance/AdminAttendace";


export const adminRoutes: RouteObject[] = [
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
        ],
    },
    {
        path: "/settings",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="general" replace /> },
            { path: "general", element: <AdminGeneralSettings /> },
            { path: "billinginfo", element: <AdminBillingInfo /> },
            { path: "department", element: <AdminDepartment /> },
            { path: "designation", element: <AdminDesignation /> },
            { path: "bands/grades", element: <AdminBrandOrGrades /> },
            { path: "businessunit", element: <AdminBusinessUnit /> },
            { path: "employee", element: <AdminAddEmployee /> },
        ],
    },
    {
        path: "/employee",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="employee" replace /> },
            { path: "employee", element: <AdminEmployee /> },
            { path: "unique-field", element: <AdminEmployeeUniqueFiels /> },
            { path: "skills", element: <AdminEmployeeSkills /> },
            { path: "configure-employee-search", element: <AdminEmployeeSearchSettings /> },
            { path: "configure-employee-strength", element: <AdminEmployeeStrength /> },
            { path: "add-new-document-category", element: <AdminEmployeeDocumentCategory /> },
        ]
     
    },
    {
        path: "/attendance",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="attendance-request" replace /> },
            { path: "attendance-request", element: <AdminAttendanceRequest /> },
            { path: "shift-card", element: <AdminShiftCard /> },
            { path: "attendance", element: <AdminAttendace /> },
            { path: "shift", element: <AdminAttendanceShift /> },
            { path: "configure-attendance", element: <AdminAttendanceConfigureAttendance /> },
            { path: "roster-shift", element: <AdminAttendanceRosterShift /> },
            { path: "sandwich-policies", element: <AdminAttendanceSandwichPolicies /> },
            { path: "regularization-policies", element: <AdminAttendanceRegularizationPolicies /> },
            { path: "restrict-attendance", element: <AdminAttendanceRestrictAttendance /> },
            { path: "over-time", element: <AdminAttendanceOverTime /> },
            { path: "calculations", element: <AdminAttendanceCalculations /> },
            { path: "weekly-off", element: <AdminAttendanceWeeklyOff /> },
        ]
    },
    // {
    //     path: "/test",
    //     element: <LoadingWave />
    // }
];
