// src/hooks/useAuth.ts — simplified localStorage-based auth
import { useState, useEffect } from 'react';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  photoURL: string;
  plan: string;
  kocsFound: number;
  pitchesGenerated: number;
  lastActivity: string;
}

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('perak-koc-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('perak-koc-user');
      }
    }
    setLoading(false);
  }, []);

  return { user, loading };
}