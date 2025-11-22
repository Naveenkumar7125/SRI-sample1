// import { Bell, CloudRain, HardDrive, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useEffect, useState } from "react";

// export const TopBar = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
//       <div className="flex items-center gap-4">
//         <h1 className="text-xl font-bold text-foreground">
//           Sentinel Reconnaissance Intelligence 
//         </h1>
//       </div>

//       <div className="flex items-center gap-6">
//         {/* Weather Widget */}
//         <div className="flex items-center gap-2 text-sm">
//           <CloudRain className="h-4 w-4 text-muted-foreground" />
//           <span className="text-muted-foreground">22°C</span>
//         </div>

//         {/* Time & Date */}
//         <div className="text-sm">
//           <div className="font-medium text-foreground">
//             {currentTime.toLocaleTimeString('en-US', { 
//               hour: '2-digit', 
//               minute: '2-digit',
//               second: '2-digit'
//             })}
//           </div>
//           <div className="text-xs text-muted-foreground">
//             {currentTime.toLocaleDateString('en-US', { 
//               month: 'short', 
//               day: 'numeric',
//               year: 'numeric'
//             })}
//           </div>
//         </div>

//         {/* Storage */}
//         <div className="flex items-center gap-2">
//           <HardDrive className="h-4 w-4 text-muted-foreground" />
//           <div className="text-xs">
//             <div className="text-muted-foreground">Storage</div>
//             <div className="font-medium text-foreground">2.4TB / 10TB</div>
//           </div>
//         </div>

//         {/* Notifications */}
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-threat text-[10px]">
//             3
//           </Badge>
//         </Button>

//         {/* User Profile */}
//         <Button variant="ghost" size="icon">
//           <User className="h-5 w-5" />
//         </Button>
//       </div>
//     </header>
//   );
// };





// import { Bell, CloudRain, HardDrive, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useEffect, useState } from "react";

// export const TopBar = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
//       <div className="flex items-center gap-4">
//         <h1 className="text-3xl font-bold text-red-600 tracking-wide">
//           Sentinel Reconnaissance Intelligence 
//         </h1>
//       </div>

//       <div className="flex items-center gap-6">
//         {/* Weather Widget */}
//         <div className="flex items-center gap-2 text-sm">
//           <CloudRain className="h-4 w-4 text-muted-foreground" />
//           <span className="text-muted-foreground">22°C</span>
//         </div>

//         {/* Time & Date */}
//         <div className="text-sm">
//           <div className="font-medium text-foreground">
//             {currentTime.toLocaleTimeString('en-US', { 
//               hour: '2-digit', 
//               minute: '2-digit',
//               second: '2-digit'
//             })}
//           </div>
//           <div className="text-xs text-muted-foreground">
//             {currentTime.toLocaleDateString('en-US', { 
//               month: 'short', 
//               day: 'numeric',
//               year: 'numeric'
//             })}
//           </div>
//         </div>

//         {/* Storage */}
//         <div className="flex items-center gap-2">
//           <HardDrive className="h-4 w-4 text-muted-foreground" />
//           <div className="text-xs">
//             <div className="text-muted-foreground">Storage</div>
//             <div className="font-medium text-foreground">2.4TB / 10TB</div>
//           </div>
//         </div>

//         {/* Notifications */}
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-threat text-[10px]">
//             3
//           </Badge>
//         </Button>

//         {/* User Profile */}
//         <Button variant="ghost" size="icon">
//           <User className="h-5 w-5" />
//         </Button>
//       </div>
//     </header>
//   );
// };






import { CloudRain, HardDrive, User, Shield, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-red-600 tracking-wide">
          Sentinel Reconnaissance Intelligence 
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Weather Widget */}
        <div className="flex items-center gap-2 text-sm">
          <CloudRain className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">22°C</span>
        </div>

        {/* Time & Date */}
        <div className="text-sm">
          <div className="font-medium text-foreground">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentTime.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Storage */}
        <div className="flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs">
            <div className="text-muted-foreground">Storage</div>
            <div className="font-medium text-foreground">2.4TB / 10TB</div>
          </div>
        </div>

        {/* User Profile with Dropdown */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="relative"
          >
            <User className="h-5 w-5" />
          </Button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
              {/* User Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-tactical flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">Agent John Smith</div>
                    <div className="text-xs text-muted-foreground truncate">john.smith@sentinel.gov</div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Security Level:</span>
                  <Badge className="bg-tactical text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Level 5
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono text-foreground">SRI-AG-7842</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span className="text-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="text-foreground">Field Operations</span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-2 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm text-threat hover:text-threat" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};