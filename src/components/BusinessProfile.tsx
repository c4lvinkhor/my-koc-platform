// src/components/BusinessProfile.tsx — slimmed to 3 essential fields
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface BusinessProfileProps {
  user: { id?: string; email?: string; uid?: string };
  onComplete: (profile: any) => void;
  onSkip?: () => void;
}

const industryOptions = [
  'F&B', 'Fashion', 'Beauty', 'Tech', 'Health', 'Travel',
  'Education', 'Lifestyle', 'E-commerce', 'Services'
];

export default function BusinessProfile({ user, onComplete, onSkip }: BusinessProfileProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profile = {
        id: 'profile_' + Date.now(),
        businessName,
        industry,
        contactEmail,
        userId: user?.id || user?.uid || '',
        plan: 'free',
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('perak-koc-business-profile', JSON.stringify(profile));
      onComplete(profile);
    } catch (error) {
      console.error('Error creating business profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[var(--color-surface-raised)] rounded-3xl border border-[var(--color-border)] shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-[var(--color-text-primary)] mb-2">
            {t('setup_business_profile')}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {t('setup_business_description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Business Name *
            </label>
            <input
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              placeholder="E.g. Warung Mak Teh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Industry *
            </label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            >
              <option value="">Select industry</option>
              {industryOptions.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              placeholder="contact@example.com"
            />
          </div>

          <div className="flex gap-4 pt-4">
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
              >
                Skip for now
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}