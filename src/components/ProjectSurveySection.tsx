import React, { useState } from 'react';
import { BookOpen, BarChart3, Users, MapPin, CheckCircle, HelpCircle, FileText, Send, Sparkles, AlertCircle, Award } from 'lucide-react';
import { SurveyResponse } from '../types';

interface ProjectSurveySectionProps {
  responses: SurveyResponse[];
  onAddResponse: (response: Omit<SurveyResponse, 'id' | 'timestamp'>) => void;
}

export const ProjectSurveySection: React.FC<ProjectSurveySectionProps> = ({
  responses,
  onAddResponse,
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'participate' | 'academic'>('insights');

  // Form states for user taking the community survey
  const [userCategory, setUserCategory] = useState<SurveyResponse['category']>('College student');
  const [lostBefore, setLostBefore] = useState<'Yes' | 'No'>('Yes');
  const [foundBefore, setFoundBefore] = useState<'Yes' | 'No'>('Yes');
  const [commonLoc, setCommonLoc] = useState('College or school');
  const [difficulty, setDifficulty] = useState('No central place to report it');
  const [feature, setPriorityFeature] = useState('Report a lost item');
  const [submitted, setSubmitted] = useState(false);

  // Computed survey stats
  const total = responses.length;
  const studentCount = responses.filter((r) => r.category === 'College student').length;
  const workingCount = responses.filter((r) => r.category === 'Working professional').length;
  const staffCount = responses.filter((r) => r.category === 'Teacher or college staff').length;

  const lostYes = responses.filter((r) => r.lostItemBefore === 'Yes').length;
  const foundYes = responses.filter((r) => r.foundItemBefore === 'Yes').length;

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    onAddResponse({
      category: userCategory,
      lostItemBefore: lostBefore,
      foundItemBefore: foundBefore,
      commonLocation: commonLoc,
      primaryDifficulty: difficulty,
      priorityFeature: feature,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('insights');
    }, 2000);
  };

  return (
    <section id="project-survey-section" className="bg-slate-100/70 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Community Engagement Project (CEP) · Academic Year 2026-27</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Research &amp; Field Survey Insights
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Conducted by <strong>Ujala Raj bahadur Yadav</strong> (Roll No. T126, T.Y. B.Sc. Computer Science Semester V, Sheth L.U.J. and Sir M.V. College) under the guidance of Ms. Jyoti Chauhan &amp; Rohit Sahu.
            </p>
          </div>

          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'insights'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Survey Data ({total})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('participate')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'participate'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Take Survey
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'academic'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Overview
            </button>
          </div>
        </div>

        {/* Tab 1: Survey Insights & Charts */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Total Respondents
                </span>
                <span className="text-2xl font-black text-slate-900 font-mono tabular-nums block mt-1">
                  {total}
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  Primary community sample
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Have Lost An Item
                </span>
                <span className="text-2xl font-black text-amber-600 font-mono tabular-nums block mt-1">
                  {Math.round((lostYes / total) * 100)}%
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {lostYes} of {total} respondents
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Have Found An Item
                </span>
                <span className="text-2xl font-black text-emerald-600 font-mono tabular-nums block mt-1">
                  {Math.round((foundYes / total) * 100)}%
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {foundYes} of {total} respondents
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Top Pain Point
                </span>
                <span className="text-base font-bold text-slate-900 block mt-1 line-clamp-1">
                  No Central System
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  40% lack common channel
                </span>
              </div>
            </div>

            {/* Visual Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Respondent Demographics */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Respondent Breakdown</span>
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>College Students</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {studentCount} ({Math.round((studentCount / total) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${(studentCount / total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Working Professionals</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {workingCount} ({Math.round((workingCount / total) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(workingCount / total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span>Teachers &amp; College Staff</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {staffCount} ({Math.round((staffCount / total) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-600 h-2 rounded-full"
                        style={{ width: `${(staffCount / total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Locations */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Misplacement Locations</span>
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>College Campus &amp; Classrooms</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">30%</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Shopping Areas &amp; Markets</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">30%</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Public Transport (Buses, Trains)</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">25%</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Public Parks &amp; Open Areas</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">10%</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Offices &amp; Workplaces</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">5%</span>
                  </div>
                </div>
              </div>

              {/* Field Study Notice Board Note */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Appendix C: Field Observation</span>
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1.5 font-sans">
                  <p className="font-semibold text-slate-800">
                    Campus Gate 1 Bulletin Board Inspection:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li>Observed physical posters: "KEEP YOUR BELONGINGS SAFE" and "LOST &amp; FOUND".</li>
                    <li>Handwritten notes were easily rained on, torn down, or overlooked.</li>
                    <li>Students reported having no idea who picked up their lost items or where to check.</li>
                  </ul>
                </div>
                <p className="text-2xs text-emerald-800 font-medium">
                  Conclusion: A digital web platform directly solves the scattered communication barrier.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Community Survey Form */}
        {activeTab === 'participate' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Community Experience Survey
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Share your experience to help validate community lost-and-found patterns. This updates our live statistics in your session.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Response Recorded Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Your feedback has been added to the dataset and reflected in the live charts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitSurvey} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    1. Which category do you belong to?
                  </label>
                  <select
                    value={userCategory}
                    onChange={(e) => setUserCategory(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="College student">College student</option>
                    <option value="Working professional">Working professional</option>
                    <option value="Teacher or college staff">Teacher or college staff</option>
                    <option value="Other">Other Community Member</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      2. Have you ever lost an item in a public space?
                    </label>
                    <select
                      value={lostBefore}
                      onChange={(e) => setLostBefore(e.target.value as any)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      3. Have you ever found an item belonging to someone?
                    </label>
                    <select
                      value={foundBefore}
                      onChange={(e) => setFoundBefore(e.target.value as any)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    4. Where do people most commonly lose belongings?
                  </label>
                  <select
                    value={commonLoc}
                    onChange={(e) => setCommonLoc(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="College or school">College campus or classroom</option>
                    <option value="Public transport">Public transport (bus, train)</option>
                    <option value="Shopping area or market">Shopping area or market</option>
                    <option value="Park or public place">Park or open recreation ground</option>
                    <option value="Office or workplace">Office or workplace</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    5. Biggest difficulty in recovering lost items:
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="No central place to report it">No central place to report it</option>
                    <option value="Cannot contact the finder or owner">Cannot contact the finder or owner</option>
                    <option value="Do not know where to search">Do not know where to search</option>
                    <option value="Concern about false claims or scams">Concern about false claims or scams</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Response</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Academic Overview & Literature Review */}
        {activeTab === 'academic' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Academic Credentials &amp; Mentorship
                </h4>
                <div className="space-y-1.5">
                  <p><strong>Candidate:</strong> Ujala Raj bahadur Yadav (Roll No. T126)</p>
                  <p><strong>Program:</strong> T.Y. B.Sc. Computer Science Semester V (2026–27)</p>
                  <p><strong>Institution:</strong> Sheth L.U.J. and Sir M.V. College, Mumbai</p>
                  <p><strong>Internal Guides:</strong> Ms. Jyoti Chauhan / Rohit Sahu</p>
                  <p><strong>Head of Department:</strong> Dr. Mahendra Kanojia</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Key Literature Citations
                </h4>
                <div className="space-y-2">
                  <p>
                    <strong>1. Zhou et al. (2024):</strong> <em>"LostNet: A Smart Way for Lost and Find."</em> PLOS ONE, 19(10). Exploring image-matching techniques and multi-feature comparison.
                  </p>
                  <p>
                    <strong>2. Nor Azmi et al. (2025):</strong> <em>"Find-It Mall: A Web-Based Lost and Found Management System for Retail Environments."</em> IJIRSS. Focusing on claim management and staff administration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
              <h5 className="font-bold text-slate-900">Project Objectives Met:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-2xs">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Centralized reporting for lost &amp; found items</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Multi-criteria search &amp; category filtering</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated match comparison engine</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Safe communication &amp; proof of ownership checks</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Suspicious listing reporting &amp; spam mitigation</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Printable notice board flyer with QR code generator</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
