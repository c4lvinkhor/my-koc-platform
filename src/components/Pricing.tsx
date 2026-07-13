// src/components/Pricing.tsx
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { USER_PLANS, type UserPlan } from '../types/business';

interface PricingProps {
  onSelectPlan: (plan: 'free' | 'starter' | 'growth') => void;
  currentPlan?: 'free' | 'starter' | 'growth';
}

export default function Pricing({ onSelectPlan, currentPlan }: PricingProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[var(--color-surface)] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-[var(--color-text-primary)] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Start with our free plan, upgrade as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(USER_PLANS).map(([key, plan]) => {
            const isCurrent = currentPlan === key;
            const isPopular = key === 'starter';
            
            return (
              <div
                key={key}
                className={`relative rounded-3xl border-2 p-8 transition-all duration-300 ${isCurrent
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                    : isPopular
                      ? 'border-[var(--color-accent)]/50 shadow-xl shadow-[var(--color-accent)]/20'
                      : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/30'
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl text-[var(--color-text-primary)] mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-[var(--color-text-muted)]">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)] text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectPlan(key as 'free' | 'starter' | 'growth')}
                  disabled={isCurrent}
                  className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${isCurrent
                      ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] cursor-not-allowed'
                      : isPopular
                        ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-lg shadow-[var(--color-accent)]/20'
                        : 'bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)] border border-[var(--color-border)]'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            All plans include VAT where applicable. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}