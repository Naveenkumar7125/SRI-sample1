// // import { mockEvidence } from "@/lib/mockData";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Card } from "@/components/ui/card";
// // import { Download, FolderPlus, Play } from "lucide-react";

// // export default function LiveEvidence() {
// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground mb-2">Live Evidence Storage</h1>
// //         <p className="text-muted-foreground">Archived detection clips and recordings</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {mockEvidence.map((item) => (
// //           <Card key={item.id} className="glass-panel border-border overflow-hidden group">
// //             <div className="relative aspect-video bg-muted">
// //               <img 
// //                 src={item.thumbnail}
// //                 alt={item.type}
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// //                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm">
// //                   <Play className="h-6 w-6 text-white" />
// //                 </Button>
// //               </div>
// //               <Badge className="absolute top-2 left-2 bg-threat text-white text-xs">
// //                 {item.type}
// //               </Badge>
// //               <div className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
// //                 {item.duration}
// //               </div>
// //             </div>
            
// //             <div className="p-4 space-y-3">
// //               <div>
// //                 <h3 className="font-semibold text-sm text-foreground">{item.type}</h3>
// //                 <p className="text-xs text-muted-foreground">{item.camera}</p>
// //               </div>
              
// //               <div className="text-xs text-muted-foreground">
// //                 {new Date(item.timestamp).toLocaleString()}
// //               </div>
              
// //               {item.caseId && (
// //                 <Badge variant="outline" className="text-xs">
// //                   {item.caseId}
// //                 </Badge>
// //               )}
              
// //               <div className="flex gap-2">
// //                 <Button size="sm" variant="outline" className="flex-1">
// //                   <Download className="h-3 w-3 mr-1" />
// //                   Download
// //                 </Button>
// //                 <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
// //                   <FolderPlus className="h-3 w-3 mr-1" />
// //                   Add to Case
// //                 </Button>
// //               </div>
// //             </div>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Download, FolderPlus, Play, X } from "lucide-react";

// /**
//  * LiveEvidence - robust fetch + fallback + inline preview
//  *
//  * Notes:
//  * - Expects GET /api/videos to return an array of video documents (JSON).
//  * - Each doc should contain at least: _id or id, video_url, category, cam_no, location, timestamp
//  * - If the backend returns HTML or plain text, this will show a clear error and use local fallback data.
//  * - If your frontend is served from a different origin than backend, use an absolute URL or configure proxy.
//  */

// const fallbackMockEvidence = [
//   {
//     id: "1",
//     video_url: "https://example.com/videos/weapon_detected_1.mp4",
//     thumbnail: "/images/video-placeholder.png",
//     type: "weapon_detected",
//     camera: "CAM-01 • East Gate Entrance",
//     timestamp: "2025-11-15T08:12:00Z",
//     duration: "00:00:12",
//     caseId: null,
//   },
//   {
//     id: "2",
//     video_url: "https://example.com/videos/gun_detected_1.mp4",
//     thumbnail: "/images/video-placeholder.png",
//     type: "gun_detected",
//     camera: "CAM-02 • Parking Lot Zone-A",
//     timestamp: "2025-11-16T14:45:00Z",
//     duration: "00:00:08",
//     caseId: null,
//   },
//   {
//     id: "3",
//     video_url: "https://example.com/videos/fighting_detected_1.mp4",
//     thumbnail: "/images/video-placeholder.png",
//     type: "fighting_detected",
//     camera: "CAM-03 • Backside Corridor",
//     timestamp: "2025-11-16T07:05:00Z",
//     duration: "00:00:20",
//     caseId: "CASE-1001",
//   },
//   // add more fallback items if you want...
// ];

// export default function LiveEvidence() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   // inline preview state
//   const [preview, setPreview] = useState({ open: false, url: null });

//   useEffect(() => {
//     let cancelled = false;
//     async function fetchVideos() {
//       setLoading(true);
//       setErrorMsg(null);

//       try {
//         const res = await fetch("/api/videos", { cache: "no-store" });

//         // If server returned non-OK, try to read the body safely
//         if (!res.ok) {
//           // try to read text for clearer message
//           let txt = await safeText(res);
//           throw new Error(`Server responded ${res.status}: ${txt}`);
//         }

//         const contentType = res.headers.get("content-type") || "";

//         // If JSON, parse; otherwise attempt safe text parse
//         let data;
//         if (contentType.includes("application/json")) {
//           data = await res.json();
//         } else {
//           // Not JSON — try to read text and attempt JSON.parse
//           const text = await res.text();

//           // If text starts with '<' it's probably HTML — bail with clear message
//           if (text.trim().startsWith("<")) {
//             throw new Error(
//               "Backend returned HTML (not JSON). Please ensure your /api/videos endpoint returns JSON."
//             );
//           }

//           // try to parse JSON-like string; if fails, show message
//           try {
//             data = JSON.parse(text);
//           } catch (e) {
//             throw new Error(
//               "Failed to parse response as JSON. Response was plain text. Check backend /api/videos."
//             );
//           }
//         }

