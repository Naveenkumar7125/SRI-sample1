

// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { mockAlerts, mockCameras } from "@/lib/mockData";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Eye, CheckCircle2, AlertTriangle, CameraOff, Camera } from "lucide-react";

// // /**
// //  * Dashboard (Live Camera + Alerts)
// //  *
// //  * - Replaces static mockCameras with real device cameras (if available)
// //  * - Supports selecting cameras, start/stop, and snapshot capture
// //  * - Falls back to mockCameras if no devices available or permission denied
// //  *
// //  * Notes:
// //  * - Browsers require HTTPS (or localhost) for getUserMedia. For production, use HTTPS.
// //  * - If your app runs on a different origin, ensure permissions and CORS are OK for snapshot upload.
// //  */

// // type CameraDevice = {
// //   deviceId: string;
// //   label: string;
// //   kind?: string;
// // };

// // export default function Dashboard() {
// //   const [availableCameras, setAvailableCameras] = useState<CameraDevice[]>([]);
// //   const [feeds, setFeeds] = useState<
// //     { id: string; deviceId?: string; name: string; location?: string; status: "online" | "offline"; stream?: MediaStream | null; error?: string }[]
// //   >([]);
// //   const [loadingDevices, setLoadingDevices] = useState(true);

// //   // enumerate cameras on mount
// //   useEffect(() => {
// //     let mounted = true;

// //     async function enumerate() {
// //       setLoadingDevices(true);
// //       try {
// //         // Ensure we can get labels by requesting a small permission once (this may prompt user)
// //         // We deliberately don't open a stream here for all devices; we just request permissions if needed.
// //         // Try to get a temporary stream to get labels (optional)
// //         try {
// //           const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
// //           tempStream.getTracks().forEach((t) => t.stop());
// //         } catch {
// //           // permission denied or not available — still proceed; device labels may be empty
// //         }

// //         const devices = await navigator.mediaDevices.enumerateDevices();
// //         const cams = devices
// //           .filter((d) => d.kind === "videoinput")
// //           .map((d) => ({ deviceId: d.deviceId, label: d.label || `Camera ${d.deviceId}`, kind: d.kind }));

// //         if (!mounted) return;

// //         if (cams.length > 0) {
// //           setAvailableCameras(cams);
// //           // Initialize feeds array based on available cameras (one tile per camera)
// //           const initialFeeds = cams.map((c, idx) => ({
// //             id: `cam-${idx}-${c.deviceId}`,
// //             deviceId: c.deviceId,
// //             name: c.label || `Camera ${idx + 1}`,
// //             location: `Device ${idx + 1}`,
// //             status: "offline" as "online" | "offline",
// //             stream: null,
// //             error: "",
// //           }));
// //           setFeeds(initialFeeds);
// //         } else {
// //           // fallback: use your mockCameras if no real cameras detected
// //           const initialFeeds = mockCameras.map((m) => ({
// //             id: m.id,
// //             deviceId: undefined,
// //             name: m.name,
// //             location: m.location,
// //             status: "online" as "online" | "offline", // treat mock as online for display
// //             stream: null,
// //             error: "",
// //           }));
// //           setFeeds(initialFeeds);
// //         }
// //       } catch (err) {
// //         console.error("Error enumerating devices:", err);
// //         // fallback to mock cameras
// //         const initialFeeds = mockCameras.map((m) => ({
// //           id: m.id,
// //           deviceId: undefined,
// //           name: m.name,
// //           location: m.location,
// //           status: "online" as "online" | "offline",
// //           stream: null,
// //           error: "",
// //         }));
// //         setFeeds(initialFeeds);
// //       } finally {
// //         setLoadingDevices(false);
// //       }
// //     }

// //     enumerate();

// //     return () => {
// //       mounted = false;
// //       // stop any streams when unmount
// //       feeds.forEach((f) => {
// //         if (f.stream) {
// //           f.stream.getTracks().forEach((t) => t.stop());
// //         }
// //       });
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // start camera for a feed (by index)
// //   const startCamera = async (index: number) => {
// //     const f = feeds[index];
// //     try {
// //       // prefer explicit deviceId if available, otherwise generic camera
// //       const constraints: MediaStreamConstraints = f.deviceId ? { video: { deviceId: { exact: f.deviceId } } } : { video: true };

// //       const stream = await navigator.mediaDevices.getUserMedia(constraints);

// //       // attach stream to feed
// //       const updated = [...feeds];
// //       updated[index] = { ...f, stream, status: "online", error: "" };
// //       setFeeds(updated);
// //     } catch (err: any) {
// //       console.error("Failed to start camera:", err);
// //       const updated = [...feeds];
// //       updated[index] = { ...f, stream: null, status: "offline", error: err?.message ?? String(err) };
// //       setFeeds(updated);
// //     }
// //   };

// //   const stopCamera = (index: number) => {
// //     const f = feeds[index];
// //     if (f.stream) {
// //       f.stream.getTracks().forEach((t) => t.stop());
// //     }
// //     const updated = [...feeds];
// //     updated[index] = { ...f, stream: null, status: "offline" };
// //     setFeeds(updated);
// //   };

// //   const handleDeviceChange = (index: number, deviceId?: string) => {
// //     const f = feeds[index];
// //     const updated = [...feeds];
// //     updated[index] = { ...f, deviceId, error: "" };
// //     setFeeds(updated);
// //   };

// //   // Snapshot capture: return dataURL
// //   const captureSnapshot = (index: number) => {
// //     const f = feeds[index];
// //     if (!f.stream) return null;

// //     // create video element attached to stream (off-DOM)
// //     const video = document.createElement("video");
// //     video.srcObject = f.stream;
// //     video.muted = true;
// //     video.play();

// //     // capture at current frame after small delay to ensure ready
// //     return new Promise<string>((resolve, reject) => {
// //       const onCan = () => {
// //         try {
// //           const canvas = document.createElement("canvas");
// //           canvas.width = video.videoWidth || 640;
// //           canvas.height = video.videoHeight || 360;
// //           const ctx = canvas.getContext("2d");
// //           if (!ctx) throw new Error("Canvas not supported");
// //           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// //           const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
// //           // cleanup
// //           video.pause();
// //           video.srcObject = null;
// //           resolve(dataUrl);
// //         } catch (e) {
// //           reject(e);
// //         }
// //       };

// //       video.addEventListener("canplay", onCan, { once: true });
// //       // timeout safety
// //       setTimeout(() => {
// //         // if not ready, still try to capture
// //         try {
// //           const canvas = document.createElement("canvas");
// //           canvas.width = video.videoWidth || 640;
// //           canvas.height = video.videoHeight || 360;
// //           const ctx = canvas.getContext("2d");
// //           if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// //           const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
// //           video.pause();
// //           video.srcObject = null;
// //           resolve(dataUrl);
// //         } catch (e) {
// //           reject(e);
// //         }
// //       }, 900);
// //     });
// //   };

// //   // helper that renders a single camera tile (video or mock image)
// //   function CameraTile({ feed, index }: { feed: any; index: number }) {
// //     const videoRef = useRef<HTMLVideoElement | null>(null);

// //     // whenever stream changes, attach to video element
// //     useEffect(() => {
// //       if (videoRef.current) {
// //         if (feed.stream) {
// //           videoRef.current.srcObject = feed.stream;
// //           videoRef.current.play().catch(() => {});
// //         } else {
// //           // detach
// //           try {
// //             videoRef.current.pause();
// //             videoRef.current.srcObject = null;
// //           } catch {}
// //         }
// //       }
// //     }, [feed.stream]);

// //     return (
// //       <Card key={feed.id} className="glass-panel border-border overflow-hidden group cursor-pointer hover:border-threat transition-all">
// //         <div className="relative aspect-video bg-muted flex items-center justify-center">
// //           {/* If feed.stream exists, show video, otherwise show image (mock) */}
// //           {feed.stream ? (
// //             <video ref={videoRef} className="w-full h-full object-cover" playsInline />
// //           ) : (
// //             <img src={mockCameras[index]?.feed ?? "/images/video-placeholder.png"} alt={feed.name} className="w-full h-full object-cover" />
// //           )}

// //           <Badge className={`absolute top-2 right-2 text-[10px] ${feed.status === "online" ? "bg-tactical text-white" : "bg-warning text-black"}`}>
// //             {feed.status === "online" ? "LIVE" : "OFFLINE"}
// //           </Badge>
// //         </div>

// //         <CardContent className="p-3">
// //           <h3 className="font-semibold text-sm text-foreground">{feed.name}</h3>
// //           <p className="text-xs text-muted-foreground">{feed.location}</p>
// //           <p className="text-[10px] text-muted-foreground mt-1">{feed.id}</p>

// //           <div className="mt-2 flex items-center gap-2">
// //             {availableCameras.length > 0 && (
// //               <select
// //                 value={feed.deviceId ?? ""}
// //                 onChange={(e) => handleDeviceChange(index, e.target.value || undefined)}
// //                 className="text-xs p-1 rounded border"
// //                 aria-label="Select camera"
// //               >
// //                 <option value="">Default Camera</option>
// //                 {availableCameras.map((c) => (
// //                   <option key={c.deviceId} value={c.deviceId}>
// //                     {c.label || `Camera (${c.deviceId.slice(-4)})`}
// //                   </option>
// //                 ))}
// //               </select>
// //             )}

// //             {feed.stream ? (
// //               <Button size="sm" variant="outline" onClick={() => stopCamera(index)} title="Stop camera">
// //                 <CameraOff className="h-4 w-4 mr-1" /> Stop
// //               </Button>
// //             ) : (
// //               <Button size="sm" onClick={() => startCamera(index)} title="Start camera">
// //                 <Camera className="h-4 w-4 mr-1" /> Start
// //               </Button>
// //             )}

