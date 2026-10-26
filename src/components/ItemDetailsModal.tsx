import React, { useState } from 'react';
import { X, MapPin, Calendar, Tag, ShieldCheck, CheckCircle2, AlertTriangle, Printer, Phone, Mail, Share2, Sparkles, Building2 } from 'lucide-react';
import { LostFoundItem } from '../types';

interface ItemDetailsModalProps {
  item: LostFoundItem | null;
  onClose: () => void;
  onMarkReunited: (id: string) => void;
  onReportSuspicious: (id: string, reason: string) => void;
  onOpenPrintNotice: (item: LostFoundItem) => void;
  matchingItems: LostFoundItem[];
  onSelectMatchingItem: (item: LostFoundItem) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  onClose,
  onMarkReunited,
  onReportSuspicious,
  onOpenPrintNotice,
  matchingItems,
  onSelectMatchingItem,
}) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('Inaccurate or false information');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!item) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReportSuspicious(item.id, reportReason);
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportDialog(false);
      setReportSuccess(false);
    }, 1800);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            {item.status === 'reunited' ? (
              <span className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 rounded">
                Reunited with Owner
              </span>
            ) : item.type === 'lost' ? (
              <span className="px-2.5 py-1 text-xs font-semibold text-white bg-amber-600 rounded">
                Lost Item Report
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-700 rounded">
                Found Item Report
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              Ref #{item.id.replace('item-', 'LF-')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Share listing link"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-emerald-50 text-emerald-800 text-xs px-6 py-1.5 border-b border-emerald-200 text-center font-medium">
            Listing link copied to clipboard!
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Image Split */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {item.title}
              </h2>
              <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mt-1">
                <span>Category: <strong className="text-slate-700">{item.category}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Date: <strong className="font-mono tabular-nums text-slate-700">{item.date}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Reported by: <strong className="text-slate-700">{item.reporterName}</strong></span>
              </div>
            </div>

            {/* Photo / Visual */}
            <div className="relative aspect-16/9 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                  <Tag className="w-12 h-12 stroke-1 text-slate-300" />
                  <span className="text-xs mt-2 font-medium">No photo provided by reporter</span>
                </div>
              )}
            </div>
          </div>

          {/* Location & Handover Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Incident Location: </span>
                <span>{item.location}</span>
              </div>
            </div>

            {item.handoverLocation && (
              <div className="flex items-start gap-2 text-slate-700 pt-1 border-t border-slate-200/60">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Current Custody / Safe Storage: </span>
                  <span className="text-blue-900 font-medium">{item.handoverLocation}</span>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Item Details &amp; Distinguishing Features
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-lg p-3.5">
              {item.description}
            </p>
          </div>

          {/* Proof of Ownership Verification Hint */}
          {item.verificationQuestion && (
            <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-4 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Proof of Ownership Prompt</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Before claiming this item, the finder requires you to answer:
                <br />
                <span className="font-semibold italic">"{item.verificationQuestion}"</span>
              </p>
            </div>
          )}

          {/* Potential Matches Box */}
          {matchingItems.length > 0 && item.status !== 'reunited' && (
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Smart Match Engine Detected {matchingItems.length} Potential Counterpart{matchingItems.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              <p className="text-xs text-emerald-800">
                Based on category "{item.category}" and keywords, these reports may correspond to this item:
              </p>
              <div className="space-y-2">
                {matchingItems.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => onSelectMatchingItem(match)}
                    className="bg-white border border-emerald-200 hover:border-emerald-400 p-2.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{match.title}</span>
                        <span className={`text-2xs px-1.5 py-0.5 rounded ${match.type === 'lost' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {match.type === 'lost' ? 'Lost' : 'Found'}
                        </span>
                      </div>
                      <div className="text-slate-500 mt-0.5 font-mono tabular-nums">
                        {match.location} · {match.date}
                      </div>
                    </div>
                    <span className="text-emerald-700 font-semibold text-xs hover:underline">
                      Inspect &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact or Claim Workflow */}
          <div className="pt-2 border-t border-slate-200">
            {!showContactInfo ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.type === 'lost' ? 'Have you found this item?' : 'Is this your lost belonging?'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reveal verified contact details following our safe communication checklist.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContactInfo(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
                >
                  Contact Reporter
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-emerald-300 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified Safe Contact Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowContactInfo(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Hide
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>
                    <strong>Contact Name:</strong> {item.reporterName}
                  </p>
                  <p>
                    <strong>Channel:</strong> {item.contactMethod}
                  </p>
                  <p className="text-emerald-900 font-mono font-medium p-2 bg-emerald-100/60 rounded">
                    {item.contactEmailOrPhone}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-2 text-2xs text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">Safe Handover Checklist:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                    <li>Always arrange exchanges in monitored public zones (Security Desk, College Reception).</li>
                    <li>Never pay or demand money / gift cards / advance shipping fees.</li>
                    <li>Verify secret identifiers or ask the claimant to unlock device in person.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Reunited, Print Notice, Report Suspicious */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {item.status !== 'reunited' && (
                <button
                  type="button"
                  onClick={() => {
                    onMarkReunited(item.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark as Reunited</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenPrintNotice(item)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Notice Flyer</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowReportDialog(true)}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Suspicious</span>
            </button>
          </div>

          {/* Report Suspicious Dialog Drawer */}
          {showReportDialog && (
            <form onSubmit={handleReportSubmit} className="mt-3 p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3 text-xs">
              <div className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Report Inappropriate or Suspicious Listing</span>
              </div>
              <p className="text-rose-800">
                Help keep the community safe. Flags are reviewed to remove false claims or spam.
              </p>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Reason for report</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800"
                >
                  <option value="Inaccurate or false information">Inaccurate or false information</option>
                  <option value="Duplicate listing">Duplicate listing</option>
                  <option value="Suspicious owner/finder behavior">Suspicious owner/finder behavior</option>
                  <option value="Item already returned or resolved">Item already returned or resolved</option>
                  <option value="Inappropriate / Offensive content">Inappropriate / Offensive content</option>
                </select>
              </div>

              {reportSuccess ? (
                <div className="p-2 bg-emerald-100 text-emerald-800 font-semibold rounded text-center">
                  Report submitted. Thank you for keeping the registry accurate.
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportDialog(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                  >
                    Submit Flag
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
