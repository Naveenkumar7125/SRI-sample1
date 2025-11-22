import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const threatData = [
  { name: "Mon", threats: 4 },
  { name: "Tue", threats: 7 },
  { name: "Wed", threats: 5 },
  { name: "Thu", threats: 9 },
  { name: "Fri", threats: 6 },
  { name: "Sat", threats: 3 },
  { name: "Sun", threats: 2 },
];

const detectionData = [
  { name: "Weapons", count: 12 },
  { name: "Suspicious Bags", count: 18 },
  { name: "Loitering", count: 25 },
  { name: "Wanted", count: 5 },
  { name: "Anomalies", count: 14 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Threat analysis and detection statistics</p>
        </div>
        <Button className="bg-threat hover:bg-threat/90 gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Threat Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="threats" stroke="hsl(var(--threat-red))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel border-border">
          <CardHeader>
            <CardTitle className="text-lg">Detection Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={detectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--tactical-green))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Daily Threat Summary", desc: "Comprehensive overview of daily incidents" },
            { title: "Evidence Archive", desc: "Complete evidence log and storage report" },
            { title: "Camera Activity", desc: "Camera status and detection analytics" },
            { title: "Case Summary", desc: "Active and resolved cases overview" },
            { title: "Officer Performance", desc: "Team response time and metrics" },
            { title: "System Health", desc: "Infrastructure status and uptime" },
          ].map((report, idx) => (
            <Card key={idx} className="glass-panel border-border p-4 hover:border-threat transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-threat group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
