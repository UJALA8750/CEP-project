import React from 'react';
import { Search, MapPin, Calendar, Tag, Sparkles, Filter, RotateCcw, Eye, CheckCircle2 } from 'lucide-react';
import { LostFoundItem } from '../types';
import { CATEGORIES, LOCATIONS } from '../data/initialData';

interface ItemListingsProps {
  items: LostFoundItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedStatus: 'all' | 'lost' | 'found' | 'reunited';
  onStatusChange: (status: 'all' | 'lost' | 'found' | 'reunited') => void;
  sortBy: 'newest' | 'oldest' | 'title';
  onSortByChange: (sort: 'newest' | 'oldest' | 'title') => void;
  onSelectItem: (item: LostFoundItem) => void;
  onOpenReport: (type: 'lost' | 'found') => void;
  getMatchesCount: (item: LostFoundItem) => number;
}

export const ItemListings: React.FC<ItemListingsProps> = ({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortByChange,
  onSelectItem,
  onOpenReport,
  getMatchesCount,
}) => {
  // Filtered and sorted items
  const filteredItems = items
    .filter((item) => {
      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Location filter
      if (selectedLocation !== 'All Locations' && item.location !== selectedLocation) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesLoc || matchesCat;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const clearAllFilters = () => {
    onSearchChange('');
    onCategoryChange('All Categories');
    onLocationChange('All Locations');
    onStatusChange('all');
    onSortByChange('newest');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedStatus !== 'all';

  return (
    <section id="items-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            All Lost &amp; Found Items
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse verified community listings reported across campus, transit, and public facilities.
          </p>
        </div>

        {/* Status Segmented Control (Interactive Filter Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onStatusChange('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedStatus === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('lost')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedStatus === 'lost'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lost ({items.filter((i) => i.status === 'lost').length})
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('found')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedStatus === 'found'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Found ({items.filter((i) => i.status === 'found').length})
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('reunited')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedStatus === 'reunited'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reunited ({items.filter((i) => i.status === 'reunited').length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 py-5 items-center">
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, keywords, descriptions..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="lg:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="lg:col-span-3">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="lg:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'newest' | 'oldest' | 'title')}
            className="w-full py-2 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="title">Sort: Title A-Z</option>
          </select>
        </div>
      </div>

      {/* Active Filter Clear Tag */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pb-4 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 font-mono tabular-nums">{filteredItems.length}</strong> of{' '}
            <span className="font-mono tabular-nums">{items.length}</span> items
          </span>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Grid of Item Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-xl space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No items match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, changing the location, or report this item if it hasn't been listed yet.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Clear filters
            </button>
            <button
              type="button"
              onClick={() => onOpenReport('lost')}
              className="px-3.5 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Report New Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const matchesCount = getMatchesCount(item);
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-white border border-slate-200 hover:border-slate-300 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-400">
                      <Tag className="w-8 h-8 stroke-1 text-slate-300" />
                      <span className="text-xs mt-2 text-slate-400 font-medium">Photograph on file</span>
                    </div>
                  )}

                  {/* Clean Status Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    {item.status === 'reunited' ? (
                      <span className="px-2 py-0.5 text-2xs font-semibold text-white bg-blue-600 rounded">
                        Reunited
                      </span>
                    ) : item.type === 'lost' ? (
                      <span className="px-2 py-0.5 text-2xs font-semibold text-white bg-amber-600 rounded">
                        Lost
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-2xs font-semibold text-white bg-emerald-700 rounded">
                        Found
                      </span>
                    )}
                  </div>

                  {/* Potential Match Alert */}
                  {matchesCount > 0 && item.status !== 'reunited' && (
                    <div className="absolute bottom-2 right-2 bg-slate-900/90 text-amber-300 text-2xs font-semibold px-2 py-1 rounded backdrop-blur flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{matchesCount} {matchesCount === 1 ? 'potential match' : 'potential matches'}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-semibold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 mt-1.5">
                      <span className="font-medium text-slate-600">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{item.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-2xs text-slate-400">
                      ID: <span className="font-mono tabular-nums">{item.id.replace('item-', 'LF-')}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
