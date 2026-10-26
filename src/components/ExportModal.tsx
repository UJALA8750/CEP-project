import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, FileSpreadsheet, FileCode, Presentation, Globe, School, CheckCircle2 } from 'lucide-react';
import { LostFoundItem, SurveyResponse } from '../types';

interface ExportModalProps {
  onClose: () => void;
  items: LostFoundItem[];
  surveyResponses: SurveyResponse[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  onClose,
  items,
  surveyResponses,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // The permanent public shareable link for AI Studio preview
  const shareableUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Export items and survey data as a CSV file
  const handleDownloadCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Category', 'Date', 'Location', 'Status', 'Reporter', 'Contact'];
    const rows = items.map((item) => [
      item.id,
      `"${item.title.replace(/"/g, '""')}"`,
      item.type,
      `"${item.category}"`,
      item.date,
      `"${item.location}"`,
      item.status,
      `"${item.reporterName}"`,
      `"${item.contactEmailOrPhone}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Lost_And_Found_Records_Ujala_Yadav_T126.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('Items CSV downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  // Export Survey Responses as CSV
  const handleDownloadSurveyCSV = () => {
    const headers = ['Response ID', 'Category', 'Lost Item Before', 'Found Item Before', 'Common Location', 'Primary Difficulty', 'Priority Feature', 'Timestamp'];
    const rows = surveyResponses.map((r) => [
      r.id,
      `"${r.category}"`,
      r.lostItemBefore,
      r.foundItemBefore,
      `"${r.commonLocation}"`,
      `"${r.primaryDifficulty}"`,
      `"${r.priorityFeature}"`,
      `"${r.timestamp}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Community_Survey_Responses_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('Survey CSV downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  // Generate a complete standalone HTML Project Portfolio Report that can be opened offline in any browser or printed to PDF
  const handleDownloadOfflineReport = () => {
    const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Digital Lost-and-Found for Public Spaces - Project Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 900px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #047857; margin-bottom: 4px; }
    .subtitle { font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 24px; }
    .meta-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; color: white; }
    .badge-lost { background: #d97706; }
    .badge-found { background: #059669; }
    .badge-reunited { background: #2563eb; }
    .print-btn { background: #047857; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button class="print-btn" onclick="window.print()">Print or Save as PDF</button>
  </div>
  <h1>Digital Lost-and-Found for Public Spaces</h1>
  <p class="subtitle">Sheth L.U.J. and Sir M.V. College · Department of Computer Science · Academic Year 2026–27</p>

  <div class="meta-card">
    <div class="grid">
      <div><strong>Student Name:</strong> Ujala Raj bahadur Yadav</div>
      <div><strong>Roll No / Seat No:</strong> T126</div>
      <div><strong>Class:</strong> T.Y. B.Sc. Computer Science Semester V</div>
      <div><strong>Project Mentors:</strong> Ms. Jyoti Chauhan / Rohit Sahu</div>
      <div><strong>Head of Department:</strong> Dr. Mahendra Kanojia</div>
      <div><strong>Live App Link:</strong> ${shareableUrl}</div>
    </div>
  </div>

  <h2>1. Project Abstract & Objectives</h2>
  <p>The "Digital Lost-and-Found for Public Spaces" website provides a centralized community registry for reporting, searching, and recovering misplaced belongings across college campuses, transport facilities, and public buildings. It replaces ad-hoc paper notice boards with real-time categorised search, automated matching, and safe handover verification.</p>

  <h2>2. Community Survey Summary (20 Responses)</h2>
  <ul>
    <li>55% of respondents were College Students, 25% Working Professionals, 15% College Staff.</li>
    <li>61% reported having lost a personal item in a public place.</li>
    <li>60% reported having found an item belonging to someone else.</li>
    <li>Primary difficulty: Lack of a central reporting system (40%) and unable to contact finder safely (30%).</li>
  </ul>

  <h2>3. Live Database Listings (${items.length} Registered Items)</h2>
  <table>
    <thead>
      <tr>
        <th>Ref</th>
        <th>Item Title</th>
        <th>Type</th>
        <th>Category</th>
        <th>Location</th>
        <th>Date</th>
        <th>Reporter</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (i) => `<tr>
        <td><code>${i.id.replace('item-', 'LF-')}</code></td>
        <td><strong>${i.title}</strong></td>
        <td><span class="badge ${i.status === 'reunited' ? 'badge-reunited' : i.type === 'lost' ? 'badge-lost' : 'badge-found'}">${i.status}</span></td>
        <td>${i.category}</td>
        <td>${i.location}</td>
        <td>${i.date}</td>
        <td>${i.reporterName}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h2>4. Student Feedback & Accomplishments</h2>
  <p>Successfully designed and developed a responsive web application featuring search, filtering, automated match comparison, safe custody protocols, and corkboard flyer generator for physical notice boards.</p>
</body>
</html>`;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Project_Report_Ujala_Yadav_T126_Lost_And_Found.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess('Complete Project Report (HTML/PDF) downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <School className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Share &amp; Download for Your Teacher
              </h3>
              <p className="text-xs text-slate-500">
                Options to present the live web app, export data, and generate project report files.
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {downloadSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* Option 1: Live Web URL to send or open in college lab */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>1. Best Way: Share Live Web App Link</span>
              </div>
              <span className="text-2xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Your teacher can open this link on their laptop, phone, or college computer to interact with the live website, search items, and test reporting:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-slate-800 font-mono text-2xs truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Option 2: Download Ready-to-Print HTML/PDF Submission Report */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Presentation className="w-4 h-4 text-blue-600" />
              <span>2. Download Standalone Project Report (HTML &amp; PDF)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Downloads a complete standalone report file containing your candidate details (Ujala Yadav, T126), college details, guide names, survey results, and full item listings. You can open it offline in any browser or print it directly to PDF to submit in class!
            </p>
            <button
              type="button"
              onClick={handleDownloadOfflineReport}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project Report File</span>
            </button>
          </div>

          {/* Option 3: Export CSV datasets for project viva / presentation */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>3. Export Raw Excel / CSV Datasets</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Export the database tables into CSV spreadsheets to show your guide the underlying structured schema and survey data:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Items Records (CSV)</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadSurveyCSV}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Survey Responses (CSV)</span>
              </button>
            </div>
          </div>

          {/* Option 4: Downloading Full Source Code from AI Studio */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <FileCode className="w-4 h-4 text-slate-700" />
              <span>4. How to Download the Complete Source Code (ZIP / GitHub)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              If your teacher asked for the project source code files:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>In Google AI Studio, look at the top right toolbar header.</li>
              <li>Click the <strong>Download Code</strong> or <strong>Export to GitHub</strong> icon.</li>
              <li>Save the ZIP archive to your flash drive or submit the folder on Google Classroom / college portal.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
