/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ItemListings } from './components/ItemListings';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { ReportModal } from './components/ReportModal';
import { SmartMatchModal } from './components/SmartMatchModal';
import { SafeGuidelinesModal } from './components/SafeGuidelinesModal';
import { ProjectSurveySection } from './components/ProjectSurveySection';
import { PrintNoticeModal } from './components/PrintNoticeModal';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';
import { INITIAL_ITEMS, INITIAL_SURVEY_RESPONSES } from './data/initialData';
import { LostFoundItem, SurveyResponse, ItemType } from './types';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Items state with localStorage persistence
  const [items, setItems] = useState<LostFoundItem[]>(() => {
    try {
      const saved = localStorage.getItem('lf_items_registry');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading from localStorage', e);
    }
    return INITIAL_ITEMS;
  });

  // Survey responses with localStorage persistence
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>(() => {
    try {
      const saved = localStorage.getItem('lf_survey_responses');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading survey from localStorage', e);
    }
    return INITIAL_SURVEY_RESPONSES;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'lost' | 'found' | 'reunited'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Modals state
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState<ItemType>('lost');
  const [isSmartMatchOpen, setIsSmartMatchOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [printNoticeItem, setPrintNoticeItem] = useState<LostFoundItem | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem('lf_items_registry', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving items', e);
    }
  }, [items]);

  // Persist survey
  useEffect(() => {
    try {
      localStorage.setItem('lf_survey_responses', JSON.stringify(surveyResponses));
    } catch (e) {
      console.error('Error saving survey responses', e);
    }
  }, [surveyResponses]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenReport = (type: ItemType = 'lost') => {
    setReportType(type);
    setIsReportOpen(true);
  };

  const handleAddItem = (itemData: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: LostFoundItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      status: itemData.type,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    setIsReportOpen(false);
    showToast(`Item reported successfully! "${newItem.title}" has been added to the listings.`);
    
    // Scroll to listings smoothly
    const listingsEl = document.getElementById('items-section');
    if (listingsEl) {
      listingsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMarkReunited = (lostId: string, foundId?: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === lostId || (foundId && item.id === foundId)) {
          return { ...item, status: 'reunited' };
        }
        return item;
      })
    );
    showToast('Record updated! Marked as reunited with rightful owner.');
    if (selectedItem && (selectedItem.id === lostId || selectedItem.id === foundId)) {
      setSelectedItem((prev) => (prev ? { ...prev, status: 'reunited' } : null));
    }
  };

  const handleReportSuspicious = (id: string, reason: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentCount = item.flagCount || 0;
          const currentReasons = item.flagReasons || [];
          return {
            ...item,
            flagCount: currentCount + 1,
            flagReasons: [...currentReasons, reason],
          };
        }
        return item;
      })
    );
  };

  const handleAddSurveyResponse = (response: Omit<SurveyResponse, 'id' | 'timestamp'>) => {
    const newResponse: SurveyResponse = {
      ...response,
      id: `sr-${Date.now()}`,
      timestamp: new Date().toLocaleDateString(),
    };
    setSurveyResponses((prev) => [...prev, newResponse]);
    showToast('Thank you! Your survey response has been recorded.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all items and survey records to initial college project dataset?')) {
      setItems(INITIAL_ITEMS);
      setSurveyResponses(INITIAL_SURVEY_RESPONSES);
      localStorage.removeItem('lf_items_registry');
      localStorage.removeItem('lf_survey_responses');
      showToast('All sample data has been reset to default.');
    }
  };

  const scrollToListings = () => {
    const el = document.getElementById('items-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSurvey = () => {
    const el = document.getElementById('project-survey-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to find potential matches for any item
  const getMatchesForItem = (target: LostFoundItem) => {
    if (target.status === 'reunited') return [];
    return items.filter((candidate) => {
      if (candidate.id === target.id) return false;
      if (candidate.status === 'reunited') return false;
      if (candidate.type === target.type) return false;
      const sameCategory = candidate.category === target.category;
      const titleWords = target.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const titleMatch = titleWords.some(
        (w) =>
          candidate.title.toLowerCase().includes(w) ||
          candidate.description.toLowerCase().includes(w)
      );
      return sameCategory || titleMatch;
    });
  };

  const getMatchesCount = (item: LostFoundItem) => {
    return getMatchesForItem(item).length;
  };

  const lostCount = items.filter((i) => i.status === 'lost').length;
  const foundCount = items.filter((i) => i.status === 'found').length;
  const reunitedCount = items.filter((i) => i.status === 'reunited').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg flex items-center justify-between gap-3 animate-fade-in border border-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white shrink-0 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        onOpenReport={handleOpenReport}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenSmartMatch={() => setIsSmartMatchOpen(true)}
        onOpenSurvey={scrollToSurvey}
        onOpenExport={() => setIsExportOpen(true)}
        onScrollToListings={scrollToListings}
        activeSection="home"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReport={handleOpenReport}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onScrollToListings={scrollToListings}
          lostCount={lostCount}
          foundCount={foundCount}
          reunitedCount={reunitedCount}
          totalCount={items.length}
        />

        {/* Item Listings Section */}
        <ItemListings
          items={items}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenReport={handleOpenReport}
          getMatchesCount={getMatchesCount}
        />

        {/* Field Research & Survey Section */}
        <ProjectSurveySection
          responses={surveyResponses}
          onAddResponse={handleAddSurveyResponse}
        />
      </main>

      {/* Item Details Modal */}
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onMarkReunited={handleMarkReunited}
          onReportSuspicious={handleReportSuspicious}
          onOpenPrintNotice={(item) => setPrintNoticeItem(item)}
          matchingItems={getMatchesForItem(selectedItem)}
          onSelectMatchingItem={(item) => setSelectedItem(item)}
        />
      )}

      {/* Report Modal */}
      {isReportOpen && (
        <ReportModal
          initialType={reportType}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleAddItem}
          existingItems={items}
        />
      )}

      {/* Smart Match Modal */}
      {isSmartMatchOpen && (
        <SmartMatchModal
          items={items}
          onClose={() => setIsSmartMatchOpen(false)}
          onSelectItem={(item) => {
            setIsSmartMatchOpen(false);
            setSelectedItem(item);
          }}
          onMarkReunited={handleMarkReunited}
        />
      )}

      {/* Safe Guidelines Modal */}
      {isSafetyOpen && (
        <SafeGuidelinesModal onClose={() => setIsSafetyOpen(false)} />
      )}

      {/* Print Notice Modal */}
      {printNoticeItem && (
        <PrintNoticeModal
          item={printNoticeItem}
          onClose={() => setPrintNoticeItem(null)}
        />
      )}

      {/* Export / Teacher Presentation Modal */}
      {isExportOpen && (
        <ExportModal
          onClose={() => setIsExportOpen(false)}
          items={items}
          surveyResponses={surveyResponses}
        />
      )}

      {/* Clean Footer */}
      <Footer
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenSurvey={scrollToSurvey}
        onOpenExport={() => setIsExportOpen(true)}
        onResetData={handleResetData}
      />
    </div>
  );
}
