// src/components/RelatedPosts.tsx
"use client";

import Link from "next/link";
import React from "react";
import { Post } from "@/contexts/fromType";

type Props = {
  related: Post[];
};

const RelatedPosts: React.FC<Props> = ({ related }) => {
  if (!related.length) return null;
  return (
    <aside>
      <h3 className="text-lg font-bold mb-3">Related posts</h3>
      <ul className="space-y-2">
        {related.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RelatedPosts;
