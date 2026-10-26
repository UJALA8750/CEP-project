export type ItemType = 'lost' | 'found';
export type ItemStatus = 'lost' | 'found' | 'reunited';

export interface LostFoundItem {
  id: string;
  title: string;
  type: ItemType;
  status: ItemStatus;
  category: string;
  date: string;
  location: string;
  description: string;
  reporterName: string;
  contactMethod: string;
  contactEmailOrPhone: string;
  handoverLocation?: string;
  imageUrl?: string;
  verificationQuestion?: string;
  createdAt: string;
  flagCount?: number;
  flagReasons?: string[];
}

export interface SurveyResponse {
  id: string;
  category: 'College student' | 'Working professional' | 'Teacher or college staff' | 'Other';
  lostItemBefore: 'Yes' | 'No';
  foundItemBefore: 'Yes' | 'No';
  commonLocation: string;
  primaryDifficulty: string;
  priorityFeature: string;
  timestamp: string;
}
