// src/components/Pagination.tsx
"use client";

import Link from "next/link";
import React from "react";

type Props = {
  page: number;
  totalPages: number;
  basePath?: string;
};

const Pagination: React.FC<Props> = ({ page, totalPages, basePath = "/blog" }) => {
  if (totalPages <= 1) return null;
  const prev = page > 1 ? `${basePath}?page=${page - 1}` : null;
  const next = page < totalPages ? `${basePath}?page=${page + 1}` : null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 mt-8">
      <Link href={prev ?? "#"} className={`px-3 py-1 rounded ${prev ? "bg-white dark:bg-gray-700" : "opacity-40 pointer-events-none"}`}>
        Prev
      </Link>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Page {page} of {totalPages}
      </div>
      <Link href={next ?? "#"} className={`px-3 py-1 rounded ${next ? "bg-white dark:bg-gray-700" : "opacity-40 pointer-events-none"}`}>
        Next
      </Link>
    </nav>
  );
};

export default Pagination;
