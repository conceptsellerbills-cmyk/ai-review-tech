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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '50px',
          background: open ? 'rgba(79,139,255,0.15)' : 'rgba(255,255,255,0.06)',
          border: '1px solid ' + (open ? 'rgba(79,139,255,0.5)' : 'rgba(255,255,255,0.12)'),
          color: open ? '#4f8bff' : '#e4e8f4',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s',
        }}
      >
        <span style={{ fontSize: '0.75rem' }}>⊞</span>
        Categories
        <span style={{
          fontSize: '0.6rem',
          marginLeft: '2px',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>▼</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          right: 0,
          width: '340px',
          background: '#0f1420',
          border: '1px solid #1e2535',
          borderRadius: '14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,139,255,0.08)',
          zIndex: 100,
          overflow: 'hidden',
          animation: 'dropIn 0.15s ease',
        }}>
          <style>{`
            @keyframes dropIn {
              from { opacity: 0; transform: translateY(-8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: '14px 18px 10px',
            borderBottom: '1px solid #1e2535',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f8bff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              All Categories
            </span>
            <a href="/categories" style={{ fontSize: '0.72rem', color: '#7a82a0' }}
              onClick={() => setOpen(false)}>
              View all →
            </a>
          </div>

          {/* Grid of categories */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            padding: '8px',
            maxHeight: '420px',
            overflowY: 'auto',
          }}>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  color: '#b0b8d0',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.1s, color 0.1s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(79,139,255,0.1)'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#b0b8d0'
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{cat.icon}</span>
                <span>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
