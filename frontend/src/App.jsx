// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { MainLayout } from "./components/layout/MainLayout";
// // import Dashboard from "./pages/Dashboard";
// // import Alerts from "./pages/Alerts";
// // import LiveEvidence from "./pages/evidence/LiveEvidence";
// // import UploadSummarize from "./pages/evidence/UploadSummarize";
// // import Weapons from "./pages/detections/Weapons";
// // import Wanted from "./pages/detections/Wanted";
// // import Bags from "./pages/detections/Bags";
// // import Loitering from "./pages/detections/Loitering";
// // import Anomalies from "./pages/detections/Anomalies";
// // import Cases from "./pages/Cases";
// // import Teams from "./pages/Teams";
// // import Reports from "./pages/Reports";
// // import Settings from "./pages/Settings";
// // import NotFound from "./pages/NotFound";

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <Toaster />
// //       <Sonner />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
// //           <Route path="/alerts" element={<MainLayout><Alerts /></MainLayout>} />
// //           <Route path="/evidence" element={<MainLayout><LiveEvidence /></MainLayout>} />
// //           <Route path="/evidence/live" element={<MainLayout><LiveEvidence /></MainLayout>} />
// //           <Route path="/evidence/upload" element={<MainLayout><UploadSummarize /></MainLayout>} />
// //           <Route path="/feeds" element={<MainLayout><Dashboard /></MainLayout>} />
// //           <Route path="/detections/weapons" element={<MainLayout><Weapons /></MainLayout>} />
// //           <Route path="/detections/wanted" element={<MainLayout><Wanted /></MainLayout>} />
// //           <Route path="/detections/bags" element={<MainLayout><Bags /></MainLayout>} />
// //           <Route path="/detections/loitering" element={<MainLayout><Loitering /></MainLayout>} />
// //           <Route path="/detections/anomalies" element={<MainLayout><Anomalies /></MainLayout>} />
// //           <Route path="/cases" element={<MainLayout><Cases /></MainLayout>} />
// //           <Route path="/teams" element={<MainLayout><Teams /></MainLayout>} />
// //           <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
// //           <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// // );

// // export default App;








import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import LiveEvidence from "./pages/evidence/LiveEvidence";
import UploadSummarize from "./pages/evidence/UploadSummarize";
import Cases from "./pages/Cases";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
// import MissingWanted from "./pages/MissingWanted";
import MissingWanted from "./pages/MissingWanted"; // this will resolve to index.tsx


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/alerts" element={<MainLayout><Alerts /></MainLayout>} />

          <Route path="/evidence" element={<MainLayout><LiveEvidence /></MainLayout>} />
          <Route path="/evidence/live" element={<MainLayout><LiveEvidence /></MainLayout>} />
          <Route path="/evidence/upload" element={<MainLayout><UploadSummarize /></MainLayout>} />

          <Route path="/feeds" element={<MainLayout><Dashboard /></MainLayout>} />


          {/* ✅ NEW standalone Missing/Wanted page (not inside detections) */}
          <Route path="/detections/missing-wanted" element={<MainLayout><MissingWanted /></MainLayout>} />

          <Route path="/cases" element={<MainLayout><Cases /></MainLayout>} />
          <Route path="/teams" element={<MainLayout><Teams /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;






