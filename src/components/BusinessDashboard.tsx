// src/components/BusinessDashboard.tsx
import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import KOCCard from './KOCCard';
import { KOC } from '../data/kocs';

interface BusinessDashboardProps {
  profile: any;
  onSignOut: () => void;
}

export default function BusinessDashboard({ profile, onSignOut }: BusinessDashboardProps) {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedKOCs, setSelectedKOCs] = useState<Set<string>>(new Set());
  const [showGenerated, setShowGenerated] = useState(false);

  const allKOCs = useMemo(() => require('../data/kocs').kocs as KOC[], []);

  const filteredKOCs = useMemo(() => {
    return allKOCs.filter(koc => {
      if (search) {
        const q = search.toLowerCase();
        return koc.name.toLowerCase().includes(q) ||
          koc.handle.toLowerCase().includes(q) ||
          koc.bio[lang].toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, lang]);

  const selectedKOCObjects = useMemo(() => {
    return allKOCs.filter(koc => selectedKOCs.has(koc.id));
  }, [selectedKOCs, allKOCs]);

  const toggleKOCSelection = (kocId: string) => {
    setSelectedKOCs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(kocId)) {
        newSet.delete(kocId);
      } else {
        newSet.add(kocId);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedKOCs(new Set());
  };

  const handleGenerateProposal = (koc: KOC) => {
    console.log('Generating proposal for:', koc.name);
    setShowGenerated(true);
    setTimeout(() => {
      alert(`Proposal generated for ${koc.name}! Check your dashboard for the complete document.`);
      setShowGenerated(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <header className="sticky top-0 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                <span className="font-display text-xl text-white font-bold">M</span>
              </div>
              <div>
                <h1 className="font-display text-xl text-[var(--color-text-primary)]">
                  Welcome back, {profile?.businessName?.split(' ')[0]}!
                </h1>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Plan: <span className="font-semibold text-[var(--color-accent)] capitalize">{profile?.plan}</span>
                  {profile?.plan !== 'free' && ` • $${profile?.plan === 'starter' ? '29' : '99'} / month`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onSignOut}
                className="px-4 py-2 rounded-lg bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {showGenerated && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--color-surface-raised)] rounded-2xl p-8 max-w-2xl mx-4 border border-[var(--color-border)]">
              <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-4">
                Proposal Generated!
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Your AI-generated proposal is ready. Check your dashboard for the complete document.
              </p>
              <button
                onClick={() => setShowGenerated(false)}
                className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-6 sticky top-24">
              <h3 className="font-display text-lg text-[var(--color-text-primary)] mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20"
                >
                  Generate New Proposal
                </button>
                <button
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-raised)] transition-all duration-300"
                >
                  View Generated Proposals
                </button>
                <button
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-raised)] transition-all duration-300"
                >
                  Manage Campaign
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <h4 className="font-display text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
                  Usage This Month
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)]">Pitches Generated</span>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {profile?.plan === 'free' ? 2 : profile?.plan === 'starter' ? 8 : 27}/{(profile?.plan === 'free' ? 1 : profile?.plan === 'starter' ? 20 : 100)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--color-surface-overlay)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent)]"
                        style={{ width: `${((profile?.plan === 'free' ? 2 : profile?.plan === 'starter' ? 8 : 27) / (profile?.plan === 'free' ? 1 : profile?.plan === 'starter' ? 20 : 100)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)]">KOCs Saved</span>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {profile?.plan === 'free' ? 2 : '∞'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-2">
                    Discover KOCs
                  </h2>
                  <p className="text-[var(--color-text-muted)]">
                    Search and select KOCs for your campaign
                  </p>
                </div>
                <div className="relative max-w-md">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, handle, or industry..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              </div>
            </div>

            {selectedKOCObjects.length > 0 && (
              <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg text-[var(--color-text-primary)]">
                    Selected KOCs ({selectedKOCObjects.length})
                  </h3>
                  <button
                    onClick={clearSelection}
                    className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedKOCObjects.map((koc) => (
                    <div key={koc.id} className="relative">
                      <KOCCard
                        koc={koc}
                        index={0}
                        onSelect={() => toggleKOCSelection(koc.id)}
                        onViewProfile={() => {}}
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <button
                    onClick={() => handleGenerateProposal(selectedKOCObjects[0])}
                    className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-base hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20"
                  >
                    Generate Proposal for Selected KOC
                  </button>
                </div>
              </div>
            )}

            <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-[var(--color-text-primary)]">
                  KOC Discovery
                </h3>
                <div className="text-sm text-[var(--color-text-muted)]">
                  {filteredKOCs.length} results found
                </div>
              </div>

              {filteredKOCs.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredKOCs.map((koc, i) => (
                    <div key={koc.id} className="relative">
                      <KOCCard
                        koc={koc}
                        index={i}
                        onSelect={() => toggleKOCSelection(koc.id)}
                        onViewProfile={() => {}}
                      />
                      {selectedKOCs.has(koc.id) && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">No KOCs found. Try adjusting your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}