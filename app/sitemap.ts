import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const posts = getAllPosts();
  const BASE = "https://www.ai-review.tech";

  const postUrls = posts.map((post) => ({
    url: BASE + "/" + post.slug,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postUrls,
  ];
}
