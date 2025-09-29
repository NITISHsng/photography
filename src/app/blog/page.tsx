import React from "react";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { POSTS } from "@/contexts/blogData";
import type { Metadata } from "next";
import type { Post } from "@/contexts/fromType";

export const metadata: Metadata = {
  title: "Blog — AsanCapture | Wedding Photography & Videography Tips",
  description:
    "AsanCapture blog: tips, tutorials and behind-the-scenes articles on wedding photography, music videos, and production.",
};

const PER_PAGE = 6;

export default function BlogPage() {
  // Always show the first page
  const page = 1;
  const totalPages = Math.ceil(POSTS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pagePosts: Post[] = POSTS.slice(start, start + PER_PAGE);

  return (
    <main className="container mx-auto px-6 py-12">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">From the AsanCapture Studio</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3">
          Practical tips, behind-the-scenes guides and case studies on photography, videography and production.
        </p>
      </header>

      <section
        aria-labelledby="latest-posts"
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {pagePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>

      <Pagination page={page} totalPages={totalPages} />
    </main>
  );
}
