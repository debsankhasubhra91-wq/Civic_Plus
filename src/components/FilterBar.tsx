import React from 'react';
import { useCivic } from '../context/CivicContext';
import { INDIAN_STATES } from '../data/indianStates';
import { Search, MapPin, ArrowUpDown, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, filteredIssues, issues } = useCivic();

  const selectedStateData = INDIAN_STATES.find(
    s => s.name.toLowerCase() === filters.state.toLowerCase()
  );

  const hasActiveFilters =
    filters.state !== 'ALL' ||
    filters.city !== 'ALL' ||
    filters.category !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.severity !== 'ALL' ||
    filters.searchQuery.trim() !== '' ||
    filters.sortBy !== 'MOST_UPVOTED';

  const handleStateChange = (stateName: string) => {
    setFilters(prev => ({
      ...prev,
      state: stateName,
      city: 'ALL' // Reset city when state changes
    }));
  };

  return (
    <div className="bg-white sticky top-18 z-30 py-4 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
        
        {/* Top Row: Search Input & State Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search by Area, Street, Landmark */}
          <div className="relative md:col-span-6">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search by area (e.g. BKC, Koramangala, Hazratganj) or keywords..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State-Wise Dropdown Filter (All Indian States & UTs) */}
          <div className="relative md:col-span-3">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
              <MapPin className="h-4 w-4" />
            </div>
            <select
              value={filters.state}
              onChange={e => handleStateChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
            >
              <option value="ALL">All Indian States & UTs (All)</option>
              <optgroup label="States">
                {INDIAN_STATES.filter(s => s.type === 'State').map(state => (
                  <option key={state.code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories">
                {INDIAN_STATES.filter(s => s.type === 'Union Territory').map(ut => (
                  <option key={ut.code} value={ut.name}>
                    {ut.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
              ▼
            </div>
          </div>

          {/* City / District Dropdown (Dynamic when state is selected) */}
          <div className="relative md:col-span-3">
            <select
              value={filters.city}
              onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
              disabled={filters.state === 'ALL' && !selectedStateData}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-all appearance-none cursor-pointer ${
                filters.state === 'ALL'
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
              }`}
            >
              <option value="ALL">
                {filters.state === 'ALL' ? 'Select State First for City' : `All Cities in ${filters.state}`}
              </option>
              {selectedStateData?.cities.map(cityName => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
              ▼
            </div>
          </div>

        </div>

        {/* Bottom Row: Category Pills, Status Tabs, Sorting & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'ALL' }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.category === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'ROAD' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.category === 'ROAD'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <span>🛣️</span>
              <span>Roads & Hazards</span>
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'WASTE' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.category === 'WASTE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span>🗑️</span>
              <span>Waste & Sanitation</span>
            </button>
          </div>

          {/* Status Tabs */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold">
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'ALL' }))}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filters.status === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'REPORTED' }))}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                filters.status === 'REPORTED' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-3 h-3" /> Reported
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'IN_PROGRESS' }))}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                filters.status === 'IN_PROGRESS' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3 h-3" /> In Progress
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'RESOLVED' }))}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                filters.status === 'RESOLVED' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-3 h-3" /> Resolved
            </button>
          </div>

          {/* Right Controls: Sort & Filter Reset */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Sort Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={filters.sortBy}
                  onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-3"
                >
                  <option value="MOST_UPVOTED">🔥 Most Upvoted</option>
                  <option value="NEWEST">🕒 Newest First</option>
                  <option value="CRITICAL">⚠️ Critical Severity</option>
                </select>
              </div>
            </div>

            {/* Clear Filters CTA */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-all"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Tags Pill Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-700">Active filters:</span>
            {filters.state !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                State: {filters.state}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-emerald-950"
                  onClick={() => setFilters(prev => ({ ...prev, state: 'ALL', city: 'ALL' }))}
                />
              </span>
            )}
            {filters.city !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300 font-medium">
                City: {filters.city}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-slate-950"
                  onClick={() => setFilters(prev => ({ ...prev, city: 'ALL' }))}
                />
              </span>
            )}
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                Keyword: "{filters.searchQuery}"
                <X
                  className="w-3 h-3 cursor-pointer hover:text-blue-950"
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                />
              </span>
            )}
            <span className="ml-auto text-xs text-slate-400">
              Showing <strong>{filteredIssues.length}</strong> of <strong>{issues.length}</strong> reports
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
