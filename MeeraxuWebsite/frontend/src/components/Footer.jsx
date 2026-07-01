import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Users, Share, Code, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "60px 24px 40px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="footer-grid" style={{ marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Cpu size={20} color="var(--purple)" />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  letterSpacing: "0.04em",
                }}
              >
                MEERAXU<span style={{ color: "var(--purple)" }}>.</span>
              </span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              Building the intelligent infrastructure for tomorrow's
              enterprises. AI solutions for every field.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
              {[Users, Share, Code, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "var(--purple)" }}
                  style={{
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {[
            {
              heading: "Services",
              links: [
                { label: "AI Dashboards", path: "#" },
                { label: "LLM Solutions", path: "#" },
                { label: "Intelligent Automation", path: "#" },
                { label: "AI Agent", path: "#" },
              ],
            },
            {
              heading: "Company",
              links: [
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ],
            },
            {
              heading: "Contact",
              links: [
                { label: "hello@meeraxu.ai", path: "mailto:hello@meeraxu.ai", external: true },
                { label: "+1 (800) 000-0000", path: "tel:+18000000000", external: true },
                { label: "San Francisco, CA", path: "#", external: true },
                { label: "Book a Call", path: "/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--purple)",
                  marginBottom: 18,
                }}
              >
                {col.heading}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.path}
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "var(--white)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "var(--muted)")
                        }
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "var(--white)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "var(--muted)")
                        }
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            © 2025 Meeraxu Intelligence. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--purple)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 48px;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  );
}
