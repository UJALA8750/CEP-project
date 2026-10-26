import { ShieldCheck, Search, PlusCircle, BookOpen, Sparkles, FileText, Download } from 'lucide-react';

interface HeaderProps {
  onOpenReport: (type?: 'lost' | 'found') => void;
  onOpenSafety: () => void;
  onOpenSmartMatch: () => void;
  onOpenSurvey: () => void;
  onOpenExport: () => void;
  onScrollToListings: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReport,
  onOpenSafety,
  onOpenSmartMatch,
  onOpenSurvey,
  onOpenExport,
  onScrollToListings,
  activeSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single clean text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-800 hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
              LF
            </div>
            <span>Lost&amp;Found</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={onScrollToListings}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'items' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Browse Items
            </button>
            <button
              type="button"
              onClick={onOpenSmartMatch}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Smart Match</span>
            </button>
            <button
              type="button"
              onClick={onOpenSafety}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Safe Guidelines</span>
            </button>
            <button
              type="button"
              onClick={onOpenSurvey}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Project &amp; Survey</span>
            </button>
            <button
              type="button"
              onClick={onOpenExport}
              className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Download / Submit</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenReport('lost')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report Item</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
