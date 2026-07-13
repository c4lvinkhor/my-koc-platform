import { useState, useEffect } from 'react';
import type { KOC } from '../data/kocs';

const FAVORITES_KEY = 'mykoc_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
          setFavorites(new Set(JSON.parse(saved)));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  const addFavorite = (koc: KOC) => {
    const newFavorites = new Set(favorites);
    newFavorites.add(koc.id);
    setFavorites(newFavorites);
    
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
    } catch (error) {
      console.error('Failed to save favorite:', error);
    }
  };

  const removeFavorite = (koc: KOC) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(koc.id);
    setFavorites(newFavorites);
    
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const toggleFavorite = (koc: KOC) => {
    if (favorites.has(koc.id)) {
      removeFavorite(koc);
    } else {
      addFavorite(koc);
    }
  };

  const isFavorite = (koc: KOC) => favorites.has(koc.id);

  const getFavoriteKOCs = (allKOCs: KOC[]) => {
    return allKOCs.filter(koc => favorites.has(koc.id));
  };

  const clearFavorites = () => {
    setFavorites(new Set());
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Failed to clear favorites:', error);
    }
  };

  const count = favorites.size;

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoriteKOCs,
    clearFavorites,
    count,
  };
}