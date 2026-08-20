import React from 'react';
import { useCivic } from '../context/CivicContext';
import { PlusCircle, Map, LayoutGrid, BarChart3, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setIsReportModalOpen,
    isAuthorityMode,
    setIsAuthorityMode
  } = useCivic();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 text-white shadow-md shadow-emerald-500/20">
              <span className="text-xl font-black tracking-tighter">CP</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Civic<span className="text-emerald-600">Pulse</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> India
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                National Road & Waste Redressal System
              </p>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70">
            <button
              onClick={() => setActiveView('GRID')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'GRID'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setActiveView('MAP')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'MAP'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Map className="w-4 h-4 text-amber-500" />
              <span>Map View</span>
            </button>

            <button
              onClick={() => setActiveView('ANALYTICS')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'ANALYTICS'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Impact</span>
            </button>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            {/* Authority Mode Toggle */}
            <button
              onClick={() => setIsAuthorityMode(!isAuthorityMode)}
              title={isAuthorityMode ? "Switch to Citizen View" : "Simulate Municipal / PWD Officer"}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isAuthorityMode
                  ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${isAuthorityMode ? 'text-amber-600' : 'text-slate-400'}`} />
              <span className="hidden lg:inline">{isAuthorityMode ? 'Authority Mode (ON)' : 'Govt Portal'}</span>
            </button>

            {/* Report Issue Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Report Issue</span>
            </motion.button>
          </div>

        </div>
      </div>

      {/* Authority Mode Active Banner */}
      {isAuthorityMode && (
        <div className="bg-amber-50 border-t border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-900 font-medium flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span><strong>Government / Municipal Officer Mode Active:</strong> You can review, update progress, and mark road/waste issues as resolved with proof pictures.</span>
            </span>
            <button
              onClick={() => setIsAuthorityMode(false)}
              className="text-amber-800 underline font-semibold text-xs ml-4"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
