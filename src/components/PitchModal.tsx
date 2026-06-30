import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import type { KOC } from '../data/kocs';
import { formatNumber } from '../utils/format';

interface PitchModalProps {
  koc: KOC;
  onClose: () => void;
  t: (key: string) => string;
}

type ProposalLang = 'BM' | 'EN' | 'ZH';

const proposalTemplates = {
  BM: {
    greeting: (name: string) => `Salam Sejahtera ${name},`,
    intro: (business: string, type: string) => `Saya ingin mencadangkan kerjasama antara ${business} dengan KOC kami untuk mempromosikan produk/jenis perniagaan ${type} anda.`,
    body: (koc: KOC) => `KOC kami mempunyai ${formatNumber(koc.followers)} pengikut di ${koc.platforms.join(', ')} dengan kadar engagement ${koc.engagement}%. Mereka aktif di ${koc.daerah}, ${koc.negeri} dan mempunyai pengikut yang setia dalam kategori ${koc.category}.`,
    closing: `Kami percaya kerjasama ini akan memberi manfaat kepada kedua-dua pihak. Sila hubungi kami untuk perbincangan lanjut.`,
    signoff: `Yang benar,\nPasukan MYKOC`,
  },
  EN: {
    greeting: (name: string) => `Dear ${name},`,
    intro: (business: string, type: string) => `We would like to propose a collaboration between ${business} and our KOC to promote your ${type} business.`,
    body: (koc: KOC) => `Our KOC has ${formatNumber(koc.followers)} followers on ${koc.platforms.join(', ')} with an engagement rate of ${koc.engagement}%. They are active in ${koc.daerah}, ${koc.negeri} and have a loyal following in the ${koc.category} category.`,
    closing: `We believe this collaboration will be mutually beneficial. Please contact us for further discussion.`,
    signoff: `Best regards,\nMYKOC Team`,
  },
  ZH: {
    greeting: (name: string) => `亲爱的 ${name}，`,
    intro: (business: string, type: string) => `我们想提议${business}与我们的KOC合作，推广您的${type}业务。`,
    body: (koc: KOC) => `我们的KOC在${koc.platforms.join('、')}上拥有${formatNumber(koc.followers)}名粉丝，互动率为${koc.engagement}%。他们活跃于${koc.negeri}${koc.daerah}，在${koc.category}类别中拥有忠实的粉丝群。`,
    closing: `我们相信这次合作将是互惠互利的。请联系我们进行进一步讨论。`,
    signoff: `此致，\nMYKOC团队`,
  },
};

export default function PitchModal({ koc, onClose, t }: PitchModalProps) {
  const { lang } = useLanguage();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactName, setContactName] = useState('');
  const [proposalLang, setProposalLang] = useState<ProposalLang>(lang);
  const [proposal, setProposal] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const tpl = proposalTemplates[proposalLang];
      const text = [
        tpl.greeting(contactName || 'Sir/Madam'),
        '',
        tpl.intro(businessName || 'Your Business', businessType || 'F&B'),
        '',
        tpl.body(koc),
        '',
        tpl.closing,
        '',
        tpl.signoff,
      ].join('\n');
      setProposal(text);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-2xl">
        <div className="grain-overlay absolute inset-0 pointer-events-none rounded-3xl" />

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-[var(--color-text-primary)]">{t('pitch_title')}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-[var(--color-surface-overlay)]">
            <img src={koc.image} alt={koc.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-display text-lg text-[var(--color-text-primary)]">{koc.name}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{koc.handle} · {koc.daerah}, {koc.negeri}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('form_business_name')}</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={t('form_business_name_ph')}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('form_business_type')}</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              >
                <option value="">{t('form_business_type_ph')}</option>
                <option value="F&B">F&B</option>
                <option value="Fashion">{t('filter_clear')}</option>
                <option value="Kecantikan">Kecantikan</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Kesihatan">Kesihatan</option>
                <option value="Pelancongan">Pelancongan</option>
                <option value="Pendidikan">Pendidikan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('form_contact_name')}</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={t('form_contact_name_ph')}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Proposal Language / 提案语言</label>
              <div className="flex gap-2">
                {(['BM', 'EN', 'ZH'] as ProposalLang[]).map(pl => (
                  <button
                    key={pl}
                    onClick={() => setProposalLang(pl)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      proposalLang === pl
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                    }`}
                  >
                    {pl === 'BM' ? 'Bahasa Melayu' : pl === 'EN' ? 'English' : '中文'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-base hover:bg-[var(--color-accent-hover)] transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? t('btn_generating') : t('btn_generate')}
          </button>

          {proposal && (
            <div className="mt-8 p-6 rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)]">
              <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">{t('pitch_result')}</p>
              <pre className="whitespace-pre-wrap text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">{proposal}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
