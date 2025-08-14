export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-6">
      <p>Something went wrong.</p>
      <button onClick={onRetry} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
        Retry
      </button>
    </div>
  );
}
