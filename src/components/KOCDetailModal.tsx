import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { formatNumber } from '../utils/format';
import type { KOC } from '../data/kocs';

interface KOCDetailModalProps {
  koc: KOC;
  onClose: () => void;
  onGeneratePitch: (koc: KOC) => void;
  t: (key: string) => string;
}

function platformIcon(platform: string): string {
  switch (platform) {
    case 'TikTok': return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z';
    case 'Instagram': return 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z';
    case 'YouTube': return 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 9 2 12 2 12s0 3 .4 4.8a2.5 2.5 0 0 0 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15V9l5 3-5 3z';
    case 'Facebook': return 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z';
    case 'Twitter': return 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58a4.22 4.22 0 0 1-1.94-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.6 8.6 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06A12.13 12.13 0 0 0 8.12 21c5.27 0 8.11-4.37 8.52-7.99A8.65 8.65 0 0 0 22.46 6z';
    default: return '';
  }
}

function platformColor(platform: string): string {
  switch (platform) {
    case 'TikTok': return '#000000';
    case 'Instagram': return '#E1306C';
    case 'YouTube': return '#FF0000';
    case 'Facebook': return '#1877F2';
    case 'Twitter': return '#1DA1F2';
    default: return '#888';
  }
}

function deriveDemographics(koc: KOC) {
  const hasBioWordBM = koc.bio.BM.toLowerCase();
  const isFemale =
    hasBioWordBM.includes('d/o') || hasBioWordBM.includes('binti') ||
    koc.name.includes('Siti') || koc.name.includes('Nurul') || koc.name.includes('Aisyah') ||
    koc.name.includes('Priya') || koc.name.includes('Kavitha') || koc.name.includes('Nadia') ||
    koc.name.includes('Farhana') || koc.name.includes('Huda') || koc.name.includes('Mei') ||
    koc.name.includes('Aina') || koc.name.includes('Sarah') || koc.name.includes('Alicia') ||
    koc.name.includes('Jovina');
  const femalePct = isFemale ? 62 + (koc.engagement > 5.5 ? 5 : 0) : 35 + (koc.engagement > 5 ? 3 : 0);
  return {
    female: femalePct,
    male: 100 - femalePct,
    topBracket: koc.audience,
    topBracketPct: 55 + Math.round(koc.engagement * 2) % 20,
  };
}

function derivePastBrands(koc: KOC) {
  const pool: Record<string, string[]> = {
    Makanan: ['Mamee Chef', 'Dutch Lady', 'Nescafe', 'Warung Jedajah', 'The Chicken Rice Shop'],
    Fashion: ['Uniqlo', 'Padini', 'Sikh Fashion', 'Rajo Lila', 'Scarftan'],
    Kecantikan: ['Wardah', ' Nur Herbs', 'Bio-essence', 'Annanza', 'Safi'],
    'Gaya Hidup': ['Shopee', 'Grab', 'Lazada', 'Decathlon', 'SK-II'],
    Teknologi: ['Xiaomi', 'Samsung', 'Logitech', 'Anker', 'Realme'],
    Pendidikan: ['Prospere', 'Kelaz Media', 'Linguistic Academy', 'DUIT Online'],
    Kesihatan: ['Esone', 'Bayer', 'Nuvite', 'NatureSpring', 'Bioalpha'],
    Pelancongan: ['AirAsia', 'Malaysia Agencies', 'Agoda', 'Traveloka', 'Malindo Air'],
  };
  const brands = pool[koc.category] || pool['Gaya Hidup'];
  return brands.slice(0, 3);
}

