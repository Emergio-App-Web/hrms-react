import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { employeeRoutes } from "./routes/employeeRoutes";
import Login from "./pages/Login/Login";
import { adminRoutes } from "./routes/adminRoutes";
import { useSelector } from "react-redux";
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

// Define types for the Redux state
interface AuthState {
  user: string | null;
  token: string | null;
}

interface RootState {
  auth: AuthState;
}

// Props type for ProtectedRoute component
interface ProtectedRouteProps {
  allowedRole: string;
  redirectPath?: string;
  children?: ReactNode;
}

// Protected route component that checks both token and role
const ProtectedRoute = ({ 
  allowedRole, 
  // redirectPath = '/login',
  children 
}: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  // If no token, always redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If role doesn't match, redirect to appropriate default page
  if (allowedRole && user !== allowedRole) {
    const defaultPath = user === "admin" 
      ? adminRoutes[0].path  // Admin's default page
      : employeeRoutes[0].path;  // User's default page
    return <Navigate to={defaultPath || "/"} replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
};

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  return (
    <Routes>
      {/* Public route: login */}
      <Route path="/login" element={
        // Redirect already logged in users to their appropriate pages
        token && user ? (
          user === "admin" ? 
            <Navigate to={adminRoutes[0].path || "/"} replace /> : 
            <Navigate to={employeeRoutes[0].path || "/"} replace />
        ) : (
          <Login />
        )
      } />
      
      {/* User routes - protected by both token and role */}
      <Route element={<ProtectedRoute allowedRole="user" />}>
        {employeeRoutes.map((route: RouteObject) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={route.element}
          >
            {route.children?.map((childRoute: RouteObject) => (
              <Route 
                key={childRoute.path} 
                path={childRoute.path} 
                element={childRoute.element} 
              />
            ))}
          </Route>
        ))}
      </Route>
      
      {/* Admin routes - protected by both token and role */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        {adminRoutes.map((route: RouteObject) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={route.element}
          >
            {route.children?.map((childRoute: RouteObject) => (
              <Route 
                key={childRoute.path} 
                path={childRoute.path} 
                element={childRoute.element} 
              />
            ))}
          </Route>
        ))}
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={
        !token ? <Navigate to="/login" replace /> :
        user === "admin" ? <Navigate to={adminRoutes[0].path || "/"} replace /> :
        <Navigate to={employeeRoutes[0].path || "/"} replace />
      } />
    </Routes>
  );
};

export default App;





// // with simple protect

// import { Routes, Route, RouteObject, Navigate } from "react-router-dom";
// import { employeeRoutes } from "./routes/employeeRoutes";
// import Login from "./pages/Login/Login";
// import { adminRoutes } from "./routes/adminRoutes";
// import { useSelector } from "react-redux";



// const App = () => {
//     const user = useSelector((state: { auth: { user: string | null } }) => state.auth.user);
//     const token = useSelector((state: {auth: {token: string | null }}) => state.auth.token)
//       console.log("user data from redux ::", user, token);

    
//         const renderRoutes = (userRoutes: RouteObject[]) => {
            
//             return userRoutes.map((route) => (
//                 <Route key={route.path} path={route.path} element={route.element}>
//                     {route.children?.map((childRoute) => (
//                         <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
//                     ))}
//                 </Route>
//             ));
//         };
    
//         return ( 
//            <Routes>
                 
//           {/* Public route: login */}
//            {!user && <Route path="/login" element={<Login />} />} 
        
          
     
//            {!user && <Route path="*" element={<Navigate to="/login" replace />} />} 
    
//           {/* Authenticated user routes */}
//            {user && user === "user" && renderRoutes(employeeRoutes)} 
//           {/* renderRoutes(employeeRoutes) */}
    
//           {/* Admin routes */}
//            {user && user === "admin" && renderRoutes(adminRoutes)} 
         
    
//           {/* Fallback */}
//            {user && <Route path="*" element={<Navigate to="/" />} />} 
      
//            </Routes>
//            );
//         }
//         export default App








//without protect
// import { Routes, Route, RouteObject } from "react-router-dom";
// import { employeeRoutes } from "./routes/employeeRoutes";
// import Login from "./pages/Login/Login";
// import { adminRoutes } from "./routes/adminRoutes";
// // import { useSelector } from "react-redux";


// const App = () => {
//     const renderRoutes = (userRoutes: RouteObject[]) => {
//         return userRoutes.map((route) => (
//             <Route key={route.path} path={route.path} element={route.element}>
//                 {route.children?.map((childRoute) => (
//                     <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
//                 ))}
//             </Route>
//         ));
//     };

//     return ( 
//        <Routes>
//           {/* Public route: login */}
//           <Route path="/login" element={<Login />} />
          
//           {/* Admin routes */}
//           {renderRoutes(adminRoutes)}

//           {renderRoutes(employeeRoutes)}
//        </Routes>
//     );
// };

// export default App;