// import { 
//   LayoutDashboard, 
//   AlertTriangle, 
//   Archive, 
//   Video, 
//   Shield, 
//   Users, 
//   FileText, 
//   Settings,
//   Eye,
//   Upload,
//   Target,
//   UserX,
//   Package,
//   Activity,
//   Zap
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";

// const navigationItems = [
//   { icon: LayoutDashboard, label: "Dashboard", path: "/" },
//   { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
//   { 
//     icon: Archive, 
//     label: "Evidence Center", 
//     path: "/evidence",
//     children: [
//       { icon: Eye, label: "Live Evidence", path: "/evidence/live" },
//       { icon: Upload, label: "Upload & Summarize", path: "/evidence/upload" },
//     ]
//   },
//   { 
//     icon: Video, 
//     label: "Video Feeds", 
//     path: "/feeds",
//     children: [
//       { icon: Target, label: "Weapons", path: "/detections/weapons" },
//       { icon: UserX, label: "Wanted/Missing", path: "/detections/wanted" },
//       { icon: Package, label: "Suspicious Bags", path: "/detections/bags" },
//       { icon: Activity, label: "Loitering", path: "/detections/loitering" },
//       { icon: Zap, label: "Anomalies", path: "/detections/anomalies" },
//     ]
//   },
//   { icon: Shield, label: "Cases", path: "/cases" },
//   { icon: Users, label: "Teams", path: "/teams" },
//   { icon: FileText, label: "Reports", path: "/reports" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export const Sidebar = () => {
//   return (
//     <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
//       <div className="p-6 border-b border-sidebar-border">
//         <div className="flex items-center gap-2">
//           <Shield className="h-8 w-8 text-threat" />
//           <div>
//             <h1 className="text-lg font-bold text-sidebar-foreground">NSG</h1>
//             <p className="text-xs text-muted-foreground">Command Center</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//         {navigationItems.map((item) => (
//           <div key={item.path}>
//             <NavLink
//               to={item.path}
//               className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
//               activeClassName="bg-sidebar-accent text-threat border-l-2 border-threat"
//             >
//               <item.icon className="h-4 w-4" />
//               {item.label}
//             </NavLink>
            
//             {item.children && (
//               <div className="ml-6 mt-1 space-y-1">
//                 {item.children.map((child) => (
//                   <NavLink
//                     key={child.path}
//                     to={child.path}
//                     className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
//                     activeClassName="bg-sidebar-accent text-threat"
//                   >
//                     <child.icon className="h-3 w-3" />
//                     {child.label}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-sidebar-border">
//         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//           <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//           System Online
//         </div>
//       </div>
//     </aside>
//   );
// };








// import {
//   LayoutDashboard,
//   AlertTriangle,
//   Video,
//   Shield,
//   Users,
//   FileText,
//   Settings,
//   Eye,
//   Upload,
//   Target,
//   UserX,
//   Package,
//   Activity,
//   Zap
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useState } from "react";

// const navigationItems = [
//   { icon: LayoutDashboard, label: "Dashboard", path: "/" },
//   { icon: AlertTriangle, label: "Alerts", path: "/alerts" },

//   // Evidence pages (no Evidence Center, no dropdown)
//   { icon: Eye, label: "Live Evidence", path: "/evidence/live" },
//   { icon: Upload, label: "Upload & Summarize", path: "/evidence/upload" },

//   // ONLY Video Feeds will have dropdown
//   {
//     icon: Video,
//     label: "Video Feeds",
//     path: "/feeds",
//     children: [
//       { icon: Target, label: "Weapons", path: "/detections/weapons" },
//       { icon: UserX, label: "Wanted / Missing", path: "/detections/wanted" },
//       { icon: Package, label: "Suspicious Bags", path: "/detections/bags" },
//       { icon: Activity, label: "Loitering", path: "/detections/loitering" },
//       { icon: Zap, label: "Anomalies", path: "/detections/anomalies" },
//     ]
//   },

//   { icon: Shield, label: "Cases", path: "/cases" },
//   { icon: Users, label: "Teams", path: "/teams" },
//   { icon: FileText, label: "Reports", path: "/reports" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export const Sidebar = () => {
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const toggleMenu = (label: string) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   return (
//     <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
//       <div className="p-6 border-b border-sidebar-border">
//         <div className="flex items-center gap-2">
//           <Shield className="h-8 w-8 text-threat" />
//           <div>
//             <h1 className="text-lg font-bold text-sidebar-foreground">SRI</h1>
//             <p className="text-xs text-muted-foreground">Command Center</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//         {navigationItems.map((item) => (
//           <div key={item.label}>
//             {/* Dropdown only for Video Feeds */}
//             {item.children ? (
//               <>
//                 <div
//                   className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
//                   onClick={() => toggleMenu(item.label)}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {item.label}
//                   <span className="ml-auto text-[10px] opacity-60">
//                     {openMenu === item.label ? "▲" : "▼"}
//                   </span>
//                 </div>

//                 {openMenu === item.label && (
//                   <div className="ml-6 mt-1 space-y-1">
//                     {item.children.map((child) => (
//                       <NavLink
//                         key={child.path}
//                         to={child.path}
//                         className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
//                         activeClassName="bg-sidebar-accent text-threat"
//                       >
//                         <child.icon className="h-3 w-3" />
//                         {child.label}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <NavLink
//                 to={item.path}
//                 className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
//                 activeClassName="bg-sidebar-accent text-threat border-l-2 border-threat"
//               >
//                 <item.icon className="h-4 w-4" />
//                 {item.label}
//               </NavLink>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-sidebar-border">
//         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//           <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//           System Online
//         </div>
//       </div>
//     </aside>
//   );
// };











// import {
//   LayoutDashboard,
//   AlertTriangle,
//   Video,
//   Shield,
//   Users,
//   FileText,
//   Settings,
//   Eye,
//   Upload,
//   Target,
//   UserX,
//   Package,
//   Activity,
//   Zap
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useState } from "react";

