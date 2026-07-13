// src/stores/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types/user';
import { BusinessProfile } from '../types/business';

interface UserState {
  // User state
  user: User | null;
  businessProfile: BusinessProfile | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setBusinessProfile: (profile: BusinessProfile) => void;
  updateUser: (updates: Partial<User>) => void;
  updateBusinessProfile: (updates: Partial<BusinessProfile>) => void;
  logout: () => void;
  upgradePlan: (plan: 'free' | 'starter' | 'growth') => void;
  loadFromStorage: () => void;
  
  // Feature access validation
  canAccessFeature: (feature: string) => boolean;
  
  // Usage tracking
  incrementKOCsFound: () => void;
  incrementPitchesGenerated: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      businessProfile: null,
      isLoading: false,
      
      // User actions
      setUser: (user) => set({ user, isLoading: false }),
      
      setBusinessProfile: (profile) => set({ businessProfile: profile }),
      
      updateUser: (updates) => set((state) => ({ 
        user: state.user ? { ...state.user, ...updates } : null 
      })),
      
      updateBusinessProfile: (updates) => set((state) => ({
        businessProfile: state.businessProfile ? { ...state.businessProfile, ...updates } : null
      })),
      
      logout: () => set({ user: null, businessProfile: null, isLoading: false }),
      
      // Plan upgrade
      upgradePlan: (plan) => set((state) => {
        if (!state.user) return {};
        return { 
          user: { 
            ...state.user, 
            plan,
            updatedAt: new Date().toISOString()
          } 
        };
      }),
      
      // Load from sessionStorage (persisted)
      loadFromStorage: () => {
        const stored = sessionStorage.getItem('user-store');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            set({
              user: parsed.state?.user || null,
              businessProfile: parsed.state?.businessProfile || null,
              isLoading: false,
            });
          } catch (error) {
            console.error('Failed to load user store from storage:', error);
          }
        }
      },
      
      // Feature access validation
      canAccessFeature: (feature) => {
        const { user } = get();
        if (!user) return false;
        
        const plan = user.plan;
        const features = {
          free: [
            'save-3-kocs',
            'generate-1-pitch', 
            'basic-filters'
          ],
          starter: [
            'unlimited-kocs',
            'generate-20-pitches',
            'advanced-filters',
            'download-csv',
            'all-details'
          ],
          growth: [
            'unlimited-kocs',
            'generate-100-pitches',
            'advanced-analytics',
            'custom-campaigns'
          ],
        };
        
        return features[plan]?.includes(feature) || false;
      },
      
      // Usage tracking
      incrementKOCsFound: () => set((state) => {
        if (!state.user) return {};
        return { 
          user: { 
            ...state.user, 
            kocsFound: state.user.kocsFound + 1
          } 
        };
      }),
      
      incrementPitchesGenerated: () => set((state) => {
        if (!state.user) return {};
        return { 
          user: { 
            ...state.user, 
            pitchesGenerated: state.user.pitchesGenerated + 1
          } 
        };
      }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        // Only persist essential data, not loading state
        const { isLoading, ...rest } = state;
        return rest;
      },
    }
  )
);