function derivePortfolio(koc: KOC) {
  const scenes = ['vibrant cafe, warm evening', 'sunlit kitchen, colorful spices', 'urban street, neon lights', 'lush garden, golden hour', 'modern office, clean white', 'colorful market, daytime'];
  const seed = parseInt(koc.id.replace('k', ''), 10);
  return [0, 1, 2].map(i => {
    const scene = scenes[(seed + i * 7) % scenes.length];
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(koc.name + ' in Malaysia, ' + scene + ', editorial photography, warm tones, vibrant colors')}&image_size=landscape_16_9`;
  });
}

function derivePlatformFollowers(koc: KOC) {
  const total = koc.followers;
  const platforms = [...koc.platforms];
  const primaryShare = platforms.length === 1 ? 1 : 0.55;
  const result: Record<string, number> = {};
  const primary = Math.round(total * primaryShare);
  result[platforms[0]] = primary;
  let remaining = total - primary;
  for (let i = 1; i < platforms.length; i++) {
    const share = i === platforms.length - 1 ? remaining : Math.round(remaining * 0.6);
    result[platforms[i]] = share;
    remaining -= share;
  }
  return result;
}

export default function KOCDetailModal({ koc, onClose, onGeneratePitch, t }: KOCDetailModalProps) {
  const { lang } = useLanguage();
  const demographics = koc.demographics || deriveDemographics(koc);
  const pastBrands = koc.pastBrands || derivePastBrands(koc);
  const portfolio = koc.portfolio || derivePortfolio(koc);
  const platformFollowers = koc.platformFollowers || derivePlatformFollowers(koc);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl h-full bg-[var(--color-surface)] overflow-y-auto shadow-2xl animate-slide-in-right">
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        <div className="relative">
          <div className="relative h-72 md:h-96 overflow-hidden bg-[var(--color-surface-overlay)]">
            <img
              src={koc.image}
              alt={koc.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-teal)] to-[var(--color-accent-muted)]" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-3">
                {koc.certified && (
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-accent)]/90 text-xs text-white font-medium flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pro
                  </span>
                )}
                {koc.halalCertified && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-xs text-white font-medium">
                    Halal
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white">
                  {koc.category}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-white leading-tight">{koc.name}</h2>
              <p className="text-white/70 text-sm mt-1">{koc.handle} · {koc.daerah}, {koc.negeri}</p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            <section>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed font-light">
                {koc.bio[lang]}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
                {t('detail_followers')}
              </h3>
              <div className="space-y-4">
                {Object.entries(platformFollowers).map(([platform, count]) => {
                  const total = koc.followers;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={platform} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-overlay)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill={platformColor(platform)} viewBox="0 0 24 24">
                          <path d={platformIcon(platform)} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-[var(--color-text-primary)] font-medium">{platform}</span>
                          <span className="text-sm text-[var(--color-text-muted)] tabular-nums">{formatNumber(count)}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--color-surface-overlay)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: platformColor(platform),
                              opacity: 0.8,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
                {t('detail_demographics')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Gender</p>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="font-display text-2xl text-[var(--color-text-primary)]">{demographics.female}%</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Female</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl text-[var(--color-text-muted)]">{demographics.male}%</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Male</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[var(--color-surface-overlay)] overflow-hidden flex">
                    <div className="h-full bg-[var(--color-accent)] rounded-l-full" style={{ width: `${demographics.female}%` }} />
                    <div className="h-full bg-[var(--color-surface-muted,#d4cfc8)]" style={{ width: `${demographics.male}%` }} />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Top Age Bracket</p>
                  <p className="font-display text-2xl text-[var(--color-text-primary)]">{demographics.topBracket}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{demographics.topBracketPct}% of audience</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
                {t('detail_past_brands')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {pastBrands.map(brand => (
                  <span
                    key={brand}
                    className="px-4 py-2 rounded-xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
                {t('detail_portfolio')}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {portfolio.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Portfolio ${i + 1}`}
                    className="aspect-video object-cover rounded-xl border border-[var(--color-border)]"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>

            <section className="pt-4">
              <button
                onClick={() => onGeneratePitch(koc)}
                className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-base hover:bg-[var(--color-accent-hover)] transition-all duration-300"
              >
                {t('detail_generate_pitch')}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
