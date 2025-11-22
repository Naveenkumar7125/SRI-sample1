import { DetectionPage } from "@/components/DetectionPage";
import { Target } from "lucide-react";

export default function Weapons() {
  return (
    <DetectionPage
      title="Weapon Detection"
      description="Real-time firearm and weapon identification"
      icon={Target}
      detectionType="Weapon Detected"
    />
  );
}
