#!/usr/bin/env python3
"""
lap_cam_yolo_stream.py
Run YOLOv8 person detection on the laptop webcam and expose a MJPEG endpoint
so the frontend can display processed frames with bounding boxes.

Usage:
  python lap_cam_yolo_stream.py
  python lap_cam_yolo_stream.py --device 0 --model "E:/SIH-25197/Final/frontend/yolov8s.pt" --conf 0.35 --show
  python lap_cam_yolo_stream.py --save-detections --save-dir detections

By default the Flask server listens on 0.0.0.0:5000 and provides:
  http://<host>:5000/lapcam   -> MJPEG stream of processed frames

Press Ctrl+C to stop.
"""

import argparse
import threading
import time
import os
from datetime import datetime
import io

import cv2
import numpy as np
from ultralytics import YOLO
from flask import Flask, Response
from flask_cors import CORS

# ---------- Drawing utility ----------
def draw_person_boxes(frame, boxes_xyxy, scores, classes, names):
    """Draw boxes but only for 'person' class on the frame (in-place)."""
    for xyxy, conf, cls in zip(boxes_xyxy, scores, classes):
        cls = int(cls)
        label = names.get(cls, str(cls))
        if label != "person":
            continue
        x1, y1, x2, y2 = map(int, xyxy)
        conf_text = f"{conf:.2f}"
        # Box
        cv2.rectangle(frame, (x1, y1), (x2, y2), (10, 200, 10), 2)
        # Filled label background
        text = f"{label} {conf_text}"
        (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)
        # Ensure label is inside image
        ly1 = max(0, y1 - th - 6)
        cv2.rectangle(frame, (x1, ly1), (x1 + tw + 6, y1), (10,200,10), -1)
        cv2.putText(frame, text, (x1 + 3, y1 - 4), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0,0,0), 1)

def ensure_dir(path):
    try:
        os.makedirs(path, exist_ok=True)
    except Exception:
        pass