// //             <Button
// //               size="sm"
// //               variant="outline"
// //               onClick={async () => {
// //                 try {
// //                   const dataUrl = await captureSnapshot(index);
// //                   if (dataUrl) {
// //                     // you can POST dataUrl to backend here for saving evidence
// //                     // e.g. await fetch('/api/evidence', { method:'POST', body: JSON.stringify({ image: dataUrl }) })
// //                     // For demo, open the image in a new tab
// //                     const win = window.open();
// //                     if (win) {
// //                       win.document.write(`<img src="${dataUrl}" style="max-width:100%" />`);
// //                     }
// //                   } else {
// //                     alert("No stream available to capture.");
// //                   }
// //                 } catch (e) {
// //                   console.error("Snapshot failed:", e);
// //                   alert("Snapshot failed: " + String(e));
// //                 }
// //               }}
// //             >
// //               Snapshot
// //             </Button>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // severity/status helpers (copied from your original)
// //   const getSeverityColor = (severity: string) => {
// //     switch (severity) {
// //       case "critical":
// //         return "bg-threat text-white tactical-glow";
// //       case "high":
// //         return "bg-warning text-black warning-glow";
// //       case "medium":
// //         return "bg-amber text-black";
// //       default:
// //         return "bg-muted text-foreground";
// //     }
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "active":
// //         return "text-threat";
// //       case "investigating":
// //         return "text-warning";
// //       case "monitoring":
// //         return "text-amber";
// //       default:
// //         return "text-muted-foreground";
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Page Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
// //         <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
// //       </div>

