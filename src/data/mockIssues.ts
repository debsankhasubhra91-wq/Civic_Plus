import type { CivicIssue } from '../types';

export const INITIAL_MOCK_ISSUES: CivicIssue[] = [
  {
    id: 'iss-001',
    referenceNumber: 'CP-MH-2026-8942',
    title: 'Huge crater pothole near Bandra-Kurla Complex junction causing fatal skid risk',
    description: 'During the evening monsoon downpour, a massive 2.5 ft wide pothole opened up near the BKC connector signal. Multiple two-wheelers have skid and bumper-to-bumper traffic extends over 2 km.',
    category: 'ROAD',
    subcategory: 'Deep Pothole & Cave-in',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80',
    location: {
      state: 'Maharashtra',
      city: 'Mumbai',
      area: 'Bandra East (BKC Junction)',
      landmark: 'Opposite Diamond Bourse Gate No. 3',
      pincode: '400051',
      coordinates: { lat: 19.0657, lng: 72.8687 }
    },
    reportedBy: {
      name: 'Aditya Sharma',
      badge: 'Verified Citizen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 342,
    hasUpvoted: false,
    assignedDepartment: 'BMC Roads & Traffic Infrastructure Dept (Ward H/East)',
    createdAt: '2026-08-18T08:30:00Z',
    updatedAt: '2026-08-19T14:20:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Issue Lodged with Geotagged Photo',
        description: 'Citizen reported critical pothole with high traffic hazard score.',
        timestamp: '2026-08-18T08:30:00Z'
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Triaged by BMC Central Control',
        description: 'Assigned Priority 1 based on 100+ community upvotes within 4 hours.',
        timestamp: '2026-08-18T13:45:00Z',
        authorityName: 'BMC Municipal Control Room'
      },
      {
        status: 'IN_PROGRESS',
        title: 'Cold-mix Asphalt Patching Crew Dispatched',
        description: 'PWD Road repair contractor team deployed with heavy rollers and cold-mix emulsion.',
        timestamp: '2026-08-19T14:20:00Z',
        authorityName: 'Ward H/East PWD Division'
      }
    ],
    comments: [
      {
        id: 'c1',
        userName: 'Rohan Mehta',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        content: 'I take this road every day. Almost fell off my scooter yesterday. Please fix this immediately!',
        createdAt: '2026-08-18T09:15:00Z',
        likes: 24
      },
      {
        id: 'c2',
        userName: 'BMC Grievance Cell',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        isGovtOfficial: true,
        content: 'Inspection completed by Junior Engineer. Emergency rapid-curing patch work is underway.',
        createdAt: '2026-08-19T14:30:00Z',
        likes: 58
      }
    ]
  },
  {
    id: 'iss-002',
    referenceNumber: 'CP-KA-2026-4102',
    title: 'Massive garbage pile and plastic dump choking Koramangala 5th Block sidewalk',
    description: 'Over 300 kg of rotting municipal garbage, single-use polythene, and restaurant food waste dumped along the pedestrian footpath. Foul odor is unbearable and strays are scattering trash.',
    category: 'WASTE',
    subcategory: 'Overflowing Garbage Bins',
    severity: 'CRITICAL',
    status: 'REPORTED',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=900&q=80',
    location: {
      state: 'Karnataka',
      city: 'Bengaluru',
      area: 'Koramangala 5th Block',
      landmark: 'Near 80 Feet Road Park Corner',
      pincode: '560095',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    reportedBy: {
      name: 'Pooja Hegde',
      badge: 'Civic Champion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 419,
    hasUpvoted: true,
    assignedDepartment: 'BBMP Solid Waste Management (South Zone)',
    createdAt: '2026-08-19T10:15:00Z',
    updatedAt: '2026-08-19T10:15:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Report Submitted by Resident Association',
        description: 'Tagged with high health risk classification and geocoded.',
        timestamp: '2026-08-19T10:15:00Z'
      }
    ],
    comments: [
      {
        id: 'c3',
        userName: 'Vikram Joshi',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        content: 'The stench enters the nearby residential apartments. BBMP compactors must clear this daily.',
        createdAt: '2026-08-19T11:05:00Z',
        likes: 31
      }
    ]
  },
  {
    id: 'iss-003',
    referenceNumber: 'CP-DL-2026-3391',
    title: 'Sunken road and missing manhole cover on Ring Road near Lajpat Nagar Flyover',
    description: 'A 4-foot deep open drainage manhole with its concrete cover completely shattered. Poses extreme life hazard for cyclists and pedestrians, especially after sunset.',
    category: 'ROAD',
    subcategory: 'Manhole & Drainage Hazard',
    severity: 'CRITICAL',
    status: 'RESOLVED',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80',
      resolvedDate: '2026-08-17'
    },
    location: {
      state: 'Delhi (NCT)',
      city: 'South Delhi',
      area: 'Lajpat Nagar',
      landmark: 'Service lane below Ring Road flyover pillar 42',
      pincode: '110024',
      coordinates: { lat: 28.5677, lng: 77.2433 }
    },
    reportedBy: {
      name: 'Karan Mehra',
      badge: 'Local Resident',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 528,
    hasUpvoted: false,
    assignedDepartment: 'MCD Central Zone & Delhi Jal Board',
    createdAt: '2026-08-14T07:20:00Z',
    updatedAt: '2026-08-17T16:40:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Emergency Open Manhole Alert',
        description: 'Reported with warning flags by citizen.',
        timestamp: '2026-08-14T07:20:00Z'
      },
      {
        status: 'UNDER_REVIEW',
        title: 'MCD Safety Inspector Verified',
        description: 'Barricades erected temporarily around the hazard zone.',
        timestamp: '2026-08-14T11:00:00Z',
        authorityName: 'MCD Emergency Response Wing'
      },
      {
        status: 'IN_PROGRESS',
        title: 'Heavy Duty Ductile Iron Frame Installation',
        description: 'DJB team replaced collar frame and poured quick-setting concrete.',
        timestamp: '2026-08-16T09:00:00Z',
        authorityName: 'Delhi Jal Board'
      },
      {
        status: 'RESOLVED',
        title: 'Civic Work Verified and Road Reopened',
        description: 'New reinforced cover installed flush with road level. Verified by civic inspector.',
        timestamp: '2026-08-17T16:40:00Z',
        authorityName: 'MCD Ward Officer',
        proofImageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80'
      }
    ],
    comments: [
      {
        id: 'c4',
        userName: 'Sanjay Kapoor',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        content: 'Commendable speed by MCD! The new heavy iron cover is rock solid.',
        createdAt: '2026-08-17T18:00:00Z',
        likes: 42
      }
    ]
  },
  {
    id: 'iss-004',
    referenceNumber: 'CP-TN-2026-7819',
    title: 'Open storm drain overflowing with single-use plastic waste near T. Nagar market',
    description: 'Monsoon canal drain completely blocked with plastic sacks, styrofoam boxes, and silt. Stagnant dark water is backing up into ground floor shops.',
    category: 'WASTE',
    subcategory: 'Clogged Drainage / Plastic Choke',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=900&q=80',
    location: {
      state: 'Tamil Nadu',
      city: 'Chennai',
      area: 'T. Nagar',
      landmark: 'Ranganathan Street Canal Cross',
      pincode: '600017',
      coordinates: { lat: 13.0418, lng: 80.2341 }
    },
    reportedBy: {
      name: 'Karthik Subramanian',
      badge: 'Verified Citizen',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 275,
    hasUpvoted: false,
    assignedDepartment: 'Greater Chennai Corporation (GCC) Storm Water Drainage Wing',
    createdAt: '2026-08-17T12:00:00Z',
    updatedAt: '2026-08-19T09:30:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Canal Clog Lodged with Evidence',
        description: 'Visual evidence of severe water stagnation.',
        timestamp: '2026-08-17T12:00:00Z'
      },
      {
        status: 'IN_PROGRESS',
        title: 'GCC Super-Sucker De-silting Machine Operational',
        description: 'Excavator and suction pumps deployed to clear plastic debris from the channel.',
        timestamp: '2026-08-19T09:30:00Z',
        authorityName: 'Greater Chennai Corp Zone 10'
      }
    ],
    comments: [
      {
        id: 'c5',
        userName: 'GCC Official Helpdesk',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        isGovtOfficial: true,
        content: 'Desilting operations are running in two shifts. Drainage capacity will be restored in 24 hours.',
        createdAt: '2026-08-19T10:00:00Z',
        likes: 19
      }
    ]
  },
  {
    id: 'iss-005',
    referenceNumber: 'CP-TG-2026-5520',
    title: 'Crumbling asphalt and multiple potholes on Hitec City to Gachibowli flyover ramp',
    description: 'The flyover entry ramp has multiple sharp depressions and broken expansion joints that cause sudden braking and minor collisions in IT corridor peak traffic.',
    category: 'ROAD',
    subcategory: 'Damaged Surface & Cracks',
    severity: 'HIGH',
    status: 'UNDER_REVIEW',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=900&q=80',
    location: {
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Hitec City',
      landmark: 'Cyber Towers Flyover Ascent Ramp',
      pincode: '500081',
      coordinates: { lat: 17.4483, lng: 78.3748 }
    },
    reportedBy: {
      name: 'Ananya Reddy',
      badge: 'Tech Professional',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 184,
    hasUpvoted: false,
    assignedDepartment: 'GHMC Engineering & Maintenance Division',
    createdAt: '2026-08-18T16:10:00Z',
    updatedAt: '2026-08-19T11:00:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Ramp Condition Reported',
        description: 'Multiple users confirmed severe vehicle vibrations.',
        timestamp: '2026-08-18T16:10:00Z'
      },
      {
        status: 'UNDER_REVIEW',
        title: 'GHMC Night Inspection Scheduled',
        description: 'Road surface profiling scheduled during low-traffic night hours.',
        timestamp: '2026-08-19T11:00:00Z',
        authorityName: 'GHMC West Zone'
      }
    ],
    comments: []
  },
  {
    id: 'iss-006',
    referenceNumber: 'CP-WB-2026-6190',
    title: 'Severe industrial debris & construction dumping along EM Bypass connector',
    description: 'Broken concrete slabs, plaster dust bags, and glass shards dumped openly on the roadside green verge. Wind blows toxic fine dust into nearby residential complexes.',
    category: 'WASTE',
    subcategory: 'Illegal Debris & Plastic Piles',
    severity: 'MEDIUM',
    status: 'REPORTED',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=900&q=80',
    location: {
      state: 'West Bengal',
      city: 'Kolkata',
      area: 'Salt Lake Sector V',
      landmark: 'EM Bypass Connector near Technopolis',
      pincode: '700091',
      coordinates: { lat: 22.5867, lng: 88.4178 }
    },
    reportedBy: {
      name: 'Sourav Banerjee',
      badge: 'Verified Citizen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 145,
    hasUpvoted: false,
    assignedDepartment: 'KMC Solid Waste Management Dept (Borough VII)',
    createdAt: '2026-08-19T14:45:00Z',
    updatedAt: '2026-08-19T14:45:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Debris Dumping Logged',
        description: 'Submitted with GPS coordinates and photos.',
        timestamp: '2026-08-19T14:45:00Z'
      }
    ],
    comments: []
  },
  {
    id: 'iss-007',
    referenceNumber: 'CP-GJ-2026-1184',
    title: 'Completely resurfaced smart asphalt road at SG Highway Service Lane',
    description: 'Previously broken stretch with extensive monsoon wear has been completely relaid with high-grade micro-surfacing and clear road thermo-plastic markings.',
    category: 'ROAD',
    subcategory: 'Damaged Surface & Cracks',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=900&q=80',
      resolvedDate: '2026-08-16'
    },
    location: {
      state: 'Gujarat',
      city: 'Ahmedabad',
      area: 'SG Highway',
      landmark: 'Near Iscon Cross Road Service Lane',
      pincode: '380054',
      coordinates: { lat: 23.0225, lng: 72.5012 }
    },
    reportedBy: {
      name: 'Hardik Patel',
      badge: 'Local Resident',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 389,
    hasUpvoted: false,
    assignedDepartment: 'AMC Road Projects & Urban Development',
    createdAt: '2026-08-10T11:00:00Z',
    updatedAt: '2026-08-16T17:30:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Road Damage Logged',
        description: 'Initial report by citizen group.',
        timestamp: '2026-08-10T11:00:00Z'
      },
      {
        status: 'IN_PROGRESS',
        title: 'Bitumen Milling & Resurfacing',
        description: 'Contractor executed overnight hot-mix paving.',
        timestamp: '2026-08-14T22:00:00Z',
        authorityName: 'AMC Projects Wing'
      },
      {
        status: 'RESOLVED',
        title: 'Quality Audit Passed & Striping Completed',
        description: 'Smooth riding quality achieved with 5-year guarantee seal.',
        timestamp: '2026-08-16T17:30:00Z',
        authorityName: 'AMC Chief Engineer Office',
        proofImageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=900&q=80'
      }
    ],
    comments: [
      {
        id: 'c6',
        userName: 'Priya Shah',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        content: 'The smooth finish is impressive! Night driving is much safer now with the reflective paint.',
        createdAt: '2026-08-17T09:20:00Z',
        likes: 27
      }
    ]
  },
  {
    id: 'iss-008',
    referenceNumber: 'CP-UP-2026-9214',
    title: 'Cleared and sanitized municipal market dumping yard near Hazratganj',
    description: 'Continuous waste accumulation behind the vegetable and dry market cleared completely. Disinfected with bleaching powder and converted to green planter zone.',
    category: 'WASTE',
    subcategory: 'Commercial Market Waste',
    severity: 'HIGH',
    status: 'RESOLVED',
    imageUrl: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=900&q=80',
      resolvedDate: '2026-08-15'
    },
    location: {
      state: 'Uttar Pradesh',
      city: 'Lucknow',
      area: 'Hazratganj',
      landmark: 'Behind Janpath Market Lane',
      pincode: '226001',
      coordinates: { lat: 26.8500, lng: 80.9499 }
    },
    reportedBy: {
      name: 'Mohit Srivastava',
      badge: 'Civic Activist',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
    },
    upvotes: 492,
    hasUpvoted: true,
    assignedDepartment: 'Lucknow Municipal Corporation (LMC) Swachh Cell',
    createdAt: '2026-08-11T09:00:00Z',
    updatedAt: '2026-08-15T15:00:00Z',
    timeline: [
      {
        status: 'REPORTED',
        title: 'Sanitation Complaint Filed',
        description: 'Citizen filed grievance with multiple photos.',
        timestamp: '2026-08-11T09:00:00Z'
      },
      {
        status: 'RESOLVED',
        title: 'Deep Sanitization & Beautification',
        description: 'LMC cleared 6 truckloads of waste and installed CCTV to prevent re-dumping.',
        timestamp: '2026-08-15T15:00:00Z',
        authorityName: 'LMC Swachhata Wing',
        proofImageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=900&q=80'
      }
    ],
    comments: []
  }
];