//         // At this point `data` should be an array of video docs
//         const arr = Array.isArray(data) ? data : [];

//         const mapped = arr.map((d, idx) => ({
//           id: d._id ?? d.id ?? String(idx),
//           video_url: d.video_url ?? d.url ?? "",
//           thumbnail: d.thumbnail ?? "/images/video-placeholder.png",
//           type: d.category ?? "unknown",
//           camera: `${d.cam_no ?? "CAM-?"}${d.location ? " • " + d.location : ""}`,
//           timestamp: d.timestamp ?? d.createdAt ?? Date.now(),
//           duration: d.duration ?? "",
//           caseId: d.caseId ?? null,
//         }));

//         if (!cancelled) {
//           // if no items returned, fallback to mock evidence so UI is visible
//           if (mapped.length === 0) {
//             setErrorMsg("No videos returned from server. Showing fallback mock data.");
//             setVideos(fallbackMockEvidence);
//           } else {
//             setVideos(mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
//           }
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setErrorMsg(err.message || "Failed to fetch videos. Showing fallback data.");
//           setVideos(fallbackMockEvidence);
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     fetchVideos();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // helper to safely read text from a non-ok response
//   async function safeText(res) {
//     try {
//       return await res.text();
//     } catch {
//       return "<unreadable response body>";
//     }
//   }

//   if (loading) {
//     return (
//       <div className="py-8">
//         <div className="text-center text-sm text-muted-foreground">Loading videos…</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Live Evidence Storage</h1>
//         <p className="text-muted-foreground">Archived detection clips and recordings</p>
//         {errorMsg && (
//           <div className="mt-2 text-sm text-yellow-600">
//             Warning: {errorMsg}
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.length === 0 && (
//           <div className="col-span-full text-center text-muted-foreground py-8">
//             No videos available.
//           </div>
//         )}

//         {videos.map((item) => (
//           <Card key={item.id} className="glass-panel border-border overflow-hidden group">
//             <div className="relative aspect-video bg-muted">
//               {item.thumbnail ? (
//                 <img
//                   src={item.thumbnail}
//                   alt={item.type}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.src = "/images/video-placeholder.png";
//                   }}
//                 />
//               ) : (
//                 // simple inline fallback thumbnail (SVG) if no image available
//                 <div className="w-full h-full flex items-center justify-center bg-slate-800/40">
//                   <svg width="120" height="68" viewBox="0 0 120 68" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect width="120" height="68" rx="6" fill="#1f2937" />
//                     <path d="M42 22v24l20-12-20-12z" fill="#9CA3AF" />
//                   </svg>
//                 </div>
//               )}

//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm"
//                   onClick={() => setPreview({ open: true, url: item.video_url })}
//                   aria-label={`Play ${item.type}`}
//                 >
//                   <Play className="h-6 w-6 text-white" />
//                 </Button>
//               </div>

//               <Badge className="absolute top-2 left-2 bg-threat text-white text-xs">
//                 {item.type}
//               </Badge>

//               <div className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
//                 {item.duration || new Date(item.timestamp).toLocaleTimeString()}
//               </div>
//             </div>

//             <div className="p-4 space-y-3">
//               <div>
//                 <h3 className="font-semibold text-sm text-foreground">{item.type}</h3>
//                 <p className="text-xs text-muted-foreground">{item.camera}</p>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 {new Date(item.timestamp).toLocaleString()}
//               </div>

//               {item.caseId && (
//                 <Badge variant="outline" className="text-xs">
//                   {item.caseId}
//                 </Badge>
//               )}

//               <div className="flex gap-2">
//                 <a href={item.video_url} target="_blank" rel="noreferrer" className="flex-1">
//                   <Button size="sm" variant="outline" className="w-full">
//                     <Download className="h-3 w-3 mr-1" />
//                     Download
//                   </Button>
//                 </a>

//                 <Button
//                   size="sm"
//                   className="flex-1 bg-threat hover:bg-threat/90"
//                   onClick={() => {
//                     // TODO: wire "Add to Case" action (open modal, call API, etc.)
//                     alert("Add to Case clicked for " + item.id);
//                   }}
//                 >
//                   <FolderPlus className="h-3 w-3 mr-1" />
//                   Add to Case
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Preview modal */}
//       {preview.open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//           <div className="relative w-full max-w-3xl bg-background rounded-md shadow-lg overflow-hidden">
//             <div className="flex items-center justify-between p-2 border-b">
//               <div className="text-sm font-medium">Preview</div>
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => setPreview({ open: false, url: null })}
//                 aria-label="Close preview"
//               >
//                 <X />
//               </Button>
//             </div>

//             <div className="p-4">
//               <video
//                 src={preview.url}
//                 controls
//                 autoPlay
//                 style={{ width: "100%", maxHeight: "65vh" }}
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Download, FolderPlus, Play, X } from "lucide-react";

