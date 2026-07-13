import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types/user';
import type { BusinessProfile } from '../types/business';

interface UserContextType {
  user: User | null;
  businessProfile: BusinessProfile | null;
  setUser: (u: User) => void;
  setBusinessProfile: (p: BusinessProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [businessProfile, setBusinessProfileState] = useState<BusinessProfile | null>(null);

  const setUser = useCallback((u: User) => setUserState(u), []);
  const setBusinessProfile = useCallback((p: BusinessProfile) => setBusinessProfileState(p), []);

  const logout = useCallback(() => {
    localStorage.removeItem('perak-koc-user');
    setUserState(null);
    setBusinessProfileState(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, businessProfile, setUser, setBusinessProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