// //       {/* Live Camera First */}
// //       <div>
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
// //           <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //             <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
// //             {feeds.length} Cameras Active
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {loadingDevices ? (
// //             <div className="col-span-full text-center text-muted-foreground py-8">Detecting cameras…</div>
// //           ) : (
// //             feeds.map((feed, idx) => <CameraTile feed={feed} index={idx} key={feed.id} />)
// //           )}
// //         </div>
// //       </div>

// //       {/* Critical Alerts */}
// //       <div>
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
// //             <AlertTriangle className="h-5 w-5 text-threat" />
// //             Critical Alerts
// //           </h2>
// //           <Button variant="outline" size="sm">View All</Button>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
// //           {mockAlerts.map((alert) => (
// //             <Card key={alert.id} className="glass-panel border-border overflow-hidden">
// //               <div className="flex gap-4 p-4">
// //                 <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
// //                   <img src={alert.snapshot} alt={alert.type} className="w-full h-full object-cover" />
// //                   <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity)} text-[10px]`}>
// //                     {alert.severity.toUpperCase()}
// //                   </Badge>
// //                 </div>

// //                 <div className="flex-1 flex flex-col">
// //                   <div className="flex items-start justify-between mb-2">
// //                     <div>
// //                       <h3 className="font-semibold text-foreground">{alert.type}</h3>
// //                       <p className="text-xs text-muted-foreground">{alert.camera}</p>
// //                     </div>
// //                     <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
// //                       {alert.status.toUpperCase()}
// //                     </span>
// //                   </div>

// //                   <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

// //                   <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
// //                     <span>{alert.location}</span>
// //                     <span>•</span>
// //                     <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
// //                   </div>

// //                   <div className="flex gap-2 mt-auto">
// //                     <Button size="sm" variant="outline" className="flex-1">
// //                       <Eye className="h-3 w-3 mr-1" />
// //                       View
// //                     </Button>
// //                     <Button size="sm" variant="outline" className="flex-1">
// //                       <CheckCircle2 className="h-3 w-3 mr-1" />
// //                       Mark Safe
// //                     </Button>
// //                     <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
// //                       Add to Evidence
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { mockAlerts, mockCameras } from "@/lib/mockData";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Eye, CheckCircle2, AlertTriangle, CameraOff, Camera } from "lucide-react";

// // type CamInfo = {
// //   deviceId?: string;
// //   label?: string;
// //   status: "online" | "offline";
// //   stream?: MediaStream | null;
// //   error?: string | null;
// // };

// // export default function DashboardThreeCams() {
// //   // local devices
// //   const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
// //   const [laptopCam, setLaptopCam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
// //   const [webcam, setWebcam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
// //   const [loadingDevices, setLoadingDevices] = useState(true);

// //   // IP camera state (third camera)
// //   const ipCameraUrl = "http://192.168.219.228:8080/video"; // user-provided IP camera base URL
// //   const [ipRunning, setIpRunning] = useState<boolean>(true); // show by default — change as needed
// //   const [ipError, setIpError] = useState<string | null>(null);
// //   const [ipLastSnapshot, setIpLastSnapshot] = useState<string | null>(null);
// //   const ipImgRef = useRef<HTMLImageElement | null>(null);

// //   // refs for local videos
// //   const laptopVideoRef = useRef<HTMLVideoElement | null>(null);
// //   const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

// //   // discover local video devices and set initial states (heuristics for laptop vs webcam)
// //   useEffect(() => {
// //     let mounted = true;

// //     async function discover() {
// //       setLoadingDevices(true);
// //       try {
// //         // Attempt to get permission once so we can get labels
// //         try {
// //           const temp = await navigator.mediaDevices.getUserMedia({ video: true });
// //           temp.getTracks().forEach((t) => t.stop());
// //         } catch {
// //           // ignore; labels may be empty
// //         }

// //         const devices = await navigator.mediaDevices.enumerateDevices();
// //         const cams = devices.filter((d) => d.kind === "videoinput");

// //         if (!mounted) return;
// //         setAvailableCameras(cams);

// //         const labelLower = (s?: string) => (s || "").toLowerCase();
// //         const isLaptopLabel = (label?: string) =>
// //           ["front", "integrated", "internal", "face", "built-in", "facetime"].some((k) =>
// //             labelLower(label).includes(k)
// //           );

// //         let laptopDevice = cams.find((c) => isLaptopLabel(c.label));
// //         if (!laptopDevice && cams.length > 0) laptopDevice = cams[0];
// //         let externalDevice = cams.find((c) => c.deviceId !== laptopDevice?.deviceId);

// //         setLaptopCam({
// //           deviceId: laptopDevice?.deviceId,
// //           label: laptopDevice?.label || (laptopDevice ? `Camera ${laptopDevice.deviceId}` : "No device"),
// //           status: "offline",
// //           stream: null,
// //           error: null,
// //         });

// //         setWebcam({
// //           deviceId: externalDevice?.deviceId,
// //           label: externalDevice?.label || (externalDevice ? `Camera ${externalDevice.deviceId}` : "No device"),
// //           status: "offline",
// //           stream: null,
// //           error: null,
// //         });
// //       } catch (err) {
// //         console.error("discover devices error", err);
// //         // fallback to mock cameras
// //         setLaptopCam({ deviceId: undefined, label: mockCameras[0]?.name ?? "Laptop (mock)", status: "online", stream: null, error: null });
// //         setWebcam({ deviceId: undefined, label: mockCameras[1]?.name ?? "Webcam (mock)", status: "online", stream: null, error: null });
// //       } finally {
// //         if (mounted) setLoadingDevices(false);
// //       }
// //     }

// //     discover();

// //     return () => {
// //       mounted = false;
// //       // cleanup local streams
// //       [laptopCam, webcam].forEach((c) => {
// //         if (c.stream) c.stream.getTracks().forEach((t) => t.stop());
// //       });
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // attach streams to video elements when changed
// //   useEffect(() => {
// //     if (laptopVideoRef.current) {
// //       if (laptopCam.stream) {
// //         laptopVideoRef.current.srcObject = laptopCam.stream;
// //         laptopVideoRef.current.play().catch(() => {});
// //       } else {
// //         try {
// //           laptopVideoRef.current.pause();
// //           laptopVideoRef.current.srcObject = null;
// //         } catch {}
// //       }
// //     }
// //   }, [laptopCam.stream]);

// //   useEffect(() => {
// //     if (webcamVideoRef.current) {
// //       if (webcam.stream) {
// //         webcamVideoRef.current.srcObject = webcam.stream;
// //         webcamVideoRef.current.play().catch(() => {});
// //       } else {
// //         try {
// //           webcamVideoRef.current.pause();
// //           webcamVideoRef.current.srcObject = null;
// //         } catch {}
// //       }
// //     }
// //   }, [webcam.stream]);

// //   // start camera by deviceId or default
// //   const startCamera = async (which: "laptop" | "webcam") => {
// //     const camState = which === "laptop" ? laptopCam : webcam;
// //     try {
// //       const constraints: MediaStreamConstraints = camState.deviceId
// //         ? { video: { deviceId: { exact: camState.deviceId } } }
// //         : { video: true };

// //       const stream = await navigator.mediaDevices.getUserMedia(constraints);

// //       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream, status: "online", error: null }));
// //       else setWebcam((s) => ({ ...s, stream, status: "online", error: null }));
// //     } catch (err: any) {
// //       console.error("startCamera error", err);
// //       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
// //       else setWebcam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
// //     }
// //   };

// //   const stopCamera = (which: "laptop" | "webcam") => {
// //     const camState = which === "laptop" ? laptopCam : webcam;
// //     if (camState.stream) camState.stream.getTracks().forEach((t) => t.stop());
// //     if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline" }));
// //     else setWebcam((s) => ({ ...s, stream: null, status: "offline" }));
// //   };

// //   const changeDevice = (which: "laptop" | "webcam", deviceId?: string) => {
// //     if (which === "laptop") {
// //       if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
// //       setLaptopCam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
// //     } else {
// //       if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
// //       setWebcam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
// //     }
// //   };

// //   // Snapshot for local cams
// //   const captureLocalSnapshot = async (which: "laptop" | "webcam") => {
// //     const camState = which === "laptop" ? laptopCam : webcam;
// //     if (!camState.stream) {
// //       alert("Camera is not running.");
// //       return;
// //     }
// //     const video = document.createElement("video");
// //     video.srcObject = camState.stream;
// //     video.muted = true;
// //     video.play();

// //     return new Promise<string>((resolve, reject) => {
// //       const onCan = () => {
// //         try {
// //           const canvas = document.createElement("canvas");
// //           canvas.width = video.videoWidth || 640;
// //           canvas.height = video.videoHeight || 360;
// //           const ctx = canvas.getContext("2d");
// //           if (!ctx) throw new Error("Canvas not supported");
// //           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// //           const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
// //           video.pause();
// //           video.srcObject = null;
// //           resolve(dataUrl);
// //         } catch (e) {
// //           reject(e);
// //         }
// //       };

// //       video.addEventListener("canplay", onCan, { once: true });

// //       setTimeout(() => {
// //         try {
// //           const canvas = document.createElement("canvas");
// //           canvas.width = video.videoWidth || 640;
// //           canvas.height = video.videoHeight || 360;
// //           const ctx = canvas.getContext("2d");
// //           if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// //           const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
// //           video.pause();
// //           video.srcObject = null;
// //           resolve(dataUrl);
// //         } catch (e) {
// //           reject(e);
// //         }
// //       }, 800);
// //     });
// //   };

// //   // IP camera snapshot: tries to fetch a single image frame from the IP camera URL
// //   // Note: many IP cameras block cross-origin requests. If fetch fails due to CORS, you will need a server proxy.
// //   const captureIpSnapshot = async () => {
// //     setIpError(null);
// //     setIpLastSnapshot(null);

// //     try {
// //       // Try a GET request to the IP camera URL and convert to blob
// //       // If the camera serves MJPEG as an image stream, fetch may hang or return HTML — this might not work.
// //       const resp = await fetch(ipCameraUrl, { mode: "cors", cache: "no-store" });
// //       if (!resp.ok) throw new Error(`IP camera responded ${resp.status}`);
// //       const blob = await resp.blob();

// //       // If blob is an image, convert to dataURL
// //       if (!blob.type.startsWith("image/") && !blob.type.startsWith("video/")) {
// //         // Sometimes the MJPEG returns multipart stream — attempt to create object URL and put into img
// //         const objectUrl = URL.createObjectURL(blob);
// //         setIpLastSnapshot(objectUrl);
// //         // open snapshot in new tab
// //         const win = window.open();
// //         if (win) win.document.write(`<img src="${objectUrl}" style="max-width:100%" />`);
// //         return objectUrl;
// //       }

// //       const reader = new FileReader();
// //       const dataUrl: Promise<string> = new Promise((resolve, reject) => {
// //         reader.onloadend = () => {
// //           const result = reader.result as string;
// //           resolve(result);
// //         };
// //         reader.onerror = reject;
// //         reader.readAsDataURL(blob);
// //       });

// //       const url = await dataUrl;
// //       setIpLastSnapshot(url);
// //       const win = window.open();
// //       if (win) win.document.write(`<img src="${url}" style="max-width:100%" />`);
// //       return url;
// //     } catch (err: any) {
// //       console.error("IP snapshot failed:", err);
// //       const message = err?.message ? String(err.message) : String(err);
// //       setIpError(`IP camera snapshot failed: ${message}. If CORS error, use server proxy.`);
// //       throw err;
// //     }
// //   };

// //   // toggle IP camera display (start/stop)
// //   const toggleIpRunning = () => {
// //     setIpError(null);
// //     setIpRunning((v) => !v);
// //   };

// //   // cleanup on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
// //       if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // UI helpers (severity/status same as original)
// //   const getSeverityColor = (severity: string) => {
// //     switch (severity) {
// //       case "critical":
// //         return "bg-threat text-white tactical-glow";
// //       case "high":
// //         return "bg-warning text-black warning-glow";
// //       case "medium":
// //         return "bg-amber text-black";
// //       default:
// //         return "bg-muted text-foreground";
// //     }
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "active":
// //         return "text-threat";
// //       case "investigating":
// //         return "text-warning";
// //       case "monitoring":
// //         return "text-amber";
// //       default:
// //         return "text-muted-foreground";
// //     }
// //   };

// //   // Render camera tile (local)
// //   function LocalCameraTile({ which }: { which: "laptop" | "webcam" }) {
// //     const cam = which === "laptop" ? laptopCam : webcam;
// //     const ref = which === "laptop" ? laptopVideoRef : webcamVideoRef;
// //     const mock = which === "laptop" ? mockCameras[0] : mockCameras[1];

// //     return (
// //       <Card className="glass-panel border-border overflow-hidden group">
// //         <div className="relative aspect-video bg-muted flex items-center justify-center">
// //           {cam.stream ? (
// //             <video ref={ref} className="w-full h-full object-cover" playsInline />
// //           ) : (
// //             <img src={mock?.feed ?? "/images/video-placeholder.png"} alt={cam.label ?? mock?.name} className="w-full h-full object-cover" />
// //           )}

// //           <Badge className={`absolute top-2 right-2 text-[10px] ${cam.status === "online" ? "bg-tactical text-white" : "bg-warning text-black"}`}>
// //             {cam.status === "online" ? "LIVE" : "OFFLINE"}
// //           </Badge>
// //         </div>

// //         <CardContent className="p-3">
// //           <h3 className="font-semibold text-sm text-foreground">{which === "laptop" ? "Laptop Camera" : "Webcam"}</h3>
// //           <p className="text-xs text-muted-foreground">{cam.label ?? (which === "laptop" ? mock?.name : mock?.name)}</p>
// //           <p className="text-[10px] text-muted-foreground mt-1">{cam.deviceId ?? "device-id: none"}</p>

// //           <div className="mt-2 flex items-center gap-2">
// //             {availableCameras.length > 0 && (
// //               <select
// //                 value={cam.deviceId ?? ""}
// //                 onChange={(e) => changeDevice(which, e.target.value || undefined)}
// //                 className="text-xs p-1 rounded border"
// //                 aria-label={`Select ${which} device`}
// //               >
// //                 <option value="">{which === "laptop" ? "Default laptop cam" : "Default webcam"}</option>
// //                 {availableCameras.map((d) => (
// //                   <option key={d.deviceId} value={d.deviceId}>
// //                     {d.label || `Camera (${d.deviceId.slice(-4)})`}
// //                   </option>
// //                 ))}
// //               </select>
// //             )}

// //             {cam.stream ? (
// //               <Button size="sm" variant="outline" onClick={() => stopCamera(which)}>
// //                 <CameraOff className="h-4 w-4 mr-1" /> Stop
// //               </Button>
// //             ) : (
// //               <Button size="sm" onClick={() => startCamera(which)}>
// //                 <Camera className="h-4 w-4 mr-1" /> Start
// //               </Button>
// //             )}

// //             <Button
// //               size="sm"
// //               variant="outline"
// //               onClick={async () => {
// //                 try {
// //                   const dataUrl = await captureLocalSnapshot(which);
// //                   if (dataUrl) {
// //                     const win = window.open();
// //                     if (win) win.document.write(`<img src="${dataUrl}" style="max-width:100%" />`);
// //                   } else {
// //                     alert("No stream available to capture.");
// //                   }
// //                 } catch (e) {
// //                   console.error("Snapshot failed:", e);
// //                   alert("Snapshot failed: " + String(e));
// //                 }
// //               }}
// //             >
// //               Snapshot
// //             </Button>
// //           </div>

// //           {cam.error && <div className="text-xs text-red-500 mt-2">Error: {cam.error}</div>}
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // Render IP camera tile (third)
// //   function IpCameraTile() {
// //     const mock = mockCameras[2] ?? { feed: "/images/video-placeholder.png", name: "IP Camera" };

// //     return (
// //       <Card className="glass-panel border-border overflow-hidden group">
// //         <div className="relative aspect-video bg-muted flex items-center justify-center">
// //           {ipRunning ? (
// //             // For many MJPEG cameras, using <img> to display the stream works.
// //             // For HLS/MP4 you might need a <video> tag or a player.
// //             <img
// //               ref={ipImgRef}
// //               src={ipCameraUrl}
// //               alt="IP Camera"
// //               className="w-full h-full object-cover"
// //               onError={(e) => {
// //                 console.error("IP camera image error", e);
// //                 setIpError("Failed to load IP camera stream. Check network/CORS or use a server proxy.");
// //               }}
// //             />
// //           ) : (
// //             <img src={mock.feed} alt={mock.name} className="w-full h-full object-cover" />
// //           )}

// //           <Badge className={`absolute top-2 right-2 text-[10px] ${ipRunning ? "bg-tactical text-white" : "bg-warning text-black"}`}>
// //             {ipRunning ? "IP LIVE" : "IP OFF"}
// //           </Badge>
// //         </div>

// //         <CardContent className="p-3">
// //           <h3 className="font-semibold text-sm text-foreground">IP Camera</h3>
// //           <p className="text-xs text-muted-foreground">{ipCameraUrl}</p>
// //           <p className="text-[10px] text-muted-foreground mt-1">{ipLastSnapshot ? "Last snapshot available" : "No snapshot yet"}</p>

// //           <div className="mt-2 flex items-center gap-2">
// //             <Button size="sm" onClick={() => toggleIpRunning()}>
// //               {ipRunning ? <CameraOff className="h-4 w-4 mr-1" /> : <Camera className="h-4 w-4 mr-1" />}
// //               {ipRunning ? "Stop IP" : "Start IP"}
// //             </Button>

// //             <Button
// //               size="sm"
// //               variant="outline"
// //               onClick={async () => {
// //                 try {
// //                   await captureIpSnapshot();
// //                 } catch (e) {
// //                   console.error("IP snapshot error", e);
// //                   alert("IP snapshot failed. See console for details. If CORS blocked, use server proxy.");
// //                 }
// //               }}
// //             >
// //               Snapshot
// //             </Button>
// //           </div>

// //           {ipError && <div className="text-xs text-red-500 mt-2">{ipError}</div>}
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
// //         <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
// //       </div>

// //       {/* Three camera sections in a grid */}
// //       <div>
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
// //           <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //             <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
// //             <span>{availableCameras.length} Local Cameras Detected</span>
// //             <span> • IP Camera: {ipCameraUrl}</span>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           {loadingDevices ? (
// //             <div className="col-span-full text-center text-muted-foreground py-8">Detecting cameras…</div>
// //           ) : (
// //             <>
// //               <LocalCameraTile which="laptop" />
// //               <LocalCameraTile which="webcam" />
// //               <IpCameraTile />
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Alerts (unchanged) */}
// //       <div>
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
// //             <AlertTriangle className="h-5 w-5 text-threat" />
// //             Critical Alerts
// //           </h2>
// //           <Button variant="outline" size="sm">View All</Button>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
// //           {mockAlerts.map((alert) => (
// //             <Card key={alert.id} className="glass-panel border-border overflow-hidden">
// //               <div className="flex gap-4 p-4">
// //                 <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
// //                   <img src={alert.snapshot} alt={alert.type} className="w-full h-full object-cover" />
// //                   <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity)} text-[10px]`}>
// //                     {alert.severity.toUpperCase()}
// //                   </Badge>
// //                 </div>

