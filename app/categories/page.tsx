import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories — AI Review",
  description: "Browse all categories on AI Review. Find expert guides and reviews organized by topic.",
};

const CATEGORIES: { icon: string; label: string; desc: string; href: string }[] = [{"icon":"✍️","label":"AI Writing Tools","desc":"Content, copywriting & essays","href":"/category/ai-writing"},{"icon":"🎨","label":"AI Image Generators","desc":"Art, photos & design creation","href":"/category/ai-image"},{"icon":"💻","label":"AI Coding Assistants","desc":"Code generation & debugging","href":"/category/ai-coding"},{"icon":"🎬","label":"AI Video Tools","desc":"Video creation & editing","href":"/category/ai-video"},{"icon":"🤖","label":"AI Chatbots","desc":"GPT, Claude, Gemini & more","href":"/category/ai-chatbots"},{"icon":"🔊","label":"AI Voice & Audio","desc":"TTS, voice cloning & music","href":"/category/ai-audio"},{"icon":"📊","label":"AI for Business","desc":"Automation & productivity tools","href":"/category/ai-business"},{"icon":"🎓","label":"AI for Education","desc":"Learning, tutoring & research","href":"/category/ai-education"},{"icon":"🛒","label":"AI for E-commerce","desc":"Product descriptions & listings","href":"/category/ai-ecommerce"},{"icon":"📱","label":"AI Mobile Apps","desc":"Best AI apps for iOS & Android","href":"/category/ai-mobile"},{"icon":"🔍","label":"AI SEO Tools","desc":"Keyword research & content SEO","href":"/category/ai-seo"},{"icon":"📧","label":"AI Email Tools","desc":"Email writing & automation","href":"/category/ai-email"}];

export default function CategoriesPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#09080f;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
        a{text-decoration:none;color:inherit}
        .cats-wrap{max-width:1100px;margin:0 auto;padding:48px 24px 80px}
        .cats-header{margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1e2535}
        .cats-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:8px}
        .cats-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;letter-spacing:-0.03em;color:#e4e8f4}
        .cats-subtitle{font-size:0.95rem;color:#7a82a0;margin-top:10px;line-height:1.6}
        .cats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
        .cat-card{background:#0f0d1a;border:1px solid #1e2535;border-radius:12px;padding:28px 22px;display:block;transition:border-color 0.15s,transform 0.15s,box-shadow 0.15s}
        .cat-card:hover{border-color:#a78bfa;transform:translateY(-3px);box-shadow:0 10px 32px rgba(0,0,0,0.35)}
        .cat-icon{font-size:2.2rem;margin-bottom:14px;display:block;line-height:1}
        .cat-label{font-weight:700;font-size:1rem;margin-bottom:6px;color:#e4e8f4}
        .cat-desc{font-size:0.8rem;color:#7a82a0;line-height:1.55}
        .cat-arrow{display:block;margin-top:14px;font-size:0.8rem;font-weight:600;color:#a78bfa;opacity:0;transition:opacity 0.15s}
        .cat-card:hover .cat-arrow{opacity:1}
        @media(max-width:500px){.cats-grid{grid-template-columns:repeat(2,1fr)}}
      `}</style>
      <div className="cats-wrap">
        <div className="cats-header">
          <div className="cats-eyebrow">Browse</div>
          <h1 className="cats-title">All Categories</h1>
          <p className="cats-subtitle">{CATEGORIES.length} categories — pick a topic and dive in.</p>
        </div>
        <div className="cats-grid">
          {CATEGORIES.map((c) => (
            <a href={c.href} className="cat-card" key={c.href}>
              <span className="cat-icon">{c.icon}</span>
              <div className="cat-label">{c.label}</div>
              <div className="cat-desc">{c.desc}</div>
              <span className="cat-arrow">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
