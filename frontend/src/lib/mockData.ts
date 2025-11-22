// Mock data for NSG Command Center

export const mockAlerts = [
  {
    id: "ALT-001",
    type: "Weapon Detected",
    severity: "critical",
    camera: "CAM-North-Gate-01",
    location: "North Gate Entrance",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    snapshot: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
    description: "Firearm detected in suspicious individual's possession",
    status: "active",
  },
  {
    id: "ALT-002",
    type: "Suspicious Bag",
    severity: "high",
    camera: "CAM-Main-Lobby-03",
    location: "Main Lobby Area",
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    snapshot: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
    description: "Unattended bag detected for 10+ minutes",
    status: "active",
  },
  {
    id: "ALT-003",
    type: "Wanted Person",
    severity: "critical",
    camera: "CAM-East-Corridor-02",
    location: "East Wing Corridor",
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    snapshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Match found: 94% similarity to wanted list",
    status: "investigating",
  },
  {
    id: "ALT-004",
    type: "Loitering",
    severity: "medium",
    camera: "CAM-Parking-A-05",
    location: "Parking Zone A",
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
    snapshot: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=300&fit=crop",
    description: "Individual loitering for 45+ minutes",
    status: "monitoring",
  },
];

export const mockCameras = [
  {
    id: "CAM-001",
    name: "North Gate",
    location: "Main Entrance North",
    status: "online",
    feed: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  },
  {
    id: "CAM-002",
    name: "South Perimeter",
    location: "South Boundary Wall",
    status: "online",
    feed: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
  },
  {
    id: "CAM-003",
    name: "Main Lobby",
    location: "Central Lobby",
    status: "online",
    feed: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    id: "CAM-004",
    name: "East Corridor",
    location: "East Wing Level 2",
    status: "online",
    feed: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
  },
  {
    id: "CAM-005",
    name: "Parking Zone A",
    location: "North Parking",
    status: "online",
    feed: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop",
  },
  {
    id: "CAM-006",
    name: "West Exit",
    location: "Emergency Exit West",
    status: "maintenance",
    feed: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
  },
];

export const mockStats = {
  weaponsDetected: 3,
  suspiciousBags: 7,
  loiteringEvents: 12,
  wantedMatches: 2,
  anomalies: 5,
  totalCameras: 48,
  activeCameras: 46,
  totalAlerts: 29,
};

export const mockEvidence = [
  {
    id: "EV-001",
    type: "Weapon Detection",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    camera: "CAM-North-Gate-01",
    duration: "00:02:34",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
    caseId: "CASE-2024-001",
  },
  {
    id: "EV-002",
    type: "Suspicious Activity",
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    camera: "CAM-Main-Lobby-03",
    duration: "00:05:12",
    thumbnail: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    caseId: null,
  },
  {
    id: "EV-003",
    type: "Wanted Person",
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
    camera: "CAM-East-Corridor-02",
    duration: "00:01:45",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    caseId: "CASE-2024-002",
  },
];

export const mockCases = [
  {
    id: "CASE-2024-001",
    title: "Armed Intrusion - North Gate",
    status: "active",
    priority: "critical",
    officer: "Agent Kumar",
    created: new Date(Date.now() - 2 * 3600000).toISOString(),
    evidenceCount: 4,
    notes: "Coordinating with local law enforcement",
  },
  {
    id: "CASE-2024-002",
    title: "Wanted Person Identification",
    status: "investigating",
    priority: "high",
    officer: "Agent Sharma",
    created: new Date(Date.now() - 8 * 3600000).toISOString(),
    evidenceCount: 2,
    notes: "Facial recognition match - 94% confidence",
  },
  {
    id: "CASE-2024-003",
    title: "Suspicious Package - Main Lobby",
    status: "resolved",
    priority: "high",
    officer: "Agent Patel",
    created: new Date(Date.now() - 24 * 3600000).toISOString(),
    evidenceCount: 3,
    notes: "False alarm - confirmed with security sweep",
  },
];

export const mockTeam = [
  {
    id: "OFC-001",
    name: "Agent Rajesh Kumar",
    role: "Field Commander",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    activeCases: 2,
  },
  {
    id: "OFC-002",
    name: "Agent Priya Sharma",
    role: "Intelligence Analyst",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    activeCases: 3,
  },
  {
    id: "OFC-003",
    name: "Agent Vikram Patel",
    role: "Tactical Officer",
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    activeCases: 1,
  },
  {
    id: "OFC-004",
    name: "Agent Sneha Reddy",
    role: "Surveillance Specialist",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    activeCases: 2,
  },
];

export const mockOperations = [
  "Perimeter sweep scheduled - 14:00",
  "Evidence review - Case 001",
  "Team briefing - 16:30",
  "System maintenance - 18:00",
];
