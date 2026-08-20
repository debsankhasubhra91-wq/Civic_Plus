import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Truck, Trash2, ArrowUpRight, CheckCircle2, AlertTriangle, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroBanner: React.FC = () => {
  const { openReportModalWithCategory, issues } = useCivic();

  const totalReports = issues.length;
  const resolvedCount = issues.filter(i => i.status === 'RESOLVED').length;
  const totalVotes = issues.reduce((acc, curr) => acc + curr.upvotes, 0);
  const roadCount = issues.filter(i => i.category === 'ROAD').length;
  const wasteCount = issues.filter(i => i.category === 'WASTE').length;

  return (
    <div className="relative bg-white pt-8 pb-10 border-b border-slate-100 overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct Civic Action & Public Grievance Portal</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-bold">28 States & 8 UTs</span>
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Spot an Issue, Snap a Photo,{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              Demand Action.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3.5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Empowering citizens across India to report broken roads, dangerous potholes, and uncleared garbage heaps with exact geotagged locations. Vote on urgent issues to accelerate government action.
          </motion.p>
        </div>

        {/* Two Core Action Pillars (Road & Waste) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          
          {/* Road Redressal Card */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => openReportModalWithCategory('ROAD')}
            className="group cursor-pointer relative bg-white rounded-2xl p-5 border border-amber-200/90 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Report Road & Pothole Hazard
                  </h3>
                  <p className="text-xs text-slate-500">Potholes, broken asphalt, sunken drains, flooding</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-500 group-hover:text-white text-slate-500 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/70">
                {roadCount} Active Reports
              </span>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                PWD & Municipal Routing <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </motion.div>

          {/* Waste Redressal Card */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => openReportModalWithCategory('WASTE')}
            className="group cursor-pointer relative bg-white rounded-2xl p-5 border border-emerald-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Report Garbage & Waste Dump
                  </h3>
                  <p className="text-xs text-slate-500">Overflowing bins, plastic dumps, clogged drains</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                {wasteCount} Active Reports
              </span>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                Sanitation Corps Routing <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </motion.div>

        </div>

        {/* Live Civic Stats Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            
            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
              <div className="text-2xl font-extrabold text-slate-900">{totalReports}</div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <AlertTriangle className="w-3 h-3 text-amber-500" /> Total Lodged
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
              <div className="text-2xl font-extrabold text-emerald-600">{resolvedCount}</div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Fixed by Govt
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
              <div className="text-2xl font-extrabold text-blue-600">{totalVotes}</div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <Users className="w-3 h-3 text-blue-500" /> Citizen Votes
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
              <div className="text-2xl font-extrabold text-slate-800">
                {totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0}%
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-500" /> Resolution Rate
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
