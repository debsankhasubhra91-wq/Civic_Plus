import React from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { IssueGrid } from './components/IssueGrid';
import { IssueMapView } from './components/IssueMapView';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportModal } from './components/ReportModal';
import { IssueDetailModal } from './components/IssueDetailModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent: React.FC = () => {
  const { activeView } = useCivic();

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Banner is shown in Grid and Map view for rich context */}
      {activeView !== 'ANALYTICS' && <HeroBanner />}

      {/* State-wise and Area-wise Filter Bar */}
      {activeView !== 'ANALYTICS' && <FilterBar />}

      {/* Main View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeView === 'GRID' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <IssueGrid />
            </motion.div>
          )}

          {activeView === 'MAP' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <IssueMapView />
            </motion.div>
          )}

          {activeView === 'ANALYTICS' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AnalyticsView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Interactive Modals & Overlays */}
      <ReportModal />
      <IssueDetailModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <CivicProvider>
      <MainContent />
    </CivicProvider>
  );
}

export default App;
