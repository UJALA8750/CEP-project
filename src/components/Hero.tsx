import React from 'react';
import { Search, PlusCircle, CheckCircle2, AlertCircle, Sparkles, Building2, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenReport: (type: 'lost' | 'found') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToListings: () => void;
  lostCount: number;
  foundCount: number;
  reunitedCount: number;
  totalCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReport,
  searchQuery,
  onSearchChange,
  onScrollToListings,
  lostCount,
  foundCount,
  reunitedCount,
  totalCount,
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScrollToListings();
  };

  return (
    <div className="relative bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-md">
              <Building2 className="w-3.5 h-3.5" />
              <span>Campus &amp; Public Space Community Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
              Lost something? <br className="hidden sm:inline" />
              <span className="text-emerald-700">Let’s bring it home.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              A centralized, privacy-conscious platform to report, search, and safely recover lost belongings across colleges, transit stations, libraries, and public community areas.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenReport('lost')}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <AlertCircle className="w-4 h-4" />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenReport('found')}
                className="px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>I Found Something</span>
              </button>
            </div>

            {/* Quick Keyword Search Form */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-lg">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search for ID cards, wallets, keys, locations..."
                  className="w-full pl-10 pr-24 py-3 bg-white text-slate-900 text-sm border border-slate-300 rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Metrics Bar with Tabular Numbers */}
            <div className="pt-4 grid grid-cols-4 gap-3 max-w-lg">
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-amber-600 font-mono tabular-nums">
                  {lostCount}
                </span>
                <span className="text-xs font-medium text-slate-500">Lost Items</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-emerald-600 font-mono tabular-nums">
                  {foundCount}
                </span>
                <span className="text-xs font-medium text-slate-500">Found Items</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-blue-600 font-mono tabular-nums">
                  {reunitedCount}
                </span>
                <span className="text-xs font-medium text-slate-500">Reunited</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-slate-800 font-mono tabular-nums">
                  {totalCount}
                </span>
                <span className="text-xs font-medium text-slate-500">Total Reports</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Visual Flatlay Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src="/src/assets/images/hero_lost_found_items_1793054481724.jpg"
                  alt="Commonly misplaced public belongings: ID cards, wallet, keys, phone, spectacles"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Digital Registry &amp; Safe Retrieval</span>
                  <span>Sheth L.U.J. College CEP Project</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every month hundreds of IDs, books, keys, and devices get left behind in classrooms, cafeterias, and transport. Our system bridges finders and owners with zero personal information leaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
