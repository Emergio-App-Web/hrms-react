// import { ReactNode } from 'react'
// import { Routes, Route, RouteObject } from 'react-router-dom'
// import { routes } from '@/routes/employeeRoutes'

// interface MainLayoutProps {
//   children?: ReactNode;
// }

// export const MainLayout = ({ children }: MainLayoutProps) => {
//   const renderRoutes = (routes: RouteObject[]) => {
//     return routes.map((route) => (
//       <Route
//         key={route.path}
//         path={route.path}
//         element={route.element}
//       >
//         {route.children && route.children.map((childRoute) => (
//           <Route
//             key={childRoute.path}
//             path={childRoute.path}
//             element={childRoute.element}
//           />
//         ))}
//       </Route>
//     ))
//   }

//   return (
//     <main className="mt-12 ">
//       <Routes>
//         {renderRoutes(routes)}
//       </Routes>
//     </main>
//   )
// }






// // MainLayout.tsx
// // import { Outlet } from 'react-router-dom';
// // import { SidebarProvider } from "@/components/ui/sidebar";
// // import { Sidebar } from "@/components/app-sidebar";
// // import { Navbar } from "@/components/navbar";
// // import RightBar from "./components/app-rightsidebar";

// // export const MainLayout = () => {
// //   return (
// //     <div className="main-layout">
// //       <Navbar />
// //       <Sidebar />
// //       <div className="content">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };