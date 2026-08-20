import React from 'react';
import type { CivicIssue } from '../types';
import { useCivic } from '../context/CivicContext';
import { MapPin, ThumbsUp, MessageSquare, Share2, AlertOctagon, CheckCircle2, Clock, Truck, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface IssueCardProps {
  issue: CivicIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const { toggleUpvote, setSelectedIssueId, addToast } = useCivic();

  const isRoad = issue.category === 'ROAD';
  const isResolved = issue.status === 'RESOLVED';
  const isInProgress = issue.status === 'IN_PROGRESS';
  const isUnderReview = issue.status === 'UNDER_REVIEW';

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied to Clipboard',
        message: `Share "${issue.title.slice(0, 30)}..." with local authorities & neighbors.`
      });
    }
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUpvote(issue.id);
  };

  const getSeverityBadge = () => {
    switch (issue.severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            Critical Hazard
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
            High Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
            Moderate
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    if (isResolved) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Resolved by Govt
        </span>
      );
    }
    if (isInProgress) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          Work In Progress
        </span>
      );
    }
    if (isUnderReview) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-purple-600" />
          Under Review
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
        <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
        Reported
      </span>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => setSelectedIssueId(issue.id)}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Top Media Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={issue.imageUrl}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category Pill on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm backdrop-blur-md ${
              isRoad
                ? 'bg-amber-500/90 text-white border border-amber-400'
                : 'bg-emerald-600/90 text-white border border-emerald-400'
            }`}
          >
            {isRoad ? <Truck className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
            <span>{isRoad ? 'ROAD HAZARD' : 'WASTE DUMP'}</span>
          </span>
          {getSeverityBadge()}
        </div>

        {/* Reference ID Pill */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/20">
            {issue.referenceNumber}
          </span>
        </div>

        {/* Resolved Badge or Location Overlay on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-semibold truncate drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{issue.location.area}, {issue.location.city}</span>
          </div>
          {isResolved && (
            <span className="shrink-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
              ✓ Fixed
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        
        {/* Title & Subcategory */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="font-semibold text-slate-700">{issue.subcategory}</span>
            <span>{issue.location.state}</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
            {issue.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {issue.description}
          </p>
        </div>

        {/* Status Badge & Dept */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>{getStatusBadge()}</div>
          <span className="text-[11px] text-slate-400 font-medium">
            {new Date(issue.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Bottom Interaction Strip: Voting & Actions */}
        <div className="pt-2 flex items-center justify-between">
          
          {/* Vote Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              issue.hasUpvoted
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/30'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
            <span>{issue.upvotes}</span>
            <span className="text-[10px] font-normal opacity-90 hidden sm:inline">
              {issue.hasUpvoted ? 'Upvoted' : 'Vote'}
            </span>
          </motion.button>

          {/* Comment Count & Share */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium px-2 py-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{issue.comments?.length || 0}</span>
            </div>

            <button
              onClick={handleShare}
              title="Share issue"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <div className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
