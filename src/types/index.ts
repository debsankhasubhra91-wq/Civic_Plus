export type IssueCategory = 'ROAD' | 'WASTE';

export type IssueStatus = 'REPORTED' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LocationInfo {
  state: string;
  city: string;
  area: string;
  landmark?: string;
  pincode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IssueComment {
  id: string;
  userName: string;
  userAvatar?: string;
  isGovtOfficial?: boolean;
  content: string;
  createdAt: string;
  likes: number;
}

export interface TimelineEvent {
  status: IssueStatus;
  title: string;
  description: string;
  timestamp: string;
  authorityName?: string;
  proofImageUrl?: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  subcategory: string; // e.g. "Severe Pothole", "Garbage Dump", "Broken Manhole", "Plastic Pile"
  severity: SeverityLevel;
  status: IssueStatus;
  imageUrl: string;
  beforeAfterImages?: {
    before: string;
    after: string;
    resolvedDate: string;
  };
  location: LocationInfo;
  reportedBy: {
    name: string;
    badge?: string;
    avatar?: string;
  };
  upvotes: number;
  hasUpvoted?: boolean;
  comments: IssueComment[];
  timeline: TimelineEvent[];
  assignedDepartment?: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  state: string;
  city: string;
  searchQuery: string;
  category: 'ALL' | IssueCategory;
  status: 'ALL' | IssueStatus;
  severity: 'ALL' | SeverityLevel;
  sortBy: 'MOST_UPVOTED' | 'NEWEST' | 'CRITICAL';
}
