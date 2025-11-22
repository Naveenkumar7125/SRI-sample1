// // import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
// // import { Badge } from "@/components/ui/badge";
// // import { AlertTriangle, Eye, CheckCircle2 } from "lucide-react";

// // export const RightSidebar = () => {
// //   const latestAlerts = mockAlerts.slice(0, 3);
// //   const liveCamera = mockCameras[0];

// //   const getSeverityColor = (severity: string) => {
// //     switch (severity) {
// //       case "critical": return "bg-threat text-white";
// //       case "high": return "bg-warning text-black";
// //       case "medium": return "bg-amber text-black";
// //       default: return "bg-muted text-foreground";
// //     }
// //   };

// //   return (
// //     <aside className="w-80 border-l border-border bg-card overflow-y-auto">
// //       {/* Live Camera Preview */}
// //       <div className="p-4 border-b border-border">
// //         <div className="flex items-center justify-between mb-2">
// //           <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
// //           <Badge variant="outline" className="text-xs">
// //             <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
// //             LIVE
// //           </Badge>
// //         </div>
// //         <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
// //           <img 
// //             src={liveCamera.feed} 
// //             alt={liveCamera.name}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
// //             <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
// //             <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Latest Alerts */}
// //       <div className="p-4 border-b border-border">
// //         <div className="flex items-center justify-between mb-3">
// //           <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
// //           <AlertTriangle className="h-4 w-4 text-threat" />
// //         </div>
// //         <div className="space-y-2">
// //           {latestAlerts.map((alert) => (
// //             <div 
// //               key={alert.id}
// //               className="glass-panel rounded-lg p-3 hover:border-threat transition-colors cursor-pointer"
// //             >
// //               <div className="flex items-start justify-between mb-1">
// //                 <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-2 py-0`}>
// //                   {alert.type}
// //                 </Badge>
// //                 <span className="text-[10px] text-muted-foreground">
// //                   {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
// //                     hour: '2-digit', 
// //                     minute: '2-digit' 
// //                   })}
// //                 </span>
// //               </div>
// //               <p className="text-xs text-foreground font-medium mb-1">{alert.location}</p>
// //               <p className="text-[10px] text-muted-foreground">{alert.camera}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Quick Stats */}
// //       {/* <div className="p-4 border-b border-border">
// //         <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
// //         <div className="grid grid-cols-2 gap-2">
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-threat">3</div>
// //             <div className="text-[10px] text-muted-foreground">Critical</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-warning">7</div>
// //             <div className="text-[10px] text-muted-foreground">High Priority</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-tactical">46</div>
// //             <div className="text-[10px] text-muted-foreground">Cameras Online</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-foreground">29</div>
// //             <div className="text-[10px] text-muted-foreground">Total Alerts</div>
// //           </div>
// //         </div>
// //       </div> */}

// //       {/* Today's Operations */}
// //       <div className="p-4">
// //         <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
// //         <div className="space-y-2">
// //           {mockOperations.map((op, idx) => (
// //             <div 
// //               key={idx}
// //               className="flex items-start gap-2 text-xs"
// //             >
// //               <CheckCircle2 className="h-4 w-4 text-tactical mt-0.5 flex-shrink-0" />
// //               <span className="text-muted-foreground">{op}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };



// // import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
// // import { Badge } from "@/components/ui/badge";
// // import { AlertTriangle, Eye, CheckCircle2 } from "lucide-react";

// // export const RightSidebar = () => {
// //   const latestAlerts = mockAlerts.slice(0, 3);
// //   const liveCamera = mockCameras[0];

// //   const getSeverityColor = (severity: string) => {
// //     switch (severity) {
// //       case "critical": return "bg-threat text-white";
// //       case "high": return "bg-warning text-black";
// //       case "medium": return "bg-amber text-black";
// //       default: return "bg-muted text-foreground";
// //     }
// //   };

