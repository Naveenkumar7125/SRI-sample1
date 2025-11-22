import { DetectionPage } from "@/components/DetectionPage";
import { UserX } from "lucide-react";

export default function Wanted() {
  return (
    <DetectionPage
      title="Wanted/Missing Persons"
      description="Facial recognition matching against watchlist"
      icon={UserX}
      detectionType="Wanted Person"
    />
  );
}
