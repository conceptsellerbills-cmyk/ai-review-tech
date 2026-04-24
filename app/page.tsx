import dynamic from 'next/dynamic'
import { getAllPosts } from '../lib/posts'
import type { Metadata } from 'next'
import NewsletterForm from '../components/NewsletterForm'

const HeroScene3D = dynamic(
  () => import('../components/HeroScene3D').then((m) => m.HeroScene3D),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Best AI Tools Reviews & Comparisons 2025 — ai-review.tech',
  description: 'Independent, in-depth reviews of 200+ AI tools for writing, coding, images and more.',
  alternates: { canonical: '/' },
}

const CATEGORIES = [
  { label: 'AI Writing Tools',      slug: 'ai-writing-tools',      emoji: '✍️',  desc: 'Content & copywriting AI' },
  { label: 'AI Image Generators',   slug: 'ai-image-generators',   emoji: '🎨',  desc: 'Text-to-image AI tools' },
  { label: 'AI Code Assistants',    slug: 'ai-code-assistants',    emoji: '💻',  desc: 'Coding & dev assistants' },
  { label: 'AI Video Tools',        slug: 'ai-video-tools',        emoji: '🎬',  desc: 'Video creation & editing' },
  { label: 'AI SEO Tools',          slug: 'ai-seo-tools',          emoji: '📈',  desc: 'SEO & marketing AI' },
  { label: 'AI Chatbots',           slug: 'ai-chatbots',           emoji: '🤖',  desc: 'Conversational AI' },
  { label: 'AI Audio Tools',        slug: 'ai-audio-tools',        emoji: '🎵',  desc: 'Music & voice generation' },
  { label: 'AI Productivity',       slug: 'ai-productivity',       emoji: '⚡',  desc: 'Workflow & task AI' },
]