// //   return (
// //     <aside className="w-80 border-l border-border bg-card h-screen sticky top-0 overflow-y-auto">
// //       {/* Live Camera Preview */}
// //       <div className="p-4 border-b border-border">
// //         <div className="flex items-center justify-between mb-2">
// //           <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
// //           <Badge variant="outline" className="text-xs">
// //             <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
// //             LIVE
// //           </Badge>
// //         </div>
// //         <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
// //           <img 
// //             src={liveCamera.feed} 
// //             alt={liveCamera.name}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
// //             <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
// //             <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Latest Alerts */}
// //       <div className="p-4 border-b border-border">
// //         <div className="flex items-center justify-between mb-3">
// //           <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
// //           <AlertTriangle className="h-4 w-4 text-threat" />
// //         </div>
// //         <div className="space-y-2">
// //           {latestAlerts.map((alert) => (
// //             <div 
// //               key={alert.id}
// //               className="glass-panel rounded-lg p-3 hover:border-threat transition-colors cursor-pointer"
// //             >
// //               <div className="flex items-start justify-between mb-1">
// //                 <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-2 py-0`}>
// //                   {alert.type}
// //                 </Badge>
// //                 <span className="text-[10px] text-muted-foreground">
// //                   {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
// //                     hour: '2-digit', 
// //                     minute: '2-digit' 
// //                   })}
// //                 </span>
// //               </div>
// //               <p className="text-xs text-foreground font-medium mb-1">{alert.location}</p>
// //               <p className="text-[10px] text-muted-foreground">{alert.camera}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Quick Stats */}
// //       {/* <div className="p-4 border-b border-border">
// //         <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
// //         <div className="grid grid-cols-2 gap-2">
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-threat">3</div>
// //             <div className="text-[10px] text-muted-foreground">Critical</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-warning">7</div>
// //             <div className="text-[10px] text-muted-foreground">High Priority</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-tactical">46</div>
// //             <div className="text-[10px] text-muted-foreground">Cameras Online</div>
// //           </div>
// //           <div className="glass-panel rounded-lg p-3 text-center">
// //             <div className="text-2xl font-bold text-foreground">29</div>
// //             <div className="text-[10px] text-muted-foreground">Total Alerts</div>
// //           </div>
// //         </div>
// //       </div> */}

// //       {/* Today's Operations */}
// //       <div className="p-4">
// //         <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
// //         <div className="space-y-2">
// //           {mockOperations.map((op, idx) => (
// //             <div 
// //               key={idx}
// //               className="flex items-start gap-2 text-xs"
// //             >
// //               <CheckCircle2 className="h-4 w-4 text-tactical mt-0.5 flex-shrink-0" />
// //               <span className="text-muted-foreground">{op}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };








// import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
// import { Badge } from "@/components/ui/badge";
// import { AlertTriangle, Eye, CheckCircle2, Bot, Mic, ArrowRight } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export const RightSidebar = () => {
//   const latestAlerts = mockAlerts.slice(0, 3);
//   const liveCamera = mockCameras[0];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical": return "bg-threat text-white";
//       case "high": return "bg-warning text-black";
//       case "medium": return "bg-amber text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   const handleVoiceInput = () => {
//     // Voice input functionality
//     console.log("Voice input activated");
//     // Add your voice input logic here
//   };

//   const handleTextQuery = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle text query submission
//     console.log("Text query submitted");
//   };

//   return (
//     <aside className="w-80 border-l border-border bg-card">
//       {/* Live Camera Preview */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
//           <Badge variant="outline" className="text-xs">
//             <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
//             LIVE
//           </Badge>
//         </div>
//         <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
//           <img 
//             src={liveCamera.feed} 
//             alt={liveCamera.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
//             <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
//             <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
//           </div>
//         </div>
//       </div>

//       {/* Latest Alerts - Reduced Size */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
//           <AlertTriangle className="h-4 w-4 text-threat" />
//         </div>
//         <div className="space-y-2">
//           {latestAlerts.map((alert) => (
//             <div 
//               key={alert.id}
//               className="glass-panel rounded-lg p-2 hover:border-threat transition-colors cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-1">
//                 <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-1.5 py-0 h-4`}>
//                   {alert.severity}
//                 </Badge>
//                 <span className="text-[10px] text-muted-foreground">
//                   {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
//                     hour: '2-digit', 
//                     minute: '2-digit' 
//                   })}
//                 </span>
//               </div>
//               <p className="text-xs text-foreground font-medium mb-0.5 line-clamp-1">{alert.type}</p>
//               <div className="flex justify-between items-center">
//                 <p className="text-[10px] text-muted-foreground line-clamp-1">{alert.location}</p>
//                 <p className="text-[10px] text-muted-foreground line-clamp-1">{alert.camera}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Agent Bot Section - Centered and Larger */}
//       <div className="p-6 border-b border-border">
//         <div className="flex flex-col items-center text-center mb-4">
//           {/* Large Centered Agent Bot with Blue Glow Pulse Effect */}
//           <div className="relative mb-3">
//             <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75 scale-110"></div>
//             <div className="relative bg-blue-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
//               <Bot className="h-8 w-8 text-white" />
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-foreground">Security Agent</h3>
//             <p className="text-sm text-muted-foreground">AI Assistant</p>
//           </div>
//         </div>
        
