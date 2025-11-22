// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Upload, FileVideo, Sparkles } from "lucide-react";

// export default function UploadSummarize() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Upload & AI Summarize</h1>
//         <p className="text-muted-foreground">Upload video footage for AI-powered analysis</p>
//       </div>

//       {/* Upload Area */}
//       <Card className="glass-panel border-border border-dashed border-2 p-12">
//         <div className="flex flex-col items-center justify-center text-center space-y-4">
//           <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
//             <Upload className="h-10 w-10 text-muted-foreground" />
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Drop files or folders here
//             </h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Supports MP4, AVI, MOV and other video formats
//             </p>
//             <Button className="bg-threat hover:bg-threat/90">
//               <FileVideo className="h-4 w-4 mr-2" />
//               Browse Files
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* AI Summary Preview */}
//       <Card className="glass-panel border-border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <Sparkles className="h-5 w-5 text-tactical" />
//           <h3 className="text-lg font-semibold text-foreground">AI Summary Example</h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div>
//               <h4 className="text-sm font-semibold text-foreground mb-2">Event Timeline</h4>
//               <div className="space-y-2">
//                 {[
//                   { time: "00:00:12", event: "Individual enters frame" },
//                   { time: "00:01:34", event: "Suspicious behavior detected" },
//                   { time: "00:02:45", event: "Object identification: weapon" },
//                   { time: "00:03:12", event: "Alert triggered" },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex gap-3 text-sm">
//                     <span className="text-tactical font-mono">{item.time}</span>
//                     <span className="text-muted-foreground">{item.event}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-sm font-semibold text-foreground mb-2">Activity Heatmap</h4>
//               <div className="h-24 rounded-lg bg-gradient-to-r from-tactical/20 via-warning/20 to-threat/20 flex items-end gap-1 p-2">
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <div 
//                     key={i} 
//                     className="flex-1 bg-tactical rounded-t"
//                     style={{ height: `${Math.random() * 100}%` }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-sm font-semibold text-foreground mb-2">Key Moment Snapshots</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="aspect-video rounded-lg bg-muted" />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 p-4 rounded-lg bg-accent">
//           <h4 className="text-sm font-semibold text-foreground mb-2">Summary Report</h4>
//           <p className="text-sm text-muted-foreground">
//             Video analysis detected potential threat at 00:02:45. Subject identified carrying 
//             suspicious object classified as firearm with 94% confidence. Recommended immediate 
//             response and evidence preservation.
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// }


// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Upload, FileVideo, Sparkles, Download } from "lucide-react";
// import { useRef, useState } from "react";

// export default function UploadSummarize() {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const folderInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedItem, setUploadedItem] = useState<string | null>(null);

//   const handleFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFolderUpload = () => {
//     folderInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setUploadedItem(file.name);
//       // Here you would handle the file upload and processing
//       console.log("File uploaded:", file.name);
//     }
//   };

//   const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const folderName = files[0].webkitRelativePath.split('/')[0];
//       setUploadedItem(folderName);
//       // Here you would handle the folder upload and processing
//       console.log("Folder uploaded:", folderName);
//       console.log("Files in folder:", files.length);
//     }
//   };

//   const handleDownloadPDF = () => {
//     // Create PDF content based on the summary data
//     const summaryData = {
//       timeline: [
//         { time: "00:00:12", event: "Individual enters frame" },
//         { time: "00:01:34", event: "Suspicious behavior detected" },
//         { time: "00:02:45", event: "Object identification: weapon" },
//         { time: "00:03:12", event: "Alert triggered" },
//       ],
//       summary: "Video analysis detected potential threat at 00:02:45. Subject identified carrying suspicious object classified as firearm with 94% confidence. Recommended immediate response and evidence preservation."
//     };

//     // In a real application, you would generate a proper PDF here
//     // For demo purposes, we'll create a simple text file
//     const pdfContent = `
// AI Video Analysis Report
// Generated: ${new Date().toLocaleString()}
// Uploaded Item: ${uploadedItem || 'Unknown'}

