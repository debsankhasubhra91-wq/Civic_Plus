import React from 'react';
import { useCivic } from '../context/CivicContext';
import { BarChart3, Award, TrendingUp, CheckCircle, Clock, Truck, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { issues, setFilters, setActiveView } = useCivic();

  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'RESOLVED').length;
  const inProgress = issues.filter(i => i.status === 'IN_PROGRESS' || i.status === 'UNDER_REVIEW').length;

  const roadCount = issues.filter(i => i.category === 'ROAD').length;
  const wasteCount = issues.filter(i => i.category === 'WASTE').length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Compute state statistics
  const stateCounts: Record<string, { total: number; resolved: number; upvotes: number }> = {};
  issues.forEach(issue => {
    const st = issue.location.state;
    if (!stateCounts[st]) {
      stateCounts[st] = { total: 0, resolved: 0, upvotes: 0 };
    }
    stateCounts[st].total += 1;
    if (issue.status === 'RESOLVED') {
      stateCounts[st].resolved += 1;
    }
    stateCounts[st].upvotes += issue.upvotes;
  });

  const sortedStates = Object.entries(stateCounts)
    .map(([stateName, stats]) => ({
      name: stateName,
      ...stats,
      resolutionRate: Math.round((stats.resolved / stats.total) * 100)
    }))
    .sort((a, b) => b.total - a.total);

  const handleStateClick = (stateName: string) => {
    setFilters(prev => ({ ...prev, state: stateName, city: 'ALL' }));
    setActiveView('GRID');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-emerald-600" />
          <span>National Civic Action & Redressal Analytics</span>
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Real-time transparency metrics across Indian municipal corporations and state public works departments.
        </p>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Reports Lodged</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{total}</div>
          <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">100% Geotagged</span> across Indian cities
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Fixed by Authorities</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{resolved}</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            Verified with photo resolution proof
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm bg-blue-50/20">
          <div className="flex items-center justify-between text-blue-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Active Progress</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-blue-600">{inProgress}</div>
          <div className="text-xs text-blue-700 font-medium mt-1">
            Crews and machinery dispatched
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">National Redressal Rate</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{resolutionRate}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${resolutionRate}%` }}
            />
          </div>
        </div>

      </div>

      {/* Category Breakdown & State Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            Pillar Breakdown (Roads vs Waste)
          </h3>

          <div className="space-y-4">
            {/* Road Pillar */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Roads & Transport Infrastructure</h4>
                    <p className="text-xs text-slate-500">Potholes, asphalt wear, sunken drains</p>
                  </div>
                </div>
                <span className="text-lg font-black text-amber-700">{roadCount}</span>
              </div>
              <div className="w-full bg-amber-200/50 rounded-full h-2">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${total > 0 ? (roadCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Waste Pillar */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Waste & Public Sanitation</h4>
                    <p className="text-xs text-slate-500">Garbage dumps, plastic piles, choked drains</p>
                  </div>
                </div>
                <span className="text-lg font-black text-emerald-700">{wasteCount}</span>
              </div>
              <div className="w-full bg-emerald-200/50 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${total > 0 ? (wasteCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900 block">💡 How Redressal Works:</span>
            <p>1. High upvote counts trigger emergency notifications to Municipal Chief Engineers.</p>
            <p>2. Contractors are required to post photo evidence upon task completion to close tickets.</p>
          </div>
        </div>

        {/* State Performance Leaderboard (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>State-Wise Grievance Activity</span>
              </h3>
              <p className="text-xs text-slate-500">Click any state to filter feed</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">State / UT</th>
                  <th className="pb-3 text-center">Reports</th>
                  <th className="pb-3 text-center">Citizen Votes</th>
                  <th className="pb-3 text-center">Resolved</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedStates.map((st, idx) => (
                  <tr key={st.name} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{st.name}</span>
                    </td>
                    <td className="py-3 text-center font-bold text-slate-700">{st.total}</td>
                    <td className="py-3 text-center font-bold text-blue-600">▲ {st.upvotes}</td>
                    <td className="py-3 text-center font-bold text-emerald-600">{st.resolved}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleStateClick(st.name)}
                        className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 group-hover:underline"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
