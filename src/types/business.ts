// src/types/business.ts
export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  industry: string;
  description: string;
  website?: string;
  logo?: string;
  contactPerson: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  rating: number;
  totalDeals: number;
  revenue?: number;
  isActive: boolean;
  plan: 'free' | 'starter' | 'growth';
  trialEndsAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPlan {
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  kocLimit: number;
  pitchGenerationLimit: number;
  advancedAnalytics: boolean;
}

export const USER_PLANS: Record<'free' | 'starter' | 'growth', UserPlan> = {
  free: {
    name: 'Free',
    price: 0,
    currency: 'USD',
    period: 'month',
    features: [
      'Save up to 3 KOCs in favorites',
      'Generate 1 AI pitch per week',
      'Basic KOC search and filters'
    ],
    kocLimit: 3,
    pitchGenerationLimit: 1,
    advancedAnalytics: false
  },
  starter: {
    name: 'Starter',
    price: 29,
    currency: 'USD',
    period: 'month',
    features: [
      'Save unlimited KOCs in favorites',
      'Generate 20 AI pitches per month',
      'Advanced KOC filters (region, platform, audience)',
      'Download KOC lists CSV',
      'Access to all KOC details and analytics'
    ],
    kocLimit: -1,
    pitchGenerationLimit: 20,
    advancedAnalytics: true
  },
  growth: {
    name: 'Growth',
    price: 99,
    currency: 'USD',
    period: 'month',
    features: [
      'All Starter features',
      'White-label AI pitch generation',
      'Priority KOC discovery support',
      'Custom campaign management',
      'Advanced analytics dashboard'
    ],
    kocLimit: -1,
    pitchGenerationLimit: 100,
    advancedAnalytics: true
  }
};