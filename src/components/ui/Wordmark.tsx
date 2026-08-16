'use client';

import Link from 'next/link';

export function Wordmark() {
  return (
    <div className="hidden md:block fixed top-6 left-8 z-40 select-none">
      <Link
        href="/"
        className="group flex items-center gap-2.5 p-1 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
      >
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] group-hover:bg-[#FB923C] transition-colors duration-300 shadow-[0_0_8px_#22D3EE]" />
        <span className="font-space font-bold tracking-[0.25em] text-xs sm:text-sm text-[#F5F7FF] group-hover:text-[#22D3EE] transition-colors duration-300">
          G.V.NARAYAN
        </span>
      </Link>
    </div>
  );
}

export default Wordmark;
