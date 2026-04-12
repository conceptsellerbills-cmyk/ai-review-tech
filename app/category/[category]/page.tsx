import { getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const CATEGORIES: Record<string, { name: string; description: string; icon: string; keywords: string[] }> = {
  'ai-writing': {
    name: 'AI Writing',
    description: 'The best AI writing tools for content creators, copywriters, and marketing teams.',
    icon: '✍️',
    keywords: ['writing', 'content', 'copy', 'blog', 'text', 'writer'],
  },
  'ai-image': {
    name: 'AI Image',
    description: 'AI image generators, art tools, and visual content creation platforms.',
    icon: '🎨',
    keywords: ['image', 'art', 'photo', 'visual', 'midjourney', 'dall-e', 'stable diffusion', 'generator'],
  },
  'ai-coding': {
    name: 'AI Coding',
    description: 'AI coding assistants, code completion tools, and developer productivity tools.',
    icon: '💻',
    keywords: ['coding', 'code', 'developer', 'programming', 'copilot', 'cursor', 'codeium'],
  },
  'chatbots': {
    name: 'Chatbots',
    description: 'AI chatbots, conversational AI, and virtual assistant tools.',
    icon: '🤖',
    keywords: ['chatbot', 'chat', 'chatgpt', 'claude', 'gemini', 'conversational', 'assistant', 'alternatives'],
  },
  'analytics': {
    name: 'Analytics',
    description: 'AI-powered data analytics, business intelligence, and insights tools.',
    icon: '📊',
    keywords: ['analytics', 'data', 'analysis', 'insights', 'bi', 'dashboard'],
  },
  'audio-video': {
    name: 'Audio & Video',
    description: 'AI voice generators, video tools, and audio production platforms.',
    icon: '🎵',
    keywords: ['voice', 'audio', 'video', 'speech', 'sound', 'music', 'tts'],
  },
}

type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES[category]
  if (!cat) return {}
  return {
    title: cat.name + ' Tools',
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORIES[category]
  if (!cat) notFound()

  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => {
    const text = (p.title + ' ' + (p.keyword || '') + ' ' + (p.description || '') + ' ' + p.slug).toLowerCase()
    return cat.keywords.some((kw) => text.includes(kw))
  })

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --border: #1e2535;
          --text: #e4e8f4; --muted: #7a82a0; --accent: #4f8bff; --accent2: #7c5cfc;
          --radius: 12px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .cat-hero { padding: 64px 24px 48px; text-align: center; }
        .cat-icon { font-size: 3.5rem; margin-bottom: 16px; display: block; }
        .cat-eyebrow { font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
        .cat-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 14px; background: linear-gradient(135deg, #fff 30%, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cat-desc { color: var(--muted); font-size: 1.05rem; max-width: 560px; margin: 0 auto 32px; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 0.85rem; }
        .back-link:hover { color: var(--accent); }
        .posts-section { padding: 0 0 80px; }
        .posts-count { font-size: 0.8rem; color: var(--muted); margin-bottom: 28px; }
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 20px; }
        .post-card { padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-tag { display: inline-block; padding: 3px 10px; border-radius: 20px; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); color: var(--accent2); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
        .post-card h3 { font-size: 1.02rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.87rem; line-height: 1.65; flex: 1; margin-bottom: 18px; }
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }
        .empty-state { text-align: center; padding: 60px 0; color: var(--muted); }
        .all-cats { padding: 40px 0 80px; border-top: 1px solid var(--border); }
        .all-cats-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
        .cats-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .cat-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px; background: var(--surface); border: 1px solid var(--border); font-size: 0.85rem; color: var(--muted); transition: border-color 0.15s, color 0.15s; }
        .cat-pill:hover { border-color: var(--accent); color: var(--accent); }
        .cat-pill.active { border-color: var(--accent); color: var(--accent); background: rgba(79,139,255,0.08); }
      `}</style>

      <div className="cat-hero">
        <span className="cat-icon">{cat.icon}</span>
        <div className="cat-eyebrow">Category</div>
        <h1 className="cat-title">{cat.name} Tools</h1>
        <p className="cat-desc">{cat.description}</p>
        <a href="/" className="back-link">← Back to homepage</a>
      </div>

      <div className="container">
        <section className="posts-section">
          <div className="posts-count">{posts.length} article{posts.length !== 1 ? 's' : ''} in {cat.name}</div>
          {posts.length === 0 ? (
            <p className="empty-state">No articles in this category yet — check back soon!</p>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <article className="post-card" key={post.slug}>
                  {post.keyword && <span className="post-tag">{post.keyword}</span>}
                  <h3><a href={`/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.description || 'Read our expert analysis and verdict.'}</p>
                  <div className="post-card-footer">
                    <span className="post-date">{post.date}</span>
                    <a href={`/${post.slug}`} className="post-link">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="all-cats">
          <div className="all-cats-title">Browse other categories</div>
          <div className="cats-grid">
            {Object.entries(CATEGORIES).map(([slug, c]) => (
              <a key={slug} href={`/category/${slug}`} className={`cat-pill${slug === category ? ' active' : ''}`}>
                {c.icon} {c.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
