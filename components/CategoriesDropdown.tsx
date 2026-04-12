'use client'
import { useState, useRef, useEffect } from 'react'

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

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-dropdown-panel {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100vw - 24px);
          max-width: 420px;
          background: #0f1420;
          border: 1px solid #1e2535;
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,139,255,0.08);
          z-index: 9999;
          overflow: hidden;
          animation: dropIn 0.15s ease;
        }
        .cat-dropdown-header {
          padding: 12px 16px 10px;
          border-bottom: 1px solid #1e2535;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cat-dropdown-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: #4f8bff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cat-dropdown-viewall {
          font-size: 0.72rem;
          color: #7a82a0;
          text-decoration: none;
        }
        .cat-dropdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          padding: 8px;
          max-height: 60vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .cat-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #b0b8d0;
          font-size: 0.83rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.1s, color 0.1s;
          -webkit-tap-highlight-color: transparent;
        }
        .cat-dropdown-item:hover,
        .cat-dropdown-item:active {
          background: rgba(79,139,255,0.12);
          color: #fff;
        }
        .cat-dropdown-item-icon { font-size: 1.1rem; flex-shrink: 0; }
        .cat-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e4e8f4;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .cat-btn[data-open="true"] {
          background: rgba(79,139,255,0.15);
          border-color: rgba(79,139,255,0.5);
          color: #4f8bff;
        }
        .cat-btn-arrow {
          font-size: 0.55rem;
          transition: transform 0.2s;
          display: inline-block;
        }
        .cat-btn[data-open="true"] .cat-btn-arrow { transform: rotate(180deg); }
        /* overlay for mobile tap-outside */
        .cat-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 9998;
        }
        .cat-overlay[data-open="true"] { display: block; }
        @media (max-width: 480px) {
          .cat-btn-label { display: none; }
          .cat-btn { padding: 8px 12px; gap: 0; }
        }
      `}</style>

      {/* Tap-outside overlay */}
      <div className="cat-overlay" data-open={open ? 'true' : 'false'} onClick={() => setOpen(false)} />

      <div ref={ref} style={{ position: 'relative' }}>
        <button className="cat-btn" data-open={open ? 'true' : 'false'} onClick={() => setOpen(!open)} aria-label="Browse categories">
          <span style={{ fontSize: '1rem' }}>⊞</span>
          <span className="cat-btn-label">Categories</span>
          <span className="cat-btn-arrow">▼</span>
        </button>

        {open && (
          <div className="cat-dropdown-panel">
            <div className="cat-dropdown-header">
              <span className="cat-dropdown-title">All Categories</span>
              <a href="/categories" className="cat-dropdown-viewall" onClick={() => setOpen(false)}>View all →</a>
            </div>
            <div className="cat-dropdown-grid">
              {CATEGORIES.map((cat) => (
                <a key={cat.href} href={cat.href} className="cat-dropdown-item" onClick={() => setOpen(false)}>
                  <span className="cat-dropdown-item-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
