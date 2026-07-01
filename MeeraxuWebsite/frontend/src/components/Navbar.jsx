import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Mail,
} from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on outside click/tap and Escape; lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const items = [
    { id: "home", label: "Home", path: "/", icon: HomeIcon },
    { id: "about", label: "About", path: "/about", icon: Info },
    { id: "contact", label: "Contact", path: "/contact", icon: Mail },
  ];

  const getActiveId = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/about") return "about";
    if (location.pathname === "/contact") return "contact";
    return "home";
  };

  const activePage = getActiveId();

  return (
    <div ref={navRef}>
      {/* Fixed Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          padding: "0 16px",
          willChange: "transform",
        }}
      >
        <div
          className="nav-glass navbar-container"
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 999,
            pointerEvents: "auto",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            background: "rgba(11, 26, 34, 0.85)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(139, 92, 246, 0.12)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="navbar-logo"
            style={{
              background: "none",
              border: 0,
              color: "inherit",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                color: "var(--purple)",
                display: "flex",
                animation: "spin 8s linear infinite",
              }}
            >
              <Cpu size={22} />
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-body)",
                color: "var(--white)",
              }}
            >
              MEERAXU<span style={{ color: "var(--purple)" }}>.</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: 1,
                height: 24,
                background: "rgba(139, 92, 246, 0.3)",
                margin: "0 4px",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {items.map((it) => {
                const active = activePage === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => navigate(it.path)}
                    style={{
                      position: "relative",
                      background: active
                        ? "rgba(139, 92, 246, 0.18)"
                        : "transparent",
                      border: 0,
                      color: active
                        ? "var(--white)"
                        : "rgba(234, 246, 243, 0.5)",
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "color 0.2s ease, background 0.2s ease",
                      fontFamily: "var(--font-body)",
                      letterSpacing: "-0.01em",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = "var(--white)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.color =
                          "rgba(234, 246, 243, 0.5)";
                    }}
                  >
                    {it.label}
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "var(--purple)",
                          boxShadow: "0 0 8px var(--purple)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigate("/contact#contact-form")}
              style={{
                padding: "10px 24px 10px 24px",
                fontSize: 14,
                marginLeft: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#ffffff",
                color: "#050d12",
                border: 0,
                borderRadius: 999,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(139, 92, 246, 0.3)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Book a call
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--purple)",
                  color: "#ffffff",
                }}
              >
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: 10,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--white)",
              flexShrink: 0,
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9997,
                background: "rgba(5, 13, 18, 0.55)",
                backdropFilter: "blur(3px)",
              }}
            />

            <motion.div
              className="mobile-menu-panel"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 80,
                left: 0,
                right: 0,
                zIndex: 9998,
                padding: "0 16px 16px",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13, 28, 37, 0.97) 0%, rgba(8, 18, 24, 0.98) 100%)",
                  backdropFilter: "blur(24px) saturate(140%)",
                  border: "1px solid rgba(139, 92, 246, 0.18)",
                  borderRadius: 22,
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  boxShadow:
                    "0 25px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {items.map((it) => {
                  const active = activePage === it.id;
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.id}
                      onClick={() => navigate(it.path)}
                      style={{
                        position: "relative",
                        background: active
                          ? "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(139,92,246,0.06))"
                          : "transparent",
                        border: 0,
                        borderRadius: 14,
                        padding: "13px 16px 13px 14px",
                        color: active
                          ? "var(--white)"
                          : "rgba(234, 246, 243, 0.65)",
                        fontSize: 15,
                        fontWeight: active ? 700 : 500,
                        fontFamily: "var(--font-body)",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {active && (
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "22%",
                            bottom: "22%",
                            width: 3,
                            borderRadius: 999,
                            background: "var(--purple)",
                            boxShadow: "0 0 8px var(--purple)",
                          }}
                        />
                      )}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: active
                            ? "rgba(139, 92, 246, 0.22)"
                            : "rgba(139, 92, 246, 0.08)",
                          color: active
                            ? "var(--purple)"
                            : "rgba(234, 246, 243, 0.45)",
                        }}
                      >
                        <Icon size={16} strokeWidth={2.25} />
                      </span>
                      {it.label}
                    </button>
                  );
                })}

                <div
                  style={{
                    height: 1,
                    background: "rgba(139, 92, 246, 0.14)",
                    margin: "6px 4px",
                  }}
                />

                <button
                  onClick={() => navigate("/contact#contact-form")}
                  style={{
                    padding: "15px 18px",
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background:
                      "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                    color: "#ffffff",
                    border: 0,
                    borderRadius: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 10px 28px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  Book a call
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.18)",
                      color: "#ffffff",
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap behind fixed navbar */}
      <div style={{ height: "80px", pointerEvents: "none" }} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .navbar-container {
          padding: 8px 8px 8px 20px;
          width: auto;
          justify-content: flex-start;
          gap: 8px;
        }

        .desktop-nav {
          display: flex;
        }

        .mobile-hamburger {
          display: none !important;
        }

        /* Defensive: never show the mobile menu overlay on desktop widths,
           even if menuOpen is stale from a viewport resize. */
        @media (min-width: 769px) {
          .mobile-menu-backdrop,
          .mobile-menu-panel {
            display: none !important;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 8px 12px 8px 16px;
            width: calc(100vw - 32px);
            justify-content: space-between;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-hamburger {
            display: flex !important;
          }

          /* Ensure logo stays aligned left while hamburger is on right */
          .navbar-logo {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
