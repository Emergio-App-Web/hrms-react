// import { Routes, Route, RouteObject, Navigate } from "react-router-dom";
// import { employeeRoutes } from "./routes/employeeRoutes";
// import { useSelector } from "react-redux";
// import Login from "./pages/Login/Login";
// import { adminRoutes } from "./routes/adminRoutes";




// const App = () => {
// // const user = useSelector((state: { auth: { user: string | null } }) => state.auth.user);
// //   console.log("datazzz ::", user);

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
//           <Route path= "/login" element={<Login />} />
//           renderRoutes(adminRoutes)
//           </Routes>);
//           };

//           export default App;
//       {/* Public route: login */}
//       {/* {!user && <Route path="/login" element={<Login />} />} */}
    
      
 
//       {/* {!user && <Route path="*" element={<Navigate to="/login" replace />} />} */}

//       {/* Authenticated user routes */}
//       {/* {user && user === "user" && renderRoutes(employeeRoutes)} */}
//       {/* renderRoutes(employeeRoutes) */}

//       {/* Admin routes */}
//       {/* {user && user === "admin" && renderRoutes(adminRoutes)} */}
     

//       {/* Fallback */}
//       {/* {user && <Route path="*" element={<Navigate to="/" />} />} */}
  









      
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










// with middleware
// import { Routes, Route, RouteObject, Navigate } from "react-router-dom";
// import { employeeRoutes } from "./routes/employeeRoutes";
// import Login from "./pages/Login/Login";
// import { adminRoutes } from "./routes/adminRoutes";
// import { useSelector } from "react-redux";



// const App = () => {
//     const user = useSelector((state: { auth: { user: string | null } }) => state.auth.user);
//       console.log("datazzz ::", user);
    
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
//               {/* <Route path= "/login" element={<Login />} />
//               renderRoutes(adminRoutes) */}
    
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