/**
 * LiveEvidence - fetch ALL videos from backend and display them.
 * Uses exact URL: http://localhost:5000/api/videos
 *
 * Notes:
 * - Ensure backend is running at that URL and CORS allows requests from your frontend.
 * - If the response isn't JSON array, the component will show a helpful error and render nothing.
 * - Add /public/images/video-placeholder.png for nicer look, or thumbnails in DB.
 */

export default function LiveEvidence() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [preview, setPreview] = useState({ open: false, url: null });

  useEffect(() => {
    let cancelled = false;

    async function fetchAllVideos() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const res = await fetch("http://localhost:5000/api/videos", {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        // Debug: status + content-type
        console.debug("[LiveEvidence] fetch status:", res.status, "content-type:", res.headers.get("content-type"));

        if (!res.ok) {
          const text = await safeText(res);
          throw new Error(`Server error ${res.status}: ${text}`);
        }

        const contentType = (res.headers.get("content-type") || "").toLowerCase();

        let payload;
        if (contentType.includes("application/json")) {
          payload = await res.json();
        } else {
          // try safe parsing from text
          const txt = await res.text();
          if (txt.trim().startsWith("<")) {
            // HTML response
            throw new Error("Server returned HTML (not JSON). Ensure /api/videos returns JSON.");
          }
          try {
            payload = JSON.parse(txt);
          } catch (e) {
            throw new Error("Server returned non-JSON text that cannot be parsed.");
          }
        }

        // payload should be an array of video documents
        if (!Array.isArray(payload)) {
          // sometimes backend returns { data: [...] } — try to unwrap
          if (payload && Array.isArray(payload.data)) {
            payload = payload.data;
          } else {
            throw new Error("Unexpected response shape: expected an array of videos.");
          }
        }

        console.debug("[LiveEvidence] backend returned items:", payload.length);

        // map to UI-friendly shape
        const mapped = payload.map((d, idx) => ({
          id: d._id ?? d.id ?? String(idx),
          video_url: d.video_url ?? d.url ?? "",
          thumbnail: d.thumbnail ?? "/images/video-placeholder.png",
          type: d.category ?? "unknown",
          camera: `${d.cam_no ?? "CAM-?"}${d.location ? " • " + d.location : ""}`,
          timestamp: d.timestamp ?? d.createdAt ?? Date.now(),
          duration: d.duration ?? "",
          caseId: d.caseId ?? null,
        }));

        if (!cancelled) {
          // show all returned items, newest first
          setVideos(mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        }
      } catch (err) {
        console.error("[LiveEvidence] fetch error:", err);
        if (!cancelled) {
          setErrorMsg(err.message || "Failed to fetch videos");
          setVideos([]); // clear list so UI reflects actual server state
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAllVideos();
    return () => {
      cancelled = true;
    };
  }, []);

  async function safeText(res) {
    try {
      return await res.text();
    } catch {
      return "<unreadable response body>";
    }
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center text-sm text-muted-foreground">Loading videos…</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Evidence Storage</h1>
        <p className="text-muted-foreground">Archived detection clips and recordings</p>
        <div className="mt-2 text-sm text-muted-foreground">
          {errorMsg ? <span className="text-yellow-600">Warning: {errorMsg}</span> : null}
          <div>Videos returned: <strong>{videos.length}</strong></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No videos available.
          </div>
        )}

        {videos.map((item) => (
          <Card key={item.id} className="glass-panel border-border overflow-hidden group">
            <div className="relative aspect-video bg-muted">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.type}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/video-placeholder.png";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800/40">
                  <svg width="120" height="68" viewBox="0 0 120 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="68" rx="6" fill="#1f2937" />
                    <path d="M42 22v24l20-12-20-12z" fill="#9CA3AF" />
                  </svg>
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm"
                  onClick={() => setPreview({ open: true, url: item.video_url })}
                  aria-label={`Play ${item.type}`}
                >
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>

              <Badge className="absolute top-2 left-2 bg-threat text-white text-xs">
                {item.type}
              </Badge>

              <div className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                {item.duration || new Date(item.timestamp).toLocaleTimeString()}
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

              {item.caseId && (
                <Badge variant="outline" className="text-xs">
                  {item.caseId}
                </Badge>
              )}

              <div className="flex gap-2">
                <a href={item.video_url} target="_blank" rel="noreferrer" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </a>

                <Button
                  size="sm"
                  className="flex-1 bg-threat hover:bg-threat/90"
                  onClick={() => alert("Add to Case clicked for " + item.id)}
                >
                  <FolderPlus className="h-3 w-3 mr-1" />
                  Add to Case
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview modal */}
      {preview.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="relative w-full max-w-3xl bg-background rounded-md shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="text-sm font-medium">Preview</div>
              <Button size="icon" variant="ghost" onClick={() => setPreview({ open: false, url: null })} aria-label="Close preview">
                <X />
              </Button>
            </div>

            <div className="p-4">
              <video src={preview.url} controls autoPlay style={{ width: "100%", maxHeight: "65vh" }}>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