// //                 <div className="flex-1 flex flex-col">
// //                   <div className="flex items-start justify-between mb-2">
// //                     <div>
// //                       <h3 className="font-semibold text-foreground">{alert.type}</h3>
// //                       <p className="text-xs text-muted-foreground">{alert.camera}</p>
// //                     </div>
// //                     <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
// //                       {alert.status.toUpperCase()}
// //                     </span>
// //                   </div>

// //                   <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

// //                   <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
// //                     <span>{alert.location}</span>
// //                     <span>•</span>
// //                     <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
// //                   </div>

// //                   <div className="flex gap-2 mt-auto">
// //                     <Button size="sm" variant="outline" className="flex-1">
// //                       <Eye className="h-3 w-3 mr-1" />
// //                       View
// //                     </Button>
// //                     <Button size="sm" variant="outline" className="flex-1">
// //                       <CheckCircle2 className="h-3 w-3 mr-1" />
// //                       Mark Safe
// //                     </Button>
// //                     <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
// //                       Add to Evidence
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// "use client";

// import { useEffect, useRef, useState } from "react";
// import { mockAlerts, mockCameras } from "@/lib/mockData";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Eye, CheckCircle2, AlertTriangle, CameraOff, Camera } from "lucide-react";

// type CamInfo = {
//   deviceId?: string;
//   label?: string;
//   status: "online" | "offline";
//   stream?: MediaStream | null;
//   error?: string | null;
// };

// export default function DashboardThreeCams() {
//   // local devices
//   const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
//   const [laptopCam, setLaptopCam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
//   const [webcam, setWebcam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
//   const [loadingDevices, setLoadingDevices] = useState(true);

//   // IP camera state (third camera)
//   const ipCameraUrl = "http://192.168.219.228:8080/video"; // user-provided IP camera base URL
//   const [ipRunning, setIpRunning] = useState<boolean>(true); // show by default — change as needed
//   const [ipError, setIpError] = useState<string | null>(null);
//   const [ipLastSnapshot, setIpLastSnapshot] = useState<string | null>(null);
//   const ipImgRef = useRef<HTMLImageElement | null>(null);

//   // refs for local videos
//   const laptopVideoRef = useRef<HTMLVideoElement | null>(null);
//   const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

//   // discover local video devices and set initial states (heuristics for laptop vs webcam)
//   useEffect(() => {
//     let mounted = true;

//     async function discover() {
//       setLoadingDevices(true);
//       try {
//         // Attempt to get permission once so we can get labels
//         try {
//           const temp = await navigator.mediaDevices.getUserMedia({ video: true });
//           temp.getTracks().forEach((t) => t.stop());
//         } catch {
//           // ignore; labels may be empty
//         }

//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const cams = devices.filter((d) => d.kind === "videoinput");

//         if (!mounted) return;
//         setAvailableCameras(cams);

//         const labelLower = (s?: string) => (s || "").toLowerCase();
//         const isLaptopLabel = (label?: string) =>
//           ["front", "integrated", "internal", "face", "built-in", "facetime"].some((k) =>
//             labelLower(label).includes(k)
//           );

//         let laptopDevice = cams.find((c) => isLaptopLabel(c.label));
//         if (!laptopDevice && cams.length > 0) laptopDevice = cams[0];
//         let externalDevice = cams.find((c) => c.deviceId !== laptopDevice?.deviceId);

//         setLaptopCam({
//           deviceId: laptopDevice?.deviceId,
//           label: laptopDevice?.label || (laptopDevice ? `Camera ${laptopDevice.deviceId}` : "No device"),
//           status: "offline",
//           stream: null,
//           error: null,
//         });

//         setWebcam({
//           deviceId: externalDevice?.deviceId,
//           label: externalDevice?.label || (externalDevice ? `Camera ${externalDevice.deviceId}` : "No device"),
//           status: "offline",
//           stream: null,
//           error: null,
//         });
//       } catch (err) {
//         console.error("discover devices error", err);
//         // fallback to mock cameras
//         setLaptopCam({ deviceId: undefined, label: mockCameras[0]?.name ?? "Laptop (mock)", status: "online", stream: null, error: null });
//         setWebcam({ deviceId: undefined, label: mockCameras[1]?.name ?? "Webcam (mock)", status: "online", stream: null, error: null });
//       } finally {
//         if (mounted) setLoadingDevices(false);
//       }
//     }

//     discover();

//     return () => {
//       mounted = false;
//       // cleanup local streams
//       [laptopCam, webcam].forEach((c) => {
//         if (c.stream) c.stream.getTracks().forEach((t) => t.stop());
//       });
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // attach streams to video elements when changed
//   useEffect(() => {
//     if (laptopVideoRef.current) {
//       if (laptopCam.stream) {
//         laptopVideoRef.current.srcObject = laptopCam.stream;
//         laptopVideoRef.current.play().catch(() => {});
//       } else {
//         try {
//           laptopVideoRef.current.pause();
//           laptopVideoRef.current.srcObject = null;
//         } catch {}
//       }
//     }
//   }, [laptopCam.stream]);

//   useEffect(() => {
//     if (webcamVideoRef.current) {
//       if (webcam.stream) {
//         webcamVideoRef.current.srcObject = webcam.stream;
//         webcamVideoRef.current.play().catch(() => {});
//       } else {
//         try {
//           webcamVideoRef.current.pause();
//           webcamVideoRef.current.srcObject = null;
//         } catch {}
//       }
//     }
//   }, [webcam.stream]);

//   // start camera by deviceId or default
//   const startCamera = async (which: "laptop" | "webcam") => {
//     const camState = which === "laptop" ? laptopCam : webcam;
//     try {
//       const constraints: MediaStreamConstraints = camState.deviceId
//         ? { video: { deviceId: { exact: camState.deviceId } } }
//         : { video: true };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);

//       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream, status: "online", error: null }));
//       else setWebcam((s) => ({ ...s, stream, status: "online", error: null }));
//     } catch (err: any) {
//       console.error("startCamera error", err);
//       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
//       else setWebcam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
//     }
//   };

//   const stopCamera = (which: "laptop" | "webcam") => {
//     const camState = which === "laptop" ? laptopCam : webcam;
//     if (camState.stream) camState.stream.getTracks().forEach((t) => t.stop());
//     if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline" }));
//     else setWebcam((s) => ({ ...s, stream: null, status: "offline" }));
//   };

//   const changeDevice = (which: "laptop" | "webcam", deviceId?: string) => {
//     if (which === "laptop") {
//       if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
//       setLaptopCam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
//     } else {
//       if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
//       setWebcam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
//     }
//   };

//   // Snapshot for local cams
//   const captureLocalSnapshot = async (which: "laptop" | "webcam") => {
//     const camState = which === "laptop" ? laptopCam : webcam;
//     if (!camState.stream) {
//       alert("Camera is not running.");
//       return;
//     }
//     const video = document.createElement("video");
//     video.srcObject = camState.stream;
//     video.muted = true;
//     video.play();

//     return new Promise<string>((resolve, reject) => {
//       const onCan = () => {
//         try {
//           const canvas = document.createElement("canvas");
//           canvas.width = video.videoWidth || 640;
//           canvas.height = video.videoHeight || 360;
//           const ctx = canvas.getContext("2d");
//           if (!ctx) throw new Error("Canvas not supported");
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
//           video.pause();
//           video.srcObject = null;
//           resolve(dataUrl);
//         } catch (e) {
//           reject(e);
//         }
//       };

//       video.addEventListener("canplay", onCan, { once: true });

//       setTimeout(() => {
//         try {
//           const canvas = document.createElement("canvas");
//           canvas.width = video.videoWidth || 640;
//           canvas.height = video.videoHeight || 360;
//           const ctx = canvas.getContext("2d");
//           if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
//           video.pause();
//           video.srcObject = null;
//           resolve(dataUrl);
//         } catch (e) {
//           reject(e);
//         }
//       }, 800);
//     });
//   };

//   // IP camera snapshot: tries to fetch a single image frame from the IP camera URL
//   // Note: many IP cameras block cross-origin requests. If fetch fails due to CORS, you will need a server proxy.
//   const captureIpSnapshot = async () => {
//     setIpError(null);
//     setIpLastSnapshot(null);

//     try {
//       // Try a GET request to the IP camera URL and convert to blob
//       // If the camera serves MJPEG as an image stream, fetch may hang or return HTML — this might not work.
//       const resp = await fetch(ipCameraUrl, { mode: "cors", cache: "no-store" });
//       if (!resp.ok) throw new Error(`IP camera responded ${resp.status}`);
//       const blob = await resp.blob();

//       // If blob is an image, convert to dataURL
//       if (!blob.type.startsWith("image/") && !blob.type.startsWith("video/")) {
//         // Sometimes the MJPEG returns multipart stream — attempt to create object URL and put into img
//         const objectUrl = URL.createObjectURL(blob);
//         setIpLastSnapshot(objectUrl);
//         // open snapshot in new tab
//         const win = window.open();
//         if (win) win.document.write(`<img src="${objectUrl}" style="max-width:100%" />`);
//         return objectUrl;
//       }

//       const reader = new FileReader();
//       const dataUrl: Promise<string> = new Promise((resolve, reject) => {
//         reader.onloadend = () => {
//           const result = reader.result as string;
//           resolve(result);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });

//       const url = await dataUrl;
//       setIpLastSnapshot(url);
//       const win = window.open();
//       if (win) win.document.write(`<img src="${url}" style="max-width:100%" />`);
//       return url;
//     } catch (err: any) {
//       console.error("IP snapshot failed:", err);
//       const message = err?.message ? String(err.message) : String(err);
//       setIpError(`IP camera snapshot failed: ${message}. If CORS error, use server proxy.`);
//       throw err;
//     }
//   };

//   // toggle IP camera display (start/stop)
//   const toggleIpRunning = () => {
//     setIpError(null);
//     setIpRunning((v) => !v);
//   };

//   // cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
//       if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // UI helpers (severity/status same as original)
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "bg-threat text-white tactical-glow";
//       case "high":
//         return "bg-warning text-black warning-glow";
//       case "medium":
//         return "bg-amber text-black";
//       default:
//         return "bg-muted text-foreground";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "text-threat";
//       case "investigating":
//         return "text-warning";
//       case "monitoring":
//         return "text-amber";
//       default:
//         return "text-muted-foreground";
//     }
//   };

