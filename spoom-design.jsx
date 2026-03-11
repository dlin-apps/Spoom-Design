import { useState, useEffect, useRef } from "react";

const LOGO_SVG = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper chevron - teal */}
    <polygon points="50,5 80,25 50,45 20,25" fill="#4A8C8C" />
    <polygon points="50,5 80,25 80,50 50,30" fill="#3D7A7A" />
    <polygon points="50,5 20,25 20,50 50,30" fill="#5B9E9E" />
    {/* Lower chevron - coral */}
    <polygon points="50,55 80,75 50,95 20,75" fill="#D4605A" />
    <polygon points="50,55 80,75 80,50 50,70" fill="#C04E48" />
    <polygon points="50,55 20,75 20,50 50,70" fill="#E07670" />
    {/* Center overlap */}
    <polygon points="50,30 80,50 50,70 20,50" fill="#3D7A7A" opacity="0.6" />
  </svg>
);

const PAGES = ["home", "products", "about", "contact"];

const CandlestickIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="4" x2="6" y2="28" stroke="#E8C547" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="3" y="8" width="6" height="10" rx="1" fill="#E8C547" opacity="0.45"/>
    <line x1="16" y1="2" x2="16" y2="26" stroke="#E8C547" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="13" y="6" width="6" height="14" rx="1" fill="#E8C547"/>
    <line x1="26" y1="6" x2="26" y2="30" stroke="#E8C547" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="23" y="12" width="6" height="10" rx="1" fill="#E8C547" opacity="0.45"/>
  </svg>
);

const products = [
  {
    name: "Swing Scanner",
    tagline: "Systematic swing trading analysis",
    description:
      "A sophisticated market scanner built on Python/FastAPI, integrating real-time market regime detection, multi-stage exit strategies, hedge overlays, and signal quality analytics. Designed for disciplined, systematic paper-trading workflows.",
    tags: ["Python", "FastAPI", "Alpaca API", "Railway"],
    icon: null,
    iconComponent: CandlestickIcon,
    color: "#E8C547",
  },
  {
    name: "Portfolio Rebalancer",
    tagline: "Strategic allocation management",
    description:
      "A 10-category strategic allocation tool with custom thesis glide paths, enabling investors to manage and rebalance diversified portfolios across thematic sleeves — from grid infrastructure to robotics ETFs.",
    tags: ["React", "Financial Modeling", "ETF Analysis"],
    icon: "⚖️",
    color: "#47B5E8",
  },
  {
    name: "Cat Translator",
    tagline: "Feline mood detection for iOS",
    description:
      "An iOS app using SwiftUI with KNN-based mood detection, Apple's Vision framework, and a CloudKit crowdsourced learning system. Point your camera at your cat and decode their emotional state.",
    tags: ["SwiftUI", "Vision Framework", "CloudKit", "CoreML"],
    icon: "🐱",
    color: "#E87B47",
  },
];

