import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import type { IssueStatus } from '../types';
import {
  X,
  MapPin,
  ThumbsUp,
  Share2,
  Calendar,
  ShieldCheck,
  Truck,
  Trash2,
  Send,
  Building2,
  FileCheck2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const IssueDetailModal: React.FC = () => {
  const {
    selectedIssue,
    setSelectedIssueId,
    toggleUpvote,
    updateIssueStatus,
    addComment,
    isAuthorityMode,
    addToast
  } = useCivic();

  const [commentInput, setCommentInput] = useState('');
  const [activePhotoTab, setActivePhotoTab] = useState<'BEFORE' | 'AFTER'>('AFTER');
  
  // Officer update state (in authority mode)
  const [officerStatus, setOfficerStatus] = useState<IssueStatus>('IN_PROGRESS');
  const [officerNote, setOfficerNote] = useState('');
  const [officerProofUrl, setOfficerProofUrl] = useState(
    'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
  );

  if (!selectedIssue) return null;

  const isRoad = selectedIssue.category === 'ROAD';

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(selectedIssue.id, commentInput, isAuthorityMode);
    setCommentInput('');
  };

  const handleOfficerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateIssueStatus(
      selectedIssue.id,
      officerStatus,
      officerNote || `Official update by ${selectedIssue.location.city} Municipal Authority`,
      officerStatus === 'RESOLVED' ? officerProofUrl : undefined,
      `${selectedIssue.location.city} Municipal Redressal Wing`
    );
    setOfficerNote('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Share Link Copied',
        message: 'Direct grievance link ready to share on WhatsApp or Twitter.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-float border border-slate-200 max-w-4xl w-full overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        
        {/* Top Sticky Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase ${
                isRoad ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {isRoad ? <Truck className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
              <span>{isRoad ? 'Road Infrastructure' : 'Waste & Sanitation'}</span>
            </span>

            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
              {selectedIssue.referenceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedIssueId(null)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Main Title & Subtitle */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <span className="text-slate-800 font-bold">{selectedIssue.subcategory}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {selectedIssue.location.area}, {selectedIssue.location.city}, {selectedIssue.location.state}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Reported {new Date(selectedIssue.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {selectedIssue.title}
            </h1>
          </div>

          {/* Media Section: Photos & Before/After Comparison */}
          <div className="space-y-2">
            {selectedIssue.beforeAfterImages ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Government Resolution Proof (Before vs After)
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setActivePhotoTab('BEFORE')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activePhotoTab === 'BEFORE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Before Damage
                    </button>
                    <button
                      onClick={() => setActivePhotoTab('AFTER')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activePhotoTab === 'AFTER' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      ✓ Fixed by Authority
                    </button>
                  </div>
                </div>

                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={activePhotoTab === 'BEFORE' ? selectedIssue.beforeAfterImages.before : selectedIssue.beforeAfterImages.after}
                    alt="Inspection Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 text-white text-xs font-bold backdrop-blur-md">
                    {activePhotoTab === 'BEFORE' ? '🚨 Citizen Reported Condition' : '🎉 Official Resolution Completed'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedIssue.imageUrl}
                  alt={selectedIssue.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 text-white text-xs font-bold backdrop-blur-md">
                  📍 Verified Geotagged Image
                </div>
              </div>
            )}
          </div>

          {/* Description & Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left: Description */}
            <div className="md:col-span-2 bg-slate-50/70 rounded-2xl p-5 border border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Citizen Grievance Statement
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedIssue.description}
              </p>

              {selectedIssue.location.landmark && (
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 font-medium">
                  <strong>Landmark / Directions:</strong> {selectedIssue.location.landmark}
                </div>
              )}
            </div>

            {/* Right: Quick Action & Vote */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                  Community Action
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleUpvote(selectedIssue.id)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                    selectedIssue.hasUpvoted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${selectedIssue.hasUpvoted ? 'fill-current' : ''}`} />
                  <span>{selectedIssue.hasUpvoted ? 'Upvoted' : 'Upvote Issue'} ({selectedIssue.upvotes})</span>
                </motion.button>
                <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
                  Higher votes push this to local ward officer priority queue.
                </p>
              </div>

              <div className="text-xs text-slate-500 space-y-1.5 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="font-medium">Assigned Dept:</span>
                  <span className="font-bold text-slate-800 text-right truncate max-w-[150px]">
                    {selectedIssue.assignedDepartment || 'Municipal Corporation'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Reported by:</span>
                  <span className="font-bold text-slate-800">{selectedIssue.reportedBy.name}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Government Action Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Official Redressal Timeline</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Status: {selectedIssue.status.replace('_', ' ')}
              </span>
            </div>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {selectedIssue.timeline.map((event, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 ${
                    event.status === 'RESOLVED'
                      ? 'bg-emerald-600 ring-emerald-300'
                      : event.status === 'IN_PROGRESS'
                      ? 'bg-blue-600 ring-blue-300'
                      : 'bg-amber-500 ring-amber-300'
                  }`} />
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">{event.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{event.description}</p>
                    {event.authorityName && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        🏛️ {event.authorityName}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authority Simulator Panel (Active when Authority Mode is ON) */}
          {isAuthorityMode && (
            <div className="bg-amber-50/70 rounded-2xl border-2 border-amber-300 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-700" />
                  <h3 className="text-sm font-bold text-amber-900">
                    Authority Action Console (Municipal / PWD Officer)
                  </h3>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Officer Simulation
                </span>
              </div>

              <form onSubmit={handleOfficerSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-900 mb-1">Set New Status</label>
                    <select
                      value={officerStatus}
                      onChange={e => setOfficerStatus(e.target.value as IssueStatus)}
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="UNDER_REVIEW">🟡 Mark Under Review (Inspection)</option>
                      <option value="IN_PROGRESS">🔵 Mark In Progress (Repair Team Dispatched)</option>
                      <option value="RESOLVED">🟢 Mark Resolved (Work Completed)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-900 mb-1">Official Resolution Note</label>
                    <input
                      type="text"
                      value={officerNote}
                      onChange={e => setOfficerNote(e.target.value)}
                      placeholder="e.g. Patching complete / 5 bins cleared"
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                {officerStatus === 'RESOLVED' && (
                  <div>
                    <label className="block text-[11px] font-bold text-amber-900 mb-1">Proof Photo URL (After Completion)</label>
                    <input
                      type="text"
                      value={officerProofUrl}
                      onChange={e => setOfficerProofUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Apply Official Status Update</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Citizen Comments & Discussion Section */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">
              Community Discussion ({selectedIssue.comments?.length || 0})
            </h3>

            {/* Comment List */}
            <div className="space-y-3">
              {selectedIssue.comments?.map(comment => (
                <div
                  key={comment.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    comment.isGovtOfficial
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold flex items-center gap-1.5 ${
                      comment.isGovtOfficial ? 'text-emerald-800' : 'text-slate-800'
                    }`}>
                      {comment.userName}
                      {comment.isGovtOfficial && (
                        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">
                          OFFICIAL
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-700 font-normal leading-relaxed">{comment.content}</p>
                </div>
              ))}

              {(!selectedIssue.comments || selectedIssue.comments.length === 0) && (
                <p className="text-xs text-slate-400 text-center py-2">
                  No comments yet. Be the first to share an update or witness report!
                </p>
              )}
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Write a comment or status update..."
                className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
