import { getAllPosts } from '../lib/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://www.ai-review.tech'

const CATEGORIES = [
  'ai-writing', 'ai-image', 'ai-coding', 'chatbots', 'analytics', 'audio-video',
  'ai-photo-editing', 'ai-humanizer', 'ai-paraphraser', 'ai-music', 'ai-face-swap',
  'ai-essay-writer', 'ai-video-editing', 'ai-website-builder', 'ai-plagiarism-checker',
  'ai-story-generator', 'ai-avatar-generator', 'ai-interior-design', 'ai-cover-letter',
  'ai-logo-generator', 'ai-detector', 'ai-summarizer', 'ai-video-generator',
  'ai-resume-builder', 'ai-presentation', 'ai-translation', 'ai-customer-service',
  'ai-design-tools', 'ai-seo-tools', 'ai-email', 'ai-meeting-tools',
  'ai-productivity', 'ai-education', 'ai-marketing', 'ai-social-media',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const articleUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE + '/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: BASE + '/all-articles',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: BASE + '/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleUrls,
    ...categoryUrls,
  ]
}