// EVENT TIMELINE:
// ${summaryData.timeline.map(item => `${item.time} - ${item.event}`).join('\n')}

// SUMMARY:
// ${summaryData.summary}

// Threat Level: High
// Confidence: 94%
// Recommended Action: Immediate Response
//     `;

//     const blob = new Blob([pdfContent], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `video-analysis-report-${new Date().getTime()}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Upload & AI Summarize</h1>
//         <p className="text-muted-foreground">Upload video footage for AI-powered analysis</p>
//       </div>

//       {/* Upload Area */}
//       <Card className="glass-panel border-border border-dashed border-2 p-12">
//         <div className="flex flex-col items-center justify-center text-center space-y-4">
//           <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
//             <Upload className="h-10 w-10 text-muted-foreground" />
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Drop files or folders here
//             </h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Supports MP4, AVI, MOV and other video formats
//             </p>
            
//             {/* Upload Status */}
//             {uploadedItem && (
//               <div className="mb-4 p-3 rounded-lg bg-accent/20 border border-accent">
//                 <p className="text-sm text-foreground">
//                   <span className="font-semibold">Uploaded:</span> {uploadedItem}
//                 </p>
//               </div>
//             )}

//             <div className="flex gap-3 justify-center">
//               <Button 
//                 className="bg-threat hover:bg-threat/90"
//                 onClick={handleFileUpload}
//               >
//                 <FileVideo className="h-4 w-4 mr-2" />
//                 Upload File
//               </Button>
              
//               <Button 
//                 variant="outline"
//                 onClick={handleFolderUpload}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Folder
//               </Button>
//             </div>

//             {/* Hidden file inputs */}
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
//               className="hidden"
//             />
//             <input
//               type="file"
//               ref={folderInputRef}
//               onChange={handleFolderChange}
//               accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
//               webkitdirectory=""
//               className="hidden"
//             />
//           </div>
//         </div>
//       </Card>

//       {/* AI Summary Preview */}
//       <Card className="glass-panel border-border p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <Sparkles className="h-5 w-5 text-tactical" />
//             <h3 className="text-lg font-semibold text-foreground">
//               AI Summary {uploadedItem && `- ${uploadedItem}`}
//             </h3>
//           </div>

//           <Button 
//             onClick={handleDownloadPDF}
//             disabled={!uploadedItem}
//             className="bg-tactical hover:bg-tactical/90"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Download PDF
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div>
//               <h4 className="text-sm font-semibold text-foreground mb-2">Event Timeline</h4>
//               <div className="space-y-2">
//                 {[
//                   { time: "00:00:12", event: "Individual enters frame" },
//                   { time: "00:01:34", event: "Suspicious behavior detected" },
//                   { time: "00:02:45", event: "Object identification: weapon" },
//                   { time: "00:03:12", event: "Alert triggered" },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex gap-3 text-sm">
//                     <span className="text-tactical font-mono">{item.time}</span>
//                     <span className="text-muted-foreground">{item.event}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-sm font-semibold text-foreground mb-2">Activity Heatmap</h4>
//               <div className="h-24 rounded-lg bg-gradient-to-r from-tactical/20 via-warning/20 to-threat/20 flex items-end gap-1 p-2">
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <div 
//                     key={i} 
//                     className="flex-1 bg-tactical rounded-t"
//                     style={{ height: `${Math.random() * 100}%` }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-sm font-semibold text-foreground mb-2">Key Moment Snapshots</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="aspect-video rounded-lg bg-muted" />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 p-4 rounded-lg bg-accent">
//           <h4 className="text-sm font-semibold text-foreground mb-2">Summary Report</h4>
//           <p className="text-sm text-muted-foreground">
//             Video analysis detected potential threat at 00:02:45. Subject identified carrying 
//             suspicious object classified as firearm with 94% confidence. Recommended immediate 
//             response and evidence preservation.
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// }











// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Upload, FileVideo, Sparkles, Download, Play, Pause, Clock, FolderOpen } from "lucide-react";
// import { useRef, useState } from "react";

// interface VideoFile {
//   name: string;
//   path: string;
//   size: number;
//   type: string;
// }

// interface AnalysisResult {
//   fileName: string;
//   summary: string;
//   timeline: { time: string; event: string }[];
//   threatLevel: "low" | "medium" | "high";
//   confidence: number;
//   keyFrames: string[];
//   duration: string;
// }

// interface DetectedFrame {
//   videoName: string;
//   timestamp: string;
//   duration: string;
//   description: string;
//   thumbnail: string;
// }

// export default function UploadSummarize() {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const folderInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedFiles, setUploadedFiles] = useState<VideoFile[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
//   const [detectedFrames, setDetectedFrames] = useState<DetectedFrame[]>([]);
//   const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);

//   const handleFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFolderUpload = () => {
//     folderInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length > 0) {
//       const videoFiles: VideoFile[] = files.map(file => ({
//         name: file.name,
//         path: URL.createObjectURL(file),
//         size: file.size,
//         type: file.type
//       }));
//       setUploadedFiles(videoFiles);
//     }
//   };

//   const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length > 0) {
//       const videoFiles: VideoFile[] = files
//         .filter(file => file.type.startsWith('video/'))
//         .map(file => ({
//           name: file.name,
//           path: URL.createObjectURL(file),
//           size: file.size,
//           type: file.type
//         }));
//       setUploadedFiles(videoFiles);
//     }
//   };

//   const analyzeFolder = async () => {
//     setIsAnalyzing(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 3000));
    
//     // Mock analysis results
//     const mockResults: AnalysisResult[] = uploadedFiles.map((file, index) => ({
//       fileName: file.name,
//       summary: `Analysis detected ${index % 3 === 0 ? 'suspicious activity' : 'normal behavior'} throughout the video. ${index % 3 === 0 ? 'Potential threat identified with recommended review.' : 'No immediate threats detected.'}`,
//       timeline: [
//         { time: "00:00:12", event: "Individual enters frame" },
//         { time: "00:01:34", event: index % 3 === 0 ? "Suspicious behavior detected" : "Normal movement observed" },
//         { time: "00:02:45", event: index % 3 === 0 ? "Object identification: potential weapon" : "Subject exits frame" },
//         { time: "00:03:12", event: index % 3 === 0 ? "Alert triggered" : "Video ends" },
//       ],
//       threatLevel: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
//       confidence: 85 + (index * 3),
//       keyFrames: Array(4).fill(null).map((_, i) => `frame-${index}-${i}.jpg`),
//       duration: `00:0${index + 1}:30`
//     }));

//     // Mock detected frames
//     const mockFrames: DetectedFrame[] = [
//       {
//         videoName: uploadedFiles[0]?.name || "video1.mp4",
//         timestamp: "00:01:15",
//         duration: "5s",
//         description: "Suspicious movement detected near entrance",
//         thumbnail: "frame-1.jpg"
//       },
//       {
//         videoName: uploadedFiles[1]?.name || "video2.mp4",
//         timestamp: "00:02:30",
//         duration: "3s",
//         description: "Multiple individuals gathering",
//         thumbnail: "frame-2.jpg"
//       },
//       {
//         videoName: uploadedFiles[2]?.name || "video3.mp4",
//         timestamp: "00:00:45",
//         duration: "7s",
//         description: "Unusual object transfer detected",
//         thumbnail: "frame-3.jpg"
//       },
//       {
//         videoName: uploadedFiles[0]?.name || "video1.mp4",
//         timestamp: "00:03:20",
//         duration: "4s",
//         description: "Rapid movement in restricted area",
//         thumbnail: "frame-4.jpg"
//       }
//     ];

