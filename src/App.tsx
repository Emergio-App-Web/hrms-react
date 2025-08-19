import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { employeeRoutes } from "./routes/employeeRoutes";
import Login from "./pages/Login/Login";
import { adminRoutes } from "./routes/adminRoutes";
import { useSelector } from "react-redux";
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

// Redux state types
interface AuthState {
  user: string | null;
  token: string | null;
}
interface RootState {
  auth: AuthState;
}

// Protects routes based on role
const ProtectedRoute = ({ allowedRole, children }: { allowedRole: "admin" | "employee"; children?: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole === "admin" && user !== "admin") return <Navigate to={employeeRoutes[0].path || "/"} replace />;
  if (allowedRole === "employee" && user === "admin") return <Navigate to={adminRoutes[0].path || "/"} replace />;
  return children ? <>{children}</> : <Outlet />;
};

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      {/* Public route: login */}
      <Route path="/login" element={
        token && user ? (
          user === "admin"
            ? <Navigate to={adminRoutes[0].path || "/"} replace />
            : <Navigate to={employeeRoutes[0].path || "/"} replace />
        ) : <Login />
      } />

      {/* Admin routes - only for admin */}
      {user === "admin" && (
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          {adminRoutes.map((route: RouteObject) => (
            <Route
              key={route.path || "admin-root"}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((childRoute: RouteObject, idx: number) => (
                <Route
                  key={(route.path || "admin-root") + "-" + (childRoute.path || (childRoute.index ? "index" : "")) + "-" + idx}
                  path={childRoute.path}
                  index={childRoute.index}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
        </Route>
      )}

      {/* Employee routes - only for employee */}
      {user && user !== "admin" && (
        <Route element={<ProtectedRoute allowedRole="employee" />}>
          {employeeRoutes.map((route: RouteObject) => (
            <Route
              key={route.path || "employee-root"}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((childRoute: RouteObject, idx: number) => (
                <Route
                  key={(route.path || "employee-root") + "-" + (childRoute.path || "index") + "-" + idx}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
        </Route>
      )}

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