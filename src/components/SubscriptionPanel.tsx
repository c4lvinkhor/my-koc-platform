// src/components/SubscriptionPanel.tsx
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { USER_PLANS, type UserPlan } from '../types/business';

interface SubscriptionPanelProps {
  currentPlan: 'free' | 'starter' | 'growth';
  onUpgrade: (plan: 'free' | 'starter' | 'growth') => void;
  onDowngrade: (plan: 'free' | 'starter' | 'growth') => void;
  onCancel: () => void;
}

export default function SubscriptionPanel({ currentPlan, onUpgrade, onDowngrade, onCancel }: SubscriptionPanelProps) {
  const { t } = useLanguage();
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const currentPlanData = USER_PLANS[currentPlan];

  const handleUpgrade = (targetPlan: 'free' | 'starter' | 'growth') => {
    if (targetPlan === 'free') {
      setShowConfirmation('free');
    } else {
      onUpgrade(targetPlan);
    }
  };

  const handleDowngrade = (targetPlan: 'free' | 'starter' | 'growth') => {
    if (targetPlan === 'free') {
      setShowConfirmation('free');
    } else {
      onDowngrade(targetPlan);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-2">
          Current Subscription
        </h2>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-sm font-semibold">
            {currentPlanData.name}
          </div>
          {currentPlanData.price > 0 && (
            <span className="text-[var(--color-text-muted)]">
              ${currentPlanData.price}/{currentPlanData.period}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="font-display text-lg text-[var(--color-text-primary)] mb-4">
            Upgrade Options
          </h3>
          <div className="grid gap-4">
            {(['free', 'starter', 'growth'] as Array<keyof typeof USER_PLANS>).map((planKey) => {
              if (planKey === 'free') return null;
              if (planKey === currentPlan) return null;
              
              const plan = USER_PLANS[planKey];
              return (
                <div key={planKey} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)]">
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {plan.name}
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      ${plan.price}/{plan.period}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUpgrade(planKey as 'free' | 'starter' | 'growth')}
                    className="px-6 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                  >
                    Upgrade to {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-[var(--color-text-primary)] mb-4">
            Downgrade Options
          </h3>
          <div className="grid gap-4">
            {(['free', 'starter', 'growth'] as Array<keyof typeof USER_PLANS>).map((planKey) => {
              if (planKey === 'growth') return null;
              if (planKey === currentPlan) return null;
              
              const plan = USER_PLANS[planKey];
              return (
                <div key={planKey} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)]">
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {plan.name}
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      ${plan.price > 0 ? `$${plan.price}/${plan.period}` : 'Free'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDowngrade(planKey as 'free' | 'starter' | 'growth')}
                    className="px-6 py-2 rounded-lg bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
                  >
                    Downgrade to {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {currentPlan !== 'free' && (
        <div className="pt-6 border-t border-[var(--color-border)]">
          <button
            onClick={() => setShowConfirmation('cancel')}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      {showConfirmation === 'free' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-surface-raised)] rounded-2xl p-6 max-w-md mx-4 border border-[var(--color-border)]">
            <h3 className="font-display text-xl text-[var(--color-text-primary)] mb-4">
              Switch to Free Plan?
            </h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              This will downgrade you to our free plan. You'll keep access until the end of your current billing period.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmation(null);
                  // Handle downgrade
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
              >
                Confirm Downgrade
              </button>
              <button
                onClick={() => setShowConfirmation(null)}
                className="flex-1 px-4 py-2 rounded-lg bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}