//   // Render camera tile (local)
//   function LocalCameraTile({ which }: { which: "laptop" | "webcam" }) {
//     const cam = which === "laptop" ? laptopCam : webcam;
//     const ref = which === "laptop" ? laptopVideoRef : webcamVideoRef;
//     const mock = which === "laptop" ? mockCameras[0] : mockCameras[1];

//     return (
//       <Card className="glass-panel border-border overflow-hidden group">
//         <div className="relative aspect-video bg-muted flex items-center justify-center">
//           {which === "laptop" ? (
//             // show processed MJPEG stream from backend Python server (no frontend changes beyond this line required)
//             <img
//               src="http://localhost:5000/lapcam"
//               alt={cam.label ?? mock?.name}
//               className="w-full h-full object-cover"
//             />
//           ) : cam.stream ? (
//             <video ref={ref} className="w-full h-full object-cover" playsInline />
//           ) : (
//             <img src={mock?.feed ?? "/images/video-placeholder.png"} alt={cam.label ?? mock?.name} className="w-full h-full object-cover" />
//           )}

//           <Badge className={`absolute top-2 right-2 text-[10px] ${cam.status === "online" ? "bg-tactical text-white" : "bg-warning text-black"}`}>
//             {cam.status === "online" ? "LIVE" : "OFFLINE"}
//           </Badge>
//         </div>

//         <CardContent className="p-3">
//           <h3 className="font-semibold text-sm text-foreground">{which === "laptop" ? "Laptop Camera" : "Webcam"}</h3>
//           <p className="text-xs text-muted-foreground">{cam.label ?? (which === "laptop" ? mock?.name : mock?.name)}</p>
//           <p className="text-[10px] text-muted-foreground mt-1">{cam.deviceId ?? "device-id: none"}</p>

//           <div className="mt-2 flex items-center gap-2">
//             {availableCameras.length > 0 && (
//               <select
//                 value={cam.deviceId ?? ""}
//                 onChange={(e) => changeDevice(which, e.target.value || undefined)}
//                 className="text-xs p-1 rounded border"
//                 aria-label={`Select ${which} device`}
//               >
//                 <option value="">{which === "laptop" ? "Default laptop cam" : "Default webcam"}</option>
//                 {availableCameras.map((d) => (
//                   <option key={d.deviceId} value={d.deviceId}>
//                     {d.label || `Camera (${d.deviceId.slice(-4)})`}
//                   </option>
//                 ))}
//               </select>
//             )}

//             {cam.stream ? (
//               <Button size="sm" variant="outline" onClick={() => stopCamera(which)}>
//                 <CameraOff className="h-4 w-4 mr-1" /> Stop
//               </Button>
//             ) : (
//               <Button size="sm" onClick={() => startCamera(which)}>
//                 <Camera className="h-4 w-4 mr-1" /> Start
//               </Button>
//             )}

//             <Button
//               size="sm"
//               variant="outline"
//               onClick={async () => {
//                 try {
//                   const dataUrl = await captureLocalSnapshot(which);
//                   if (dataUrl) {
//                     const win = window.open();
//                     if (win) win.document.write(`<img src="${dataUrl}" style="max-width:100%" />`);
//                   } else {
//                     alert("No stream available to capture.");
//                   }
//                 } catch (e) {
//                   console.error("Snapshot failed:", e);
//                   alert("Snapshot failed: " + String(e));
//                 }
//               }}
//             >
//               Snapshot
//             </Button>
//           </div>

//           {cam.error && <div className="text-xs text-red-500 mt-2">Error: {cam.error}</div>}
//         </CardContent>
//       </Card>
//     );
//   }

//   // Render IP camera tile (third)
//   function IpCameraTile() {
//     const mock = mockCameras[2] ?? { feed: "/images/video-placeholder.png", name: "IP Camera" };

//     return (
//       <Card className="glass-panel border-border overflow-hidden group">
//         <div className="relative aspect-video bg-muted flex items-center justify-center">
//           {ipRunning ? (
//             // For many MJPEG cameras, using <img> to display the stream works.
//             // For HLS/MP4 you might need a <video> tag or a player.
//             <img
//               ref={ipImgRef}
//               src={ipCameraUrl}
//               alt="IP Camera"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 console.error("IP camera image error", e);
//                 setIpError("Failed to load IP camera stream. Check network/CORS or use a server proxy.");
//               }}
//             />
//           ) : (
//             <img src={mock.feed} alt={mock.name} className="w-full h-full object-cover" />
//           )}

//           <Badge className={`absolute top-2 right-2 text-[10px] ${ipRunning ? "bg-tactical text-white" : "bg-warning text-black"}`}>
//             {ipRunning ? "IP LIVE" : "IP OFF"}
//           </Badge>
//         </div>

//         <CardContent className="p-3">
//           <h3 className="font-semibold text-sm text-foreground">IP Camera</h3>
//           <p className="text-xs text-muted-foreground">{ipCameraUrl}</p>
//           <p className="text-[10px] text-muted-foreground mt-1">{ipLastSnapshot ? "Last snapshot available" : "No snapshot yet"}</p>

//           <div className="mt-2 flex items-center gap-2">
//             <Button size="sm" onClick={() => toggleIpRunning()}>
//               {ipRunning ? <CameraOff className="h-4 w-4 mr-1" /> : <Camera className="h-4 w-4 mr-1" />}
//               {ipRunning ? "Stop IP" : "Start IP"}
//             </Button>

//             <Button
//               size="sm"
//               variant="outline"
//               onClick={async () => {
//                 try {
//                   await captureIpSnapshot();
//                 } catch (e) {
//                   console.error("IP snapshot error", e);
//                   alert("IP snapshot failed. See console for details. If CORS blocked, use server proxy.");
//                 }
//               }}
//             >
//               Snapshot
//             </Button>
//           </div>

//           {ipError && <div className="text-xs text-red-500 mt-2">{ipError}</div>}
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
//         <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
//       </div>

//       {/* Three camera sections in a grid */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//             <span>{availableCameras.length} Local Cameras Detected</span>
//             <span> • IP Camera: {ipCameraUrl}</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {loadingDevices ? (
//             <div className="col-span-full text-center text-muted-foreground py-8">Detecting cameras…</div>
//           ) : (
//             <>
//               <LocalCameraTile which="laptop" />
//               <LocalCameraTile which="webcam" />
//               <IpCameraTile />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Alerts (unchanged) */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5 text-threat" />
//             Critical Alerts
//           </h2>
//           <Button variant="outline" size="sm">View All</Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
//           {mockAlerts.map((alert) => (
//             <Card key={alert.id} className="glass-panel border-border overflow-hidden">
//               <div className="flex gap-4 p-4">
//                 <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
//                   <img src={alert.snapshot} alt={alert.type} className="w-full h-full object-cover" />
//                   <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity)} text-[10px]`}>
//                     {alert.severity.toUpperCase()}
//                   </Badge>
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h3 className="font-semibold text-foreground">{alert.type}</h3>
//                       <p className="text-xs text-muted-foreground">{alert.camera}</p>
//                     </div>
//                     <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
//                       {alert.status.toUpperCase()}
//                     </span>
//                   </div>

//                   <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

//                   <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
//                     <span>{alert.location}</span>
//                     <span>•</span>
//                     <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
//                   </div>

//                   <div className="flex gap-2 mt-auto">
//                     <Button size="sm" variant="outline" className="flex-1">
//                       <Eye className="h-3 w-3 mr-1" />
//                       View
//                     </Button>
//                     <Button size="sm" variant="outline" className="flex-1">
//                       <CheckCircle2 className="h-3 w-3 mr-1" />
//                       Mark Safe
//                     </Button>
//                     <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
//                       Add to Evidence
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useRef, useState } from "react";
// import { mockAlerts, mockCameras } from "@/lib/mockData";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Eye, CheckCircle2, AlertTriangle, CameraOff, Camera, Bell } from "lucide-react";

// type CamInfo = {
//   deviceId?: string;
//   label?: string;
//   status: "online" | "offline";
//   stream?: MediaStream | null;
//   error?: string | null;
// };

// type Alert = {
//   _id: string;
//   image_url: string;
//   category: string;
//   cam_id: string;
//   location: string;
//   timestamp: string;
//   severity?: "critical" | "high" | "medium" | "low";
//   status?: "active" | "investigating" | "resolved";
//   description?: string;
// };

// export default function DashboardThreeCams() {
//   // local devices
//   const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
//   const [laptopCam, setLaptopCam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
//   const [webcam, setWebcam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
//   const [loadingDevices, setLoadingDevices] = useState(true);

//   // Alerts state
//   const [alerts, setAlerts] = useState<Alert[]>([]);
//   const [loadingAlerts, setLoadingAlerts] = useState(true);
//   const [newAlertCount, setNewAlertCount] = useState(0);
//   const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());

//   // IP camera state (third camera)
//   const ipCameraUrl = "http://192.168.219.228:8080/video";
//   const [ipRunning, setIpRunning] = useState<boolean>(true);
//   const [ipError, setIpError] = useState<string | null>(null);
//   const [ipLastSnapshot, setIpLastSnapshot] = useState<string | null>(null);
//   const ipImgRef = useRef<HTMLImageElement | null>(null);

//   // refs for local videos
//   const laptopVideoRef = useRef<HTMLVideoElement | null>(null);
//   const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

//   // Fetch alerts from API
//   const fetchAlerts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/alerts/');
//       if (!response.ok) throw new Error('Failed to fetch alerts');
//       const data = await response.json();
      
//       // Calculate new alerts since last fetch
//       if (lastFetchTime) {
//         const newAlerts = data.filter((alert: Alert) => 
//           new Date(alert.timestamp) > lastFetchTime
//         );
//         setNewAlertCount(newAlerts.length);
        
//         // Show notification for new alerts
//         if (newAlerts.length > 0) {
//           showNewAlertNotification(newAlerts);
//         }
//       }
      
