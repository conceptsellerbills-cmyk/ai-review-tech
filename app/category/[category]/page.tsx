import { getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const CATEGORIES: Record<string, { name: string; description: string; icon: string; keywords: string[] }> = {

  'ai-writing': { name: 'AI Writing', description: 'Best AI writing tools for bloggers, marketers and copywriters.', icon: '✍️', keywords: ['writing', 'content', 'copy', 'blog', 'text', 'writer'] },
  'ai-image': { name: 'AI Image', description: 'AI image generators and visual content creation platforms.', icon: '🎨', keywords: ['image', 'art', 'photo', 'visual', 'midjourney', 'dall-e', 'stable diffusion'] },
  'ai-coding': { name: 'AI Coding', description: 'AI coding assistants and developer productivity tools.', icon: '💻', keywords: ['coding', 'code', 'developer', 'programming', 'copilot', 'cursor'] },
  'chatbots': { name: 'Chatbots', description: 'AI chatbots, conversational AI and virtual assistants.', icon: '🤖', keywords: ['chatbot', 'chat', 'chatgpt', 'claude', 'gemini', 'conversational', 'alternatives'] },
  'analytics': { name: 'Analytics', description: 'AI-powered data analytics and business intelligence tools.', icon: '📊', keywords: ['analytics', 'data', 'analysis', 'insights', 'bi'] },
  'audio-video': { name: 'Audio & Video', description: 'AI voice generators, video tools and audio production.', icon: '🎵', keywords: ['voice', 'audio', 'tts', 'speech', 'sound', 'music'] },
  'ai-photo-tools': { name: 'AI Photo Tools', description: 'AI photo enhancers, editors and image upscaling tools.', icon: '📷', keywords: ['photo', 'enhance', 'upscale', 'restore', 'retouch', 'background remov', 'headshot'] },
  'ai-humanizer': { name: 'AI Humanizer', description: 'Tools that make AI-generated text sound more human.', icon: '🧠', keywords: ['humaniz', 'human', 'bypass', 'undetect', 'rewrite'] },
  'ai-paraphraser': { name: 'AI Paraphraser', description: 'AI paraphrasing tools for rewriting and rewording content.', icon: '🔄', keywords: ['paraphras', 'reword', 'rephras', 'rewrite', 'spinner'] },
  'ai-music-generator': { name: 'AI Music Generator', description: 'AI tools for generating and composing original music.', icon: '🎸', keywords: ['music generat', 'compose', 'suno', 'udio', 'instrumental'] },
  'ai-song-generator': { name: 'AI Song Generator', description: 'AI song generators with lyrics and vocals.', icon: '🎤', keywords: ['song generat', 'lyrics', 'vocal', 'suno', 'udio', 'ai song'] },
  'ai-face-tools': { name: 'AI Face Tools', description: 'AI face swap, face generation and facial editing tools.', icon: '🪞', keywords: ['face swap', 'face generat', 'deepfake', 'face edit', 'portrait'] },
  'ai-essay-writer': { name: 'AI Essay Writer', description: 'AI essay writing tools for students and academics.', icon: '📝', keywords: ['essay', 'academic', 'student', 'thesis', 'paper'] },
  'ai-video-editor': { name: 'AI Video Editor', description: 'AI-powered video editing and post-production tools.', icon: '🎬', keywords: ['video edit', 'video generat', 'video creat', 'kling', 'runway', 'sora'] },
  'ai-website-builder': { name: 'AI Website Builder', description: 'AI tools for building and designing websites without code.', icon: '🌐', keywords: ['website builder', 'web creat', 'no-code', 'landing page', 'wix ai', 'framer'] },
  'ai-plagiarism-checker': { name: 'AI Plagiarism Checker', description: 'AI-powered plagiarism detection and originality checking.', icon: '🔍', keywords: ['plagiarism', 'originality', 'turnitin', 'duplicate', 'similarity'] },
  'ai-story-generator': { name: 'AI Story Generator', description: 'AI story generators for fiction, scripts and creative writing.', icon: '📚', keywords: ['story generat', 'fiction', 'narrative', 'plot', 'creative writ'] },
  'ai-avatar-generator': { name: 'AI Avatar Generator', description: 'AI tools for creating profile pictures and digital avatars.', icon: '👤', keywords: ['avatar', 'profile pic', 'headshot', 'pfp', 'character'] },
  'ai-interior-design': { name: 'AI Interior Design', description: 'AI tools for interior design, room planning and decoration.', icon: '🏠', keywords: ['interior', 'room', 'decor', 'design', 'furniture', 'architec'] },
  'ai-cover-letter': { name: 'AI Cover Letter', description: 'AI cover letter generators for job applications.', icon: '📄', keywords: ['cover letter', 'job application', 'resume', 'cv', 'jobcopilot'] },
  'ai-logo-generator': { name: 'AI Logo Generator', description: 'AI logo makers and brand identity design tools.', icon: '✨', keywords: ['logo', 'brand', 'icon creat', 'looka', 'brandmark'] },
  'ai-detector': { name: 'AI Detector', description: 'Tools to detect AI-generated content and deepfakes.', icon: '🕵️', keywords: ['detect', 'ai content detect', 'gptzero', 'originality', 'undetect'] },
  'ai-summarizer': { name: 'AI Summarizer', description: 'AI tools for summarizing articles, documents and videos.', icon: '📋', keywords: ['summar', 'tldr', 'condensed', 'brief', 'abstract'] },
  'ai-video': { name: 'AI Video Generator', description: 'AI video generation from text prompts and images.', icon: '🎥', keywords: ['video generat', 'text to video', 'runway', 'kling', 'sora', 'pika'] },
  'ai-resume-builder': { name: 'AI Resume Builder', description: 'AI resume builders and CV generators for job seekers.', icon: '📑', keywords: ['resume', 'cv builder', 'curriculum vitae', 'job seeker'] },
  'ai-presentation': { name: 'AI Presentation', description: 'AI tools for creating slides and presentations.', icon: '📊', keywords: ['presentation', 'slides', 'powerpoint', 'pitch deck', 'gamma'] },
  'ai-translation': { name: 'AI Translation', description: 'AI translation tools for accurate multilingual content.', icon: '🌍', keywords: ['translat', 'language', 'multilingual', 'deepl', 'locali'] },
  'ai-customer-service': { name: 'AI Customer Service', description: 'AI tools for automating and improving customer support.', icon: '💬', keywords: ['customer service', 'support', 'helpdesk', 'chatbot', 'intercom'] },
  'ai-design-tools': { name: 'AI Design Tools', description: 'AI-powered graphic design and visual creation tools.', icon: '🖌️', keywords: ['design tool', 'graphic design', 'canva', 'adobe', 'figma'] },
  'ai-seo-tools': { name: 'AI SEO Tools', description: 'AI tools for SEO optimization and content ranking.', icon: '🔎', keywords: ['seo', 'keyword research', 'rank', 'surfer', 'semrush', 'search optim'] },
  'ai-email-tools': { name: 'AI Email Tools', description: 'AI email writers and inbox management tools.', icon: '📧', keywords: ['email', 'inbox', 'newsletter', 'cold email', 'outreach'] },
  'ai-meeting-tools': { name: 'AI Meeting Tools', description: 'AI meeting assistants, notetakers and transcription tools.', icon: '📅', keywords: ['meeting', 'notetaker', 'transcript', 'otter', 'fireflies', 'summary'] },
  'ai-productivity': { name: 'AI Productivity', description: 'AI tools for boosting personal and team productivity.', icon: '⚡', keywords: ['productivity', 'workflow', 'automat', 'task', 'notion', 'efficiency'] },
  'ai-education': { name: 'AI Education', description: 'AI tools for learning, tutoring and educational content.', icon: '🎓', keywords: ['education', 'learn', 'tutor', 'student', 'teacher', 'course'] },
  'ai-marketing': { name: 'AI Marketing', description: 'AI marketing tools for campaigns, ads and growth.', icon: '📈', keywords: ['marketing', 'campaign', 'ads', 'growth', 'funnel', 'lead gen'] },
  'ai-social-media': { name: 'AI Social Media', description: 'AI tools for social media content creation and scheduling.', icon: '📱', keywords: ['social media', 'instagram', 'twitter', 'tiktok', 'linkedin', 'post'] },

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
    title: cat.name + ' Tools — Best AI Tools 2025',
    description: cat.description,
    alternates: { canonical: `/category/${category}` },
  }
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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORIES[category]
  if (!cat) notFound()

  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => {
    const text = (p.title + ' ' + (p.keyword || '') + ' ' + (p.description || '') + ' ' + p.slug).toLowerCase()
    return cat.keywords.some((kw) => text.includes(kw.toLowerCase()))
  })

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #080b14; --surface: #0f1420; --border: #1e2535; --text: #e4e8f4; --muted: #7a82a0; --accent: #4f8bff; --accent2: #7c5cfc; --radius: 12px; }
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
        .posts-section { padding: 0 0 60px; }
        .posts-count { font-size: 0.8rem; color: var(--muted); margin-bottom: 28px; }
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
        .empty-state { text-align: center; padding: 60px 0; color: var(--muted); }
        .all-cats { padding: 40px 0 80px; border-top: 1px solid var(--border); }
        .all-cats-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
        .cats-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .cat-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px; background: var(--surface); border: 1px solid var(--border); font-size: 0.82rem; color: var(--muted); transition: border-color 0.15s, color 0.15s; }
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
          )}
        </section>

        <section className="all-cats">
          <div className="all-cats-title">Browse all categories</div>
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
