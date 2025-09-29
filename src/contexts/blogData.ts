// src/data/posts.ts
import type { Post } from "./fromType";
// contexts/blogData.ts (or wherever your POSTS array is defined)
export const POSTS: Post[] = [
  {
    id: "1",
    slug: "wedding-photography-checklist",
    title: "The Ultimate Wedding Photography Checklist (2025)",
    excerpt:
      "A concise checklist pros use to capture every essential moment — pre-wedding, ceremony, reception and creative portraits.",
    content: `<h2>Planning & Pre-Production</h2><p>Before the big day, thorough planning is key...</p><p>... (full article HTML) ...</p>`,
    publishedAt: "2025-09-10T08:00:00.000Z",
    author: {
      name: "AsanCapture Team",
      role: "Lead Production",
    },
    tags: ["wedding", "photography", "checklist"],
    readingTime: "6 min",
    coverImage: {
      src: "/homeImages/l23.webp", // <-- Corrected path
      alt: "Bride and groom wedding photography in village Chopra",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["cinematic-wedding-films", "how-to-pose-couples"],
  },
  {
    id: "2",
    slug: "cinematic-wedding-films",
    title: "How to Create Cinematic Wedding Films",
    excerpt: "Tips on lighting, camera movement, and editing for cinematic storytelling.",
    content: `<h2>Mastering the Art of Motion</h2><p>Cinematic wedding films go beyond simple videography...</p><p>...</p>`,
    publishedAt: "2025-07-01T09:00:00.000Z",
    author: { name: "Arjun Singh" },
    tags: ["videography", "cinematic"],
    readingTime: "5 min",
    coverImage: {
      src: "/homeImages/l24.webp", // <-- Corrected path
      alt: "Cinematic wedding film setup with lights",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["wedding-photography-checklist", "drone-wedding-photography"],
  },
  {
    id: "3",
    slug: "wedding-traditions-islampur-siliguri",
    title: "Capturing Local Charm: Wedding Traditions in Islampur & Siliguri",
    excerpt:
      "Explore the unique cultural tapestry and photographic opportunities of weddings in the Islampur and Siliguri regions.",
    content: `<h2>North Bengal's Unique Ceremonies</h2><p>Weddings in Islampur and Siliguri often blend traditional Bengali rituals with local influences...</p><p>...</p>`,
    publishedAt: "2025-10-20T10:00:00.000Z",
    author: {
      name: "Priya Sharma",
      role: "Cultural Photographer",
    },
    tags: ["wedding", "bengali", "islampur", "siliguri", "local", "culture"],
    readingTime: "7 min",
    coverImage: {
      src: "/homeImages/l25.webp", // <-- Corrected path
      alt: "Traditional Bengali wedding ceremony in Siliguri",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["wedding-photography-checklist", "top-wedding-venues-siliguri-islampur"],
  },
  {
    id: "4",
    slug: "how-to-pose-couples",
    title: "Mastering Couple Poses for Wedding Photography",
    excerpt:
      "A practical guide to help couples feel natural and look their best in front of the camera, from candid moments to romantic portraits.",
    content: `<h2>Effortless Posing Techniques</h2><p>Posing couples can be challenging, but with these tips, you can create stunning and authentic shots...</p><p>...</p>`,
    publishedAt: "2025-08-15T11:30:00.000Z",
    author: { name: "Rajesh Kumar" },
    tags: ["photography", "posing", "couples", "wedding", "tips"],
    readingTime: "4 min",
    coverImage: {
      src: "/homeImages/l26.webp", // <-- Corrected path
      alt: "Couple posing naturally for a wedding photoshoot",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["wedding-photography-checklist"],
  },
  {
    id: "5",
    slug: "drone-wedding-photography",
    title: "Drone Photography for Weddings: Elevate Your Shots",
    excerpt:
      "Discover how aerial photography and videography can add a breathtaking new dimension to your wedding album and film.",
    content: `<h2>The Sky's the Limit</h2><p>Drone photography isn't just a trend; it's a revolutionary way to capture unique perspectives...</p><p>...</p>`,
    publishedAt: "2025-09-01T14:00:00.000Z",
    author: { name: "AsanCapture Team" },
    tags: ["drone", "photography", "videography", "wedding", "aerial"],
    readingTime: "5 min",
    coverImage: {
      src: "/homeImages/l27.webp", // <-- Corrected path
      alt: "Drone capturing aerial view of a wedding venue",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["cinematic-wedding-films"],
  },
  {
    id: "6",
    slug: "top-wedding-venues-siliguri-islampur",
    title: "Top Wedding Venues in and Around Siliguri & Islampur",
    excerpt:
      "A curated guide to the most beautiful and sought-after wedding venues, perfect for your dream celebration in North Bengal.",
    content: `<h2>Your Perfect North Bengal Venue</h2><p>Finding the ideal wedding venue is crucial. Here’s our selection of top spots in and around Siliguri and Islampur...</p><p>...</p>`,
    publishedAt: "2025-11-05T09:30:00.000Z",
    author: {
      name: "AsanCapture Team",
      role: "Venue Expert",
    },
    tags: ["wedding", "venues", "siliguri", "islampur", "guide", "destination"],
    readingTime: "8 min",
    coverImage: {
      src: "/homeImages/l28.webp", // <-- Corrected path
      alt: "Elegant wedding venue decorated in Siliguri",
      width: 1200,
      height: 700,
    },
    relatedSlugs: ["wedding-traditions-islampur-siliguri"],
  },
];