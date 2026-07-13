import { useLanguage } from '../hooks/useLanguage';
import { formatNumber } from '../utils/format';
import FavoriteButton from './FavoriteButton';
import type { KOC } from '../data/kocs';

interface KOCCardProps {
  koc: KOC;
  index: number;
  onSelect: (koc: KOC) => void;
  onViewProfile: (koc: KOC) => void;
}

export default function KOCCard({ koc, index, onSelect, onViewProfile }: KOCCardProps) {
  const { lang, t } = useLanguage();

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 card-transition cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onSelect(koc)}
    >
      <div className="aspect-[4/5] overflow-hidden relative bg-[var(--color-surface-overlay)]">
        <img
          src={koc.image}
          alt={koc.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs text-white/90">
            {koc.daerah}
          </span>
          {koc.certified && (
            <span className="px-2 py-1 rounded-full bg-[var(--color-accent)]/90 text-xs text-white font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Pro
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-lg text-white leading-tight">{koc.name}</h3>
          <p className="text-white/70 text-sm mt-0.5">{koc.handle}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {koc.bio[lang]}
        </p>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {koc.platforms.map(platform => (
            <span key={platform} className="px-2 py-1 rounded-md bg-[var(--color-surface-overlay)] text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
              {platform}
            </span>
          ))}
          {koc.halalCertified && (
            <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs border border-emerald-100">
              Halal
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-[var(--color-border)]">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">{koc.followers >= 1000000 ? formatNumber(koc.followers) : `${formatNumber(koc.followers)}`}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Followers</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">{koc.engagement}%</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Engagement</p>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onViewProfile(koc); }}
          className="w-full py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 mt-4"
        >
          {t('btn_view_profile')}
        </button>
      </div>
    </div>
  );
}