//         {/* Query Input with Microphone and Arrow Button */}
//         <form onSubmit={handleTextQuery} className="space-y-3">
//           <div className="relative">
//             <Input 
//               placeholder="Ask me anything about security..."
//               className="pr-20 glass-panel border-blue-300 focus:border-blue-500 text-sm"
//             />
//             <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
//               <Button
//                 type="button"
//                 size="sm"
//                 variant="ghost"
//                 className="h-7 w-7 p-0 hover:bg-blue-50"
//                 onClick={handleVoiceInput}
//               >
//                 <Mic className="h-3 w-3 text-blue-500" />
//               </Button>
//               <Button
//                 type="submit"
//                 size="sm"
//                 variant="ghost"
//                 className="h-7 w-7 p-0 hover:bg-blue-50"
//               >
//                 <ArrowRight className="h-3 w-3 text-blue-500" />
//               </Button>
//             </div>
//           </div>
//         </form>
        
//         {/* Help Text */}
//         <p className="text-xs text-muted-foreground mt-3 text-center">
//           Ask about alerts, cameras, or security status
//         </p>
//       </div>

//       {/* Today's Operations */}
//       <div className="p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
//         <div className="space-y-2">
//           {mockOperations.map((op, idx) => (
//             <div 
//               key={idx}
//               className="flex items-start gap-2 text-xs"
//             >
//               <CheckCircle2 className="h-3 w-3 text-tactical mt-0.5 flex-shrink-0" />
//               <span className="text-muted-foreground text-xs leading-tight">{op}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };










import { useState, useEffect } from "react";
import { mockCameras, mockOperations } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, CheckCircle2, Bot, Mic, ArrowRight, Bell, RefreshCw, Trash2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Alert = {
  _id: string;
  image_url: string;
  category: string;
  cam_id: string;
  location: string;
  timestamp: string;
  severity?: "critical" | "high" | "medium" | "low";
  status?: "active" | "investigating" | "resolved";
};

