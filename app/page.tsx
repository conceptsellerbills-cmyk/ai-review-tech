import { getAllPosts } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Reviews & Comparisons — ai-review.tech",
  description: "In-depth reviews, comparisons and guides for the best AI tools. Find the right AI for writing, coding, images, and more.",
};

const CATEGORIES = [
  { icon: "✍️", label: "AI Writing", desc: "Content generation & copywriting tools", href: "/category/ai-writing" },
  { icon: "🎨", label: "AI Image", desc: "Image generation & editing with AI", href: "/category/ai-image" },
  { icon: "💻", label: "AI Coding", desc: "Code assistants & developer tools", href: "/category/ai-coding" },
  { icon: "🤖", label: "Chatbots", desc: "Conversational AI & assistants", href: "/category/chatbots" },
  { icon: "📊", label: "Analytics", desc: "AI-powered data & business intelligence", href: "/category/analytics" },
  { icon: "🎵", label: "Audio & Video", desc: "AI for speech, music & video creation", href: "/category/audio-video" },
];

const STATS = [
  { value: "200+", label: "Tools Reviewed" },
  { value: "50K+", label: "Monthly Readers" },
  { value: "100%", label: "Independent" },
  { value: "2024", label: "Up-to-date" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14;
          --surface: #0f1420;
          --surface2: #141926;
          --border: #1e2535;
          --border2: #252d40;
          --text: #e4e8f4;
          --muted: #7a82a0;
          --accent: #4f8bff;
          --accent2: #7c5cfc;
          --accent-glow: rgba(79,139,255,0.18);
          --green: #2ecc71;
          --radius: 12px;
          --radius-sm: 8px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* ── Hero ── */
        .hero {
          position: relative;
          overflow: hidden;
          padding: 90px 24px 80px;
          text-align: center;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,139,255,0.15) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,92,252,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(79,139,255,0.1);
          border: 1px solid rgba(79,139,255,0.25);
          color: #8ab4ff;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero-badge::before { content: '●'; color: var(--green); font-size: 0.6rem; }
        .hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #e4e8f4 30%, #8ab4ff 70%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 50px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 0 30px rgba(79,139,255,0.3);
        }
        .hero-cta:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── Stats ── */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          margin-top: 56px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--surface);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .stat-item {
          flex: 1;
          min-width: 120px;
          padding: 20px 16px;
          text-align: center;
          border-right: 1px solid var(--border);
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--accent);
          display: block;
          letter-spacing: -0.02em;
        }
        .stat-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── Section headings ── */
        .section { padding: 60px 0; }
        .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32px; }
        .section-title { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }
        .section-link { font-size: 0.85rem; color: var(--accent); }
        .section-link:hover { text-decoration: underline; }

        /* ── Category grid ── */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 14px;
        }
        .category-card {
          padding: 24px 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .category-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79,139,255,0.08);
        }
        .category-icon { font-size: 1.8rem; margin-bottom: 10px; display: block; }
        .category-label { font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; }
        .category-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

        /* ── Featured article ── */
        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: border-color 0.15s;
        }
        .featured-card:hover { border-color: var(--accent); }
        .featured-visual {
          background: linear-gradient(135deg, #0e1628 0%, #1a1040 50%, #0a1a30 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 260px;
          position: relative;
          overflow: hidden;
        }
        .featured-visual::before {
          content: '🤖';
          font-size: 5rem;
          opacity: 0.6;
        }
        .featured-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(79,139,255,0.15), transparent 70%);
        }
        .featured-content { padding: 36px 32px; display: flex; flex-direction: column; justify-content: center; }
        .featured-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(79,139,255,0.12);
          border: 1px solid rgba(79,139,255,0.25);
          color: #8ab4ff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .featured-content h2 { font-size: 1.5rem; font-weight: 800; line-height: 1.3; margin-bottom: 12px; letter-spacing: -0.02em; }
        .featured-content h2 a:hover { color: var(--accent); }
        .featured-content p { color: var(--muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 20px; }
        .featured-meta { font-size: 0.75rem; color: var(--muted); margin-bottom: 20px; }
        .read-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: 8px;
          background: var(--accent);
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          transition: background 0.15s;
          width: fit-content;
        }
        .read-btn:hover { background: #6b96ff; }

        /* ── Post grid ── */
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
        .post-card {
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: border-color 0.15s, transform 0.15s;
          display: flex;
          flex-direction: column;
        }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(124,92,252,0.1);
          border: 1px solid rgba(124,92,252,0.2);
          color: #a78bfa;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .post-card h3 { font-size: 1rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.85rem; line-height: 1.6; flex: 1; margin-bottom: 16px; }
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.8rem; color: var(--accent); font-weight: 600; }
        .post-link:hover { text-decoration: underline; }

        /* ── CTA ── */
        .cta-section {
          margin: 20px 0 60px;
          padding: 60px 40px;
          background: linear-gradient(135deg, var(--surface) 0%, rgba(79,139,255,0.05) 100%);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          text-align: center;
        }
        .cta-section h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
        .cta-section p { color: var(--muted); margin-bottom: 28px; font-size: 1rem; }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 50px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          transition: opacity 0.2s;
        }
        .cta-btn:hover { opacity: 0.85; }

        /* ── Empty ── */
        .empty-state { text-align: center; padding: 80px 0; color: var(--muted); }
        .empty-state p { font-size: 1.1rem; margin-bottom: 8px; }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .featured-card { grid-template-columns: 1fr; }
          .featured-visual { min-height: 160px; }
          .featured-content { padding: 24px 20px; }
          .stats-bar { gap: 0; }
          .stat-item { min-width: 90px; padding: 16px 10px; }
          .hero { padding: 60px 20px 50px; }
          .cta-section { padding: 40px 20px; }
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Live Reviews &amp; Analysis</div>
        <h1>Find the Best<br />AI Tools for Your Work</h1>
        <p>Independent, in-depth reviews and comparisons of 200+ AI tools. No sponsorships. No fluff. Just honest expert analysis.</p>
        <a href="/best-ai-tools" className="hero-cta">Browse All Reviews →</a>

        <div className="stats-bar">
          {[
            { value: "200+", label: "Tools Reviewed" },
            { value: "50K+", label: "Monthly Readers" },
            { value: "100%", label: "Independent" },
            { value: "2025", label: "Up-to-date" },
          ].map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container">

        {/* Categories */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <a href="/categories" className="section-link">View all →</a>
          </div>
          <div className="category-grid">
            {[
              { icon: "✍️", label: "AI Writing", desc: "Content generation & copywriting tools", href: "/category/ai-writing" },
              { icon: "🎨", label: "AI Image", desc: "Image generation & editing with AI", href: "/category/ai-image" },
              { icon: "💻", label: "AI Coding", desc: "Code assistants & developer tools", href: "/category/ai-coding" },
              { icon: "🤖", label: "Chatbots", desc: "Conversational AI & assistants", href: "/category/chatbots" },
              { icon: "📊", label: "Analytics", desc: "AI-powered data & business intelligence", href: "/category/analytics" },
              { icon: "🎵", label: "Audio & Video", desc: "AI for speech, music & video", href: "/category/audio-video" },
            ].map((c) => (
              <a href={c.href} className="category-card" key={c.label}>
                <span className="category-icon">{c.icon}</span>
                <div className="category-label">{c.label}</div>
                <div className="category-desc">{c.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Featured Review</h2>
            </div>
            <a href={`/${featured.slug}`} className="featured-card">
              <div className="featured-visual" />
              <div className="featured-content">
                <span className="featured-badge">⭐ Editor's Pick</span>
                <h2><span>{featured.title}</span></h2>
                <p>{featured.description || "Read our comprehensive review and find out if this tool is right for you."}</p>
                {featured.date && <div className="featured-meta">📅 {featured.date}</div>}
                <span className="read-btn">Read Full Review →</span>
              </div>
            </a>
          </section>
        )}

        {/* Recent articles */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Latest Reviews & Guides</h2>
            <a href="/all-articles" className="section-link">View all →</a>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No articles yet.</p>
              <span>Check back soon for in-depth AI tool reviews.</span>
            </div>
          ) : (
            <div className="post-grid">
              {(featured ? recent : posts.slice(0, 6)).map((post) => (
                <article className="post-card" key={post.slug}>
                  {post.keyword && <span className="post-tag">{post.keyword}</span>}
                  <h3><a href={`/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.description || "Read our in-depth analysis and expert verdict."}</p>
                  <div className="post-card-footer">
                    <span className="post-date">{post.date}</span>
                    <a href={`/${post.slug}`} className="post-link">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="cta-section">
          <h2>Stay Ahead of the AI Curve</h2>
          <p>Get the latest AI tool reviews, comparisons, and expert guides delivered to you.</p>
          <a href="/best-ai-tools" className="cta-btn">Explore All AI Tools →</a>
        </div>

      </div>
    </>
  );
}
