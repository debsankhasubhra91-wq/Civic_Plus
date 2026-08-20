import React from 'react';
import { useCivic } from '../context/CivicContext';
import { IssueCard } from './IssueCard';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RotateCcw, PlusCircle } from 'lucide-react';

export const IssueGrid: React.FC = () => {
  const { filteredIssues, resetFilters, setIsReportModalOpen, filters } = useCivic();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Citizen Action Feed</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {filteredIssues.length} issues
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {filters.state !== 'ALL'
              ? `Displaying reported road & waste issues in ${filters.state}`
              : 'Browse and upvote public infrastructure grievances across all Indian states'}
          </p>
        </div>
      </div>

      {/* Grid or Empty State */}
      <AnimatePresence mode="popLayout">
        {filteredIssues.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16 px-4 bg-slate-50/70 rounded-3xl border border-dashed border-slate-200 max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No Issues Found Matching Filters
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any road or waste reports for the selected state/area or search keywords.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Report the First Issue</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
