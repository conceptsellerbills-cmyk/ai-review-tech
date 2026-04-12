import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "AI Review";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai-review.tech"),
  title: { default: SITE_NAME, template:  },
  description: "Expert guides, reviews and tips.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" className="site-brand">{SITE_NAME}</a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/#recommended-tools" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '50px',
                background: 'linear-gradient(135deg, #4f8bff, #7c5cfc)',
                color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                textDecoration: 'none', whiteSpace: 'nowrap'
              }}>
                🔥 Recommended Tools
              </a>
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