// const navigationItems = [
//   { icon: LayoutDashboard, label: "Dashboard", path: "/" },
//   { icon: AlertTriangle, label: "Alerts", path: "/alerts" },

//   // Evidence pages (no Evidence Center, no dropdown)
//   { icon: Eye, label: "Live Evidence", path: "/evidence/live" },
//   { icon: Upload, label: "Upload & Summarize", path: "/evidence/upload" },

//   // ONLY Video Feeds will have dropdown
//   {
//     icon: Video,
//     label: "Video Feeds",
//     path: "/feeds",
//     children: [
//       { icon: Target, label: "Weapons", path: "/detections/weapons" },
//       { icon: UserX, label: "Wanted / Missing", path: "/detections/wanted" },
//       { icon: Package, label: "Suspicious Bags", path: "/detections/bags" },
//       { icon: Activity, label: "Loitering", path: "/detections/loitering" },
//       { icon: Zap, label: "Anomalies", path: "/detections/anomalies" }
//     ]
//   },

//   { icon: Shield, label: "Cases", path: "/cases" },
//   { icon: Users, label: "Teams", path: "/teams" },
//   { icon: FileText, label: "Reports", path: "/reports" },
//   { icon: Settings, label: "Settings", path: "/settings" }
// ];

// export const Sidebar = () => {
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const toggleMenu = (label: string) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   return (
//     <aside className="w-56 border-r border-sidebar-border bg-sidebar flex flex-col">
//       <div className="p-6 border-b border-sidebar-border">
//         <div className="flex items-center gap-2">
//           <Shield className="h-8 w-8 text-threat" />
//           <div>
//             <h1 className="text-lg font-bold text-sidebar-foreground">SRI</h1>
//             <p className="text-xs text-muted-foreground">Command Center</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//         {navigationItems.map((item) => (
//           <div key={item.label}>
//             {/* Dropdown only for Video Feeds */}
//             {item.children ? (
//               <>
//                 <div
//                   className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
//                   onClick={() => toggleMenu(item.label)}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {item.label}
//                   <span className="ml-auto text-[10px] opacity-60">
//                     {openMenu === item.label ? "▲" : "▼"}
//                   </span>
//                 </div>

//                 {openMenu === item.label && (
//                   <div className="ml-6 mt-1 space-y-1">
//                     {item.children.map((child) => (
//                       <NavLink
//                         key={child.path}
//                         to={child.path}
//                         className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
//                         activeClassName="bg-sidebar-accent text-threat"
//                       >
//                         <child.icon className="h-3 w-3" />
//                         {child.label}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <NavLink
//                 to={item.path}
//                 className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
//                 activeClassName="bg-sidebar-accent text-threat border-l-2 border-threat"
//               >
//                 <item.icon className="h-4 w-4" />
//                 {item.label}
//               </NavLink>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-sidebar-border">
//         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//           <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//           System Online
//         </div>
//       </div>
//     </aside>
//   );
// };







import {
  LayoutDashboard,
  AlertTriangle,
  Video,
  Shield,
  Users,
  FileText,
  Settings,
  Eye,
  Upload,
  Target,
  UserX,
  Package,
  Activity,
  Zap
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },

  // Evidence pages (no Evidence Center, no dropdown)
  { icon: Eye, label: "Live Evidence", path: "/evidence/live" },
  { icon: Upload, label: "Upload & Summarize", path: "/evidence/upload" },

  // NEW top-level Missing / Wanted Person page (5th item)
  { icon: UserX, label: "Missing / Wanted Person", path: "/detections/missing-wanted" },

  // Video Feeds (keeps dropdown but removed Wanted / Missing child to avoid duplication)
  {
    icon: Video,
    label: "Video Feeds",
    path: "/feeds",
    children: [
      { icon: Target, label: "Weapons", path: "/detections/weapons" },
      // removed the previous Wanted / Missing child here
      { icon: Package, label: "Suspicious Bags", path: "/detections/bags" },
      { icon: Activity, label: "Loitering", path: "/detections/loitering" },
      { icon: Zap, label: "Anomalies", path: "/detections/anomalies" }
    ]
  },

  { icon: Shield, label: "Cases", path: "/cases" },
  { icon: Users, label: "Teams", path: "/teams" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" }
];

export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside className="w-56 border-r border-sidebar-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-threat" />
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">SRI</h1>
            <p className="text-xs text-muted-foreground">Command Center</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => (
          <div key={item.label}>
            {/* Dropdown only for items that have children */}
            {item.children ? (
              <>
                <div
                  className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                  onClick={() => toggleMenu(item.label)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  <span className="ml-auto text-[10px] opacity-60">
                    {openMenu === item.label ? "▲" : "▼"}
                  </span>
                </div>

                {openMenu === item.label && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                        activeClassName="bg-sidebar-accent text-threat"
                      >
                        <child.icon className="h-3 w-3" />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                activeClassName="bg-sidebar-accent text-threat border-l-2 border-threat"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
          System Online
        </div>
      </div>
    </aside>
  );
};




