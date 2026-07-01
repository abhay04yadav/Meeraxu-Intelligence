export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

      :root {
        --bg: #050d12;
        --surface: #0b1a22;
        --border: rgba(139, 92, 246, 0.12);
        --purple: #8B5CF6;
        --purple-dim: rgba(139, 92, 246, 0.18);
        --purple-glow: rgba(139, 92, 246, 0.35);
        --purple-dark: #6D28D9;
        --white: #eaf6f3;
        --muted: rgba(234, 246, 243, 0.5);
        --card-bg: rgba(11, 26, 34, 0.75);
        --font-display: 'Bricolage Grotesque', sans-serif;
        --font-body: 'Space Grotesk', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
        --font-editorial: 'Instrument Serif', serif;
      }

      html { 
        scroll-behavior: auto;
        background-color: var(--bg);
        color: var(--white);
      }

      body {
        font-family: var(--font-body);
        background-color: var(--bg);
        color: var(--white);
      }

      h1, h2, h3, h4 { 
        font-family: var(--font-display);
      }
      
      h5, h6 { 
        font-family: var(--font-body);
      }
      
      code, pre {
        font-family: var(--font-mono);
      }
      
      .eyebrow, .tag, .label {
        font-family: var(--font-mono);
      }
      
      .editorial, .editorial-accent {
        font-family: var(--font-editorial);
        font-style: italic;
      }

      .gradient-text {
        background: linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 60%, #c4b5fd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .glass {
        background: var(--card-bg);
        border: 1px solid var(--border);
        backdrop-filter: blur(18px);
      }

      body::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background-image:
          linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        background: var(--purple-dim);
        color: var(--purple);
        border: 1px solid var(--border);
      }

      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 32px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%);
        color: #050d12;
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        cursor: pointer;
        border: none;
        transition: box-shadow 0.3s, transform 0.15s;
      }

      .btn-primary:hover {
        box-shadow: 0 0 40px var(--purple-glow);
      }

      .btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 13px 32px;
        border-radius: 10px;
        background: transparent;
        color: var(--purple);
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        border: 1.5px solid var(--purple);
        transition: background 0.2s, box-shadow 0.3s;
      }

      .btn-outline:hover {
        background: var(--purple-dim);
        box-shadow: 0 0 24px var(--purple-glow);
      }

      .service-card {
        position: relative;
        overflow: hidden;
      }

      .service-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.08) 100%);
        opacity: 0;
        transition: opacity 0.3s;
      }

      .service-card:hover::after {
        opacity: 1;
      }

      .scan-line {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 999;
        background: repeating-linear-gradient(
          0deg,
          rgba(139, 92, 246, 0.03),
          rgba(139, 92, 246, 0.03) 1px,
          transparent 1px,
          transparent 2px
        );
        animation: scan 8s linear infinite;
      }

      @keyframes scan {
        0% { transform: translateY(0); }
        100% { transform: translateY(100vh); }
      }

      /* Responsive global helpers */
      @media (max-width: 768px) {
        .marquee {
          mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
        }

        .marquee-track span {
          font-size: 16px !important;
        }

        /* Services section header left margin fix */
        [style*="marginLeft: 50"] {
          margin-left: 0 !important;
        }
      }

      /* Ensure no horizontal overflow anywhere */
      section, main, footer, header {
        max-width: 100vw;
        overflow-x: hidden;
      }
    `}</style>
  );
}
