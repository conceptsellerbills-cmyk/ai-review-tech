import { getAllPosts } from '../lib/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://www.ai-review.tech'

const CATEGORIES: string[] = ["ai-writing","ai-image","ai-coding","chatbots","analytics","audio-video","ai-photo-tools","ai-humanizer","ai-paraphraser","ai-music-generator","ai-song-generator","ai-face-tools","ai-essay-writer","ai-video-editor","ai-website-builder","ai-plagiarism-checker","ai-story-generator","ai-avatar-generator","ai-interior-design","ai-cover-letter","ai-logo-generator","ai-detector","ai-summarizer","ai-video","ai-resume-builder","ai-presentation","ai-translation","ai-customer-service","ai-design-tools","ai-seo-tools","ai-email-tools","ai-meeting-tools","ai-productivity","ai-education","ai-marketing","ai-social-media"]

const STATIC_PAGES = [
  '/about', '/contact', '/write-for-us', '/advertise',
  '/privacy-policy', '/cookie-policy', '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const articleUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [
    {
      url: BASE + '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: BASE + '/all-articles',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: BASE + '/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...articleUrls,
    ...categoryUrls,
    ...staticUrls,
  ]
}