//     setAnalysisResults(mockResults);
//     setDetectedFrames(mockFrames);
//     setIsAnalyzing(false);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `
// AI Video Analysis Report
// Generated: ${new Date().toLocaleString()}
// Total Files Analyzed: ${uploadedFiles.length}

// ${analysisResults.map(result => `
// FILE: ${result.fileName}
// Duration: ${result.duration}
// Threat Level: ${result.threatLevel.toUpperCase()}
// Confidence: ${result.confidence}%

// TIMELINE:
// ${result.timeline.map(item => `  ${item.time} - ${item.event}`).join('\n')}

// SUMMARY:
// ${result.summary}

// ${'='.repeat(50)}
// `).join('')}

// DETECTED FRAMES:
// ${detectedFrames.map(frame => `
// Video: ${frame.videoName}
// Timestamp: ${frame.timestamp}
// Duration: ${frame.duration}
// Description: ${frame.description}
// `).join('\n')}
//     `;

//     const blob = new Blob([pdfContent], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `video-analysis-report-${new Date().getTime()}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Upload & AI Summarize</h1>
//         <p className="text-muted-foreground">Upload video footage for AI-powered analysis</p>
//       </div>

//       {/* Upload Area */}
//       <Card className="glass-panel border-border border-dashed border-2 p-12">
//         <div className="flex flex-col items-center justify-center text-center space-y-4">
//           <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
//             <Upload className="h-10 w-10 text-muted-foreground" />
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Drop files or folders here
//             </h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Supports MP4, AVI, MOV and other video formats
//             </p>
            
//             {/* Upload Status */}
//             {uploadedFiles.length > 0 && (
//               <div className="mb-4 p-4 rounded-lg bg-accent/20 border border-accent max-w-md">
//                 <div className="flex items-center gap-2 mb-2">
//                   <FolderOpen className="h-4 w-4 text-tactical" />
//                   <p className="text-sm font-semibold text-foreground">
//                     {uploadedFiles.length} video file(s) selected
//                   </p>
//                 </div>
//                 <div className="max-h-32 overflow-y-auto space-y-1">
//                   {uploadedFiles.map((file, index) => (
//                     <div key={index} className="flex justify-between text-xs text-muted-foreground">
//                       <span className="truncate flex-1 mr-2">{file.name}</span>
//                       <span>{formatFileSize(file.size)}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex gap-3 justify-center">
//               <Button 
//                 className="bg-threat hover:bg-threat/90"
//                 onClick={handleFileUpload}
//               >
//                 <FileVideo className="h-4 w-4 mr-2" />
//                 Upload File
//               </Button>
              
//               <Button 
//                 variant="outline"
//                 onClick={handleFolderUpload}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Folder
//               </Button>

//               {uploadedFiles.length > 0 && (
//                 <Button 
//                   onClick={analyzeFolder}
//                   disabled={isAnalyzing}
//                   className="bg-tactical hover:bg-tactical/90"
//                 >
//                   <Sparkles className="h-4 w-4 mr-2" />
//                   {isAnalyzing ? "Analyzing..." : "Analyze Folder"}
//                 </Button>
//               )}
//             </div>

//             {/* Hidden file inputs */}
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
//               multiple
//               className="hidden"
//             />
//             <input
//               type="file"
//               ref={folderInputRef}
//               onChange={handleFolderChange}
//               accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
//               webkitdirectory=""
//               multiple
//               className="hidden"
//             />
//           </div>
//         </div>
//       </Card>

