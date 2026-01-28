// src/components/BlogCard.tsx
"use client";

import Link from "next/link";

import { Post } from "@/contexts/fromType";
import React from "react";

type Props = {
  post: Post;
  className?: string;
};

const BlogCard: React.FC<Props> = ({ post, className = "" }) => {
  return (
    <article
      className={`border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition ${className}`}
      aria-labelledby={`post-${post.slug}`}
    >
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage.src}
            width={post.coverImage.width ?? 1200}
            height={post.coverImage.height ?? 700}
            alt={post.coverImage.alt}
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
            // priority={false}
          />
        </Link>
      )}

      <div className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 flex flex-col h-full">
        <Link href={`/blog/${post.slug}`}>
          <h3
            id={`post-${post.slug}`}
            className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white hover:underline line-clamp-2"
          >
            {post.title}
          </h3>
        </Link>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            {/* <span>{new Date(post.publishedAt).toLocaleDateString()}</span> */}
            <span className="mx-2">•</span>
            <span>{post.readingTime ?? "—"}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
