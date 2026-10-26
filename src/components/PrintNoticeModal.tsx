import React, { useRef } from 'react';
import { X, Printer, QrCode, Building2, MapPin, Calendar, Phone, ShieldCheck } from 'lucide-react';
import { LostFoundItem } from '../types';

interface PrintNoticeModalProps {
  item: LostFoundItem | null;
  onClose: () => void;
}

export const PrintNoticeModal: React.FC<PrintNoticeModalProps> = ({ item, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!item) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-slate-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Print Notice Board Flyer
              </h3>
              <p className="text-xs text-slate-500">
                Ready-to-print standard flyer for college &amp; public bulletin boards.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Now</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          <div
            ref={printRef}
            className="border-4 border-slate-900 p-6 space-y-6 text-slate-900 max-w-lg mx-auto bg-white"
          >
            {/* Poster Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <span className="text-xs font-extrabold tracking-widest uppercase text-slate-700">
                Public Community Notice
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
                {item.type === 'lost' ? 'LOST ITEM' : 'FOUND ITEM'}
              </h1>
              <p className="text-xs font-semibold text-slate-600">
                Sheth L.U.J. and Sir M.V. College · Digital Lost-and-Found Registry
              </p>
            </div>

            {/* Item Title & Photo */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 underline decoration-slate-400 underline-offset-4">
                {item.title}
              </h2>

              {item.imageUrl && (
                <div className="w-48 h-36 mx-auto border-2 border-slate-900 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Key Information Box */}
            <div className="border border-slate-900 p-3 text-xs space-y-2 bg-slate-50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold">Date: </span>
                  <span className="font-mono tabular-nums">{item.date}</span>
                </div>
                <div>
                  <span className="font-bold">Category: </span>
                  <span>{item.category}</span>
                </div>
              </div>
              <div>
                <span className="font-bold">Location: </span>
                <span>{item.location}</span>
              </div>
              {item.handoverLocation && (
                <div>
                  <span className="font-bold">Custody Location: </span>
                  <span>{item.handoverLocation}</span>
                </div>
              )}
              <div className="pt-1 border-t border-slate-300">
                <span className="font-bold">Description: </span>
                <p className="text-xs mt-0.5 leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Safe retrieval notice & verification */}
            <div className="text-2xs text-slate-600 space-y-1 border-l-2 border-slate-900 pl-3">
              <p className="font-bold text-slate-900">Proof of Ownership Required:</p>
              <p>
                Claimant must provide proof of ownership (e.g. device unlock, matching ID, or contents). Report Ref: #{item.id.replace('item-', 'LF-')}
              </p>
            </div>

            {/* Contact Box & QR Code simulation */}
            <div className="border-t-2 border-slate-900 pt-4 flex items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-extrabold text-slate-900">CONTACT &amp; RECOVERY:</p>
                <p>Name: <span className="font-semibold">{item.reporterName}</span></p>
                <p>Info: <span className="font-mono font-bold">{item.contactEmailOrPhone}</span></p>
                <p className="text-2xs text-slate-500">Security Office: Main Gate Ext 204</p>
              </div>

              {/* QR Pattern visual */}
              <div className="w-20 h-20 border-2 border-slate-900 p-1 flex flex-col items-center justify-center text-center shrink-0">
                <QrCode className="w-14 h-14 text-slate-900" />
                <span className="text-3xs font-mono font-bold uppercase mt-0.5">SCAN TO VIEW</span>
              </div>
            </div>

            {/* Tear-off contact strips */}
            <div className="border-t-2 border-dashed border-slate-400 pt-4">
              <p className="text-3xs text-center text-slate-400 mb-2 uppercase font-mono tracking-widest">
                — Tear-Off Slips —
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-3xs font-mono border-t border-slate-200 pt-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="border-r border-dashed border-slate-300 pr-1 last:border-none space-y-0.5">
                    <div className="font-bold truncate">{item.title}</div>
                    <div className="truncate text-slate-500">{item.contactEmailOrPhone}</div>
                    <div className="text-slate-400">Ref #{item.id.replace('item-', '')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
