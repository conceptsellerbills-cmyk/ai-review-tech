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
  { icon: '🧑‍💼', label: 'AI Humanizer', href: '/category/ai-humanizer' },
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    keywords: post.keyword,
  });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --border: #1e2535;
          --text: #e4e8f4; --muted: #7a82a0; --accent: #4f8bff; --radius: 10px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.7; font-size: 16px; }
        a { text-decoration: none; color: inherit; }

        /* ── Page layout ── */
        .page-wrapper { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; display: grid; grid-template-columns: 1fr 260px; gap: 48px; align-items: start; }
        @media (max-width: 900px) { .page-wrapper { grid-template-columns: 1fr; } .article-sidebar { display: none; } }

        /* ── Article ── */
        .post-meta { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .keyword-pill { display: inline-block; font-size: 0.72rem; padding: 3px 10px; border-radius: 20px; background: rgba(74,124,255,0.12); border: 1px solid rgba(74,124,255,0.25); color: #7ca9ff; margin-right: 8px; }
        .article-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
        .article-header h1 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; margin: 8px 0 12px; line-height: 1.3; }
        .article-desc { color: var(--muted); font-size: 1rem; margin-bottom: 12px; }
        .article-body { color: #c8cad8; }
        .article-body h2 { font-size: 1.35rem; color: var(--text); margin: 36px 0 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
        .article-body h3 { font-size: 1.1rem; color: var(--text); margin: 24px 0 10px; }
        .article-body p { margin-bottom: 16px; line-height: 1.8; }
        .article-body ul, .article-body ol { margin: 12px 0 16px 24px; }
        .article-body li { margin-bottom: 6px; }
        .article-body strong { color: var(--text); font-weight: 600; }
        .article-body a { color: var(--accent); }
        .article-body a:hover { color: #6b96ff; }
        .article-body table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem; }
        .article-body th { background: var(--surface); padding: 10px 14px; text-align: left; border: 1px solid var(--border); color: var(--text); }
        .article-body td { padding: 10px 14px; border: 1px solid var(--border); color: var(--muted); }
        .article-body blockquote { border-left: 3px solid var(--accent); padding: 12px 18px; margin: 20px 0; background: var(--surface); border-radius: 0 var(--radius) var(--radius) 0; color: var(--muted); }
        .article-body code { background: var(--surface); padding: 2px 6px; border-radius: 4px; font-size: 0.88em; color: #7ca9ff; border: 1px solid var(--border); }
        .article-body pre { background: var(--surface); padding: 16px; border-radius: var(--radius); overflow-x: auto; margin: 20px 0; border: 1px solid var(--border); }
        .article-body pre code { background: none; border: none; padding: 0; }
        .article-footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); }
        .article-footer a { color: var(--muted); font-size: 0.9rem; }
        .article-footer a:hover { color: var(--accent); }

        /* ── Sidebar ── */
        .article-sidebar { position: sticky; top: 80px; }
        .sidebar-box { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .sidebar-title { padding: 14px 16px; font-size: 0.72rem; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .sidebar-cat-list { display: flex; flex-direction: column; }
        .sidebar-cat-item { display: flex; align-items: center; gap: 10px; padding: 9px 16px; color: #b0b8d0; font-size: 0.83rem; font-weight: 500; border-bottom: 1px solid rgba(30,37,53,0.6); transition: background 0.1s, color 0.1s; }
        .sidebar-cat-item:last-child { border-bottom: none; }
        .sidebar-cat-item:hover { background: rgba(79,139,255,0.08); color: #fff; }
        .sidebar-cat-item:hover .sidebar-cat-arrow { opacity: 1; }
        .sidebar-cat-icon { font-size: 1rem; flex-shrink: 0; width: 20px; text-align: center; }
        .sidebar-cat-label { flex: 1; }
        .sidebar-cat-arrow { font-size: 0.7rem; color: var(--accent); opacity: 0; transition: opacity 0.1s; }
        .sidebar-viewall { display: block; padding: 12px 16px; text-align: center; font-size: 0.78rem; color: var(--accent); font-weight: 600; border-top: 1px solid var(--border); background: rgba(79,139,255,0.04); }
        .sidebar-viewall:hover { background: rgba(79,139,255,0.1); }

        /* ── Comments ── */
        .comments-section { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); }
        .comments-title { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 20px; }
        .comments-empty { color: var(--muted); font-size: 0.9rem; margin-bottom: 24px; }
        .comments-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .comment-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; }
        .comment-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .comment-name { font-weight: 600; color: var(--accent); font-size: 0.88rem; }
        .comment-time { font-size: 0.78rem; color: var(--muted); }
        .comment-body { color: #c8cad8; font-size: 0.93rem; line-height: 1.65; white-space: pre-wrap; }
        .comment-form { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
        .comment-form-title { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 16px; }
        .comment-name-input { width: 100%; padding: 10px 14px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: 0.9rem; margin-bottom: 10px; outline: none; }
        .comment-name-input:focus { border-color: var(--accent); }
        .comment-body-input { width: 100%; padding: 10px 14px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: 0.9rem; margin-bottom: 12px; outline: none; resize: vertical; min-height: 100px; font-family: inherit; }
        .comment-body-input:focus { border-color: var(--accent); }
        .comment-submit { padding: 10px 24px; background: var(--accent); color: #fff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: opacity 0.2s; }
        .comment-submit:hover { opacity: 0.85; }
        .comment-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .comment-error { color: #ef4444; font-size: 0.85rem; margin-bottom: 10px; }
        .comment-success { color: #22c55e; font-size: 0.85rem; margin-bottom: 10px; }
        .site-footer { border-top: 1px solid var(--border); padding: 24px 0; margin-top: 60px; }
        .site-footer p { color: var(--muted); font-size: 0.82rem; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />

      <div className="page-wrapper">
        {/* ── Main article ── */}
        <article>
          <header className="article-header">
            <div className="post-meta">{post.date}</div>
            <h1>{post.title}</h1>
            {post.description && <p className="article-desc">{post.description}</p>}
            {post.keyword && <span className="keyword-pill">{post.keyword}</span>}
          </header>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

          <footer className="article-footer">
            <a href="/">← Back to all articles</a>
          </footer>

          <ArticleComments slug={post.slug} />
        </article>

        {/* ── Sidebar (desktop only) ── */}
        <aside className="article-sidebar">
          <div className="sidebar-box">
            <div className="sidebar-title">Browse Categories</div>
            <div className="sidebar-cat-list">
              {CATEGORIES.map((cat) => (
                <a key={cat.href} href={cat.href} className="sidebar-cat-item">
                  <span className="sidebar-cat-icon">{cat.icon}</span>
                  <span className="sidebar-cat-label">{cat.label}</span>
                  <span className="sidebar-cat-arrow">›</span>
                </a>
              ))}
            </div>
            <a href="/categories" className="sidebar-viewall">View all categories →</a>
          </div>
        </aside>
      </div>
    </>
  );
}
