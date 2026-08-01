'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-stone-200 shadow-xl max-w-md">
        <h2 className="text-xl font-bold text-[#222222] mb-2 font-sans">Something went wrong</h2>
        <p className="text-sm text-[#666666] mb-6 font-sans">
          An unexpected issue occurred while rendering this page.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary px-6 py-2.5 text-sm font-semibold rounded-full bg-[#222222] text-white hover:bg-[#333333] transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
