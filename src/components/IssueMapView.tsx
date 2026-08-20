import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useCivic } from '../context/CivicContext';
import type { CivicIssue } from '../types';
import { INDIAN_STATES } from '../data/indianStates';
import { MapPin, ThumbsUp, ArrowRight, CheckCircle2 } from 'lucide-react';

// Custom Map Marker Icons using Leaflet DivIcon
const createCustomIcon = (issue: CivicIssue) => {
  const isRoad = issue.category === 'ROAD';
  const isResolved = issue.status === 'RESOLVED';
  
  const bgColor = isResolved
    ? '#059669' // Green for resolved
    : isRoad
    ? '#ea580c' // Orange for Road
    : '#0d9488'; // Teal for Waste

  const iconEmoji = isResolved ? '✓' : isRoad ? '🛣️' : '🗑️';

  const html = `
    <div style="
      position: relative;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${bgColor};
      color: white;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      font-size: 16px;
      cursor: pointer;
      transform: translate(-50%, -50%);
      transition: transform 0.2s;
    ">
      ${iconEmoji}
      <span style="
        position: absolute;
        bottom: -6px;
        background: #0f172a;
        color: white;
        font-size: 9px;
        font-weight: 800;
        padding: 1px 4px;
        border-radius: 999px;
        border: 1px solid white;
      ">
        ▲ ${issue.upvotes}
      </span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
};

// Component to dynamically re-center map when filters change
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const IssueMapView: React.FC = () => {
  const { filteredIssues, filters, setSelectedIssueId, toggleUpvote } = useCivic();

  // Determine center based on state filter
  let mapCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  let mapZoom = 5;

  if (filters.state !== 'ALL') {
    const matchedState = INDIAN_STATES.find(s => s.name.toLowerCase() === filters.state.toLowerCase());
    if (matchedState) {
      mapCenter = [matchedState.centerCoordinates.lat, matchedState.centerCoordinates.lng];
      mapZoom = 7;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Geotagged Infrastructure Map</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {filteredIssues.length} Pins Active
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Visualizing reported roads, potholes, and waste heaps with real-time GPS locations.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" />
            <span className="text-slate-700">Road Hazard</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600 border border-white" />
            <span className="text-slate-700">Waste Dump</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white" />
            <span className="text-slate-700">Fixed / Resolved</span>
          </div>
        </div>
      </div>

      {/* Map View Container */}
      <div className="h-[620px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-premium relative bg-slate-50">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <MapController center={mapCenter} zoom={mapZoom} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredIssues.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.location.coordinates.lat, issue.location.coordinates.lng]}
              icon={createCustomIcon(issue)}
            >
              <Popup className="civic-map-popup">
                <div className="w-72 p-0 overflow-hidden bg-white rounded-xl">
                  <div className="relative h-32 w-full bg-slate-100">
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                      {issue.category === 'ROAD' ? '🛣️ Road Hazard' : '🗑️ Waste Issue'}
                    </div>
                    {issue.status === 'RESOLVED' && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{issue.location.area}, {issue.location.city}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {issue.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => toggleUpvote(issue.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                          issue.hasUpvoted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{issue.upvotes}</span>
                      </button>

                      <button
                        onClick={() => setSelectedIssueId(issue.id)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};
