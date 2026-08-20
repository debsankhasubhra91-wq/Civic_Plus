import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { CivicIssue, FilterState, IssueCategory, IssueStatus, TimelineEvent, IssueComment } from '../types';
import { INITIAL_MOCK_ISSUES } from '../data/mockIssues';
import { sanitizeText, sanitizeImageUrl, sanitizeCoordinates } from '../utils/security';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface CivicContextType {
  issues: CivicIssue[];
  filteredIssues: CivicIssue[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Issue Actions
  addIssue: (newIssue: Omit<CivicIssue, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'upvotes' | 'timeline' | 'comments'>) => CivicIssue;
  toggleUpvote: (issueId: string) => void;
  updateIssueStatus: (issueId: string, newStatus: IssueStatus, officialNote: string, proofImageUrl?: string, authorityName?: string) => void;
  addComment: (issueId: string, commentText: string, isGovt?: boolean) => void;
  
  // Navigation & Modals
  activeView: 'GRID' | 'MAP' | 'ANALYTICS';
  setActiveView: (view: 'GRID' | 'MAP' | 'ANALYTICS') => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  selectedIssueId: string | null;
  setSelectedIssueId: (id: string | null) => void;
  selectedIssue: CivicIssue | null;
  
  // Mode toggle
  isAuthorityMode: boolean;
  setIsAuthorityMode: (enabled: boolean) => void;
  
  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Quick prefill for reporting
  presetCategoryForReport: IssueCategory | null;
  openReportModalWithCategory: (category: IssueCategory) => void;
}

const STORAGE_KEY = 'civicpulse_issues_v1';

const initialFilters: FilterState = {
  state: 'ALL',
  city: 'ALL',
  searchQuery: '',
  category: 'ALL',
  status: 'ALL',
  severity: 'ALL',
  sortBy: 'MOST_UPVOTED'
};

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<CivicIssue[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load issues from localStorage', e);
    }
    return INITIAL_MOCK_ISSUES;
  });

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeView, setActiveView] = useState<'GRID' | 'MAP' | 'ANALYTICS'>('GRID');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isAuthorityMode, setIsAuthorityMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [presetCategoryForReport, setPresetCategoryForReport] = useState<IssueCategory | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error('Failed to save issues to localStorage', e);
    }
  }, [issues]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const openReportModalWithCategory = (category: IssueCategory) => {
    setPresetCategoryForReport(category);
    setIsReportModalOpen(true);
  };

  // Add Issue with sanitization
  const addIssue = (
    data: Omit<CivicIssue, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'upvotes' | 'timeline' | 'comments'>
  ): CivicIssue => {
    const now = new Date().toISOString();
    const safeState = sanitizeText(data.location.state, 50) || 'India';
    const stateCode = safeState.substring(0, 2).toUpperCase();
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const refNum = `CP-${stateCode}-${new Date().getFullYear()}-${randDigits}`;
    const newId = `iss-${Date.now()}`;

    const safeTitle = sanitizeText(data.title, 150);
    const safeDesc = sanitizeText(data.description, 1000);
    const safeArea = sanitizeText(data.location.area, 80);
    const safeCity = sanitizeText(data.location.city, 50);
    const safeLandmark = data.location.landmark ? sanitizeText(data.location.landmark, 100) : undefined;
    const safePincode = data.location.pincode ? sanitizeText(data.location.pincode, 10) : undefined;
    const safeCoords = sanitizeCoordinates(data.location.coordinates.lat, data.location.coordinates.lng);
    const defaultImage = data.category === 'ROAD'
      ? 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80';
    const safeImage = sanitizeImageUrl(data.imageUrl, defaultImage);

    const initialTimeline: TimelineEvent[] = [
      {
        status: 'REPORTED',
        title: 'Grievance Registered by Citizen',
        description: `Geotagged ${data.category === 'ROAD' ? 'road' : 'waste'} report created at ${safeArea}, ${safeCity}`,
        timestamp: now
      }
    ];

    const newIssue: CivicIssue = {
      ...data,
      id: newId,
      referenceNumber: refNum,
      title: safeTitle,
      description: safeDesc,
      imageUrl: safeImage,
      location: {
        state: safeState,
        city: safeCity,
        area: safeArea,
        landmark: safeLandmark,
        pincode: safePincode,
        coordinates: safeCoords
      },
      reportedBy: {
        name: sanitizeText(data.reportedBy?.name || 'Active Citizen', 40),
        badge: 'Verified Citizen'
      },
      assignedDepartment: sanitizeText(data.assignedDepartment || 'Municipal Corporation', 80),
      upvotes: 1,
      hasUpvoted: true,
      createdAt: now,
      updatedAt: now,
      timeline: initialTimeline,
      comments: []
    };

    setIssues(prev => [newIssue, ...prev]);
    addToast({
      type: 'success',
      title: 'Issue Lodged Successfully!',
      message: `Reference ID: ${refNum}. Department notified.`
    });

    return newIssue;
  };

  // Upvoting
  const toggleUpvote = (issueId: string) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          const currentlyUpvoted = !!issue.hasUpvoted;
          const updatedUpvotes = currentlyUpvoted ? Math.max(0, issue.upvotes - 1) : issue.upvotes + 1;
          
          if (!currentlyUpvoted) {
            addToast({
              type: 'info',
              title: 'Upvote Recorded',
              message: `Your vote gives urgency to: "${issue.title.slice(0, 35)}..."`
            });
          }

          return {
            ...issue,
            upvotes: updatedUpvotes,
            hasUpvoted: !currentlyUpvoted
          };
        }
        return issue;
      })
    );
  };

  // Authority Status Update with sanitization
  const updateIssueStatus = (
    issueId: string,
    newStatus: IssueStatus,
    officialNote: string,
    proofImageUrl?: string,
    authorityName: string = 'Municipal Corporation & PWD'
  ) => {
    const now = new Date().toISOString();
    const safeNote = sanitizeText(officialNote, 300) || 'Official government milestone recorded.';
    const safeAuthority = sanitizeText(authorityName, 80);
    const safeProof = proofImageUrl ? sanitizeImageUrl(proofImageUrl, '') : undefined;

    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          const newTimelineEvent: TimelineEvent = {
            status: newStatus,
            title:
              newStatus === 'UNDER_REVIEW'
                ? 'Issue Inspected & Triaged'
                : newStatus === 'IN_PROGRESS'
                ? 'Field Operations & Repair Underway'
                : newStatus === 'RESOLVED'
                ? 'Work Completed & Verified'
                : 'Status Updated',
            description: safeNote,
            timestamp: now,
            authorityName: safeAuthority,
            proofImageUrl: safeProof
          };

          const beforeAfter =
            newStatus === 'RESOLVED' && safeProof
              ? {
                  before: issue.imageUrl,
                  after: safeProof,
                  resolvedDate: now.split('T')[0]
                }
              : issue.beforeAfterImages;

          return {
            ...issue,
            status: newStatus,
            updatedAt: now,
            beforeAfterImages: beforeAfter,
            timeline: [...issue.timeline, newTimelineEvent]
          };
        }
        return issue;
      })
    );

    addToast({
      type: 'success',
      title: 'Status Updated by Authority',
      message: `Issue moved to ${newStatus.replace('_', ' ')}.`
    });
  };

  // Add Comment with sanitization
  const addComment = (issueId: string, commentText: string, isGovt: boolean = false) => {
    const safeContent = sanitizeText(commentText, 400);
    if (!safeContent) return;

    const newComment: IssueComment = {
      id: `comm-${Date.now()}`,
      userName: isGovt ? 'Govt Authority Officer' : 'Active Citizen',
      isGovtOfficial: isGovt,
      content: safeContent,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            comments: [...(issue.comments || []), newComment]
          };
        }
        return issue;
      })
    );

    addToast({
      type: 'info',
      title: 'Comment Posted',
      message: 'Your update has been shared with the community.'
    });
  };

  // Filtered & Sorted Issues
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      // State Filter
      if (filters.state !== 'ALL' && issue.location.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }

      // City Filter
      if (filters.city !== 'ALL' && issue.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Category Filter
      if (filters.category !== 'ALL' && issue.category !== filters.category) {
        return false;
      }

      // Status Filter
      if (filters.status !== 'ALL' && issue.status !== filters.status) {
        return false;
      }

      // Severity Filter
      if (filters.severity !== 'ALL' && issue.severity !== filters.severity) {
        return false;
      }

      // Search Query (title, description, area, city, landmark, pincode)
      if (filters.searchQuery.trim()) {
        const query = sanitizeText(filters.searchQuery, 100).toLowerCase().trim();
        const matchesTitle = issue.title.toLowerCase().includes(query);
        const matchesDesc = issue.description.toLowerCase().includes(query);
        const matchesArea = issue.location.area.toLowerCase().includes(query);
        const matchesCity = issue.location.city.toLowerCase().includes(query);
        const matchesLandmark = (issue.location.landmark || '').toLowerCase().includes(query);
        const matchesPincode = (issue.location.pincode || '').includes(query);
        const matchesSubcat = issue.subcategory.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesArea && !matchesCity && !matchesLandmark && !matchesPincode && !matchesSubcat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'MOST_UPVOTED') {
        return b.upvotes - a.upvotes;
      }
      if (filters.sortBy === 'NEWEST') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'CRITICAL') {
        const severityScore: Record<string, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return (severityScore[b.severity] || 0) - (severityScore[a.severity] || 0);
      }
      return 0;
    });
  }, [issues, filters]);

  const selectedIssue = useMemo(() => {
    if (!selectedIssueId) return null;
    return issues.find(i => i.id === selectedIssueId) || null;
  }, [issues, selectedIssueId]);

  return (
    <CivicContext.Provider
      value={{
        issues,
        filteredIssues,
        filters,
        setFilters,
        resetFilters,
        addIssue,
        toggleUpvote,
        updateIssueStatus,
        addComment,
        activeView,
        setActiveView,
        isReportModalOpen,
        setIsReportModalOpen,
        selectedIssueId,
        setSelectedIssueId,
        selectedIssue,
        isAuthorityMode,
        setIsAuthorityMode,
        toasts,
        addToast,
        removeToast,
        presetCategoryForReport,
        openReportModalWithCategory
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
};
