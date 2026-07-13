interface KOCGridPaginatorProps {
  totalPages: number;
  page: number;
  filteredKocsCount: number;
  onPageChange: (page: number) => void;
  t: (key: string) => string;
}

export default function KOCGridPaginator({ totalPages, page, filteredKocsCount, onPageChange, t }: KOCGridPaginatorProps) {
  const getPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    const startPage = Math.max(2, page - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages - 1, page + Math.floor(maxVisibleButtons / 2));

    if (startPage > 2) {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50"
        >
          1
        </button>
      );
      if (startPage > 3) {
        buttons.push(<span key="start-ellipsis" className="px-2 text-[var(--color-text-muted)]">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            i === page
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        buttons.push(<span key="end-ellipsis" className="px-2 text-[var(--color-text-muted)]">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-12">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {getPageButtons()}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="ml-4 text-sm text-[var(--color-text-muted)]">
        {t('filter_page_of')}: {page} / {totalPages}
      </div>
    </div>
  );
}