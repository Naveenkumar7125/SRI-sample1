// import { mockCases } from "@/lib/mockData";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search, Plus, Eye, FileText } from "lucide-react";

// export default function Cases() {
//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "critical": return "bg-threat text-white";
//       case "high": return "bg-warning text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active": return "bg-tactical text-white";
//       case "investigating": return "bg-amber text-black";
//       case "resolved": return "bg-muted text-foreground";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Mission Management</h1>
//           <p className="text-muted-foreground">Track and manage security incidents</p>
//         </div>
//         <Button className="bg-threat hover:bg-threat/90 gap-2">
//           <Plus className="h-4 w-4" />
//           New Case
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input 
//           placeholder="Search cases..."
//           className="pl-10 glass-panel border-border"
//         />
//       </div>

//       {/* Cases List */}
//       <div className="space-y-3">
//         {mockCases.map((caseItem) => (
//           <Card key={caseItem.id} className="glass-panel border-border p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Badge className={getPriorityColor(caseItem.priority)}>
//                     {caseItem.priority.toUpperCase()}
//                   </Badge>
//                   <Badge className={getStatusColor(caseItem.status)}>
//                     {caseItem.status.toUpperCase()}
//                   </Badge>
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-1">{caseItem.title}</h3>
//                 <p className="text-sm text-muted-foreground">Case ID: {caseItem.id}</p>
//               </div>
//               <div className="text-right text-sm text-muted-foreground">
//                 <div>{new Date(caseItem.created).toLocaleDateString()}</div>
//                 <div>{new Date(caseItem.created).toLocaleTimeString()}</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
//               <div>
//                 <span className="text-muted-foreground">Officer:</span>
//                 <div className="font-medium text-foreground">{caseItem.officer}</div>
//               </div>
//               <div>
//                 <span className="text-muted-foreground">Evidence:</span>
//                 <div className="font-medium text-foreground">{caseItem.evidenceCount} items</div>
//               </div>
//               <div>
//                 <span className="text-muted-foreground">Status:</span>
//                 <div className="font-medium text-foreground">{caseItem.status}</div>
//               </div>
//             </div>

//             <div className="mb-4 p-3 rounded-lg bg-accent">
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-semibold text-foreground">Notes: </span>
//                 {caseItem.notes}
//               </p>
//             </div>

//             <div className="flex gap-2">
//               <Button size="sm" variant="outline">
//                 <Eye className="h-3 w-3 mr-1" />
//                 View Details
//               </Button>
//               <Button size="sm" variant="outline">
//                 <FileText className="h-3 w-3 mr-1" />
//                 Export Report
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }










import { mockCases, mockEvidence } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, FileText, Trash2, X, Download, Play, FolderPlus, Calendar, User, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Cases() {
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Get cases from localStorage or use mock data as fallback
  const getCases = () => {
    if (typeof window === 'undefined') return mockCases;
    
    const storedCases = localStorage.getItem('cases');
    if (storedCases) {
      return JSON.parse(storedCases);
    }
    return mockCases;
  };

  const cases = getCases();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-threat text-white";
      case "high": return "bg-warning text-black";
      default: return "bg-muted text-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-tactical text-white";
      case "investigating": return "bg-amber text-black";
      case "resolved": return "bg-muted text-foreground";
      default: return "bg-muted text-foreground";
    }
  };

  const handleDeleteCase = (caseId: string) => {
    const updatedCases = cases.filter((caseItem: any) => caseItem.id !== caseId);
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    
    toast({
      title: "Case deleted",
      description: "The case has been successfully removed.",
    });
    
    window.location.reload();
  };

  const handleClearAllCases = () => {
    localStorage.removeItem('cases');
    toast({
      title: "All cases cleared",
      description: "All custom cases have been removed.",
    });
    window.location.reload();
  };

  const handleViewDetails = (caseItem: any) => {
    setSelectedCase(caseItem);
    setShowDetails(true);
  };

  const handleExportPDF = (caseItem: any) => {
    toast({
      title: "Exporting PDF",
      description: `Preparing PDF report for ${caseItem.title}`,
    });
    
    // Simulate PDF export
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `case-report-${caseItem.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "PDF Exported",
        description: "Case report has been downloaded successfully.",
      });
    }, 1500);
  };

  // Get evidence for selected case
  const getCaseEvidence = (caseId: string) => {
    return mockEvidence.filter(evidence => evidence.caseId === caseId);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Case Management</h1>
            <p className="text-muted-foreground">Track and manage security incidents</p>
          </div>
          <div className="flex gap-2">
            {cases.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleClearAllCases}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
            <Button className="bg-threat hover:bg-threat/90 gap-2">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search cases..."
            className="pl-10 glass-panel border-border"
          />
        </div>

        {/* Cases List */}
        <div className="space-y-3">
          {cases.map((caseItem: any) => (
            <Card key={caseItem.id} className="glass-panel border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getPriorityColor(caseItem.priority)}>
                      {caseItem.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status.toUpperCase()}
                    </Badge>
                    {caseItem.alertSource && (
                      <Badge variant="outline" className="text-xs">
                        From Alert
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{caseItem.title}</h3>
                  <p className="text-sm text-muted-foreground">Case ID: {caseItem.id}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground shrink-0 ml-4">
                  <div>{new Date(caseItem.created).toLocaleDateString()}</div>
                  <div>{new Date(caseItem.created).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Officer:</span>
                  <div className="font-medium text-foreground">{caseItem.officer}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Evidence:</span>
                  <div className="font-medium text-foreground">{caseItem.evidenceCount} items</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="font-medium text-foreground">{caseItem.status}</div>
                </div>
              </div>

              <div className="mb-4 p-3 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Notes: </span>
                  {caseItem.notes}
                </p>
              </div>

              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDetails(caseItem)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleExportPDF(caseItem)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Export Report
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeleteCase(caseItem.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {cases.length === 0 && (
          <Card className="glass-panel border-border p-8 text-center">
            <p className="text-muted-foreground mb-4">No cases found.</p>
            <Button className="bg-threat hover:bg-threat/90 gap-2">
              <Plus className="h-4 w-4" />
              Create New Case
            </Button>
          </Card>
        )}
      </div>

      {/* Case Details Modal */}
      {showDetails && selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Case Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Case Overview */}
              <Card className="glass-panel border-border p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-tactical/20 rounded-lg">
                      <Calendar className="h-5 w-5 text-tactical" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-semibold text-foreground">
                        {new Date(selectedCase.created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <User className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Officer</p>
                      <p className="font-semibold text-foreground">{selectedCase.officer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber/20 rounded-lg">
                      <Camera className="h-5 w-5 text-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Evidence Items</p>
                      <p className="font-semibold text-foreground">
                        {getCaseEvidence(selectedCase.id).length} items
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(selectedCase.priority)}>
                        {selectedCase.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(selectedCase.status)}>
                        {selectedCase.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Case Notes */}
                <div className="p-4 rounded-lg bg-accent">
                  <h3 className="font-semibold text-foreground mb-2">Case Notes</h3>
                  <p className="text-sm text-muted-foreground">{selectedCase.notes}</p>
                </div>
              </Card>

              {/* Evidence Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">Case Evidence</h3>
                  <Badge variant="outline" className="text-sm">
                    {getCaseEvidence(selectedCase.id).length} items
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCaseEvidence(selectedCase.id).map((item) => (
                    <Card key={item.id} className="glass-panel border-border overflow-hidden group">
                      <div className="relative aspect-video bg-muted">
                        <img 
                          src={item.thumbnail}
                          alt={item.type}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm">
                            <Play className="h-6 w-6 text-white" />
                          </Button>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-threat text-white text-xs">
                          {item.type}
                        </Badge>
                        <div className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                          {item.duration}
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">{item.type}</h3>
                          <p className="text-xs text-muted-foreground">{item.camera}</p>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
                            <FolderPlus className="h-3 w-3 mr-1" />
                            Analyze
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {getCaseEvidence(selectedCase.id).length === 0 && (
                  <Card className="glass-panel border-border p-8 text-center">
                    <p className="text-muted-foreground">No evidence items found for this case.</p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