//       setAlerts(data);
//       setLastFetchTime(new Date());
//     } catch (error) {
//       console.error('Error fetching alerts:', error);
//       // Fallback to mock data if API fails
//       setAlerts(mockAlerts.map(alert => ({
//         _id: alert.id,
//         image_url: alert.snapshot,
//         category: alert.type,
//         cam_id: alert.camera,
//         location: alert.location,
//         timestamp: alert.timestamp,
//         severity: alert.severity as "critical" | "high" | "medium" | "low",
//         status: alert.status as "active" | "investigating" | "resolved",
//         description: alert.description
//       })));
//     } finally {
//       setLoadingAlerts(false);
//     }
//   };

//   // Show notification for new alerts
//   const showNewAlertNotification = (newAlerts: Alert[]) => {
//     if ('Notification' in window && Notification.permission === 'granted') {
//       newAlerts.forEach(alert => {
//         new Notification(`New ${alert.severity} Alert`, {
//           body: `${alert.category} detected at ${alert.location}`,
//           icon: alert.image_url
//         });
//       });
//     }
//   };

//   // Request notification permission
//   useEffect(() => {
//     if ('Notification' in window && Notification.permission === 'default') {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Fetch alerts on component mount and set up polling
//   useEffect(() => {
//     fetchAlerts();
    
//     // Set up polling every 30 seconds
//     const interval = setInterval(fetchAlerts, 30000);
    
//     return () => clearInterval(interval);
//   }, []);

//   // discover local video devices and set initial states
//   useEffect(() => {
//     let mounted = true;

//     async function discover() {
//       setLoadingDevices(true);
//       try {
//         try {
//           const temp = await navigator.mediaDevices.getUserMedia({ video: true });
//           temp.getTracks().forEach((t) => t.stop());
//         } catch {
//           // ignore; labels may be empty
//         }

//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const cams = devices.filter((d) => d.kind === "videoinput");

//         if (!mounted) return;
//         setAvailableCameras(cams);

//         const labelLower = (s?: string) => (s || "").toLowerCase();
//         const isLaptopLabel = (label?: string) =>
//           ["front", "integrated", "internal", "face", "built-in", "facetime"].some((k) =>
//             labelLower(label).includes(k)
//           );

//         let laptopDevice = cams.find((c) => isLaptopLabel(c.label));
//         if (!laptopDevice && cams.length > 0) laptopDevice = cams[0];
//         let externalDevice = cams.find((c) => c.deviceId !== laptopDevice?.deviceId);

//         setLaptopCam({
//           deviceId: laptopDevice?.deviceId,
//           label: laptopDevice?.label || (laptopDevice ? `Camera ${laptopDevice.deviceId}` : "No device"),
//           status: "offline",
//           stream: null,
//           error: null,
//         });

//         setWebcam({
//           deviceId: externalDevice?.deviceId,
//           label: externalDevice?.label || (externalDevice ? `Camera ${externalDevice.deviceId}` : "No device"),
//           status: "offline",
//           stream: null,
//           error: null,
//         });
//       } catch (err) {
//         console.error("discover devices error", err);
//         setLaptopCam({ deviceId: undefined, label: mockCameras[0]?.name ?? "Laptop (mock)", status: "online", stream: null, error: null });
//         setWebcam({ deviceId: undefined, label: mockCameras[1]?.name ?? "Webcam (mock)", status: "online", stream: null, error: null });
//       } finally {
//         if (mounted) setLoadingDevices(false);
//       }
//     }

//     discover();

//     return () => {
//       mounted = false;
//       [laptopCam, webcam].forEach((c) => {
//         if (c.stream) c.stream.getTracks().forEach((t) => t.stop());
//       });
//     };
//   }, []);

//   // attach streams to video elements when changed
//   useEffect(() => {
//     if (laptopVideoRef.current && laptopCam.stream) {
//       laptopVideoRef.current.srcObject = laptopCam.stream;
//       laptopVideoRef.current.play().catch(() => {});
//     }
//   }, [laptopCam.stream]);

//   useEffect(() => {
//     if (webcamVideoRef.current && webcam.stream) {
//       webcamVideoRef.current.srcObject = webcam.stream;
//       webcamVideoRef.current.play().catch(() => {});
//     }
//   }, [webcam.stream]);

//   // start camera by deviceId or default
//   const startCamera = async (which: "laptop" | "webcam") => {
//     const camState = which === "laptop" ? laptopCam : webcam;
//     try {
//       const constraints: MediaStreamConstraints = camState.deviceId
//         ? { video: { deviceId: { exact: camState.deviceId } } }
//         : { video: true };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);

//       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream, status: "online", error: null }));
//       else setWebcam((s) => ({ ...s, stream, status: "online", error: null }));
//     } catch (err: any) {
//       console.error("startCamera error", err);
//       if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
//       else setWebcam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
//     }
//   };

//   const stopCamera = (which: "laptop" | "webcam") => {
//     const camState = which === "laptop" ? laptopCam : webcam;
//     if (camState.stream) camState.stream.getTracks().forEach((t) => t.stop());
//     if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline" }));
//     else setWebcam((s) => ({ ...s, stream: null, status: "offline" }));
//   };

//   const changeDevice = (which: "laptop" | "webcam", deviceId?: string) => {
//     if (which === "laptop") {
//       if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
//       setLaptopCam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
//     } else {
//       if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
//       setWebcam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
//     }
//   };

//   // UI helpers
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "bg-threat text-white tactical-glow";
//       case "high":
//         return "bg-warning text-black warning-glow";
//       case "medium":
//         return "bg-amber text-black";
//       default:
//         return "bg-muted text-foreground";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "text-threat";
//       case "investigating":
//         return "text-warning";
//       case "monitoring":
//         return "text-amber";
//       default:
//         return "text-muted-foreground";
//     }
//   };

//   // Format alert category for display
//   const formatAlertCategory = (category: string) => {
//     return category.split('_').map(word => 
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');
//   };

//   // Render camera tile (local)
//   function LocalCameraTile({ which }: { which: "laptop" | "webcam" }) {
//     const cam = which === "laptop" ? laptopCam : webcam;
//     const ref = which === "laptop" ? laptopVideoRef : webcamVideoRef;
//     const mock = which === "laptop" ? mockCameras[0] : mockCameras[1];

//     return (
//       <Card className="glass-panel border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
//         <div className="relative aspect-video bg-muted flex items-center justify-center">
//           {which === "laptop" ? (
//             <img
//               src="http://localhost:5000/lapcam"
//               alt={cam.label ?? mock?.name}
//               className="w-full h-full object-cover"
//             />
//           ) : cam.stream ? (
//             <video ref={ref} className="w-full h-full object-cover" playsInline />
//           ) : (
//             <img src={mock?.feed ?? "/images/video-placeholder.png"} alt={cam.label ?? mock?.name} className="w-full h-full object-cover" />
//           )}

//           <Badge className={`absolute top-2 right-2 text-[10px] ${cam.status === "online" ? "bg-tactical text-white" : "bg-warning text-black"}`}>
//             {cam.status === "online" ? "LIVE" : "OFFLINE"}
//           </Badge>
//         </div>

//         <CardContent className="p-3">
//           <h3 className="font-semibold text-sm text-foreground">{which === "laptop" ? "Laptop Camera" : "Webcam"}</h3>
//           <p className="text-xs text-muted-foreground">{cam.label ?? (which === "laptop" ? mock?.name : mock?.name)}</p>
//           <p className="text-[10px] text-muted-foreground mt-1">{cam.deviceId ? `ID: ${cam.deviceId.slice(-8)}` : "device-id: none"}</p>

//           <div className="mt-2 flex items-center gap-2 flex-wrap">
//             {availableCameras.length > 0 && (
//               <select
//                 value={cam.deviceId ?? ""}
//                 onChange={(e) => changeDevice(which, e.target.value || undefined)}
//                 className="text-xs p-1 rounded border bg-background"
//                 aria-label={`Select ${which} device`}
//               >
//                 <option value="">{which === "laptop" ? "Default laptop cam" : "Default webcam"}</option>
//                 {availableCameras.map((d) => (
//                   <option key={d.deviceId} value={d.deviceId}>
//                     {d.label || `Camera (${d.deviceId.slice(-4)})`}
//                   </option>
//                 ))}
//               </select>
//             )}

//             {cam.stream ? (
//               <Button size="sm" variant="outline" onClick={() => stopCamera(which)} className="flex-1 min-w-[80px]">
//                 <CameraOff className="h-4 w-4 mr-1" /> Stop
//               </Button>
//             ) : (
//               <Button size="sm" onClick={() => startCamera(which)} className="flex-1 min-w-[80px]">
//                 <Camera className="h-4 w-4 mr-1" /> Start
//               </Button>
//             )}
//           </div>

//           {cam.error && <div className="text-xs text-red-500 mt-2">Error: {cam.error}</div>}
//         </CardContent>
//       </Card>
//     );
//   }

//   // Render IP camera tile (third)
//   function IpCameraTile() {
//     const mock = mockCameras[2] ?? { feed: "/images/video-placeholder.png", name: "IP Camera" };

//     return (
//       <Card className="glass-panel border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
//         <div className="relative aspect-video bg-muted flex items-center justify-center">
//           {ipRunning ? (
//             <img
//               ref={ipImgRef}
//               src={ipCameraUrl}
//               alt="IP Camera"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 console.error("IP camera image error", e);
//                 setIpError("Failed to load IP camera stream. Check network/CORS or use a server proxy.");
//               }}
//             />
//           ) : (
//             <img src={mock.feed} alt={mock.name} className="w-full h-full object-cover" />
//           )}

//           <Badge className={`absolute top-2 right-2 text-[10px] ${ipRunning ? "bg-tactical text-white" : "bg-warning text-black"}`}>
//             {ipRunning ? "IP LIVE" : "IP OFF"}
//           </Badge>
//         </div>

//         <CardContent className="p-3">
//           <h3 className="font-semibold text-sm text-foreground">IP Camera</h3>
//           <p className="text-xs text-muted-foreground truncate">{ipCameraUrl}</p>
//           <p className="text-[10px] text-muted-foreground mt-1">{ipLastSnapshot ? "Last snapshot available" : "No snapshot yet"}</p>

//           <div className="mt-2 flex items-center gap-2">
//             <Button size="sm" onClick={() => toggleIpRunning()} className="flex-1">
//               {ipRunning ? <CameraOff className="h-4 w-4 mr-1" /> : <Camera className="h-4 w-4 mr-1" />}
//               {ipRunning ? "Stop IP" : "Start IP"}
//             </Button>
//           </div>

