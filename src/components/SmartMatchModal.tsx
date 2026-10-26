import React from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Calendar, Tag, AlertCircle } from 'lucide-react';
import { LostFoundItem } from '../types';

interface MatchPair {
  lostItem: LostFoundItem;
  foundItem: LostFoundItem;
  score: number;
  reasons: string[];
}

interface SmartMatchModalProps {
  items: LostFoundItem[];
  onClose: () => void;
  onSelectItem: (item: LostFoundItem) => void;
  onMarkReunited: (lostId: string, foundId?: string) => void;
}

export const SmartMatchModal: React.FC<SmartMatchModalProps> = ({
  items,
  onClose,
  onSelectItem,
  onMarkReunited,
}) => {
  const lostItems = items.filter((i) => i.status === 'lost');
  const foundItems = items.filter((i) => i.status === 'found');

  // Compute matches
  const matchPairs: MatchPair[] = [];

  lostItems.forEach((lost) => {
    foundItems.forEach((found) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Same category (+45%)
      if (lost.category === found.category) {
        score += 45;
        reasons.push(`Matching category: ${lost.category}`);
      }

      // 2. Title similarity / keyword match (+30%)
      const lostWords = lost.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const foundWords = found.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const commonWords = lostWords.filter((w) => foundWords.includes(w) || found.description.toLowerCase().includes(w));
      if (commonWords.length > 0) {
        score += 30;
        reasons.push(`Keyword match: "${commonWords.join(', ')}"`);
      }

      // 3. Location proximity (+15%)
      if (lost.location.toLowerCase() === found.location.toLowerCase()) {
        score += 15;
        reasons.push(`Identical location: ${lost.location}`);
      } else if (
        (lost.location.includes('Library') && found.location.includes('Library')) ||
        (lost.location.includes('Classroom') && found.location.includes('Classroom')) ||
        (lost.location.includes('Canteen') && found.location.includes('Cafeteria'))
      ) {
        score += 10;
        reasons.push(`Nearby facility match`);
      }

      // 4. Date proximity (+10%)
      const diffDays = Math.abs(
        (new Date(lost.date).getTime() - new Date(found.date).getTime()) / (1000 * 3600 * 24)
      );
      if (diffDays <= 3) {
        score += 10;
        reasons.push(`Reported within ${Math.round(diffDays)} days of each other`);
      }

      if (score >= 45) {
        matchPairs.push({ lostItem: lost, foundItem: found, score, reasons });
      }
    });
  });

  // Sort by highest score
  matchPairs.sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Automated Match Detection Engine
              </h3>
              <p className="text-xs text-slate-500">
                Cross-referencing reported Lost items against recovered Found items across public spaces.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900">
                Current Active Queue: {lostItems.length} Lost Reports vs {foundItems.length} Found Reports
              </span>
              <p className="text-slate-500 mt-0.5">
                Evaluated against category similarity, location zones, dates, and lexical tokens.
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-emerald-700 font-bold text-sm tabular-nums">
                {matchPairs.length} Candidates
              </span>
            </div>
          </div>

          {matchPairs.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-xl space-y-2">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-semibold text-slate-800">No high-confidence matches yet</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                As new lost and found reports are submitted, our matching algorithm compares categories, locations, and descriptions automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchPairs.map((pair, idx) => (
                <div
                  key={`${pair.lostItem.id}-${pair.foundItem.id}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4"
                >
                  {/* Score strip */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Candidate Match #{idx + 1}</span>
                      <span className="px-2 py-0.5 text-2xs font-bold text-emerald-800 bg-emerald-100 rounded">
                        {pair.score}% Confidence
                      </span>
                    </div>
                    <div className="text-2xs text-slate-500">
                      {pair.reasons.join(' · ')}
                    </div>
                  </div>

                  {/* Side by side comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Lost side */}
                    <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-amber-800 uppercase tracking-wider">
                          Lost Item Report
                        </span>
                        <span className="font-mono text-2xs text-slate-400">
                          {pair.lostItem.id.replace('item-', 'LF-')}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{pair.lostItem.title}</h4>
                      <div className="text-2xs text-slate-500 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{pair.lostItem.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{pair.lostItem.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {pair.lostItem.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectItem(pair.lostItem);
                          onClose();
                        }}
                        className="text-2xs font-semibold text-amber-800 hover:underline"
                      >
                        Inspect Lost Report &rarr;
                      </button>
                    </div>

                    {/* Found side */}
                    <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-emerald-800 uppercase tracking-wider">
                          Found Item Report
                        </span>
                        <span className="font-mono text-2xs text-slate-400">
                          {pair.foundItem.id.replace('item-', 'LF-')}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{pair.foundItem.title}</h4>
                      <div className="text-2xs text-slate-500 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{pair.foundItem.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{pair.foundItem.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {pair.foundItem.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectItem(pair.foundItem);
                          onClose();
                        }}
                        className="text-2xs font-semibold text-emerald-800 hover:underline"
                      >
                        Inspect Found Report &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 text-2xs">
                      Verify ownership questions before handing item over.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onMarkReunited(pair.lostItem.id, pair.foundItem.id);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Reunion &amp; Resolve Both</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Engine
          </button>
        </div>
      </div>
    </div>
  );
};
