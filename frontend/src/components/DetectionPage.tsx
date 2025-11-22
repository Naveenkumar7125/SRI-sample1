import { mockAlerts, mockCameras } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, AlertCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DetectionPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  detectionType: string;
}

export const DetectionPage = ({ title, description, icon: Icon, detectionType }: DetectionPageProps) => {
  const filteredAlerts = mockAlerts.filter(alert => alert.type === detectionType);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-threat/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-threat" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search detections..."
            className="pl-10 glass-panel border-border"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Camera Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Active Cameras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCameras.slice(0, 3).map((camera) => (
            <Card key={camera.id} className="glass-panel border-border overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img src={camera.feed} alt={camera.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-tactical text-white text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-white mr-1 animate-pulse-slow" />
                  LIVE
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground">{camera.name}</h3>
                <p className="text-xs text-muted-foreground">{camera.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detection Events */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Detection Events</h2>
        {filteredAlerts.length > 0 ? (
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="glass-panel border-border p-4">
                <div className="flex gap-4">
                  <img 
                    src={alert.snapshot}
                    alt={alert.type}
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge className="bg-threat text-white mb-2">CRITICAL</Badge>
                        <h3 className="text-lg font-semibold text-foreground">{alert.type}</h3>
                        <p className="text-sm text-muted-foreground">{alert.camera} • {alert.location}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
                        <div>{new Date(alert.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3">{alert.description}</p>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-threat hover:bg-threat/90">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Tag as Critical
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-panel border-border p-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Detections</h3>
            <p className="text-sm text-muted-foreground">
              No {detectionType.toLowerCase()} events in the last 24 hours
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
