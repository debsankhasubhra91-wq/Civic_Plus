export interface SamplePreset {
  id: string;
  category: 'ROAD' | 'WASTE';
  title: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'road-pothole-deep',
    category: 'ROAD',
    title: 'Severe crater-like pothole causing vehicle damage and traffic jams',
    subcategory: 'Deep Pothole & Cave-in',
    description: 'A deep pothole has emerged in the middle lane after continuous rain. Several two-wheelers have slipped and vehicular movement is heavily congested during peak hours.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'road-damaged-asphalt',
    category: 'ROAD',
    title: 'Broken asphalt and exposed gravel across busy intersection',
    subcategory: 'Damaged Surface & Cracks',
    description: 'The top tar layer has worn off completely, exposing loose gravel and stone chips which cause skidding hazards.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    severity: 'HIGH'
  },
  {
    id: 'road-waterlogging',
    category: 'ROAD',
    title: 'Severe road waterlogging and flooded underpass blocking commute',
    subcategory: 'Road Flooding & Poor Drainage',
    description: 'Knee-deep water accumulation on the main connecting road. Pedestrians cannot cross and vehicles are stalling.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'road-missing-barrier',
    category: 'ROAD',
    title: 'Damaged road divider and missing night warning reflectors',
    subcategory: 'Divider & Safety Barrier Damage',
    description: 'Median barrier has collapsed. No reflective tape or sign boards, creating danger of head-on collisions at night.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    severity: 'MEDIUM'
  },
  {
    id: 'waste-overflowing-bin',
    category: 'WASTE',
    title: 'Overflowing municipal community bins spilling onto pedestrian walkway',
    subcategory: 'Overflowing Garbage Bins',
    description: 'Community garbage containers have not been cleared for over 4 days. Waste is spilling onto the footpath with intense foul smell and stray animals scattering it.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'waste-illegal-dumping',
    category: 'WASTE',
    title: 'Illegal construction debris and plastic dumping near residential park',
    subcategory: 'Illegal Debris & Plastic Piles',
    description: 'Truckloads of construction rubble, broken concrete, and single-use plastic sacks dumped beside the neighborhood park boundary wall.',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    severity: 'HIGH'
  },
  {
    id: 'waste-clogged-drain',
    category: 'WASTE',
    title: 'Plastic bottles and garbage blocking open stormwater storm drain',
    subcategory: 'Clogged Drainage / Plastic Choke',
    description: 'Open storm drain is choked with plastic wrappers, thermocol, and beverage bottles, preventing rainwater discharge and breeding mosquitoes.',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80',
    severity: 'HIGH'
  },
  {
    id: 'waste-commercial-market',
    category: 'WASTE',
    title: 'Unsegregated vegetable and packing waste after daily morning market',
    subcategory: 'Commercial Market Waste',
    description: 'Rotting vegetable heaps, plastic crates, and wet organic waste left uncollected after the morning market hours.',
    imageUrl: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80',
    severity: 'MEDIUM'
  }
];
