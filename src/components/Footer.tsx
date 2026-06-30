interface FooterProps {
  t: (key: string) => string;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                <span className="font-display text-xl text-white font-bold">M</span>
              </div>
              <div>
                <p className="font-display text-xl text-[var(--color-text-primary)] tracking-tight">MY KOC</p>
                <p className="text-xs text-[var(--color-text-muted)]">Platform Pengiklanan Malaysia</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#kocs" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">KOC Directory</a></li>
              <li><a href="#services" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Services</a></li>
              <li><a href="#about" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-[var(--color-text-secondary)]">hello@mykoc.my</li>
              <li className="text-sm text-[var(--color-text-secondary)]">+60 12-345 6789</li>
              <li className="text-sm text-[var(--color-text-secondary)]">Malaysia-wide</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center md:justify-between justify-center gap-4 text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; 2026 MY KOC. {t('footer_rights')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
