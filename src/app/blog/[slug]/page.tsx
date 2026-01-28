// app/blog/[slug]/page.tsx
"use client"; // 👈 because we’re using useParams

import React from "react";
import { useParams } from "next/navigation";
import { POSTS } from "@/contexts/blogData";
import type { Post } from "@/contexts/fromType";
import RelatedPosts from "@/components/RelatedPosts"
const SITE_URL = "https://photography-wheat.vercel.app";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>(); // 👈 slug from URL
  const post = POSTS.find((p) => p.slug === slug) as Post | undefined;

  if (!post) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = (post.relatedSlugs || [])
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter(Boolean) as Post[];

  return (
    <main className="container mx-auto px-6 py-12">
      <article className="max-w-3xl mx-auto">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {post.coverImage && (
          <figure className="mt-6 rounded overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width ?? 1200}
              height={post.coverImage.height ?? 700}
              className="w-full object-cover rounded"
            />
            <figcaption className="text-xs text-gray-500 mt-2">
              {post.coverImage.alt}
            </figcaption>
          </figure>
        )}

        <div
          className="prose prose-lg dark:prose-invert mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share buttons */}
        <div className="mt-8 flex gap-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded text-sm"
          >
            Share Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded text-sm"
          >
            Share Twitter
          </a>
        </div>

        {/* Related posts (optional) */}
        <aside className="mt-12">
          <RelatedPosts related={related} />
        </aside>
      </article>
    </main>
  );
}
