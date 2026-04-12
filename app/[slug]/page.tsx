import { getAllPosts, getPostBySlug } from "../../lib/posts";
import { marked } from "marked";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleComments } from "../../components/ArticleComments";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keyword,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

const CATEGORIES = [
  { icon: '✍️', label: 'AI Writing', href: '/category/ai-writing' },
  { icon: '🎨', label: 'AI Image', href: '/category/ai-image' },
  { icon: '💻', label: 'AI Coding', href: '/category/ai-coding' },
  { icon: '🤖', label: 'Chatbots', href: '/category/chatbots' },
  { icon: '📊', label: 'Analytics', href: '/category/analytics' },
  { icon: '🎵', label: 'Audio & Video', href: '/category/audio-video' },
  { icon: '🖼️', label: 'AI Photo Editing', href: '/category/ai-photo-editing' },
  { icon: '📝', label: 'AI Paraphraser', href: '/category/ai-paraphraser' },
  { icon: '🎶', label: 'AI Music', href: '/category/ai-music' },
  { icon: '🎭', label: 'AI Face Swap', href: '/category/ai-face-swap' },
  { icon: '🎓', label: 'AI Essay Writer', href: '/category/ai-essay-writer' },
  { icon: '🎬', label: 'AI Video Editor', href: '/category/ai-video-editing' },
  { icon: '🌐', label: 'AI Website Builder', href: '/category/ai-website-builder' },
  { icon: '🔍', label: 'AI Plagiarism Checker', href: '/category/ai-plagiarism-checker' },
  { icon: '📖', label: 'AI Story Generator', href: '/category/ai-story-generator' },
  { icon: '👤', label: 'AI Avatar Generator', href: '/category/ai-avatar-generator' },
  { icon: '🏠', label: 'AI Interior Design', href: '/category/ai-interior-design' },
  { icon: '💼', label: 'AI Cover Letter', href: '/category/ai-cover-letter' },
  { icon: '🎯', label: 'AI Logo Generator', href: '/category/ai-logo-generator' },
  { icon: '🕵️', label: 'AI Detector', href: '/category/ai-detector' },
  { icon: '📋', label: 'AI Summarizer', href: '/category/ai-summarizer' },
  { icon: '🎥', label: 'AI Video Generator', href: '/category/ai-video-generator' },
  { icon: '📄', label: 'AI Resume Builder', href: '/category/ai-resume-builder' },
  { icon: '🗂️', label: 'AI Presentation', href: '/category/ai-presentation' },
  { icon: '🌍', label: 'AI Translation', href: '/category/ai-translation' },
  { icon: '💬', label: 'AI Customer Service', href: '/category/ai-customer-service' },
  { icon: '✏️', label: 'AI Design Tools', href: '/category/ai-design-tools' },
  { icon: '📈', label: 'AI SEO Tools', href: '/category/ai-seo-tools' },
  { icon: '📧', label: 'AI Email Writer', href: '/category/ai-email' },
  { icon: '🗓️', label: 'AI Meeting Tools', href: '/category/ai-meeting-tools' },
  { icon: '⚡', label: 'AI Productivity', href: '/category/ai-productivity' },
  { icon: '🏫', label: 'AI Education', href: '/category/ai-education' },
  { icon: '📣', label: 'AI Marketing', href: '/category/ai-marketing' },
  { icon: '📱', label: 'AI Social Media', href: '/category/ai-social-media' },
]

