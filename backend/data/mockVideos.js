// // backend/data/mockAlerts.js
// module.exports = [
//   {
//     image_url: 'https://example.com/images/weapon1.jpg',
//     category:  'weapon_detected',
//     cam_id:    'CAM-01',
//     location:  'East Gate Entrance',
//     timestamp: new Date('2025-11-15T08:12:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/anomaly1.jpg',
//     category:  'anomaly_detected',
//     cam_id:    'CAM-02',
//     location:  'Parking Lot Zone-A',
//     timestamp: new Date('2025-11-16T14:45:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/loitering1.jpg',
//     category:  'loitering_detected',
//     cam_id:    'CAM-03',
//     location:  'Backside Corridor',
//     timestamp: new Date('2025-11-16T07:05:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/wanted1.jpg',
//     category:  'wanted_person',
//     cam_id:    'CAM-04',
//     location:  'Gate No.2 Checkpoint',
//     timestamp: new Date('2025-11-17T11:20:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/criminal1.jpg',
//     category:  'criminal_detected',
//     cam_id:    'CAM-05',
//     location:  'Subway Tunnel Area',
//     timestamp: new Date('2025-11-18T06:55:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/fighting1.jpg',
//     category:  'fighting_detected',
//     cam_id:    'CAM-06',
//     location:  'Playground North Zone',
//     timestamp: new Date('2025-11-18T09:10:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/gun1.jpg',
//     category:  'gun_detected',
//     cam_id:    'CAM-07',
//     location:  'Warehouse Dock Area',
//     timestamp: new Date('2025-11-18T12:30:00Z')
//   },
//   {
//     image_url: 'https://example.com/images/violence1.jpg',
//     category:  'crowd_violence',
//     cam_id:    'CAM-08',
//     location:  'Market Street Junction',
//     timestamp: new Date('2025-11-18T15:00:00Z')
//   }
// ];




// backend/data/mockVideos.js
module.exports = [
  {
    video_url: "https://example.com/videos/weapon_detected_1.mp4",
    category: "weapon_detected",
    cam_no: "CAM-01",
    location: "East Gate Entrance",
    timestamp: new Date("2025-11-15T08:12:00Z")
  },
  {
    video_url: "https://example.com/videos/gun_detected_1.mp4",
    category: "gun_detected",
    cam_no: "CAM-02",
    location: "Parking Lot Zone-A",
    timestamp: new Date("2025-11-16T14:45:00Z")
  },
  {
    video_url: "https://example.com/videos/fighting_detected_1.mp4",
    category: "fighting_detected",
    cam_no: "CAM-03",
    location: "Backside Corridor",
    timestamp: new Date("2025-11-16T07:05:00Z")
  },
  {
    video_url: "https://example.com/videos/crowd_violence_1.mp4",
    category: "crowd_violence",
    cam_no: "CAM-04",
    location: "Gate No.2 Checkpoint",
    timestamp: new Date("2025-11-17T11:20:00Z")
  },
  {
    video_url: "https://example.com/videos/criminal_detected_1.mp4",
    category: "criminal_detected",
    cam_no: "CAM-05",
    location: "Subway Tunnel Area",
    timestamp: new Date("2025-11-18T06:55:00Z")
  },
  {
    video_url: "https://example.com/videos/wanted_person_1.mp4",
    category: "wanted_person",
    cam_no: "CAM-06",
    location: "Playground North Zone",
    timestamp: new Date("2025-11-18T09:10:00Z")
  },
  {
    video_url: "https://example.com/videos/weapon_detected_2.mp4",
    category: "weapon_detected",
    cam_no: "CAM-07",
    location: "Warehouse Dock Area",
    timestamp: new Date("2025-11-18T12:30:00Z")
  },
  {
    video_url: "https://example.com/videos/fighting_detected_2.mp4",
    category: "fighting_detected",
    cam_no: "CAM-08",
    location: "Market Street Junction",
    timestamp: new Date("2025-11-18T15:00:00Z")
  }
];
