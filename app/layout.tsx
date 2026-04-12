import type { Metadata } from "next";
import "./globals.css";
import CategoriesDropdown from "../components/CategoriesDropdown";

const SITE_NAME = "AI Review";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai-review.tech"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Expert guides, reviews and tips.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* ── LOGO ── */}
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <span style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #4f8bff 0%, #7c5cfc 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, boxShadow: "0 0 16px rgba(79,139,255,0.4)",
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="10" height="10" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="10" cy="10" r="2" fill="white"/>
                  <line x1="5" y1="8" x2="2" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="5" y1="12" x2="2" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="15" y1="8" x2="18" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="15" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="5" x2="8" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="12" y1="5" x2="12" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="15" x2="8" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="12" y1="15" x2="12" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span style={{
                  fontSize: "1.05rem", fontWeight: 900, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #ffffff 30%, #4f8bff 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>AI Review</span>
                <span style={{
                  fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#7a82a0",
                }}>Tech</span>
              </span>
            </a>

            {/* ── NAV ── */}
            <nav style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CategoriesDropdown />
              <a
                href="/#recommended-tools"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 18px", borderRadius: "50px",
                  background: "linear-gradient(135deg, #4f8bff, #7c5cfc)",
                  color: "#fff", fontWeight: 700, fontSize: "0.85rem",
                  textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
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