function getCover(keyword?: string, slug?: string): { gradient: string; emoji: string } {
  const k = ((keyword || '') + ' ' + (slug || '')).toLowerCase()
  if (k.includes('photo') || k.includes('image') || k.includes('art'))   return { gradient: 'linear-gradient(135deg,#7c3aed,#db2777)', emoji: '🎨' }
  if (k.includes('video'))                                                 return { gradient: 'linear-gradient(135deg,#dc2626,#ea580c)', emoji: '🎬' }
  if (k.includes('music') || k.includes('audio') || k.includes('song'))  return { gradient: 'linear-gradient(135deg,#7c3aed,#4f46e5)', emoji: '🎵' }
  if (k.includes('code') || k.includes('coding') || k.includes('dev'))   return { gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', emoji: '💻' }
  if (k.includes('seo') || k.includes('marketing'))                       return { gradient: 'linear-gradient(135deg,#16a34a,#0891b2)', emoji: '📈' }
  if (k.includes('resume') || k.includes('job'))                          return { gradient: 'linear-gradient(135deg,#1d4ed8,#4338ca)', emoji: '💼' }
  if (k.includes('design') || k.includes('logo'))                         return { gradient: 'linear-gradient(135deg,#db2777,#9333ea)', emoji: '✏️' }
  if (k.includes('email'))                                                 return { gradient: 'linear-gradient(135deg,#0891b2,#1d4ed8)', emoji: '📧' }
  if (k.includes('productivity') || k.includes('meeting'))                return { gradient: 'linear-gradient(135deg,#0d9488,#16a34a)', emoji: '⚡' }
  if (k.includes('education') || k.includes('learn'))                     return { gradient: 'linear-gradient(135deg,#d97706,#dc2626)', emoji: '🎓' }
  if (k.includes('chatgpt') || k.includes('claude') || k.includes('chatbot')) return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
  return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
}

function isNew(d?: string) {
  return d ? Date.now() - new Date(d).getTime() < 1000 * 60 * 60 * 24 * 30 : false
}

export default function HomePage() {
  const posts = getAllPosts()
  const featured = posts[0] ?? null
  const recent = posts.slice(1, 10)

  return (
    <>
      {/* ── Full-screen 3D animated background ── */}
      <HeroScene3D />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', color: '#e4e8f4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

        {/* ── HERO ──────────────────────────────────────── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(5,8,20,0.55) 0%, rgba(5,8,20,0.88) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 820, margin: '0 auto' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 20px', borderRadius: 20, background: 'rgba(79,139,255,0.12)', border: '1px solid rgba(79,139,255,0.3)', color: '#4f8bff', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 36 }}>
              <span style={{ color: '#22c55e', fontSize: '0.6rem' }}>●</span> 200+ Independent AI Tool Reviews
            </div>

            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 28, background: 'linear-gradient(135deg, #ffffff 20%, #4f8bff 55%, #7c5cfc 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              The Best AI Tools,<br />Reviewed & Ranked
            </h1>

            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#8a95b5', maxWidth: 580, margin: '0 auto 44px', lineHeight: 1.8 }}>
              Honest, in-depth AI tool reviews for writing, coding, images, video, and beyond — so you pick the right tool, every time.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
              <a href="/all-articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 38px', borderRadius: 50, background: 'linear-gradient(135deg, #4f8bff, #7c5cfc)', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 60px rgba(79,139,255,0.35)' }}>
                Browse All Reviews →
              </a>
              <a href="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 38px', borderRadius: 50, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#e4e8f4', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
                Explore Categories
              </a>
            </div>

            {/* Stats bar */}
            <div style={{ display: 'flex', background: 'rgba(10,14,28,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(79,139,255,0.2)', borderRadius: 18, overflow: 'hidden', maxWidth: 600, margin: '0 auto' }}>
              {[['200+', 'AI Tools Reviewed'], ['50K+', 'Monthly Readers'], ['100%', 'Independent'], ['4.8★', 'Avg Rating']].map(([v, l], i) => (
                <div key={i} style={{ flex: 1, padding: '24px 10px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(79,139,255,0.15)' : 'none' }}>
                  <span style={{ display: 'block', fontSize: '1.7rem', fontWeight: 900, color: '#4f8bff', letterSpacing: '-0.02em' }}>{v}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#6a729a', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ─────────────────────────────────── */}
        <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.72rem', color: '#4f8bff', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>EXPLORE BY CATEGORY</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>Every Type of AI Tool, Covered</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.slug} href={`/category/${cat.slug}`} style={{ padding: '28px 22px', background: 'rgba(10,15,28,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 12 }}>{cat.emoji}</span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, color: '#e4e8f4' }}>{cat.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#6a729a', lineHeight: 1.5 }}>{cat.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FEATURED ARTICLE ───────────────────────────── */}
        {featured && (() => {
          const { gradient, emoji } = getCover((featured as any).keyword, featured.slug)
          return (
            <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
              <p style={{ fontSize: '0.72rem', color: '#4f8bff', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>⭐ FEATURED REVIEW</p>
              <a href={`/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(10,15,28,0.78)', backdropFilter: 'blur(24px)', border: '1px solid rgba(79,139,255,0.22)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, fontSize: '5rem', background: gradient }}>
                  {emoji}
                </div>
                <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: 'linear-gradient(135deg, #4f8bff, #7c5cfc)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18, width: 'fit-content' }}>
                    {(featured as any).category || 'AI Review'}
                  </span>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: 900, lineHeight: 1.25, marginBottom: 14, letterSpacing: '-0.025em', color: '#e4e8f4' }}>{featured.title}</h2>
                  <p style={{ color: '#6a729a', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 24 }}>
                    {((featured as any).description || (featured as any).excerpt || '').slice(0, 160)}...
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 10, background: '#4f8bff', color: '#fff', fontWeight: 700, fontSize: '0.9rem', width: 'fit-content' }}>
                    Read Full Review →
                  </span>
                </div>
              </a>
            </section>
          )
        })()}

        {/* ── RECENT ARTICLES ────────────────────────────── */}
        <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.025em' }}>Latest AI Reviews</h2>
            <a href="/all-articles" style={{ fontSize: '0.85rem', color: '#4f8bff', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {recent.map((post: any) => {
              const { gradient, emoji } = getCover(post.keyword, post.slug)
              return (
                <a key={post.slug} href={`/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', padding: 24, background: 'rgba(10,15,28,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: 120, borderRadius: 10, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', background: gradient, flexShrink: 0 }}>
                    {emoji}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.2)', color: '#7c5cfc', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {post.category || 'AI Review'}
                    </span>
                    {isNew(post.date) && (
                      <span style={{ padding: '2px 8px', borderRadius: 20, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>NEW</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: 10, color: '#e4e8f4', flex: 1 }}>{post.title}</h3>
                  <p style={{ color: '#6a729a', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 16 }}>
                    {(post.description || post.excerpt || '').slice(0, 120)}...
                  </p>
                  <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#6a729a' }}>{post.date}</span>
                    <span style={{ fontSize: '0.82rem', color: '#4f8bff', fontWeight: 600 }}>Read Review →</span>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* ── NEWSLETTER ─────────────────────────────────── */}
        <section style={{ padding: '0 24px 80px', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: 'rgba(10,15,28,0.78)', backdropFilter: 'blur(24px)', border: '1px solid rgba(79,139,255,0.22)', borderRadius: 22, padding: '56px 40px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 16 }}>🤖</span>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 14 }}>Stay Ahead of AI</h2>
            <p style={{ color: '#6a729a', marginBottom: 32, lineHeight: 1.7 }}>Weekly AI tool reviews, comparisons, and guides straight to your inbox.</p>
            <NewsletterForm />
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '44px 24px', textAlign: 'center', color: '#404866', fontSize: '0.82rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
              {[['About', '/about'], ['All Articles', '/all-articles'], ['Categories', '/categories'], ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Write for Us', '/write-for-us']].map(([l, h]) => (
                <a key={h} href={h} style={{ color: '#404866', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
            <p style={{ marginBottom: 8 }}>© 2025 ai-review.tech — Independent AI Tool Reviews</p>
            <p style={{ fontSize: '0.75rem' }}>Affiliate disclosure: Some links may earn us a commission at no extra cost to you.</p>
          </div>
        </footer>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050814; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; }
        a:hover { opacity: 0.85; }
        @media (max-width: 640px) {
          a[href^="/"][style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
