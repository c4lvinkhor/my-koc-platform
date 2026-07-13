import { useFavorites } from '../hooks/useFavorites';
import { useLanguage } from '../hooks/useLanguage';
import { kocs } from '../data/kocs';
import type { KOC } from '../data/kocs';
import FavoriteButton from './FavoriteButton';

interface FavoritesPageProps {
  onBack: () => void;
  onViewProfile: (koc: KOC) => void;
  onSelect: (koc: KOC) => void;
}

export default function FavoritesPage({ onBack, onViewProfile, onSelect }: FavoritesPageProps) {
  const { lang, t } = useLanguage();
  const { getFavoriteKOCs, clearFavorites, count } = useFavorites();
  const favoriteKOCs = getFavoriteKOCs(kocs);

  const handleClearAll = () => {
    if (confirm(lang === 'BM' ? 'Anda pasti untuk mengosongkan semua kegemaran?' : 
                lang === 'ZH' ? '确定要清空所有收藏吗？' : 
                'Are you sure you want to clear all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{lang === 'BM' ? 'Kembali' : lang === 'ZH' ? '返回' : 'Back'}</span>
            </button>
            
            <div className="text-center">
              <h1 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)]">
                {t('nav_favorites')}
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {t('favorites_count').replace('{count}', String(count))}
            </p>
            </div>

            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {favoriteKOCs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-[var(--color-surface-overlay)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-display text-xl text-[var(--color-text-primary)] mb-4">
              {t('favorites_empty')}
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              {lang === 'BM' ? 'Klik pada ikon hati pada KOC untuk menambahkannya ke kegemaran anda.' :
               lang === 'ZH' ? '点击KOC上的爱心图标将其添加到收藏。' :
               'Click the heart icon on any KOC to add them to your favorites.'}
            </p>
          </div>
        ) : (
          <>
            {/* Clear all button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-sm"
              >
                {t('favorites_clear')}
              </button>
            </div>

            {/* KOC Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {favoriteKOCs.map((koc, index) => (
                <div
                  key={koc.id}
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

                    <div className="absolute top-4 right-4">
                      <FavoriteButton koc={koc} size="sm" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-lg text-white leading-tight">{koc.name}</h3>
                      <p className="text-white/70 text-sm mt-0.5">{koc.handle}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {koc.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
                              Followers
                            </p>
                            <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                              {koc.followers >= 1000000 ? `${(koc.followers / 1000000).toFixed(1)}M` : 
                               koc.followers >= 1000 ? `${(koc.followers / 1000).toFixed(1)}K` : 
                               koc.followers}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
                              Engagement
                            </p>
                            <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                              {koc.engagement}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {koc.platforms.slice(0, 3).map(platform => (
                        <span
                          key={platform}
                          className="px-3 py-1 rounded-full bg-[var(--color-surface-overlay)] text-xs text-[var(--color-text-secondary)]"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onViewProfile(koc); }}
                        className="flex-1 py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                      >
                        {lang === 'BM' ? 'Lihat Profil' : lang === 'ZH' ? '查看资料' : 'View Profile'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelect(koc); }}
                        className="flex-1 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-all duration-300"
                      >
                        {lang === 'BM' ? 'Jana Pitch' : lang === 'ZH' ? '生成提案' : 'Generate Pitch'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}