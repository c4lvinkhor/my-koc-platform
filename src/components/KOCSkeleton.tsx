export default function KOCSkeleton({ index }: { index: number }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] card-transition"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[4/5] overflow-hidden relative bg-[var(--color-surface-overlay)]">
        <div className="w-full h-full animate-pulse bg-[var(--color-surface-overlay)]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-raised)]" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <div className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm animate-pulse">
            <div className="w-16 h-3 bg-white/20 rounded" />
          </div>
          <div className="px-2 py-1 rounded-full bg-[var(--color-accent)]/90 animate-pulse">
            <div className="w-10 h-3 bg-white/30 rounded" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-surface-overlay)] animate-pulse flex-shrink-0" />
          <div className="flex-1">
            <div className="h-5 bg-[var(--color-surface-raised)] rounded animate-pulse mb-2 w-3/4" />
            <div className="h-3 bg-[var(--color-surface-raised)] rounded animate-pulse w-1/2" />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="h-3 bg-[var(--color-surface-raised)] rounded animate-pulse mb-1" />
            <div className="h-4 bg-[var(--color-surface-raised)] rounded animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="h-3 bg-[var(--color-surface-raised)] rounded animate-pulse mb-1" />
            <div className="h-4 bg-[var(--color-surface-raised)] rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-3 py-1 rounded-full bg-[var(--color-surface-overlay)] animate-pulse">
            <div className="h-3 w-12 bg-[var(--color-surface-raised)] rounded" />
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--color-surface-overlay)] animate-pulse">
            <div className="h-3 w-16 bg-[var(--color-surface-raised)] rounded" />
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--color-surface-overlay)] animate-pulse">
            <div className="h-3 w-10 bg-[var(--color-surface-raised)] rounded" />
          </div>
        </div>

        <div className="w-full py-3 rounded-xl bg-[var(--color-surface-overlay)] animate-pulse" />
      </div>
    </div>
  );
}