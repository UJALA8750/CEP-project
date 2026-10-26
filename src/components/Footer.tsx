import React from 'react';
import { ShieldCheck, BookOpen, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSafety: () => void;
  onOpenSurvey: () => void;
  onOpenExport: () => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSafety,
  onOpenSurvey,
  onOpenExport,
  onResetData,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Digital Lost &amp; Found for Public Spaces
            </span>
            <p className="text-xs text-slate-500">
              Community Engagement Project · Sheth L.U.J. and Sir M.V. College
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-5 text-xs text-slate-600 font-medium">
            <button
              type="button"
              onClick={onOpenExport}
              className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
            >
              Export / Show Teacher
            </button>
            <button
              type="button"
              onClick={onOpenSafety}
              className="hover:text-emerald-700 transition-colors"
            >
              Safe Handover Rules
            </button>
            <button
              type="button"
              onClick={onOpenSurvey}
              className="hover:text-emerald-700 transition-colors"
            >
              Research &amp; Survey
            </button>
            <button
              type="button"
              onClick={onResetData}
              className="hover:text-rose-600 transition-colors"
            >
              Reset Demo Records
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Project Developed by <strong>Ujala Raj bahadur Yadav</strong> (Roll No. T126) · Guidance by <strong>Ms. Jyoti Chauhan</strong> &amp; <strong>Rohit Sahu</strong>
          </p>
          <p className="font-mono tabular-nums text-2xs text-slate-400">
            Academic Year 2026–27 · Semester V
          </p>
        </div>
      </div>
    </footer>
  );
};