//       {/* Analysis Results */}
//       {analysisResults.length > 0 && (
//         <div className="space-y-6">
//           {/* AI Summary for each file */}
//           {analysisResults.map((result, index) => (
//             <Card key={index} className="glass-panel border-border p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <FileVideo className="h-5 w-5 text-tactical" />
//                   <h3 className="text-lg font-semibold text-foreground">{result.fileName}</h3>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     result.threatLevel === 'high' ? 'bg-threat/20 text-threat' : 
//                     result.threatLevel === 'medium' ? 'bg-warning/20 text-warning' : 
//                     'bg-success/20 text-success'
//                   }`}>
//                     {result.threatLevel.toUpperCase()} THREAT
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Confidence: {result.confidence}%
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-sm font-semibold text-foreground mb-2">Event Timeline</h4>
//                     <div className="space-y-2">
//                       {result.timeline.map((item, idx) => (
//                         <div key={idx} className="flex gap-3 text-sm">
//                           <span className="text-tactical font-mono">{item.time}</span>
//                           <span className="text-muted-foreground">{item.event}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-semibold text-foreground mb-2">Video Duration</h4>
//                     <div className="flex items-center gap-2 text-tactical">
//                       <Clock className="h-4 w-4" />
//                       <span className="font-mono">{result.duration}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-sm font-semibold text-foreground mb-2">Key Moment Snapshots</h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {result.keyFrames.map((frame, i) => (
//                       <div key={i} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
//                         <div className="text-xs text-muted-foreground">Frame {i + 1}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 p-4 rounded-lg bg-accent">
//                 <h4 className="text-sm font-semibold text-foreground mb-2">Summary Report</h4>
//                 <p className="text-sm text-muted-foreground">{result.summary}</p>
//               </div>
//             </Card>
//           ))}

