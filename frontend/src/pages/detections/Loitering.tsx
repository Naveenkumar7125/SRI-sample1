import { DetectionPage } from "@/components/DetectionPage";
import { Activity } from "lucide-react";

export default function Loitering() {
  return (
    <DetectionPage
      title="Loitering Detection"
      description="Extended presence monitoring in restricted areas"
      icon={Activity}
      detectionType="Loitering"
    />
  );
}
