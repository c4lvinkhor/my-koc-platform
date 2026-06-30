import { useState, useMemo } from 'react';

export interface Filters {
  negeri: string[];
  daerah: string[];
  platform: string[];
  audience: string[];
  halal: boolean | null;
  search: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  negeriList: string[];
  negeriToDaerahs: Record<string, string[]>;
  platforms: string[];
  audiences: string[];
  t: (key: string) => string;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[var(--color-border)] pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-widest">{title}</span>
        <svg
          className={`w-3.5 h-3.5 text-[var(--color-text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && children}
    </div>
  );
}

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

function MultiSelect({ options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={options.length === 0}
        className="w-full px-3 py-2.5 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-left text-sm flex items-center justify-between hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-50"
      >
        <span className={selected.length > 0 ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>
          {selected.length === 0
            ? placeholder
            : selected.length === 1
              ? selected[0]
              : `${selected.length} selected`}
        </span>
        <svg className={`w-3.5 h-3.5 text-[var(--color-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && options.length > 0 && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {selected.length > 0 && (
              <button
                onClick={() => { onChange([]); setOpen(false); }}
                className="w-full px-3 py-2 text-left text-xs text-[var(--color-accent)] hover:bg-[var(--color-surface-overlay)] border-b border-[var(--color-border)]"
              >
                Clear all
              </button>
            )}
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-[var(--color-surface-overlay)] transition-colors ${
                  selected.includes(opt) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                  selected.includes(opt) ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'border-[var(--color-border)]'
                }`}>
                  {selected.includes(opt) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FilterSidebar({ filters, onFiltersChange, negeriList, negeriToDaerahs, platforms, audiences, t }: FilterSidebarProps) {
  const allFiltersEmpty = filters.negeri.length === 0 && filters.daerah.length === 0 && filters.platform.length === 0 && filters.audience.length === 0 && filters.halal === null;

  const availableDaerahs = useMemo(() => {
    if (filters.negeri.length === 0) {
      return Object.values(negeriToDaerahs).reduce<string[]>((acc, d) => acc.concat(d), []);
    }
    return filters.negeri.reduce<string[]>((acc, n) => acc.concat(negeriToDaerahs[n] || []), []);
  }, [filters.negeri, negeriToDaerahs]);

  const handleNegeriChange = (negeri: string[]) => {
    const newAvailableDaerahs = negeri.reduce<string[]>((acc, n) => acc.concat(negeriToDaerahs[n] || []), []);
    const validDaerah = filters.daerah.filter(d => newAvailableDaerahs.includes(d));
    onFiltersChange({ ...filters, negeri, daerah: validDaerah });
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-28">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-[var(--color-text-primary)]">{t('filters_title')}</h3>
          {!allFiltersEmpty && (
            <button
              onClick={() => onFiltersChange({ negeri: [], daerah: [], platform: [], audience: [], halal: null, search: filters.search })}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              {t('filter_clear')}
            </button>
          )}
        </div>

        <FilterSection title={t('filter_negeri')}>
          <MultiSelect
            options={negeriList}
            selected={filters.negeri}
            onChange={handleNegeriChange}
            placeholder={t('filter_negeri')}
          />
        </FilterSection>

        <FilterSection title={t('filter_daerah')}>
          <MultiSelect
            options={availableDaerahs}
            selected={filters.daerah}
            onChange={(daerah) => onFiltersChange({ ...filters, daerah })}
            placeholder={filters.negeri.length === 0 ? t('filter_all_areas') : t('filter_daerah')}
          />
        </FilterSection>

        <FilterSection title={t('filter_platform')}>
          <MultiSelect
            options={platforms}
            selected={filters.platform}
            onChange={(platform) => onFiltersChange({ ...filters, platform })}
            placeholder={t('filter_platform')}
          />
        </FilterSection>

        <FilterSection title={t('filter_audience')}>
          <MultiSelect
            options={audiences}
            selected={filters.audience}
            onChange={(audience) => onFiltersChange({ ...filters, audience })}
            placeholder={t('filter_audience')}
          />
        </FilterSection>

        <div className="pt-2">
          <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-widest block mb-3">
            {t('filter_halal')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onFiltersChange({ ...filters, halal: filters.halal === true ? null : true })}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.halal === true
                  ? 'bg-[var(--color-teal)] text-white'
                  : 'bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-teal)]/50'
              }`}
            >
              Halal
            </button>
            <button
              onClick={() => onFiltersChange({ ...filters, halal: filters.halal === false ? null : false })}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.halal === false
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-red-200'
              }`}
            >
              Non-Halal
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