//           {ipError && <div className="text-xs text-red-500 mt-2">{ipError}</div>}
//         </CardContent>
//       </Card>
//     );
//   }

//   const toggleIpRunning = () => {
//     setIpError(null);
//     setIpRunning((v) => !v);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Alert Notification */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
//           <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
//         </div>
        
//         {/* New Alerts Indicator */}
//         {newAlertCount > 0 && (
//           <div className="flex items-center gap-2 bg-threat/10 border border-threat/20 rounded-lg px-4 py-2">
//             <Bell className="h-5 w-5 text-threat animate-pulse" />
//             <div>
//               <p className="text-sm font-semibold text-threat">{newAlertCount} New Alert(s)</p>
//               <p className="text-xs text-muted-foreground">Since last refresh</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Three camera sections in a grid */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//             <span>{availableCameras.length} Local Cameras Detected</span>
//             <span> • IP Camera: {ipCameraUrl}</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {loadingDevices ? (
//             <div className="col-span-full text-center text-muted-foreground py-8">Detecting cameras…</div>
//           ) : (
//             <>
//               <LocalCameraTile which="laptop" />
//               <LocalCameraTile which="webcam" />
//               <IpCameraTile />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Dynamic Alerts Section */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5 text-threat" />
//             Critical Alerts ({alerts.length})
//             {newAlertCount > 0 && (
//               <Badge className="bg-threat text-white ml-2 animate-pulse">
//                 {newAlertCount} NEW
//               </Badge>
//             )}
//           </h2>
//           <div className="flex items-center gap-2">
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={fetchAlerts}
//               disabled={loadingAlerts}
//             >
//               {loadingAlerts ? "Refreshing..." : "Refresh"}
//             </Button>
//             <Button variant="outline" size="sm">View All</Button>
//           </div>
//         </div>

//         {loadingAlerts ? (
//           <div className="text-center py-8 text-muted-foreground">Loading alerts...</div>
//         ) : alerts.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground glass-panel rounded-lg">
//             <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
//             <p>No alerts found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
//             {alerts.map((alert) => (
//               <Card key={alert._id} className="glass-panel border-border overflow-hidden hover:shadow-lg transition-all duration-300">
//                 <div className="flex gap-4 p-4">
//                   <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
//                     <img 
//                       src={alert.image_url} 
//                       alt={alert.category} 
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src = "/images/alert-placeholder.jpg";
//                       }}
//                     />
//                     <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity || 'medium')} text-[10px]`}>
//                       {(alert.severity || 'medium').toUpperCase()}
//                     </Badge>
//                   </div>

//                   <div className="flex-1 flex flex-col">
//                     <div className="flex items-start justify-between mb-2">
//                       <div>
//                         <h3 className="font-semibold text-foreground">{formatAlertCategory(alert.category)}</h3>
//                         <p className="text-xs text-muted-foreground">{alert.cam_id}</p>
//                       </div>
//                       <span className={`text-xs font-medium ${getStatusColor(alert.status || 'active')}`}>
//                         {(alert.status || 'active').toUpperCase()}
//                       </span>
//                     </div>

//                     <p className="text-sm text-muted-foreground mb-3">
//                       {alert.description || `Detected at ${alert.location}`}
//                     </p>

//                     <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
//                       <span>{alert.location}</span>
//                       <span>•</span>
//                       <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
//                     </div>

//                     <div className="flex gap-2 mt-auto">
//                       <Button size="sm" variant="outline" className="flex-1">
//                         <Eye className="h-3 w-3 mr-1" />
//                         View
//                       </Button>
//                       <Button size="sm" variant="outline" className="flex-1">
//                         <CheckCircle2 className="h-3 w-3 mr-1" />
//                         Mark Safe
//                       </Button>
//                       <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
//                         Add to Evidence
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from next/navigation to react-router
import { mockAlerts, mockCameras } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, CheckCircle2, AlertTriangle, CameraOff, Camera, Bell, FolderPlus, Grid3X3, List } from "lucide-react";

type CamInfo = {
  deviceId?: string;
  label?: string;
  status: "online" | "offline";
  stream?: MediaStream | null;
  error?: string | null;
};

type Alert = {
  _id: string;
  image_url: string;
  category: string;
  cam_id: string;
  location: string;
  timestamp: string;
  severity?: "critical" | "high" | "medium" | "low";
  status?: "active" | "investigating" | "resolved";
  description?: string;
};

type ViewMode = "grid" | "list";

