import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All AI Tool Categories — ai-review.tech',
  description: 'Browse all AI tool categories — writing, image, coding, chatbots, SEO, marketing, and 25 more.',
}

const CATEGORIES = [
  { icon: '✍️', label: 'AI Writing', desc: 'Content generation & copywriting', href: '/category/ai-writing' },
  { icon: '🎨', label: 'AI Image', desc: 'Image generation & editing', href: '/category/ai-image' },
  { icon: '💻', label: 'AI Coding', desc: 'Code assistants & dev tools', href: '/category/ai-coding' },
  { icon: '🤖', label: 'Chatbots', desc: 'Conversational AI & assistants', href: '/category/chatbots' },
  { icon: '📊', label: 'Analytics', desc: 'AI-powered data intelligence', href: '/category/analytics' },
  { icon: '🎵', label: 'Audio & Video', desc: 'AI for speech, music & video', href: '/category/audio-video' },
  { icon: '🖼️', label: 'AI Photo Editing', desc: 'Enhance & edit photos with AI', href: '/category/ai-photo-editing' },
  { icon: '🧑‍💼', label: 'AI Humanizer', desc: 'Make AI text sound human', href: '/category/ai-humanizer' },
  { icon: '📝', label: 'AI Paraphraser', desc: 'Rewrite & rephrase with AI', href: '/category/ai-paraphraser' },
  { icon: '🎶', label: 'AI Music', desc: 'Generate music & songs with AI', href: '/category/ai-music' },
  { icon: '🎭', label: 'AI Face Swap', desc: 'Face swap & avatar tools', href: '/category/ai-face-swap' },
  { icon: '🎓', label: 'AI Essay Writer', desc: 'AI tools for academic writing', href: '/category/ai-essay-writer' },
  { icon: '🎬', label: 'AI Video Editor', desc: 'Edit & create videos with AI', href: '/category/ai-video-editing' },
  { icon: '🌐', label: 'AI Website Builder', desc: 'Build websites with AI', href: '/category/ai-website-builder' },
  { icon: '🔍', label: 'AI Plagiarism Checker', desc: 'Detect copied content with AI', href: '/category/ai-plagiarism-checker' },
  { icon: '📖', label: 'AI Story Generator', desc: 'Create stories & fiction with AI', href: '/category/ai-story-generator' },
  { icon: '👤', label: 'AI Avatar Generator', desc: 'Create AI avatars & profiles', href: '/category/ai-avatar-generator' },
  { icon: '🏠', label: 'AI Interior Design', desc: 'Design spaces with AI', href: '/category/ai-interior-design' },
  { icon: '💼', label: 'AI Cover Letter', desc: 'Write cover letters with AI', href: '/category/ai-cover-letter' },
  { icon: '🎯', label: 'AI Logo Generator', desc: 'Create logos & branding with AI', href: '/category/ai-logo-generator' },
  { icon: '🕵️', label: 'AI Detector', desc: 'Detect AI-generated content', href: '/category/ai-detector' },
  { icon: '📋', label: 'AI Summarizer', desc: 'Summarize documents & articles', href: '/category/ai-summarizer' },
  { icon: '🎥', label: 'AI Video Generator', desc: 'Generate videos from text', href: '/category/ai-video-generator' },
  { icon: '📄', label: 'AI Resume Builder', desc: 'Build resumes with AI', href: '/category/ai-resume-builder' },
  { icon: '🗂️', label: 'AI Presentation', desc: 'Create slides & decks with AI', href: '/category/ai-presentation' },
  { icon: '🌍', label: 'AI Translation', desc: 'Translate languages with AI', href: '/category/ai-translation' },
  { icon: '💬', label: 'AI Customer Service', desc: 'Automate support with AI', href: '/category/ai-customer-service' },
  { icon: '✏️', label: 'AI Design Tools', desc: 'Graphic design powered by AI', href: '/category/ai-design-tools' },
  { icon: '📈', label: 'AI SEO Tools', desc: 'Rank higher with AI SEO', href: '/category/ai-seo-tools' },
  { icon: '📧', label: 'AI Email Writer', desc: 'Write better emails with AI', href: '/category/ai-email' },
  { icon: '🗓️', label: 'AI Meeting Tools', desc: 'Automate meeting notes with AI', href: '/category/ai-meeting-tools' },
  { icon: '⚡', label: 'AI Productivity', desc: 'Work smarter with AI tools', href: '/category/ai-productivity' },
  { icon: '🏫', label: 'AI Education', desc: 'Learn & teach with AI', href: '/category/ai-education' },
  { icon: '📣', label: 'AI Marketing', desc: 'Scale marketing with AI', href: '/category/ai-marketing' },
  { icon: '📱', label: 'AI Social Media', desc: 'Grow your audience with AI', href: '/category/ai-social-media' },
]

export default function CategoriesPage() {
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
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .page-hero { padding: 72px 24px 56px; text-align: center; }
        .page-eyebrow { font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
        .page-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 14px; background: linear-gradient(135deg, #fff 30%, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .page-desc { color: var(--muted); font-size: 1.05rem; max-width: 540px; margin: 0 auto 28px; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 0.85rem; }
        .back-link:hover { color: var(--accent); }
        .cats-section { padding: 0 0 100px; }
        .cats-count { font-size: 0.8rem; color: var(--muted); margin-bottom: 28px; }
        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 16px; }
        .category-card { padding: 28px 22px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s; display: block; }
        .category-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        .category-icon { font-size: 2.2rem; margin-bottom: 14px; display: block; }
        .category-label { font-weight: 700; font-size: 1rem; margin-bottom: 6px; color: var(--text); }
        .category-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
      `}</style>

      <div className="page-hero">
        <div className="page-eyebrow">All Categories</div>
        <h1 className="page-title">Browse AI Tools by Category</h1>
        <p className="page-desc">Find the best AI tools for every use case — from writing and design to marketing and education.</p>
        <a href="/" className="back-link">← Back to homepage</a>
      </div>

      <div className="container">
        <section className="cats-section">
          <div className="cats-count">{CATEGORIES.length} categories</div>
          <div className="category-grid">
            {CATEGORIES.map((c) => (
              <a key={c.label} href={c.href} className="category-card">
                <span className="category-icon">{c.icon}</span>
                <div className="category-label">{c.label}</div>
                <div className="category-desc">{c.desc}</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
