import { DetectionPage } from "@/components/DetectionPage";
import { Zap } from "lucide-react";

export default function Anomalies() {
  return (
    <DetectionPage
      title="Motion Anomalies"
      description="Unusual movement pattern detection"
      icon={Zap}
      detectionType="Anomaly"
    />
  );
}