// ─── Animated background dots ───────────────────────────────
function DotGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let dots = [];
    const resize = () => {
      c.width = c.offsetWidth * 2;
      c.height = c.offsetHeight * 2;
      ctx.scale(2, 2);
      dots = [];
      const sp = 40;
      for (let x = 0; x < c.offsetWidth; x += sp)
        for (let y = 0; y < c.offsetHeight; y += sp)
          dots.push({ x, y, ox: x, oy: y, phase: Math.random() * Math.PI * 2 });
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = (t) => {
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
      dots.forEach((d) => {
        const pulse = Math.sin(t * 0.001 + d.phase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(232,197,71,${0.06 + pulse * 0.08})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2 + pulse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Navigation ─────────────────────────────────────────────
function Nav({ page, setPage }) {
  return (
    <nav style={styles.nav}>
      <button onClick={() => setPage("home")} style={styles.logo}>
        <LOGO_SVG /> SPOOM DESIGN
      </button>
      <div style={styles.navLinks}>
        {["products", "about", "contact"].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              ...styles.navLink,
              color: page === p ? "#E8C547" : "#999",
              borderBottom: page === p ? "1px solid #E8C547" : "1px solid transparent",
            }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Home ───────────────────────────────────────────────────
function Home({ setPage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);
  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.heroContainer,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p style={styles.heroEyebrow}>Burien, WA</p>
        <h1 style={styles.heroTitle}>
          Design-led
          <br />
          <span style={styles.heroAccent}>products & tools</span>
        </h1>
        <p style={styles.heroSub}>
          Spoom Design LLC builds thoughtful software at the intersection of UX
          leadership, fintech, and emerging technology.
        </p>
        <div style={styles.heroCTA}>
          <button onClick={() => setPage("products")} style={styles.btnPrimary}>
            View Products →
          </button>
          <button onClick={() => setPage("about")} style={styles.btnSecondary}>
            About
          </button>
        </div>
      </div>
      <div
        style={{
          ...styles.heroStats,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
        }}
      >
        {[
          { n: "25+", l: "Years in UX" },
          { n: "3", l: "Apps in Development" },
          { n: "6+", l: "Companies Led" },
        ].map((s) => (
          <div key={s.l} style={styles.stat}>
            <span style={styles.statNum}>{s.n}</span>
            <span style={styles.statLabel}>{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Products ───────────────────────────────────────────────
function Products() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);
  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.sectionHeader,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p style={styles.sectionEyebrow}>What We Are Building</p>
        <h2 style={styles.sectionTitle}>Products</h2>
      </div>
      <div style={styles.productGrid}>
        {products.map((p, i) => (
          <ProductCard key={p.name} product={p} delay={i * 0.12} visible={visible} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.productCard,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        borderColor: hovered ? product.color + "44" : "#1e1e1e",
        boxShadow: hovered ? `0 12px 40px ${product.color}11` : "none",
      }}
    >
      <div style={{ ...styles.productIcon, background: product.color + "18" }}>
        {product.iconComponent ? <product.iconComponent /> : <span style={{ fontSize: 28 }}>{product.icon}</span>}
      </div>
      <h3 style={styles.productName}>{product.name}</h3>
      <p style={{ ...styles.productTagline, color: product.color }}>{product.tagline}</p>
      <p style={styles.productDesc}>{product.description}</p>
      <div style={styles.tagRow}>
        {product.tags.map((t) => (
          <span key={t} style={styles.tag}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ──────────────────────────────────────────────────
function About() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const roles = [
    { co: "Workday", role: "Senior Director, Product Design" },
    { co: "Axon", role: "Built design org from scratch" },
    { co: "Qualtrics", role: "Design Leadership" },
    { co: "Microsoft", role: "UX Design" },
    { co: "Moz", role: "UX Design" },
    { co: "Socrata", role: "UX Design" },
  ];

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.sectionHeader,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p style={styles.sectionEyebrow}>The Person Behind Spoom</p>
        <h2 style={styles.sectionTitle}>About Daan</h2>
      </div>

      <div
        style={{
          ...styles.aboutGrid,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        <div style={styles.aboutMain}>
          <p style={styles.aboutLead}>
            A design executive with 25+ years of UX leadership experience,
            currently on sabbatical — building the products I've always wanted to
            exist.
          </p>
          <p style={styles.aboutBody}>
            I've spent my career leading design organizations at companies like
            Workday, Axon, Qualtrics, and Microsoft. At Axon, I built the design
            org from the ground up. At Workday, I led a large Product Design
            organization as Senior Director.
          </p>
          <p style={styles.aboutBody}>
            Today, I'm channeling that experience into hands-on product building —
            exploring the intersection of financial technology, systematic trading,
            iOS development, and AI-assisted workflows. I also teach graduate UX
            Design & Research as an Adjunct Professor at Northeastern University.
          </p>
          <p style={styles.aboutBody}>
            Based in Burien, Washington — where the mountains meet the sea and
            the coffee is excellent.
          </p>
        </div>

        <div style={styles.aboutSidebar}>
          <div style={styles.sidebarSection}>
            <h4 style={styles.sidebarTitle}>Career</h4>
            {roles.map((r) => (
              <div key={r.co} style={styles.roleRow}>
                <span style={styles.roleCo}>{r.co}</span>
                <span style={styles.roleTitle}>{r.role}</span>
              </div>
            ))}
          </div>
          <div style={{ ...styles.sidebarSection, marginTop: 32 }}>
            <h4 style={styles.sidebarTitle}>Also</h4>
            <p style={styles.roleTitle}>
              Adjunct Professor — Northeastern University
            </p>
            <p style={{ ...styles.roleTitle, marginTop: 6 }}>
              Founder — Spoom Design LLC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact ────────────────────────────────────────────────
function Contact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);
  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.sectionHeader,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p style={styles.sectionEyebrow}>Get In Touch</p>
        <h2 style={styles.sectionTitle}>Contact</h2>
      </div>

      <div
        style={{
          ...styles.contactGrid,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        <div style={styles.contactCard}>
          <div style={styles.contactIcon}>✉️</div>
          <h4 style={styles.contactLabel}>Email</h4>
          <p style={styles.contactValue}>email@spoomdesign.com</p>
        </div>
        <div style={styles.contactCard}>
          <div style={styles.contactIcon}>📍</div>
          <h4 style={styles.contactLabel}>Location</h4>
          <p style={styles.contactValue}>Burien, WA</p>
        </div>
        <div style={styles.contactCard}>
          <div style={styles.contactIcon}>💼</div>
          <h4 style={styles.contactLabel}>LinkedIn</h4>
          <p style={styles.contactValue}>linkedin.com/company/spoom-design</p>
        </div>
      </div>

      <div
        style={{
          ...styles.contactNote,
          opacity: visible ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
        }}
      >
        <p style={styles.contactNoteText}>
          Interested in collaboration, consulting, or just want to talk design
          and fintech? I'd love to hear from you.
        </p>
      </div>
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={styles.footer}>
      <span style={styles.footerText}>
        © {new Date().getFullYear()} Spoom Design LLC · Burien, WA
      </span>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [fadeKey, setFadeKey] = useState(0);

  const navigate = (p) => {
    setFadeKey((k) => k + 1);
    setTimeout(() => setPage(p), 50);
  };

  const renderPage = () => {
    switch (page) {
      case "products":
        return <Products />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home setPage={navigate} />;
    }
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; overflow-x: hidden; }
        ::selection { background: #E8C54744; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>
      <DotGrid />
      <Nav page={page} setPage={navigate} />
      <main key={fadeKey} style={styles.main}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const serif = "'DM Serif Display', Georgia, serif";
const sans = "'DM Sans', -apple-system, sans-serif";

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#e0e0e0",
    fontFamily: sans,
    position: "relative",
  },
  // Nav
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #1a1a1a",
  },
  logo: {
    background: "none",
    border: "none",
    color: "#e0e0e0",
    fontFamily: sans,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 3,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  logoMark: {
    color: "#E8C547",
    fontSize: 20,
  },
  navLinks: {
    display: "flex",
    gap: 32,
  },
  navLink: {
    background: "none",
    border: "none",
    fontFamily: sans,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    paddingBottom: 4,
    transition: "color 0.3s, border-color 0.3s",
  },
  // Main
  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 40px",
    minHeight: "calc(100vh - 140px)",
    position: "relative",
    zIndex: 1,
  },
  page: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  // Hero
  heroContainer: {},
  heroEyebrow: {
    fontFamily: sans,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#E8C547",
    marginBottom: 20,
    fontWeight: 500,
  },
  heroTitle: {
    fontFamily: serif,
    fontSize: "clamp(40px, 6vw, 72px)",
    lineHeight: 1.1,
    color: "#f5f5f5",
    fontWeight: 400,
    marginBottom: 24,
  },
  heroAccent: {
    color: "#E8C547",
  },
  heroSub: {
    fontSize: 17,
    lineHeight: 1.7,
    color: "#999",
    maxWidth: 540,
    marginBottom: 40,
    fontWeight: 300,
  },
  heroCTA: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  btnPrimary: {
    fontFamily: sans,
    fontSize: 14,
    fontWeight: 500,
    padding: "14px 28px",
    background: "#E8C547",
    color: "#0a0a0a",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  btnSecondary: {
    fontFamily: sans,
    fontSize: 14,
    fontWeight: 500,
    padding: "14px 28px",
    background: "transparent",
    color: "#ccc",
    border: "1px solid #333",
    borderRadius: 6,
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "border-color 0.2s",
  },
  heroStats: {
    display: "flex",
    gap: 48,
    marginTop: 80,
    paddingTop: 40,
    borderTop: "1px solid #1a1a1a",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statNum: {
    fontFamily: serif,
    fontSize: 36,
    color: "#f0f0f0",
  },
  statLabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#666",
    fontWeight: 500,
  },
  // Sections
  sectionHeader: {},
  sectionEyebrow: {
    fontFamily: sans,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#E8C547",
    marginBottom: 12,
    fontWeight: 500,
  },
  sectionTitle: {
    fontFamily: serif,
    fontSize: "clamp(32px, 4vw, 52px)",
    color: "#f5f5f5",
    fontWeight: 400,
    marginBottom: 48,
  },
  // Products
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  productCard: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 12,
    padding: 32,
    cursor: "default",
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  productName: {
    fontFamily: serif,
    fontSize: 22,
    color: "#f0f0f0",
    fontWeight: 400,
    marginBottom: 4,
  },
  productTagline: {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  productDesc: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#888",
    fontWeight: 300,
    marginBottom: 20,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    fontSize: 11,
    padding: "4px 10px",
    background: "#1a1a1a",
    border: "1px solid #252525",
    borderRadius: 20,
    color: "#777",
    letterSpacing: 0.3,
    fontWeight: 400,
  },
  // About
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 64,
  },
  aboutMain: {},
  aboutLead: {
    fontFamily: serif,
    fontSize: 22,
    lineHeight: 1.5,
    color: "#ddd",
    marginBottom: 28,
  },
  aboutBody: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#888",
    fontWeight: 300,
    marginBottom: 16,
  },
  aboutSidebar: {},
  sidebarSection: {},
  sidebarTitle: {
    fontFamily: sans,
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#E8C547",
    marginBottom: 16,
    fontWeight: 500,
  },
  roleRow: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 14,
  },
  roleCo: {
    fontSize: 15,
    fontWeight: 500,
    color: "#ccc",
  },
  roleTitle: {
    fontSize: 13,
    color: "#666",
    fontWeight: 300,
  },
  // Contact
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    marginBottom: 48,
  },
  contactCard: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 12,
    padding: 32,
    textAlign: "center",
  },
  contactIcon: {
    fontSize: 28,
    marginBottom: 16,
  },
  contactLabel: {
    fontFamily: sans,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#E8C547",
    marginBottom: 8,
    fontWeight: 500,
  },
  contactValue: {
    fontSize: 15,
    color: "#bbb",
    fontWeight: 400,
  },
  contactNote: {
    maxWidth: 560,
    margin: "0 auto",
    textAlign: "center",
    padding: "40px 0",
    borderTop: "1px solid #1a1a1a",
  },
  contactNoteText: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#777",
    fontWeight: 300,
    fontStyle: "italic",
  },
  // Footer
  footer: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "24px 40px",
    borderTop: "1px solid #141414",
  },
  footerText: {
    fontSize: 12,
    color: "#444",
    letterSpacing: 1,
  },
};
