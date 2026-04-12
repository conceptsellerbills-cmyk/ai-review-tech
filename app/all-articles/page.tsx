import { getAllPosts } from '../../lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All AI Tool Reviews & Articles — ai-review.tech',
  description: 'Browse all in-depth AI tool reviews, comparisons, and guides. Expert analysis to help you choose the right AI tools.',
}


function getCover(keyword?: string, slug?: string): { gradient: string; emoji: string } {
  const k = ((keyword || '') + ' ' + (slug || '')).toLowerCase()
  if (k.includes('photo') || k.includes('image') || k.includes('art'))   return { gradient: 'linear-gradient(135deg,#7c3aed,#db2777)', emoji: '🎨' }
  if (k.includes('video'))                                                  return { gradient: 'linear-gradient(135deg,#dc2626,#ea580c)', emoji: '🎬' }
  if (k.includes('music') || k.includes('audio') || k.includes('song'))   return { gradient: 'linear-gradient(135deg,#7c3aed,#4f46e5)', emoji: '🎵' }
  if (k.includes('code') || k.includes('coding') || k.includes('developer')) return { gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', emoji: '💻' }
  if (k.includes('seo') || k.includes('marketing'))                        return { gradient: 'linear-gradient(135deg,#16a34a,#0891b2)', emoji: '📈' }
  if (k.includes('resume') || k.includes('cover letter') || k.includes('job')) return { gradient: 'linear-gradient(135deg,#1d4ed8,#4338ca)', emoji: '💼' }
  if (k.includes('design') || k.includes('logo'))                          return { gradient: 'linear-gradient(135deg,#db2777,#9333ea)', emoji: '✏️' }
  if (k.includes('email'))                                                  return { gradient: 'linear-gradient(135deg,#0891b2,#1d4ed8)', emoji: '📧' }
  if (k.includes('meeting') || k.includes('productivity'))                 return { gradient: 'linear-gradient(135deg,#0d9488,#16a34a)', emoji: '⚡' }
  if (k.includes('education') || k.includes('essay') || k.includes('learn')) return { gradient: 'linear-gradient(135deg,#d97706,#dc2626)', emoji: '🎓' }
  if (k.includes('social media'))                                           return { gradient: 'linear-gradient(135deg,#e11d48,#7c3aed)', emoji: '📱' }
  if (k.includes('customer service'))                                       return { gradient: 'linear-gradient(135deg,#0891b2,#16a34a)', emoji: '💬' }
  if (k.includes('translation'))                                            return { gradient: 'linear-gradient(135deg,#0d9488,#4338ca)', emoji: '🌍' }
  if (k.includes('presentation'))                                           return { gradient: 'linear-gradient(135deg,#ea580c,#dc2626)', emoji: '🗂️' }
  if (k.includes('summarizer') || k.includes('summariz'))                  return { gradient: 'linear-gradient(135deg,#4338ca,#7c3aed)', emoji: '📋' }
  if (k.includes('detector') || k.includes('plagiarism'))                  return { gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)', emoji: '🔍' }
  if (k.includes('humanizer'))                                              return { gradient: 'linear-gradient(135deg,#0891b2,#7c3aed)', emoji: '🧑‍💼' }
  if (k.includes('paraphraser') || k.includes('story') || k.includes('writer') || k.includes('writing')) return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '✍️' }
  if (k.includes('avatar') || k.includes('face'))                          return { gradient: 'linear-gradient(135deg,#db2777,#ea580c)', emoji: '👤' }
  if (k.includes('interior') || k.includes('design'))                      return { gradient: 'linear-gradient(135deg,#d97706,#16a34a)', emoji: '🏠' }
  if (k.includes('website') || k.includes('builder'))                      return { gradient: 'linear-gradient(135deg,#0891b2,#4f8bff)', emoji: '🌐' }
  if (k.includes('chatgpt') || k.includes('claude') || k.includes('gemini') || k.includes('chatbot')) return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
  if (k.includes('analytics') || k.includes('data'))                       return { gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', emoji: '📊' }
  return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
}

export default function AllArticlesPage() {
  const posts = getAllPosts()

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
        .page-hero { padding: 72px 24px 56px; text-align: center; }
        .page-eyebrow { font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
        .page-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 14px; background: linear-gradient(135deg, #fff 30%, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .page-desc { color: var(--muted); font-size: 1.05rem; max-width: 540px; margin: 0 auto 28px; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 0.85rem; }
        .back-link:hover { color: var(--accent); }
        .articles-section { padding: 0 0 100px; }
        .articles-count { font-size: 0.8rem; color: var(--muted); margin-bottom: 28px; }
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 20px; }
        .post-card { padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-tag { display: inline-block; padding: 3px 10px; border-radius: 20px; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); color: var(--accent2); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
        .post-card h3 { font-size: 1.02rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.87rem; line-height: 1.65; flex: 1; margin-bottom: 18px; }
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }

        .post-cover { height: 130px; border-radius: 8px; margin-bottom: 18px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; flex-shrink: 0; }
        .post-cover-emoji { font-size: 3rem; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4)); position: relative; z-index: 1; }
        .post-cover-shine { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%); }
        .post-cover-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 20px 20px; }

        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }
      `}</style>

      <div className="page-hero">
        <div className="page-eyebrow">All Articles</div>
        <h1 className="page-title">AI Tool Reviews & Guides</h1>
        <p className="page-desc">In-depth reviews and comparisons of the best AI tools — updated monthly with the latest findings.</p>
        <a href="/" className="back-link">← Back to homepage</a>
      </div>

      <div className="container">
        <section className="articles-section">
          <div className="articles-count">{posts.length} articles</div>
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {(() => { const cv = getCover(post.keyword, post.slug); return (
                  <div className="post-cover" style={{ background: cv.gradient }}>
                    <div className="post-cover-dots" />
                    <div className="post-cover-shine" />
                    <span className="post-cover-emoji">{cv.emoji}</span>
                  </div>
                )})()}
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
        </section>
      </div>
    </>
  )
}
