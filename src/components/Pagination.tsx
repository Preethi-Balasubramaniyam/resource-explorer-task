export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (newPage: number) => void }) {
  return (
    <div className="flex justify-center gap-4 py-4">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className="flex items-center gap-1">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="flex items-center gap-1">
        Next
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
