// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
  plan: 'free' | 'starter' | 'growth';
  kocsFound: number;
  pitchesGenerated: number;
  lastActivity?: string;
  trialEndsAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'starter' | 'growth';
  status: 'active' | 'past_due' | 'canceled';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  kocLimit: number;
  pitchGenerationLimit: number;
  advancedAnalytics: boolean;
  popular?: boolean;
}