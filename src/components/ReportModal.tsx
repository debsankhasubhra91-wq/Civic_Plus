import React, { useState, useEffect } from 'react';
import { useCivic } from '../context/CivicContext';
import { INDIAN_STATES } from '../data/indianStates';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import type { SamplePreset } from '../data/samplePresets';
import type { IssueCategory, SeverityLevel } from '../types';
import { X, Camera, Upload, Truck, Trash2, Sparkles, Navigation, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, addIssue, presetCategoryForReport } = useCivic();

  const [category, setCategory] = useState<IssueCategory>('ROAD');
  const [subcategory, setSubcategory] = useState<string>('Deep Pothole & Cave-in');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('HIGH');
  
  // Location
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 19.0760, lng: 72.8777 });
  const [reporterName, setReporterName] = useState('Concerned Citizen');

  // Photo
  const [imageUrl, setImageUrl] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Sync category if triggered from hero
  useEffect(() => {
    if (presetCategoryForReport) {
      setCategory(presetCategoryForReport);
      if (presetCategoryForReport === 'ROAD') {
        setSubcategory('Deep Pothole & Cave-in');
        setImageUrl('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
      } else {
        setSubcategory('Overflowing Garbage Bins');
        setImageUrl('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
      }
    } else {
      // Default initial image
      if (!imageUrl) {
        setImageUrl('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
      }
    }
  }, [presetCategoryForReport]);

  const stateData = INDIAN_STATES.find(s => s.name === selectedState);

  const handleStateChange = (st: string) => {
    setSelectedState(st);
    const matched = INDIAN_STATES.find(s => s.name === st);
    if (matched && matched.cities.length > 0) {
      setSelectedCity(matched.cities[0]);
      setCoordinates(matched.centerCoordinates);
    }
  };

  const handleApplyPreset = (preset: SamplePreset) => {
    setCategory(preset.category);
    setSubcategory(preset.subcategory);
    setTitle(preset.title);
    setDescription(preset.description);
    setImageUrl(preset.imageUrl);
    setSeverity(preset.severity);
  };

  const handleAutoLocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocating(false);
        },
        () => {
          // Fallback if denied
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please provide a brief title describing the issue.');
      return;
    }
    if (!area.trim()) {
      alert('Please specify the Area / Street name.');
      return;
    }

    addIssue({
      title: title.trim(),
      description: description.trim() || `Civic issue reported at ${area}, ${selectedCity}`,
      category,
      subcategory,
      severity,
      status: 'REPORTED',
      imageUrl: imageUrl || (category === 'ROAD' 
        ? 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'),
      location: {
        state: selectedState,
        city: selectedCity,
        area: area.trim(),
        landmark: landmark.trim(),
        pincode: pincode.trim(),
        coordinates
      },
      reportedBy: {
        name: reporterName.trim() || 'Active Citizen',
        badge: 'Verified Citizen'
      },
      assignedDepartment: category === 'ROAD'
        ? `${selectedCity} PWD / Municipal Roads Division`
        : `${selectedCity} Solid Waste Management & Sanitation Wing`
    });

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Reset & Close
    setIsReportModalOpen(false);
    setTitle('');
    setDescription('');
    setArea('');
    setLandmark('');
  };

  if (!isReportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-float border border-slate-200 max-w-2xl w-full overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:px-7 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              category === 'ROAD' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {category === 'ROAD' ? <Truck className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Report a Civic Grievance
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Direct evidence submission for Municipal & PWD Action
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReportModalOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* 1. Category Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Choose Issue Category *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategory('ROAD');
                  setSubcategory('Deep Pothole & Cave-in');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                  category === 'ROAD'
                    ? 'border-amber-500 bg-amber-50/50 shadow-xs ring-2 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${category === 'ROAD' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Road & Hazards</div>
                  <div className="text-xs text-slate-500 font-normal mt-0.5">Potholes, broken roads, drains</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('WASTE');
                  setSubcategory('Overflowing Garbage Bins');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                  category === 'WASTE'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${category === 'WASTE' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Waste & Sanitation</div>
                  <div className="text-xs text-slate-500 font-normal mt-0.5">Garbage dumps, plastic piles</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Photo Attachment (Camera / Upload / Instant Sample Presets) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Visual Photo Proof *
              </label>
              <span className="text-[11px] text-slate-400 font-medium">GPS Metadata attached</span>
            </div>

            {/* Photo Preview & Dropzone */}
            <div className="relative rounded-2xl border-2 border-dashed border-slate-300 p-4 bg-slate-50 flex flex-col sm:flex-row items-center gap-4">
              {imageUrl ? (
                <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img src={imageUrl} alt="Proof preview" className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 right-1.5">
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-1 bg-black/70 text-white rounded-full hover:bg-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                    ✓ Ready
                  </div>
                </div>
              ) : (
                <div className="w-full sm:w-44 h-36 rounded-xl border border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 shrink-0">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-[11px]">No photo attached</span>
                </div>
              )}

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <p className="text-xs text-slate-600 font-medium">
                  Upload an image from your phone/camera or choose a sample test photo:
                </p>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload File</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl(category === 'ROAD' 
                        ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
                        : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Snap Photo (Demo)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Demo Presets */}
            <div className="mt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                ⚡ Quick Presets (Click to autofill):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SAMPLE_PRESETS.filter(p => p.category === category).map(preset => (
                  <button
                    type="button"
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] transition-all group"
                  >
                    <div className="font-bold text-slate-800 truncate group-hover:text-emerald-700">
                      {preset.subcategory}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{preset.severity} Priority</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Location Details (State, City, Area & Geolocation) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Exact Location & Indian State *
              </label>
              <button
                type="button"
                onClick={handleAutoLocate}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Detecting GPS...' : '📍 Auto-detect GPS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* State */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">State / UT</label>
                <select
                  value={selectedState}
                  onChange={e => handleStateChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s.code} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">City / District</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {stateData?.cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Area Name */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Area / Colony / Street Name *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="e.g. Bandra West, Hill Road / Sector 18"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="Near metro pillar 12"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 4. Issue Description & Severity */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              4. Issue Details & Severity *
            </label>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title Summary *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={category === 'ROAD' ? 'e.g. Large dangerous pothole near signal' : 'e.g. Garbage dumped across school sidewalk'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain the problem, risk to traffic/pedestrians, duration unresolved..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Severity Radios */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Hazard Severity Rating</label>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as SeverityLevel[]).map(lvl => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setSeverity(lvl)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      severity === lvl
                        ? lvl === 'CRITICAL'
                          ? 'bg-rose-500 text-white border-rose-600'
                          : lvl === 'HIGH'
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Citizen Reporter Info */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Name / Alias</label>
            <input
              type="text"
              value={reporterName}
              onChange={e => setReporterName(e.target.value)}
              placeholder="e.g. Concerned Citizen, Resident"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Submit & Notify Authorities</span>
            </button>
          </div>

        </form>

      </motion.div>
    </div>
  );
};
