import { DetectionPage } from "@/components/DetectionPage";
import { Package } from "lucide-react";

export default function Bags() {
  return (
    <DetectionPage
      title="Suspicious Bags"
      description="Unattended object detection and tracking"
      icon={Package}
      detectionType="Suspicious Bag"
    />
  );
}