export default function DashboardThreeCams() {
  const navigate = useNavigate(); // Changed from useRouter to useNavigate
  
  // local devices
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [laptopCam, setLaptopCam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
  const [webcam, setWebcam] = useState<CamInfo>({ status: "offline", stream: null, error: null });
  const [loadingDevices, setLoadingDevices] = useState(true);

  // Alerts state
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [newAlertCount, setNewAlertCount] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // IP camera state (third camera)
  const ipCameraUrl = "http://192.168.219.228:8080/video";
  const [ipRunning, setIpRunning] = useState<boolean>(true);
  const [ipError, setIpError] = useState<string | null>(null);
  const [ipLastSnapshot, setIpLastSnapshot] = useState<string | null>(null);
  const ipImgRef = useRef<HTMLImageElement | null>(null);

  // refs for local videos
  const laptopVideoRef = useRef<HTMLVideoElement | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch alerts from API
  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/alerts/');
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      
      // Calculate new alerts since last fetch
      if (lastFetchTime) {
        const newAlerts = data.filter((alert: Alert) => 
          new Date(alert.timestamp) > lastFetchTime
        );
        setNewAlertCount(newAlerts.length);
        
        // Show notification for new alerts
        if (newAlerts.length > 0) {
          showNewAlertNotification(newAlerts);
        }
      }
      
      setAlerts(data);
      setLastFetchTime(new Date());
    } catch (error) {
      console.error('Error fetching alerts:', error);
      // Fallback to mock data if API fails
      setAlerts(mockAlerts.map(alert => ({
        _id: alert.id,
        image_url: alert.snapshot,
        category: alert.type,
        cam_id: alert.camera,
        location: alert.location,
        timestamp: alert.timestamp,
        severity: alert.severity as "critical" | "high" | "medium" | "low",
        status: alert.status as "active" | "investigating" | "resolved",
        description: alert.description
      })));
    } finally {
      setLoadingAlerts(false);
    }
  };

  // Add alert to case and redirect to Teams page
  const addToCase = (alert: Alert) => {
    // Store the alert data in sessionStorage or pass as query params
    const caseData = {
      alertId: alert._id,
      imageUrl: alert.image_url,
      category: alert.category,
      location: alert.location,
      timestamp: alert.timestamp,
      severity: alert.severity,
      camera: alert.cam_id
    };
    
    // Store in sessionStorage for access in Teams page
    sessionStorage.setItem('currentCase', JSON.stringify(caseData));
    
    // Redirect to Teams page using React Router
    navigate('/teams');
  };

  // Show notification for new alerts
  const showNewAlertNotification = (newAlerts: Alert[]) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      newAlerts.forEach(alert => {
        new Notification(`New ${alert.severity} Alert`, {
          body: `${alert.category} detected at ${alert.location}`,
          icon: alert.image_url
        });
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Fetch alerts on component mount and set up polling
  useEffect(() => {
    fetchAlerts();
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // discover local video devices and set initial states
  useEffect(() => {
    let mounted = true;

    async function discover() {
      setLoadingDevices(true);
      try {
        try {
          const temp = await navigator.mediaDevices.getUserMedia({ video: true });
          temp.getTracks().forEach((t) => t.stop());
        } catch {
          // ignore; labels may be empty
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((d) => d.kind === "videoinput");

        if (!mounted) return;
        setAvailableCameras(cams);

        const labelLower = (s?: string) => (s || "").toLowerCase();
        const isLaptopLabel = (label?: string) =>
          ["front", "integrated", "internal", "face", "built-in", "facetime"].some((k) =>
            labelLower(label).includes(k)
          );

        let laptopDevice = cams.find((c) => isLaptopLabel(c.label));
        if (!laptopDevice && cams.length > 0) laptopDevice = cams[0];
        let externalDevice = cams.find((c) => c.deviceId !== laptopDevice?.deviceId);

        setLaptopCam({
          deviceId: laptopDevice?.deviceId,
          label: laptopDevice?.label || (laptopDevice ? `Camera ${laptopDevice.deviceId}` : "No device"),
          status: "offline",
          stream: null,
          error: null,
        });

        setWebcam({
          deviceId: externalDevice?.deviceId,
          label: externalDevice?.label || (externalDevice ? `Camera ${externalDevice.deviceId}` : "No device"),
          status: "offline",
          stream: null,
          error: null,
        });
      } catch (err) {
        console.error("discover devices error", err);
        setLaptopCam({ deviceId: undefined, label: mockCameras[0]?.name ?? "Laptop (mock)", status: "online", stream: null, error: null });
        setWebcam({ deviceId: undefined, label: mockCameras[1]?.name ?? "Webcam (mock)", status: "online", stream: null, error: null });
      } finally {
        if (mounted) setLoadingDevices(false);
      }
    }

    discover();

    return () => {
      mounted = false;
      [laptopCam, webcam].forEach((c) => {
        if (c.stream) c.stream.getTracks().forEach((t) => t.stop());
      });
    };
  }, []);

  // attach streams to video elements when changed
  useEffect(() => {
    if (laptopVideoRef.current && laptopCam.stream) {
      laptopVideoRef.current.srcObject = laptopCam.stream;
      laptopVideoRef.current.play().catch(() => {});
    }
  }, [laptopCam.stream]);

  useEffect(() => {
    if (webcamVideoRef.current && webcam.stream) {
      webcamVideoRef.current.srcObject = webcam.stream;
      webcamVideoRef.current.play().catch(() => {});
    }
  }, [webcam.stream]);

  // start camera by deviceId or default
  const startCamera = async (which: "laptop" | "webcam") => {
    const camState = which === "laptop" ? laptopCam : webcam;
    try {
      const constraints: MediaStreamConstraints = camState.deviceId
        ? { video: { deviceId: { exact: camState.deviceId } } }
        : { video: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (which === "laptop") setLaptopCam((s) => ({ ...s, stream, status: "online", error: null }));
      else setWebcam((s) => ({ ...s, stream, status: "online", error: null }));
    } catch (err: any) {
      console.error("startCamera error", err);
      if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
      else setWebcam((s) => ({ ...s, stream: null, status: "offline", error: err?.message ?? String(err) }));
    }
  };

  const stopCamera = (which: "laptop" | "webcam") => {
    const camState = which === "laptop" ? laptopCam : webcam;
    if (camState.stream) camState.stream.getTracks().forEach((t) => t.stop());
    if (which === "laptop") setLaptopCam((s) => ({ ...s, stream: null, status: "offline" }));
    else setWebcam((s) => ({ ...s, stream: null, status: "offline" }));
  };

  const changeDevice = (which: "laptop" | "webcam", deviceId?: string) => {
    if (which === "laptop") {
      if (laptopCam.stream) laptopCam.stream.getTracks().forEach((t) => t.stop());
      setLaptopCam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
    } else {
      if (webcam.stream) webcam.stream.getTracks().forEach((t) => t.stop());
      setWebcam((s) => ({ ...s, deviceId, stream: null, status: "offline", error: null }));
    }
  };

  // UI helpers
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-threat text-white tactical-glow";
      case "high":
        return "bg-warning text-black warning-glow";
      case "medium":
        return "bg-amber text-black";
      default:
        return "bg-muted text-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-threat";
      case "investigating":
        return "text-warning";
      case "monitoring":
        return "text-amber";
      default:
        return "text-muted-foreground";
    }
  };

  // Format alert category for display
  const formatAlertCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Render camera tile (local)
  function LocalCameraTile({ which }: { which: "laptop" | "webcam" }) {
    const cam = which === "laptop" ? laptopCam : webcam;
    const ref = which === "laptop" ? laptopVideoRef : webcamVideoRef;
    const mock = which === "laptop" ? mockCameras[0] : mockCameras[1];

    return (
      <Card className="glass-panel border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          {/* All cameras now use Python backend streams */}
          {which === "laptop" ? (
            <img
              src="http://localhost:5000/lapcam"
              alt={cam.label ?? mock?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Laptop camera stream failed");
                e.currentTarget.src = mock?.feed ?? "/images/video-placeholder.png";
              }}
            />
          ) : which === "webcam" ? (
            <img
              src="http://localhost:5000/webcam"
              alt={cam.label ?? mock?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Webcam stream failed");
                e.currentTarget.src = mock?.feed ?? "/images/video-placeholder.png";
              }}
            />
          ) : (
            <img src={mock?.feed ?? "/images/video-placeholder.png"} alt={cam.label ?? mock?.name} className="w-full h-full object-cover" />
          )}

          <Badge className={`absolute top-2 right-2 text-[10px] ${cam.status === "online" ? "bg-tactical text-white" : "bg-warning text-black"}`}>
            {cam.status === "online" ? "LIVE" : "OFFLINE"}
          </Badge>
        </div>

        <CardContent className="p-3">
          <h3 className="font-semibold text-sm text-foreground">{which === "laptop" ? "Laptop Camera" : "Webcam"}</h3>
          <p className="text-xs text-muted-foreground">{cam.label ?? (which === "laptop" ? mock?.name : mock?.name)}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{cam.deviceId ? `ID: ${cam.deviceId.slice(-8)}` : "Python Backend"}</p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {availableCameras.length > 0 && (
              <select
                value={cam.deviceId ?? ""}
                onChange={(e) => changeDevice(which, e.target.value || undefined)}
                className="text-xs p-1 rounded border bg-background"
                aria-label={`Select ${which} device`}
              >
                <option value="">{which === "laptop" ? "Default laptop cam" : "Default webcam"}</option>
                {availableCameras.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera (${d.deviceId.slice(-4)})`}
                  </option>
                ))}
              </select>
            )}

            {cam.stream ? (
              <Button size="sm" variant="outline" onClick={() => stopCamera(which)} className="flex-1 min-w-[80px]">
                <CameraOff className="h-4 w-4 mr-1" /> Stop
              </Button>
            ) : (
              <Button size="sm" onClick={() => startCamera(which)} className="flex-1 min-w-[80px]">
                <Camera className="h-4 w-4 mr-1" /> Start
              </Button>
            )}
          </div>

          {cam.error && <div className="text-xs text-red-500 mt-2">Error: {cam.error}</div>}
        </CardContent>
      </Card>
    );
  }

  // Render IP camera tile (third)
  function IpCameraTile() {
    const mock = mockCameras[2] ?? { feed: "/images/video-placeholder.png", name: "IP Camera" };

    return (
      <Card className="glass-panel border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          {ipRunning ? (
            <img
              ref={ipImgRef}
              src="http://localhost:5000/ipcam"  // Changed to use Python backend
              alt="IP Camera"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("IP camera stream failed, falling back to direct URL");
                e.currentTarget.src = ipCameraUrl;
              }}
            />
          ) : (
            <img src={mock.feed} alt={mock.name} className="w-full h-full object-cover" />
          )}

          <Badge className={`absolute top-2 right-2 text-[10px] ${ipRunning ? "bg-tactical text-white" : "bg-warning text-black"}`}>
            {ipRunning ? "IP LIVE" : "IP OFF"}
          </Badge>
        </div>

        <CardContent className="p-3">
          <h3 className="font-semibold text-sm text-foreground">IP Camera</h3>
          <p className="text-xs text-muted-foreground truncate">Python Backend Stream</p>
          <p className="text-[10px] text-muted-foreground mt-1">{ipLastSnapshot ? "Last snapshot available" : "No snapshot yet"}</p>

          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" onClick={() => toggleIpRunning()} className="flex-1">
              {ipRunning ? <CameraOff className="h-4 w-4 mr-1" /> : <Camera className="h-4 w-4 mr-1" />}
              {ipRunning ? "Stop IP" : "Start IP"}
            </Button>
          </div>

          {ipError && <div className="text-xs text-red-500 mt-2">{ipError}</div>}
        </CardContent>
      </Card>
    );
  }

  const toggleIpRunning = () => {
    setIpError(null);
    setIpRunning((v) => !v);
  };

  // Render alert in grid view
  const renderAlertGrid = (alert: Alert) => (
    <Card key={alert._id} className="glass-panel border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex gap-4 p-4">
        <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img 
            src={alert.image_url} 
            alt={alert.category} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/alert-placeholder.jpg";
            }}
          />
          <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity || 'medium')} text-[10px]`}>
            {(alert.severity || 'medium').toUpperCase()}
          </Badge>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground">{formatAlertCategory(alert.category)}</h3>
              <p className="text-xs text-muted-foreground">{alert.cam_id}</p>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(alert.status || 'active')}`}>
              {(alert.status || 'active').toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {alert.description || `Detected at ${alert.location}`}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <span>{alert.location}</span>
            <span>•</span>
            <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
          </div>

          <div className="flex gap-2 mt-auto">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Mark Safe
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-threat hover:bg-threat/90"
              onClick={() => addToCase(alert)}
            >
              <FolderPlus className="h-3 w-3 mr-1" />
              Add to Case
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // Render alert in list view
  const renderAlertList = (alert: Alert) => (
    <Card key={alert._id} className="glass-panel border-border overflow-hidden hover:shadow-lg transition-all duration-300 mb-3">
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img 
            src={alert.image_url} 
            alt={alert.category} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/alert-placeholder.jpg";
            }}
          />
          <Badge className={`absolute top-1 left-1 ${getSeverityColor(alert.severity || 'medium')} text-[8px] px-1`}>
            {(alert.severity || 'medium').charAt(0).toUpperCase()}
          </Badge>
        </div>

        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
          <div>
            <h3 className="font-semibold text-sm text-foreground">{formatAlertCategory(alert.category)}</h3>
            <p className="text-xs text-muted-foreground">{alert.cam_id}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground truncate">{alert.location}</p>
            <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleTimeString()}</p>
          </div>

          <div className="text-center">
            <span className={`text-xs font-medium ${getStatusColor(alert.status || 'active')}`}>
              {(alert.status || 'active').toUpperCase()}
            </span>
          </div>

          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline">
              <Eye className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline">
              <CheckCircle2 className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              className="bg-threat hover:bg-threat/90"
              onClick={() => addToCase(alert)}
            >
              <FolderPlus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with Alert Notification */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
          <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
        </div>
        
        {/* New Alerts Indicator */}
        {newAlertCount > 0 && (
          <div className="flex items-center gap-2 bg-threat/10 border border-threat/20 rounded-lg px-4 py-2">
            <Bell className="h-5 w-5 text-threat animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-threat">{newAlertCount} New Alert(s)</p>
              <p className="text-xs text-muted-foreground">Since last refresh</p>
            </div>
          </div>
        )}
      </div>

      {/* Three camera sections in a grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
            <span>{availableCameras.length} Local Cameras Detected</span>
            <span> • All streams via Python Backend</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loadingDevices ? (
            <div className="col-span-full text-center text-muted-foreground py-8">Detecting cameras…</div>
          ) : (
            <>
              <LocalCameraTile which="laptop" />
              <LocalCameraTile which="webcam" />
              <IpCameraTile />
            </>
          )}
        </div>
      </div>

      {/* Dynamic Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-threat" />
              Critical Alerts ({alerts.length})
              {newAlertCount > 0 && (
                <Badge className="bg-threat text-white ml-2 animate-pulse">
                  {newAlertCount} NEW
                </Badge>
              )}
            </h2>
            
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchAlerts}
              disabled={loadingAlerts}
            >
              {loadingAlerts ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </div>

        {loadingAlerts ? (
          <div className="text-center py-8 text-muted-foreground">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground glass-panel rounded-lg">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No alerts found</p>
            <p className="text-sm text-muted-foreground mt-2">Alerts will appear here when detected by the system</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
            {alerts.map(renderAlertGrid)}
          </div>
        ) : (
          <div className="max-w-[1050px] mx-auto">
            {/* List View Header */}
            <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-semibold text-muted-foreground border-b mb-2">
              <div>Alert Type</div>
              <div>Location & Time</div>
              <div className="text-center">Status</div>
              <div className="text-right">Actions</div>
            </div>
            {alerts.map(renderAlertList)}
          </div>
        )}
      </div>
    </div>
  );
}