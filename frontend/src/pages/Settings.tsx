import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Users, Camera, Shield, Database, Upload } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure system parameters and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-threat" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Add New User</Label>
              <Input placeholder="Email address" className="glass-panel border-border" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input placeholder="Commander / Analyst / Officer" className="glass-panel border-border" />
            </div>
            <Button className="w-full bg-threat hover:bg-threat/90">Add User</Button>
          </CardContent>
        </Card>

        {/* Camera Management */}
        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-tactical" />
              Camera Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Camera Name</Label>
              <Input placeholder="e.g., North Gate 01" className="glass-panel border-border" />
            </div>
            <div className="space-y-2">
              <Label>RTSP URL</Label>
              <Input placeholder="rtsp://..." className="glass-panel border-border" />
            </div>
            <Button className="w-full bg-tactical hover:bg-tactical/90">Add Camera</Button>
          </CardContent>
        </Card>

        {/* Watchlist Management */}
        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              Watchlist Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Wanted/Missing List</Label>
              <div className="glass-panel border-border border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop CSV file or click to browse
                </p>
              </div>
            </div>
            <Button className="w-full bg-warning hover:bg-warning/90 text-black">Upload List</Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-foreground" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Automatic Evidence Archival</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Real-time Alerts</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Audio Notifications</Label>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Retention Period (days)</Label>
              <Input type="number" defaultValue="90" className="glass-panel border-border" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
