import React from 'react';
import { X, ShieldCheck, AlertTriangle, Building2, Lock, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';

interface SafeGuidelinesModalProps {
  onClose: () => void;
}

export const SafeGuidelinesModal: React.FC<SafeGuidelinesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Safe Communication &amp; Handover Guidelines
              </h3>
              <p className="text-xs text-slate-500">
                Protocols developed to protect community safety and prevent false claims.
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700 leading-relaxed">
          {/* Rule 1 */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Always Meet in Designated Public Zones</h4>
              <p className="mt-1 text-slate-600">
                Never agree to meet in secluded areas or private vehicles. Recommended meetup locations:
              </p>
              <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-slate-600">
                <li>College Campus Security Desk (Gate 1 or Main Entrance)</li>
                <li>Library Reception or Dean's Administration Counter</li>
                <li>Transit Station Customer Service Booth or Station Master Office</li>
              </ul>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Verify Ownership Proof Before Handover</h4>
              <p className="mt-1 text-slate-600">
                The finder should request non-public verification before handing over valuable property:
              </p>
              <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-slate-600">
                <li><strong>Smartphones &amp; Tablets:</strong> Ask claimant to unlock the passcode or describe the exact lockscreen photo.</li>
                <li><strong>Wallets &amp; Bags:</strong> Ask for matching name on cards or description of items in zippered pockets.</li>
                <li><strong>Keys:</strong> Ask how many keys, presence of brand logos or distinct keychains.</li>
                <li><strong>Student IDs:</strong> Match the photograph with the person appearing in person.</li>
              </ul>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start gap-3 p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-sm text-rose-950">Zero Financial Demands (Anti-Scam Rule)</h4>
              <p className="mt-1 text-rose-800">
                Lost and found returns should never be conditioned on paying money:
              </p>
              <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-rose-700">
                <li>Never send money via UPI, wire transfer, or gift cards for "shipping/courier fees".</li>
                <li>Beware of extortion attempts where a caller claims they will throw away the item unless paid.</li>
                <li>Report suspicious contacts immediately using the "Report Suspicious" feature.</li>
              </ul>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Protect Personal Data &amp; Privacy</h4>
              <p className="mt-1 text-slate-600">
                Do not publish high-resolution photos displaying complete credit card numbers, Aadhaar / national ID numbers, or home addresses. Obscure sensitive digits before listing.
              </p>
            </div>
          </div>

          {/* College Security Contact Info */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-1">
            <h5 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              Campus Lost &amp; Found Central Custody
            </h5>
            <p className="text-emerald-800">
              If an owner does not claim an item within 48 hours, please deposit it with the Campus Central Security Office (Ext. 204) or Administrative Block Room 102.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
};