# ---------- Camera worker ----------
class LapCamWorker(threading.Thread):
    """
    Capture frames from a local camera, run model inference, draw bounding boxes,
    and keep the latest JPEG frame available for MJPEG streaming.
    """
    def __init__(self, device_index, model, conf=0.25, imgsz=640, save_detections=False, save_dir="detections", show_local=False):
        super().__init__(daemon=True)
        self.device_index = device_index
        self.model = model
        self.conf = conf
        self.imgsz = imgsz
        self.save_detections = save_detections
        self.save_dir = save_dir
        self.show_local = show_local

        self.cap = None
        self.running = True
        self.lock = threading.Lock()
        self._jpeg_frame = None  # bytes
        self._last_save_time = 0

    def run(self):
        # Open camera
        # On Windows prefer CAP_DSHOW for lower latency; fallback if not Windows
        backend = cv2.CAP_DSHOW if os.name == "nt" else cv2.CAP_ANY
        cap = cv2.VideoCapture(self.device_index, backend)
        self.cap = cap
        if not cap.isOpened():
            print(f"[LapCamWorker] ERROR: Could not open camera device {self.device_index}")
            self.running = False
            return

        print(f"[LapCamWorker] Camera opened (device={self.device_index}). Starting inference loop...")
        prev = time.time()
        while self.running:
            ret, frame = cap.read()
            if not ret or frame is None:
                time.sleep(0.05)
                continue

            try:
                # Run inference (passing numpy frame)
                results = self.model.predict(source=frame, imgsz=self.imgsz, conf=self.conf, verbose=False)
                if len(results) > 0:
                    res = results[0]
                    if hasattr(res, "boxes") and len(res.boxes) > 0:
                        boxes_xyxy = res.boxes.xyxy.cpu().numpy()
                        scores = res.boxes.conf.cpu().numpy()
                        classes = res.boxes.cls.cpu().numpy().astype(int)
                        # Draw only 'person' boxes
                        draw_person_boxes(frame, boxes_xyxy, scores, classes, self.model.model.names)

                        # optionally save a snapshot when person detected (rate-limited)
                        if self.save_detections and any(self.model.model.names[int(c)] == "person" for c in classes):
                            now = time.time()
                            # save at most one every 1 second to avoid spamming
                            if now - self._last_save_time > 1.0:
                                ensure_dir(self.save_dir)
                                ts = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
                                fname = os.path.join(self.save_dir, f"det_{ts}.jpg")
                                cv2.imwrite(fname, frame)
                                self._last_save_time = now
                # draw fps
                now = time.time()
                fps = 1.0 / (now - prev) if now != prev else 0.0
                prev = now
                cv2.putText(frame, f"FPS: {fps:.1f}", (10, 26), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,0), 2)
            except Exception as e:
                # inference error: print and continue
                print("[LapCamWorker] inference error:", e)

            # prepare JPEG bytes
            try:
                ret2, jpeg = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
                if ret2:
                    with self.lock:
                        self._jpeg_frame = jpeg.tobytes()
            except Exception as e:
                print("[LapCamWorker] jpeg encode error:", e)

            # optionally show local window
            if self.show_local:
                cv2.imshow("Laptop Camera - YOLOv8 Person Detection", frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    # stop requested by local window
                    self.stop()
                    break

        cap.release()
        if self.show_local:
            cv2.destroyAllWindows()
        print("[LapCamWorker] Stopped.")

    def get_frame(self):
        with self.lock:
            return self._jpeg_frame

    def stop(self):
        self.running = False

# ---------- Flask MJPEG server ----------
app = Flask(__name__)
CORS(app)

worker = None  # global worker instance

def mjpeg_generator():
    """
    Generator for multipart/x-mixed-replace MJPEG stream using latest frame from worker.
    """
    while True:
        if worker is None:
            time.sleep(0.1)
            continue
        frame = worker.get_frame()
        if frame:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            # small sleep to yield CPU; the worker sets frames as fast as possible
            time.sleep(0.01)
        else:
            # no frame yet
            time.sleep(0.05)

@app.route('/lapcam')
def lapcam_stream():
    return Response(mjpeg_generator(), mimetype='multipart/x-mixed-replace; boundary=frame')

# ---------- Main ----------
def main(args):
    global worker
    # If user didn't pass model explicitly, default to the path you provided earlier
    model_path = args.model or r"E:/SIH-25197/Final/frontend/yolov8s.pt"
    print("[Main] Loading YOLO model from:", model_path)
    model = YOLO(model_path)  # loads custom model file

    # Start worker thread that captures, runs inference, and keeps latest frame
    worker = LapCamWorker(
        device_index=args.device,
        model=model,
        conf=args.conf,
        imgsz=args.imgsz,
        save_detections=args.save_detections,
        save_dir=args.save_dir,
        show_local=args.show
    )
    worker.start()

    # Wait a short moment for worker to start capturing frames
    time.sleep(0.5)
    print(f"[Main] Flask MJPEG endpoint available at http://{args.host}:{args.port}/lapcam")
    try:
        # Run Flask server (threaded) so mjpeg responses can stream
        app.run(host=args.host, port=args.port, threaded=True)
    except KeyboardInterrupt:
        print("[Main] KeyboardInterrupt - shutting down")
    finally:
        if worker:
            worker.stop()
            worker.join(timeout=2.0)
        print("[Main] Exited.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Laptop camera YOLOv8 person detection with MJPEG stream")
    parser.add_argument("--device", type=int, default=0, help="OpenCV device index for laptop camera (default 0)")
    parser.add_argument("--model", type=str, default=r"E:/SIH-25197/Final/frontend/yolov8s.pt", help="Path to YOLOv8 .pt model")
    parser.add_argument("--conf", type=float, default=0.25, help="Confidence threshold")
    parser.add_argument("--imgsz", type=int, default=640, help="Inference image size")
    parser.add_argument("--save-detections", action="store_true", help="Save snapshot images when person detected")
    parser.add_argument("--save-dir", type=str, default="detections", help="Directory to save detection snapshots")
    parser.add_argument("--host", type=str, default="0.0.0.0", help="Flask host")
    parser.add_argument("--port", type=int, default=5000, help="Flask port")
    parser.add_argument("--show", action="store_true", help="Show local OpenCV window (press 'q' to stop)")
    args = parser.parse_args()
    main(args)
