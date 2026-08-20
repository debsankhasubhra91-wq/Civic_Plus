import React from 'react';
import { Truck, Trash2, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';
import { useCivic } from '../context/CivicContext';

export const Footer: React.FC = () => {
  const { setFilters, setActiveView, setIsReportModalOpen } = useCivic();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white font-extrabold text-sm">
                CP
              </div>
              <span className="text-lg font-black text-slate-900">
                Civic<span className="text-emerald-600">Pulse</span> India
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              A transparent civic initiative facilitating citizens to photograph, geotag, and crowd-upvote damaged road surfaces, hazardous potholes, and public waste dumps for rapid municipal redressal.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Ministry & Municipal Liaison
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-500" /> Pan-India Coverage
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Grievance Categories
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'ROAD' }));
                    setActiveView('GRID');
                  }}
                  className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Road & Pothole Hazard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'WASTE' }));
                    setActiveView('GRID');
                  }}
                  className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Garbage & Plastic Piles</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, status: 'RESOLVED' }));
                    setActiveView('GRID');
                  }}
                  className="hover:text-emerald-600 transition-colors"
                >
                  ✓ Verified Resolved Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  + Lodge New Grievance
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Municipal Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Civic Helplines
            </h4>
            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>National Swachhata: <strong>1969</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>NHAI Highway Emergency: <strong>1033</strong></span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Data is openly shared with local Municipal Corporations (MCGM, BBMP, MCD, KMC, GCC, GHMC) and PWD.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} CivicPulse India. Designed for cleaner roads and smarter waste management.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for citizen empowerment</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