//           {/* Detected Frames Section */}
//           <Card className="glass-panel border-border p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="h-5 w-5 text-tactical" />
//                 <h3 className="text-lg font-semibold text-foreground">Detected Frames & Clips</h3>
//               </div>
//               <Button 
//                 onClick={handleDownloadPDF}
//                 className="bg-tactical hover:bg-tactical/90"
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Full Report
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {detectedFrames.map((frame, index) => (
//                 <Card key={index} className="border-border p-4">
//                   <div className="aspect-video rounded-lg bg-muted mb-3 flex items-center justify-center relative">
//                     <div className="text-xs text-muted-foreground">Video Preview</div>
//                     <Button 
//                       size="sm" 
//                       className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70"
//                       onClick={() => setCurrentPlayingVideo(currentPlayingVideo === frame.videoName ? null : frame.videoName)}
//                     >
//                       {currentPlayingVideo === frame.videoName ? (
//                         <Pause className="h-3 w-3" />
//                       ) : (
//                         <Play className="h-3 w-3" />
//                       )}
//                     </Button>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-start">
//                       <h4 className="text-sm font-semibold text-foreground truncate flex-1">
//                         {frame.videoName}
//                       </h4>
//                       <span className="text-xs text-tactical bg-tactical/10 px-2 py-1 rounded">
//                         {frame.duration}
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                       <Clock className="h-3 w-3" />
//                       <span>{frame.timestamp}</span>
//                     </div>
                    
//                     <p className="text-xs text-muted-foreground line-clamp-2">
//                       {frame.description}
//                     </p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }














import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileVideo, Sparkles, Download, Play, Pause, Clock, FolderOpen, X, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface VideoFile {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface AnalysisResult {
  fileName: string;
  summary: string;
  timeline: { time: string; event: string }[];
  threatLevel: "low" | "medium" | "high";
  confidence: number;
  keyFrames: string[];
  duration: string;
}

interface DetectedFrame {
  videoName: string;
  timestamp: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export default function UploadSummarize() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<VideoFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [detectedFrames, setDetectedFrames] = useState<DetectedFrame[]>([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFolderUpload = () => {
    folderInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const videoFiles: VideoFile[] = files.map(file => ({
        name: file.name,
        path: URL.createObjectURL(file),
        size: file.size,
        type: file.type
      }));
      setUploadedFiles(prev => [...prev, ...videoFiles]);
    }
    // Reset input value to allow uploading same file again
    event.target.value = '';
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const videoFiles: VideoFile[] = files
        .filter(file => file.type.startsWith('video/'))
        .map(file => ({
          name: file.name,
          path: URL.createObjectURL(file),
          size: file.size,
          type: file.type
        }));
      setUploadedFiles(prev => [...prev, ...videoFiles]);
    }
    // Reset input value to allow uploading same folder again
    event.target.value = '';
  };

  const deleteFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(newFiles[index].path);
      newFiles.splice(index, 1);
      return newFiles;
    });
    
    // Clear analysis results if no files remain
    if (uploadedFiles.length === 1) {
      setAnalysisResults([]);
      setDetectedFrames([]);
    }
  };

  const clearAllFiles = () => {
    // Revoke all object URLs to prevent memory leaks
    uploadedFiles.forEach(file => URL.revokeObjectURL(file.path));
    setUploadedFiles([]);
    setAnalysisResults([]);
    setDetectedFrames([]);
  };

  const analyzeFolder = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockResults: AnalysisResult[] = uploadedFiles.map((file, index) => ({
      fileName: file.name,
      summary: `Analysis detected ${index % 3 === 0 ? 'suspicious activity' : 'normal behavior'} throughout the video. ${index % 3 === 0 ? 'Potential threat identified with recommended review.' : 'No immediate threats detected.'}`,
      timeline: [
        { time: "00:00:12", event: "Individual enters frame" },
        { time: "00:01:34", event: index % 3 === 0 ? "Suspicious behavior detected" : "Normal movement observed" },
        { time: "00:02:45", event: index % 3 === 0 ? "Object identification: potential weapon" : "Subject exits frame" },
        { time: "00:03:12", event: index % 3 === 0 ? "Alert triggered" : "Video ends" },
      ],
      threatLevel: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
      confidence: 85 + (index * 3),
      keyFrames: Array(4).fill(null).map((_, i) => `frame-${index}-${i}.jpg`),
      duration: `00:0${index + 1}:30`
    }));

    // Mock detected frames
    const mockFrames: DetectedFrame[] = [
      {
        videoName: uploadedFiles[0]?.name || "video1.mp4",
        timestamp: "00:01:15",
        duration: "5s",
        description: "Suspicious movement detected near entrance",
        thumbnail: "frame-1.jpg"
      },
      {
        videoName: uploadedFiles[1]?.name || "video2.mp4",
        timestamp: "00:02:30",
        duration: "3s",
        description: "Multiple individuals gathering",
        thumbnail: "frame-2.jpg"
      },
      {
        videoName: uploadedFiles[2]?.name || "video3.mp4",
        timestamp: "00:00:45",
        duration: "7s",
        description: "Unusual object transfer detected",
        thumbnail: "frame-3.jpg"
      },
      {
        videoName: uploadedFiles[0]?.name || "video1.mp4",
        timestamp: "00:03:20",
        duration: "4s",
        description: "Rapid movement in restricted area",
        thumbnail: "frame-4.jpg"
      }
    ];

    setAnalysisResults(mockResults);
    setDetectedFrames(mockFrames);
    setIsAnalyzing(false);
  };

  const handleDownloadPDF = () => {
    const pdfContent = `
AI Video Analysis Report
Generated: ${new Date().toLocaleString()}
Total Files Analyzed: ${uploadedFiles.length}

${analysisResults.map(result => `
FILE: ${result.fileName}
Duration: ${result.duration}
Threat Level: ${result.threatLevel.toUpperCase()}
Confidence: ${result.confidence}%

TIMELINE:
${result.timeline.map(item => `  ${item.time} - ${item.event}`).join('\n')}

SUMMARY:
${result.summary}

${'='.repeat(50)}
`).join('')}

DETECTED FRAMES:
${detectedFrames.map(frame => `
Video: ${frame.videoName}
Timestamp: ${frame.timestamp}
Duration: ${frame.duration}
Description: ${frame.description}
`).join('\n')}
    `;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-analysis-report-${new Date().getTime()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload & AI Summarize</h1>
        <p className="text-muted-foreground">Upload video footage for AI-powered analysis</p>
      </div>

      {/* Upload Area */}
      <Card className="glass-panel border-border border-dashed border-2 p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Drop files or folders here
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports MP4, AVI, MOV and other video formats
            </p>
            
            {/* Upload Status */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 p-4 rounded-lg bg-accent/20 border border-accent max-w-md w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-tactical" />
                    <p className="text-sm font-semibold text-foreground">
                      {uploadedFiles.length} video file(s) selected
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFiles}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-threat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between group hover:bg-accent/30 rounded px-2 py-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileVideo className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs text-muted-foreground truncate flex-1">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFile(index)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-threat"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              <Button 
                className="bg-threat hover:bg-threat/90"
                onClick={handleFileUpload}
              >
                <FileVideo className="h-4 w-4 mr-2" />
                Upload File
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleFolderUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Folder
              </Button>

              {uploadedFiles.length > 0 && (
                <Button 
                  onClick={analyzeFolder}
                  disabled={isAnalyzing}
                  className="bg-tactical hover:bg-tactical/90"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Analyze Folder"}
                </Button>
              )}
            </div>

            {/* Hidden file inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
              multiple
              className="hidden"
            />
            <input
              type="file"
              ref={folderInputRef}
              onChange={handleFolderChange}
              accept=".mp4,.avi,.mov,.mkv,.wmv,.flv,.webm"
              webkitdirectory=""
              multiple
              className="hidden"
            />
          </div>
        </div>
      </Card>

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <div className="space-y-6">
          {/* AI Summary for each file */}
          {analysisResults.map((result, index) => (
            <Card key={index} className="glass-panel border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileVideo className="h-5 w-5 text-tactical" />
                  <h3 className="text-lg font-semibold text-foreground">{result.fileName}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    result.threatLevel === 'high' ? 'bg-threat/20 text-threat' : 
                    result.threatLevel === 'medium' ? 'bg-warning/20 text-warning' : 
                    'bg-success/20 text-success'
                  }`}>
                    {result.threatLevel.toUpperCase()} THREAT
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence: {result.confidence}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Event Timeline</h4>
                    <div className="space-y-2">
                      {result.timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-3 text-sm">
                          <span className="text-tactical font-mono">{item.time}</span>
                          <span className="text-muted-foreground">{item.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Video Duration</h4>
                    <div className="flex items-center gap-2 text-tactical">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono">{result.duration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Moment Snapshots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {result.keyFrames.map((frame, i) => (
                      <div key={i} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <div className="text-xs text-muted-foreground">Frame {i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-accent">
                <h4 className="text-sm font-semibold text-foreground mb-2">Summary Report</h4>
                <p className="text-sm text-muted-foreground">{result.summary}</p>
              </div>
            </Card>
          ))}

          {/* Detected Frames Section */}
          <Card className="glass-panel border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-tactical" />
                <h3 className="text-lg font-semibold text-foreground">Detected Frames & Clips</h3>
              </div>
              <Button 
                onClick={handleDownloadPDF}
                className="bg-tactical hover:bg-tactical/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detectedFrames.map((frame, index) => (
                <Card key={index} className="border-border p-4">
                  <div className="aspect-video rounded-lg bg-muted mb-3 flex items-center justify-center relative">
                    <div className="text-xs text-muted-foreground">Video Preview</div>
                    <Button 
                      size="sm" 
                      className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70"
                      onClick={() => setCurrentPlayingVideo(currentPlayingVideo === frame.videoName ? null : frame.videoName)}
                    >
                      {currentPlayingVideo === frame.videoName ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-foreground truncate flex-1">
                        {frame.videoName}
                      </h4>
                      <span className="text-xs text-tactical bg-tactical/10 px-2 py-1 rounded">
                        {frame.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{frame.timestamp}</span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {frame.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}