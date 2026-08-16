'use client';

import Link from 'next/link';

export function Wordmark() {
  return (
    <div className="fixed top-6 left-6 z-40 select-none">
      <Link
        href="/"
        className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] p-1 rounded-[2px]"
      >
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] group-hover:bg-[#FB923C] transition-colors duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <span className="font-space font-bold tracking-[0.25em] text-sm text-[#F5F7FF] group-hover:text-[#22D3EE] transition-colors duration-300">
          G.V.NARAYAN
        </span>
      </Link>
    </div>
  );
}

export default Wordmark;
