// import { ReactNode } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Sidebar } from "@/components/app-sidebar";
// import { Navbar } from "@/components/navbar";
// import RightBar from "./app-rightsidebar";

// interface AppLayoutProps {
//   children?: ReactNode;
//   selectedThemeColor: string;
//   themeColors: string[];
//   handleColorSelect: (color: string) => void;
//   handleClearColor: () => void;
// }

// export const AppLayout = ({
//   children,
//   selectedThemeColor,
//   themeColors,
//   handleColorSelect,
//   handleClearColor
// }: AppLayoutProps) => {
//   return (
//     <div className="min-h-screen grid grid-cols-[auto,1fr]">
//       {/* Sidebar */}
//       <SidebarProvider>
//         <Sidebar />
//       </SidebarProvider>

//       {/* Main Content Area */}
//       <main className="flex flex-col">
//         {/* Navbar */}
//         <div className="w-full">
//           <Navbar
//             colors={themeColors}
//             onSelect={handleColorSelect}
//             onClear={handleClearColor}
//           />
//         </div>

//         {/* Outlet with dynamic background color */}
//         <div
//           className="flex-1 p-4 last:ml-auto"
//           style={{ backgroundColor: selectedThemeColor || "white" }}
//         >
//           {children}
//         </div>
//       </main>

//       {/* Right Bar */}
//       <RightBar />
//     </div>
//   );
// };