export const RightSidebar = () => {
  const [latestAlerts, setLatestAlerts] = useState<Alert[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [newAlertNotification, setNewAlertNotification] = useState<Alert | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [deletingAlerts, setDeletingAlerts] = useState<Set<string>>(new Set());
  const liveCamera = mockCameras[0];

  // Fetch latest alerts from API
  const fetchLatestAlerts = async () => {
    try {
      console.log('Fetching alerts from:', 'http://localhost:5000/api/alerts/');
      const response = await fetch('http://localhost:5000/api/alerts/');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch alerts: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched alerts:', data);
      
      // Sort by timestamp (newest first) and take latest 3
      const sortedAlerts = data
        .sort((a: Alert, b: Alert) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 3);
      
      // Check for new alerts since last fetch
      if (lastFetchTime && data.length > 0) {
        const newAlerts = data.filter((alert: Alert) => 
          new Date(alert.timestamp) > lastFetchTime
        );
        
        if (newAlerts.length > 0) {
          // Show notification for the newest alert
          const newestAlert = newAlerts.sort((a: Alert, b: Alert) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )[0];
          showAlertNotification(newestAlert);
        }
      }
      
      setLatestAlerts(sortedAlerts);
      setLastFetchTime(new Date());
      
    } catch (error) {
      console.error('Error fetching alerts:', error);
      // You can set a fallback or leave empty array
      setLatestAlerts([]);
    } finally {
      setLoadingAlerts(false);
    }
  };

  // Delete alert from API
  const deleteAlert = async (alertId: string) => {
    if (!confirm('Are you sure you want to delete this alert? This action cannot be undone.')) {
      return;
    }

    setDeletingAlerts(prev => new Set(prev).add(alertId));

    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${alertId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete alert: ${response.status} ${response.statusText}`);
      }

      // Remove the alert from local state
      setLatestAlerts(prev => prev.filter(alert => alert._id !== alertId));
      
      console.log(`Alert ${alertId} deleted successfully`);
      
      // Show success message
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Alert Deleted', {
          body: 'The alert has been successfully deleted',
          icon: '/icons/success.png'
        });
      }

    } catch (error) {
      console.error('Error deleting alert:', error);
      alert('Failed to delete alert. Please try again.');
    } finally {
      setDeletingAlerts(prev => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
    }
  };

  // Delete all alerts
  const deleteAllAlerts = async () => {
    if (!confirm('Are you sure you want to delete all alerts? This action cannot be undone.')) {
      return;
    }

    setLoadingAlerts(true);

    try {
      const response = await fetch('http://localhost:5000/api/alerts/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete all alerts: ${response.status} ${response.statusText}`);
      }

      // Clear all alerts from local state
      setLatestAlerts([]);
      
      console.log('All alerts deleted successfully');
      
      // Show success message
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('All Alerts Deleted', {
          body: 'All alerts have been successfully deleted',
          icon: '/icons/success.png'
        });
      }

    } catch (error) {
      console.error('Error deleting all alerts:', error);
      alert('Failed to delete all alerts. Please try again.');
    } finally {
      setLoadingAlerts(false);
    }
  };

  // Show alert notification
  const showAlertNotification = (alert: Alert) => {
    setNewAlertNotification(alert);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNewAlertNotification(null);
    }, 5000);

    // Also show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`New ${alert.severity || 'Alert'}`, {
        body: `${formatAlertCategory(alert.category)} detected at ${alert.location}`,
        icon: alert.image_url,
        tag: alert._id
      });
    }
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  // Fetch alerts on component mount and set up polling
  useEffect(() => {
    fetchLatestAlerts();
    
    // Set up polling
    const interval = setInterval(fetchLatestAlerts, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Manual refresh function
  const handleManualRefresh = () => {
    setLoadingAlerts(true);
    fetchLatestAlerts();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-threat text-white animate-pulse";
      case "high": return "bg-warning text-black";
      case "medium": return "bg-amber text-black";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-muted text-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return "🔴";
      case "high": return "🟠";
      case "medium": return "🟡";
      case "low": return "🔵";
      default: return "⚪";
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => {
        console.log("Voice recognition started...");
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Voice input:", transcript);
        // Handle the voice input here
      };
      
      recognition.start();
    } else {
      console.log("Speech recognition not supported in this browser");
    }
  };

  const handleTextQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('query') as string;
    console.log("Text query submitted:", query);
    // Handle AI query here
  };

  // Format alert category for display
  const formatAlertCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <aside className="w-80 border-l border-border bg-card/50 backdrop-blur-sm relative overflow-y-auto h-screen">
      {/* New Alert Notification */}
      {newAlertNotification && (
        <div className="absolute top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-500">
          <div className="glass-panel border-l-4 border-threat rounded-lg p-3 shadow-lg border">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-threat animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <Badge className={`${getSeverityColor(newAlertNotification.severity || 'medium')} text-[10px]`}>
                    {getSeverityIcon(newAlertNotification.severity || 'medium')} {newAlertNotification.severity?.toUpperCase() || 'ALERT'}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-threat"
                      onClick={() => deleteAlert(newAlertNotification._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <button 
                      onClick={() => setNewAlertNotification(null)}
                      className="text-muted-foreground hover:text-foreground text-xs flex-shrink-0 ml-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mb-1 truncate">
                  {formatAlertCategory(newAlertNotification.category)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  📍 {newAlertNotification.location} • 📷 {newAlertNotification.cam_id}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  🕒 {formatRelativeTime(newAlertNotification.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Camera Preview */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
          <Badge variant="outline" className="text-xs">
            <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
            LIVE
          </Badge>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
          <img 
            src={liveCamera.feed} 
            alt={liveCamera.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1 backdrop-blur-sm border border-white/20">
            <p className="text-xs font-medium text-foreground truncate">{liveCamera.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{liveCamera.location}</p>
          </div>
        </div>
      </div>

      {/* Latest Alerts - Enhanced */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
            {!loadingAlerts && latestAlerts.length > 0 && (
              <Badge variant="secondary" className="text-xs h-5">
                {latestAlerts.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-threat" />
            {loadingAlerts && (
              <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />
            )}
            {latestAlerts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={deleteAllAlerts}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Alerts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {loadingAlerts ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-lg p-3 animate-pulse border">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-10"></div>
                </div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : latestAlerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground glass-panel rounded-lg border">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm">No alerts found</p>
            <p className="text-xs mt-1">Alerts will appear here automatically</p>
          </div>
        ) : (
          <div className="space-y-2">
            {latestAlerts.map((alert, index) => (
              <div 
                key={alert._id}
                className={`glass-panel rounded-lg p-3 hover:border-threat/50 transition-all duration-200 cursor-pointer group border hover:shadow-md relative ${
                  deletingAlerts.has(alert._id) ? 'opacity-50' : ''
                }`}
                onClick={() => showAlertNotification(alert)}
              >
                {deletingAlerts.has(alert._id) && (
                  <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center z-10">
                    <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSeverityColor(alert.severity || 'medium')} text-[10px] px-1.5 py-0 h-4`}>
                      {getSeverityIcon(alert.severity || 'medium')} {alert.severity || 'medium'}
                    </Badge>
                    {index === 0 && new Date(alert.timestamp) > new Date(Date.now() - 5 * 60 * 1000) && (
                      <div className="h-2 w-2 rounded-full bg-threat animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2">
                      {formatRelativeTime(alert.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAlert(alert._id);
                      }}
                      disabled={deletingAlerts.has(alert._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-foreground font-medium mb-1 line-clamp-1 group-hover:text-threat transition-colors">
                  {formatAlertCategory(alert.category)}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
                    📍 {alert.location}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
                    📷 {alert.cam_id}
                  </p>
                </div>
                <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button 
                    size="xs" 
                    variant="outline" 
                    className="h-6 text-[10px] flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // View alert details
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="xs" 
                    variant="outline" 
                    className="h-6 text-[10px] flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Resolve alert
                    }}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Resolve
                  </Button>
                  <Button 
                    size="xs" 
                    variant="outline" 
                    className="h-6 text-[10px] text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAlert(alert._id);
                    }}
                    disabled={deletingAlerts.has(alert._id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Refresh and Controls */}
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={handleManualRefresh}
            disabled={loadingAlerts}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${loadingAlerts ? 'animate-spin' : ''}`} />
            {loadingAlerts ? "Refreshing..." : "Refresh"}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setRefreshInterval(refreshInterval === 30000 ? 10000 : 30000)}
          >
            {refreshInterval === 30000 ? "10s" : "30s"}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Auto-refresh: {refreshInterval / 1000}s • Last update: {lastFetchTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Enhanced Agent Bot Section */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75 scale-110"></div>
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse scale-105"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Agent</h3>
            <p className="text-sm text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        
        <form onSubmit={handleTextQuery} className="space-y-3">
          <div className="relative">
            <Input 
              name="query"
              placeholder="Ask me anything about security..."
              className="pr-20 glass-panel border-blue-300 focus:border-blue-500 text-sm focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                onClick={handleVoiceInput}
                title="Voice input"
              >
                <Mic className="h-3 w-3 text-blue-500" />
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                title="Send message"
              >
                <ArrowRight className="h-3 w-3 text-blue-500" />
              </Button>
            </div>
          </div>
        </form>
        
        <div className="flex flex-wrap gap-1 mt-3 justify-center">
          <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-blue-50">
            Show alerts
          </Badge>
          <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-blue-50">
            Camera status
          </Badge>
          <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-blue-50">
            Recent activity
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Ask about alerts, cameras, or security status
        </p>
      </div>

      {/* Today's Operations */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Today's Operations</h3>
          <Badge variant="outline" className="text-xs">
            Active
          </Badge>
        </div>
        <div className="space-y-2">
          {mockOperations.map((op, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-2 text-xs group hover:bg-muted/50 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="h-3 w-3 text-tactical mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground text-xs leading-tight group-hover:text-foreground transition-colors flex-1">
                {op}
              </span>
              {idx === 0 && (
                <Badge className="h-4 text-[8px] bg-tactical/20 text-tactical">
                  Live
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        {/* System Status */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">System Status</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 font-medium">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};