function getCover(keyword: string | undefined, slug: string | undefined): { gradient: string; emoji: string } {
  const k = ((keyword ?? '') + ' ' + (slug ?? '')).toLowerCase()
  if (k.includes('photo') || k.includes('image') || k.includes('art'))       return { gradient: 'linear-gradient(135deg,#7c3aed,#db2777)', emoji: '🎨' }
  if (k.includes('video'))                                                     return { gradient: 'linear-gradient(135deg,#dc2626,#ea580c)', emoji: '🎬' }
  if (k.includes('music') || k.includes('audio') || k.includes('song'))      return { gradient: 'linear-gradient(135deg,#7c3aed,#4f46e5)', emoji: '🎵' }
  if (k.includes('cod') || k.includes('developer'))                           return { gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', emoji: '💻' }
  if (k.includes('seo') || k.includes('marketing'))                           return { gradient: 'linear-gradient(135deg,#16a34a,#0891b2)', emoji: '📈' }
  if (k.includes('resume') || k.includes('cover letter') || k.includes('job')) return { gradient: 'linear-gradient(135deg,#1d4ed8,#4338ca)', emoji: '💼' }
  if (k.includes('logo'))                                                      return { gradient: 'linear-gradient(135deg,#db2777,#9333ea)', emoji: '🎯' }
  if (k.includes('design'))                                                    return { gradient: 'linear-gradient(135deg,#db2777,#9333ea)', emoji: '✏️' }
  if (k.includes('email'))                                                     return { gradient: 'linear-gradient(135deg,#0891b2,#1d4ed8)', emoji: '📧' }
  if (k.includes('meeting') || k.includes('productivity'))                    return { gradient: 'linear-gradient(135deg,#0d9488,#16a34a)', emoji: '⚡' }
  if (k.includes('education') || k.includes('essay') || k.includes('learn')) return { gradient: 'linear-gradient(135deg,#d97706,#dc2626)', emoji: '🎓' }
  if (k.includes('social'))                                                    return { gradient: 'linear-gradient(135deg,#e11d48,#7c3aed)', emoji: '📱' }
  if (k.includes('customer'))                                                  return { gradient: 'linear-gradient(135deg,#0891b2,#16a34a)', emoji: '💬' }
  if (k.includes('translat'))                                                  return { gradient: 'linear-gradient(135deg,#0d9488,#4338ca)', emoji: '🌍' }
  if (k.includes('present'))                                                   return { gradient: 'linear-gradient(135deg,#ea580c,#dc2626)', emoji: '🗂️' }
  if (k.includes('summariz'))                                                  return { gradient: 'linear-gradient(135deg,#4338ca,#7c3aed)', emoji: '📋' }
  if (k.includes('detect') || k.includes('plagiar'))                          return { gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)', emoji: '🔍' }
  if (k.includes('human'))                                                     return { gradient: 'linear-gradient(135deg,#0891b2,#7c3aed)', emoji: '👤' }
  if (k.includes('paraph') || k.includes('story') || k.includes('writ'))     return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '✍️' }
  if (k.includes('avatar') || k.includes('face'))                             return { gradient: 'linear-gradient(135deg,#db2777,#ea580c)', emoji: '👤' }
  if (k.includes('interior'))                                                  return { gradient: 'linear-gradient(135deg,#d97706,#16a34a)', emoji: '🏠' }
  if (k.includes('website') || k.includes('builder'))                         return { gradient: 'linear-gradient(135deg,#0891b2,#4f8bff)', emoji: '🌐' }
  if (k.includes('chatgpt') || k.includes('claude') || k.includes('gemini') || k.includes('chatbot')) return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
  if (k.includes('analyt') || k.includes('data'))                             return { gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', emoji: '📊' }
  return { gradient: 'linear-gradient(135deg,#4f8bff,#7c5cfc)', emoji: '🤖' }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = String(await marked(post.content ?? ''));

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    keywords: post.keyword,
  });

  const allPosts = getAllPosts();
  const others = allPosts.filter((p) => p.slug !== slug);
  const sameCat = others.filter((p) => p.keyword && post.keyword && p.keyword === post.keyword);
  const rest = others.filter((p) => !sameCat.includes(p));
  const related = [...sameCat, ...rest].slice(0, 3);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#080b14;--surface:#0f1420;--border:#1e2535;--text:#e4e8f4;--muted:#7a82a0;--accent:#4f8bff;--radius:10px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7;font-size:16px}
        a{text-decoration:none;color:inherit}
        .page-wrapper{max-width:1200px;margin:0 auto;padding:40px 24px 80px;display:grid;grid-template-columns:1fr 260px;gap:48px;align-items:start}
        @media(max-width:900px){.page-wrapper{grid-template-columns:1fr}.article-sidebar{display:none!important}}
        .post-meta{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
        .keyword-pill{display:inline-block;font-size:.72rem;padding:3px 10px;border-radius:20px;background:rgba(74,124,255,.12);border:1px solid rgba(74,124,255,.25);color:#7ca9ff;margin-right:8px}
        .article-header{margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--border)}
        .article-header h1{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;margin:8px 0 12px;line-height:1.3}
        .article-desc{color:var(--muted);font-size:1rem;margin-bottom:12px}
        .article-body{color:#c8cad8}
        .article-body h2{font-size:1.35rem;color:var(--text);margin:36px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--border)}
        .article-body h3{font-size:1.1rem;color:var(--text);margin:24px 0 10px}
        .article-body p{margin-bottom:16px;line-height:1.8}
        .article-body ul,.article-body ol{margin:12px 0 16px 24px}
        .article-body li{margin-bottom:6px}
        .article-body strong{color:var(--text);font-weight:600}
        .article-body a{color:var(--accent)}
        .article-body a:hover{color:#6b96ff}
        .article-body table{width:100%;border-collapse:collapse;margin:20px 0;font-size:.9rem}
        .article-body th{background:var(--surface);padding:10px 14px;text-align:left;border:1px solid var(--border);color:var(--text)}
        .article-body td{padding:10px 14px;border:1px solid var(--border);color:var(--muted)}
        .article-body blockquote{border-left:3px solid var(--accent);padding:12px 18px;margin:20px 0;background:var(--surface);border-radius:0 var(--radius) var(--radius) 0;color:var(--muted)}
        .article-body code{background:var(--surface);padding:2px 6px;border-radius:4px;font-size:.88em;color:#7ca9ff;border:1px solid var(--border)}
        .article-body pre{background:var(--surface);padding:16px;border-radius:var(--radius);overflow-x:auto;margin:20px 0;border:1px solid var(--border)}
        .article-body pre code{background:none;border:none;padding:0}
        .article-footer{margin-top:48px;padding-top:24px;border-top:1px solid var(--border)}
        .article-footer a{color:var(--muted);font-size:.9rem}
        .article-footer a:hover{color:var(--accent)}
        .article-sidebar{position:sticky;top:80px}
        .sidebar-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .sidebar-title{padding:14px 16px;font-size:.72rem;font-weight:700;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid var(--border)}
        .sidebar-cat-list{display:flex;flex-direction:column}
        .sidebar-cat-item{display:flex;align-items:center;gap:10px;padding:9px 16px;color:#b0b8d0;font-size:.83rem;font-weight:500;border-bottom:1px solid rgba(30,37,53,.6);transition:background .1s,color .1s}
        .sidebar-cat-item:last-child{border-bottom:none}
        .sidebar-cat-item:hover{background:rgba(79,139,255,.08);color:#fff}
        .sidebar-cat-item:hover .sc-arrow{opacity:1}
        .sc-icon{font-size:1rem;flex-shrink:0;width:20px;text-align:center}
        .sc-label{flex:1}
        .sc-arrow{font-size:.7rem;color:var(--accent);opacity:0;transition:opacity .1s}
        .sidebar-viewall{display:block;padding:12px 16px;text-align:center;font-size:.78rem;color:var(--accent);font-weight:600;border-top:1px solid var(--border);background:rgba(79,139,255,.04)}
        .sidebar-viewall:hover{background:rgba(79,139,255,.1)}
        .related-section{margin-top:56px;padding-top:36px;border-top:1px solid var(--border)}
        .related-title{font-size:1.15rem;font-weight:800;color:var(--text);margin-bottom:24px;letter-spacing:-.02em}
        .related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        @media(max-width:700px){.related-grid{grid-template-columns:1fr}}
        @media(min-width:701px) and (max-width:1000px){.related-grid{grid-template-columns:repeat(2,1fr)}}
        .related-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .15s,transform .15s}
        .related-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .rel-cover{height:100px;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0}
        .rel-emoji{font-size:2.2rem;position:relative;z-index:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,.4))}
        .rel-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,transparent 60%)}
        .rel-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);background-size:18px 18px}
        .rel-body{padding:14px 16px 16px;flex:1;display:flex;flex-direction:column}
        .rel-tag{display:inline-block;padding:2px 8px;border-radius:20px;background:rgba(124,92,252,.1);border:1px solid rgba(124,92,252,.2);color:#9d7dfc;font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
        .rel-card-title{font-size:.9rem;font-weight:700;line-height:1.4;color:var(--text);flex:1}
        .rel-read{display:inline-flex;align-items:center;gap:4px;margin-top:12px;font-size:.78rem;color:var(--accent);font-weight:600}
        .comments-section{margin-top:48px;padding-top:32px;border-top:1px solid var(--border)}
        .comments-title{font-size:1.1rem;font-weight:700;color:var(--text);margin-bottom:20px}
        .comments-empty{color:var(--muted);font-size:.9rem;margin-bottom:24px}
        .comments-list{display:flex;flex-direction:column;gap:16px;margin-bottom:32px}
        .comment-item{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px 20px}
        .comment-header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
        .comment-name{font-weight:600;color:var(--accent);font-size:.88rem}
        .comment-time{font-size:.78rem;color:var(--muted)}
        .comment-body{color:#c8cad8;font-size:.93rem;line-height:1.65;white-space:pre-wrap}
        .comment-form{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px}
        .comment-form-title{font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:16px}
        .comment-name-input,.comment-body-input{width:100%;padding:10px 14px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:.9rem;outline:none}
        .comment-name-input{margin-bottom:10px}
        .comment-body-input{margin-bottom:12px;resize:vertical;min-height:100px;font-family:inherit}
        .comment-name-input:focus,.comment-body-input:focus{border-color:var(--accent)}
        .comment-submit{padding:10px 24px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-weight:600;font-size:.9rem;cursor:pointer;transition:opacity .2s}
        .comment-submit:hover{opacity:.85}
        .comment-submit:disabled{opacity:.5;cursor:not-allowed}
        .comment-error{color:#ef4444;font-size:.85rem;margin-bottom:10px}
        .comment-success{color:#22c55e;font-size:.85rem;margin-bottom:10px}
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />

      <div className="page-wrapper">
        <article>
          <header className="article-header">
            <div className="post-meta">{post.date}</div>
            <h1>{post.title}</h1>
            {post.description && <p className="article-desc">{post.description}</p>}
            {post.keyword && <span className="keyword-pill">{post.keyword}</span>}
          </header>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

          <footer className="article-footer">
            <a href="/">&#8592; Back to all articles</a>
          </footer>

          <ArticleComments slug={post.slug} />

          {related.length > 0 && (
            <section className="related-section">
              <h2 className="related-title">More Articles You&apos;ll Like</h2>
              <div className="related-grid">
                {related.map((p) => {
                  const cv = getCover(p.keyword, p.slug)
                  return (
                    <a key={p.slug} href={`/${p.slug}`} className="related-card">
                      <div className="rel-cover" style={{ background: cv.gradient }}>
                        <div className="rel-dots" />
                        <div className="rel-shine" />
                        <span className="rel-emoji">{cv.emoji}</span>
                      </div>
                      <div className="rel-body">
                        {p.keyword && <span className="rel-tag">{p.keyword}</span>}
                        <div className="rel-card-title">{p.title}</div>
                        <span className="rel-read">Read article &#8594;</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          )}
        </article>

        <aside className="article-sidebar">
          <div className="sidebar-box">
            <div className="sidebar-title">Browse Categories</div>
            <div className="sidebar-cat-list">
              {CATEGORIES.map((cat) => (
                <a key={cat.href} href={cat.href} className="sidebar-cat-item">
                  <span className="sc-icon">{cat.icon}</span>
                  <span className="sc-label">{cat.label}</span>
                  <span className="sc-arrow">&#8250;</span>
                </a>
              ))}
            </div>
            <a href="/categories" className="sidebar-viewall">View all categories &#8594;</a>
          </div>
        </aside>
      </div>
    </>
  )
}
