import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Image as ImageIcon, MapPin, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { LostFoundItem, ItemType } from '../types';
import { CATEGORIES, LOCATIONS } from '../data/initialData';

interface ReportModalProps {
  initialType: ItemType;
  onClose: () => void;
  onSubmit: (item: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>) => void;
  existingItems: LostFoundItem[];
}

export const ReportModal: React.FC<ReportModalProps> = ({
  initialType,
  onClose,
  onSubmit,
  existingItems,
}) => {
  const [itemType, setItemType] = useState<ItemType>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Wallets & Bags');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState<string>('Library');
  const [customLocation, setCustomLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [contactMethod, setContactMethod] = useState('Email / Student ID');
  const [contactEmailOrPhone, setContactEmailOrPhone] = useState('');
  const [handoverLocation, setHandoverLocation] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [selectedImagePreset, setSelectedImagePreset] = useState<string>('/src/assets/images/item_blue_backpack_1793054483273.jpg');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preset available images from our asset generation
  const PRESET_IMAGES = [
    { label: 'Blue Backpack', url: '/src/assets/images/item_blue_backpack_1793054483273.jpg' },
    { label: 'Black Wallet', url: '/src/assets/images/item_black_wallet_1793054483616.jpg' },
    { label: 'Key Ring & Fob', url: '/src/assets/images/item_keychain_keys_1793054484317.jpg' },
    { label: 'AirPods / Earbuds', url: '/src/assets/images/item_white_airpods_1793054483806.jpg' },
    { label: 'Campus Belongings Flatlay', url: '/src/assets/images/hero_lost_found_items_1793054481724.jpg' },
  ];

  // Smart Live Match Detection
  const potentialMatches = existingItems.filter((i) => {
    // Only match against opposite type
    if (i.type === itemType || i.status === 'reunited') return false;
    const sameCat = i.category === category;
    const titleMatch = title.trim().length > 2 && i.title.toLowerCase().includes(title.toLowerCase().trim());
    return sameCat || titleMatch;
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Item title is required';
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Please provide at least 10 characters describing the item';
    }
    if (!reporterName.trim()) newErrors.reporterName = 'Your name is required';
    if (!contactEmailOrPhone.trim()) {
      newErrors.contactEmailOrPhone = 'Contact email or phone number is required';
    }
    if (itemType === 'found' && !handoverLocation.trim()) {
      newErrors.handoverLocation = 'Please specify where this item is currently stored or handed over';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalLocation = location === 'Custom' ? customLocation : location;
    const finalImage = customImageUrl.trim() || selectedImagePreset;

    onSubmit({
      title: title.trim(),
      type: itemType,
      category,
      date,
      location: finalLocation || 'General Public Campus',
      description: description.trim(),
      reporterName: reporterName.trim(),
      contactMethod,
      contactEmailOrPhone: contactEmailOrPhone.trim(),
      handoverLocation: itemType === 'found' ? handoverLocation.trim() : undefined,
      verificationQuestion: verificationQuestion.trim() || undefined,
      imageUrl: finalImage,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {itemType === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}
            </h3>
            <p className="text-xs text-slate-500">
              {itemType === 'lost'
                ? 'Fill in item details so anyone who finds it can notify you safely.'
                : 'Help reunite this belonging with its rightful owner.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="px-6 pt-4 pb-2 bg-slate-50/50 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/80 rounded-lg">
            <button
              type="button"
              onClick={() => setItemType('lost')}
              className={`py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                itemType === 'lost'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>I Lost Something</span>
            </button>
            <button
              type="button"
              onClick={() => setItemType('found')}
              className={`py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                itemType === 'found'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Found Something</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Smart Live Match Alert (if counterparts exist) */}
          {potentialMatches.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>
                  Quick Match Hint: We found {potentialMatches.length} existing{' '}
                  {itemType === 'lost' ? 'Found' : 'Lost'} listing in "{category}"!
                </span>
              </div>
              <p className="text-emerald-800">
                Before submitting, check if someone has already listed this: <strong>{potentialMatches[0].title}</strong> ({potentialMatches[0].location}).
              </p>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Item Name / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Navy Blue Backpack, iPhone 13, Wallet"
                className={`w-full px-3 py-2 text-xs sm:text-sm bg-white border rounded-lg text-slate-900 ${
                  errors.title ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.title && <p className="text-2xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-emerald-500"
              >
                {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Date {itemType === 'lost' ? 'Lost' : 'Found'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-emerald-500 font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Location <span className="text-rose-500">*</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-emerald-500"
              >
                {LOCATIONS.filter((l) => l !== 'All Locations').map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
                <option value="Custom">Other (Specify manually)...</option>
              </select>
              {location === 'Custom' && (
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Specify building, floor, room or street..."
                  className="mt-2 w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              )}
            </div>
          </div>

          {/* Handover location for Found Items */}
          {itemType === 'found' && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
              <label className="block text-xs font-semibold text-emerald-950">
                Where is the item currently kept? <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={handoverLocation}
                onChange={(e) => setHandoverLocation(e.target.value)}
                placeholder="e.g. Handed over to Campus Gate 1 Security Desk, or Kept with Library Supervisor"
                className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-slate-900 ${
                  errors.handoverLocation ? 'border-rose-400' : 'border-emerald-300'
                }`}
              />
              <p className="text-2xs text-emerald-800">
                Tip: Leaving found items at the official Security Office or Reception ensures safety for both parties.
              </p>
              {errors.handoverLocation && (
                <p className="text-2xs text-rose-500">{errors.handoverLocation}</p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe color, size, brand, stickers, condition, and any distinguishing markings..."
              className={`w-full px-3 py-2 text-xs sm:text-sm bg-white border rounded-lg text-slate-900 ${
                errors.description ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-emerald-500'
              }`}
            />
            {errors.description && <p className="text-2xs text-rose-500 mt-1">{errors.description}</p>}
          </div>

          {/* Ownership Verification Question (Proof of Ownership) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Proof of Ownership Verification (Recommended)</span>
            </div>
            <p className="text-2xs text-slate-500 leading-relaxed">
              Add a question that only the true owner would know, to verify legitimacy and prevent false claims.
            </p>
            <input
              type="text"
              value={verificationQuestion}
              onChange={(e) => setVerificationQuestion(e.target.value)}
              placeholder="e.g. What is the photo wallpaper on the lockscreen? What color is the zipper keychain?"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          {/* Photo Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800">
              Select or Upload Photo
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => {
                    setSelectedImagePreset(preset.url);
                    setCustomImageUrl('');
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImagePreset === preset.url && !customImageUrl
                      ? 'border-emerald-600 ring-2 ring-emerald-200'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-2xs text-slate-500">
              Choose an archetype photo above, or paste an image URL below:
            </p>
            <input
              type="text"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Optional direct image URL (https://...)"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          {/* Reporter Information */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Full name or Roll number"
                className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-slate-900 ${
                  errors.reporterName ? 'border-rose-400' : 'border-slate-300'
                }`}
              />
              {errors.reporterName && <p className="text-2xs text-rose-500 mt-1">{errors.reporterName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Preferred Contact Method <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={contactEmailOrPhone}
                onChange={(e) => setContactEmailOrPhone(e.target.value)}
                placeholder="Email or Phone (e.g. rahul@student.edu or +91 98...)"
                className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-slate-900 ${
                  errors.contactEmailOrPhone ? 'border-rose-400' : 'border-slate-300'
                }`}
              />
              {errors.contactEmailOrPhone && (
                <p className="text-2xs text-rose-500 mt-1">{errors.contactEmailOrPhone}</p>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-2xs text-slate-400">
              * Required fields. Stored securely in your session.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 text-xs font-bold text-white rounded-lg shadow-sm transition-colors ${
                  itemType === 'lost' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Submit {itemType === 'lost' ? 'Lost' : 'Found'} Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
