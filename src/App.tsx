import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import { employeeRoutes } from "./routes/employeeRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import Login from "./pages/Login/Login";

// Define a type for the Redux state
interface RootState {
  auth: {
    user: "admin" | "employee" | null;
    token: string | null;
  };
}

const App = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  // 1. Define routes for different application states.
  // These are arrays of RouteObject, which useRoutes understands.
  const commonRoutes = [{ path: "/login", element: <Login /> }];
  
  const authenticatedAdminRoutes = [
    ...adminRoutes,
    // Add a fallback for any unknown URL for logged-in admins
    { path: "*", element: <Navigate to="/dashboard" replace /> }, // Ensure you have a default admin path
  ];
  
  const authenticatedEmployeeRoutes = [
    ...employeeRoutes,
    // Add a fallback for any unknown URL for logged-in employees
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ];
  
  const unauthenticatedRoutes = [
    ...commonRoutes,
    // For any other path, redirect to login if not authenticated
    { path: "*", element: <Navigate to="/login" replace /> },
  ];

  // 2. The useRoutes hook selects and renders the correct routes based on logic.
  // This replaces the entire <Routes> component and manual mapping.
  const element = useRoutes(
    token
      ? user === "admin"
        ? authenticatedAdminRoutes
        : authenticatedEmployeeRoutes
      : unauthenticatedRoutes
  );

  return <>{element}</>;
};

export default App;