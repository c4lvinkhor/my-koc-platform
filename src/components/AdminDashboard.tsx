// src/components/AdminDashboard.tsx
import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { KOC } from '../data/kocs';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedKOCs, setSelectedKOCs] = useState<Set<string>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);

  const allKOCs = useMemo(() => require('../data/kocs').kocs as KOC[], []);

  const filteredKOCs = useMemo(() => {
    return allKOCs.filter(koc => {
      if (search) {
        const q = search.toLowerCase();
        return koc.name.toLowerCase().includes(q) ||
          koc.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search]);

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

  const handleDeleteKOCs = () => {
    if (confirm(`Are you sure you want to delete ${selectedKOCs.size} KOCs? This cannot be undone.`)) {
      console.log('Deleting KOCs:', Array.from(selectedKOCs));
      setSelectedKOCs(new Set());
      alert('KOCs deleted successfully (demo mode)');
    }
  };

  const handleBulkEdit = () => {
    const kocList = allKOCs.filter(koc => selectedKOCs.has(koc.id));
    console.log('Bulk editing KOCs:', kocList);
    alert(`Bulk editing ${kocList.length} KOCs (demo mode)`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <header className="sticky top-0 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                <span className="font-display text-xl text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="font-display text-xl text-[var(--color-text-primary)]">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-[var(--color-text-muted)]">
                  KOC Management System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Add New KOC
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--color-surface-raised)] rounded-2xl p-8 max-w-2xl mx-4 border border-[var(--color-border)] max-h-[90vh] overflow-y-auto">
              <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-6">
                Add New KOC
              </h2>
              <div className="space-y-4">
                <p className="text-[var(--color-text-secondary)]">
                  Note: In this demo, KOCs are stored in the main data file. 
                  Admin functions like adding, editing, and deleting KOCs 
                  would require updating the `src/data/kocs.ts` file.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Current KOC Count</h3>
                  <p className="text-blue-700">Total KOCs: {allKOCs.length}</p>
                  <p className="text-blue-700">User can view all KOCs in the main database.</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-2">
                KOC Management
              </h2>
              <p className="text-[var(--color-text-muted)]">
                Manage all registered KOCs, edit details, and monitor performance
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
                placeholder="Search KOCs by name or ID..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          </div>
        </div>

        {selectedKOCs.size > 0 && (
          <div className="bg-[var(--color-surface-raised)] rounded-2xl border border-[var(--color-border)] p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                <span className="text-white text-sm font-bold">{selectedKOCs.size}</span>
              </div>
              <span className="text-[var(--color-text-secondary)]">
                KOC(s) selected
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBulkEdit}
                className="px-4 py-2 rounded-lg bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
              >
                Bulk Edit
              </button>
              <button
                onClick={handleDeleteKOCs}
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredKOCs.map((koc) => (
            <div key={koc.id} className="relative group">
              <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={koc.image}
                    alt={koc.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-[var(--color-text-primary)] mb-1">
                    {koc.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">
                    {koc.handle} • {koc.daerah}, {koc.negeri}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {koc.platforms.join(', ')}
                    </span>
                    <button
                      onClick={() => toggleKOCSelection(koc.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        selectedKOCs.has(koc.id)
                          ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                          : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
                      }`}
                    >
                      {selectedKOCs.has(koc.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 left-2 flex gap-1">
                {koc.certified && (
                  <span className="px-2 py-1 rounded-full bg-[var(--color-accent)]/90 text-xs text-white font-medium">
                    Pro
                  </span>
                )}
                {koc.halalCertified && (
                  <span className="px-2 py-1 rounded-full bg-emerald-600/90 text-xs text-white font-medium">
                    Halal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredKOCs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[var(--color-text-secondary)]">No KOCs found</p>
          </div>
        )}
      </main>
    </div>
  );
}