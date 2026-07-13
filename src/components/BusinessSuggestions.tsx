// src/components/BusinessSuggestions.tsx
import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { KOC } from '../data/kocs';

interface BusinessSuggestionsProps {
  industry: string;
  onSelectSuggestion: (name: string) => void;
}

export default function BusinessSuggestions({ industry, onSelectSuggestion }: BusinessSuggestionsProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const businessNames = useMemo(() => {
    const allKOCs = require('../data/kocs').kocs as KOC[];
    const names = new Set<string>();
    
    allKOCs.forEach(koc => {
      if (koc.category === industry) {
        names.add(koc.name);
        if (koc.pastBrands) {
          koc.pastBrands.forEach(brand => names.add(brand));
        }
      }
    });
    
    return Array.from(names)
      .filter(name => name.toLowerCase().includes(industry.toLowerCase()) || search === '' || name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 10);
  }, [industry, search]);

  return (
    <div className="mt-6">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search for {industry} business names...`}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </div>

      {businessNames.length > 0 && (
        <div className="mt-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">
            Business Name Suggestions
          </h4>
          <div className="grid gap-2">
            {businessNames.map((name, index) => (
              <button
                key={index}
                onClick={() => onSelectSuggestion(name)}
                className="text-left p-3 rounded-lg bg-[var(--color-surface-raised)] hover:bg-[var(--color-accent)]/10 transition-colors"
              >
                <span className="text-[var(--color-text-secondary)]">💡</span>
                <span className="ml-2 text-sm text-[var(--color-text-primary)]">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}