import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "AI Review";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai-review.tech"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Expert guides, reviews and tips.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <style>{`
          .site-header{background:#09080f;border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 0;position:sticky;top:0;z-index:100}
          .header-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:24px}
          .site-brand{font-size:1.1rem;font-weight:800;color:#fff;text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:9px;transition:color 0.15s}
          .site-brand:hover{color:#a78bfa}
          .site-logo{flex-shrink:0;display:block}
          .cat-nav{position:relative}
          .cat-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;font-size:0.875rem;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:6px;white-space:nowrap;transition:background 0.15s,border-color 0.15s}
          .cat-btn:hover,.cat-nav:focus-within .cat-btn{background:rgba(255,255,255,0.1);border-color:#a78bfa;color:#a78bfa}
          .cat-btn svg{transition:transform 0.2s}
          .cat-nav:hover .cat-btn svg,.cat-nav:focus-within .cat-btn svg{transform:rotate(180deg)}
          .cat-dropdown{display:none;position:absolute;top:calc(100% + 8px);left:0;background:#1a1d2e;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:8px;min-width:240px;box-shadow:0 16px 48px rgba(0,0,0,0.5);z-index:200;max-height:70vh;overflow-y:auto}
          .cat-nav:hover .cat-dropdown,.cat-nav:focus-within .cat-dropdown{display:block}
          .cat-dropdown a{display:block;padding:9px 14px;border-radius:8px;color:#c8cad8;font-size:0.875rem;text-decoration:none;transition:background 0.1s,color 0.1s;white-space:nowrap}
          .cat-dropdown a:hover{background:rgba(255,255,255,0.06);color:#a78bfa}
          .site-footer{border-top:1px solid rgba(255,255,255,0.07);padding:24px 0;margin-top:60px}
          .site-footer p{color:#6b7280;font-size:0.82rem;text-align:center}
        `}</style>
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="site-brand">
              <svg className="site-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
              </svg>
              {SITE_NAME}
            </a>
            <nav className="cat-nav" tabIndex={0}>
              <button className="cat-btn" aria-haspopup="true">
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              <div className="cat-dropdown" role="menu">
              <a href="/category/ai-writing">✍️ AI Writing Tools</a>
              <a href="/category/ai-image">🎨 AI Image Generators</a>
              <a href="/category/ai-coding">💻 AI Coding Assistants</a>
              <a href="/category/chatbots">🤖 AI Chatbots</a>
              <a href="/category/analytics">📊 AI Analytics</a>
              <a href="/category/audio-video">🎵 AI Voice & Audio</a>
              <a href="/category/ai-photo-tools">📷 AI Photo Tools</a>
              <a href="/category/ai-humanizer">🧠 AI Humanizer</a>
              <a href="/category/ai-paraphraser">🔄 AI Paraphraser</a>
              <a href="/category/ai-music-generator">🎸 AI Music Generator</a>
              <a href="/category/ai-song-generator">🎤 AI Song Generator</a>
              <a href="/category/ai-face-tools">🪞 AI Face Tools</a>
              <a href="/category/ai-essay-writer">📝 AI Essay Writer</a>
              <a href="/category/ai-video-editor">🎬 AI Video Editor</a>
              <a href="/category/ai-website-builder">🌐 AI Website Builder</a>
              <a href="/category/ai-plagiarism-checker">🔍 AI Plagiarism Checker</a>
              <a href="/category/ai-story-generator">📚 AI Story Generator</a>
              <a href="/category/ai-avatar-generator">👤 AI Avatar Generator</a>
              <a href="/category/ai-interior-design">🏠 AI Interior Design</a>
              <a href="/category/ai-cover-letter">📄 AI Cover Letter</a>
              <a href="/category/ai-logo-generator">✨ AI Logo Generator</a>
              <a href="/category/ai-detector">🕵️ AI Detector</a>
              <a href="/category/ai-summarizer">📋 AI Summarizer</a>
              <a href="/category/ai-video">🎥 AI Video Generator</a>
              <a href="/category/ai-resume-builder">📑 AI Resume Builder</a>
              <a href="/category/ai-presentation">🖥️ AI Presentation</a>
              <a href="/category/ai-translation">🌍 AI Translation</a>
              <a href="/category/ai-customer-service">💬 AI Customer Service</a>
              <a href="/category/ai-design-tools">🖌️ AI Design Tools</a>
              <a href="/category/ai-seo-tools">🔎 AI SEO Tools</a>
              <a href="/category/ai-email-tools">📧 AI Email Tools</a>
              <a href="/category/ai-meeting-tools">📅 AI Meeting Tools</a>
              <a href="/category/ai-productivity">⚡ AI Productivity</a>
              <a href="/category/ai-education">🎓 AI Education</a>
              <a href="/category/ai-marketing">📈 AI Marketing</a>
              <a href="/category/ai-social-media">📱 AI Social Media</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="container main-content">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
