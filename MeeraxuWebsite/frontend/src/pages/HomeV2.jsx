import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CountUp } from "../components/CountUp";
import { Footer } from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace(/\/api\/?$/, "");

// Helper to get image URL from service icon field
const getServiceImageUrl = (icon) => {
  if (!icon) return null;
  if (icon.startsWith("http")) return icon;
  if (icon.startsWith("/uploads")) return `${BASE_URL}${icon}`;
  return null; // it's a short code or placeholder text
};

function Blob({ style }) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(90px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}



const HOME_WHY_ITEMS = [
  {
    icon: TrendingUp,
    title: "Exponential Market Growth",
    desc: "The global AI market is projected to reach $1.8 trillion by 2030. Businesses adopting AI now capture compounding advantages over late movers.",
    stat: "$1.8T",
    statLabel: "AI market by 2030",
  },
  {
    icon: Brain,
    title: "Cognitive Augmentation",
    desc: "AI doesn't replace people — it amplifies them. Teams using AI tools deliver 40% more output per person with higher quality and fewer errors.",
    stat: "40%",
    statLabel: "Productivity boost",
  },
  {
    icon: Globe,
    title: "Global Competitive Edge",
    desc: "Your competitors are already deploying AI. Every quarter without AI implementation widens the gap in cost efficiency, speed, and customer experience.",
    stat: "3×",
    statLabel: "Faster to market",
  },
];

function TrustedByMarquee() {
  const companies = [
    "Northwind",
    "Lumen Labs",
    "Halftone",
    "Foxglove",
    "Caldera",
    "Ironbark",
    "Pinewell",
    "Apex Studio",
  ];

  // Duplicate for seamless loop
  const displayCompanies = [...companies, ...companies];

  return (
    <section
      style={{
        padding: "40px 0 60px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .marquee-container::before {
          display: none !important;
        }

        .marquee {
          display: flex;
          gap: 64px;
          white-space: nowrap;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 64px;
          align-items: center;
          flex-shrink: 0;
          animation: marquee 36s linear infinite;
        }

        @keyframes marquee {
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px" }}
        className="marquee-container"
      >
        {/* Header Text */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(234, 246, 243, 0.5)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.16em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Trusted by Revenue Teams Chasing Their Pipeline at 2AM
          </p>
        </div>

        {/* Marquee */}
        <div className="marquee">
          <div className="marquee-track">
            {displayCompanies.map((company, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: "transparent",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 500,
                    color: "rgba(234, 246, 243, 0.7)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const words = ["Automation", "Intelligence", "Insights", "Innovation"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((value) => (value + 1) % words.length),
      2200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 60px",
        overflow: "hidden",
      }}
    >
      <Blob
        style={{
          width: 500,
          height: 500,
          background: "rgba(139,92,246,0.07)",
          top: -100,
          left: -150,
        }}
      />
      <Blob
        style={{
          width: 400,
          height: 400,
          background: "rgba(109,40,217,0.06)",
          bottom: -80,
          right: -100,
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "1px solid var(--purple-glow)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: "1px solid var(--border)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{ marginBottom: 28 }}
        >
          <span className="tag">
            <Sparkles size={12} style={{ marginRight: 6 }} />
            Next-Gen AI Solutions for Every Industry
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Powering the Future
          <br />
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
          >
            <span className="gradient-text">with AI</span>
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="gradient-text"
              style={{ display: "inline-block" }}
            >
              {words[wordIndex]}
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 44px",
          }}
        >
          Meeraxu Intelligence transforms businesses through cutting-edge AI —
          from autonomous agents to LLM solutions, workflow automation, and
          beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <Link to="/about" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              style={{ position: "relative" }}
            >
              <button
                className="btn-primary"
                style={{
                  padding: "16px 36px",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                Get Started
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 5 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </motion.span>
                
                {/* Shine effect */}
                <motion.div
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: "100%" },
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    zIndex: -1,
                  }}
                />
              </button>
            </motion.div>
          </Link>
          <Link
            to="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("services")
                .scrollIntoView({ behavior: "smooth" });
            }}
            style={{ textDecoration: "none" }}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--purple-dim)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
              style={{
                padding: "16px 36px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: "1rem",
                border: "2px solid var(--purple)",
                color: "var(--purple)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AboutVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const events = [
    {
      t: "09:22",
      kind: "in",
      ch: "WA",
      text: "Can AI handle our complex workflows?",
      name: "Team Lead",
    },
    {
      t: "09:22",
      kind: "agent",
      ch: "AI",
      text: "Yes. I've analysed your ops. 47% automation ready immediately.",
      name: "Meeraxu",
    },
    {
      t: "09:23",
      kind: "in",
      ch: "WA",
      text: "Implementation timeline?",
      name: "Team Lead",
    },
    {
      t: "09:23",
      kind: "agent",
      ch: "AI",
      text: "6-8 weeks. Full integration, zero disruption to current ops.",
      name: "Meeraxu",
    },
    {
      t: "09:23",
      kind: "sys",
      text: "Process audit complete · ROI forecast: $2.1M annually",
      name: "",
    },
  ];

  return (
    <div
      className="card"
      style={{
        position: "relative",
        padding: 0,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px var(--border)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(11, 26, 34, 0.85)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--purple)",
              boxShadow: "0 0 12px var(--purple)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "rgba(234, 246, 243, 0.5)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ANALYSIS · 24/7 · process-optimizer
          </span>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(139, 92, 246, 0.6)",
            fontFamily: "var(--font-mono)",
          }}
        >
          audit / workflow
        </div>
      </div>

      {/* Chat stream */}
      <div
        style={{
          padding: "16px 16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 260,
        }}
      >
        {events.map((e, i) => {
          const visible = i <= tick % (events.length + 2);
          if (e.kind === "sys") {
            return (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.4s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  margin: "8px 0 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(139, 92, 246, 0.2)",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--purple)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    border: "1px solid var(--purple)",
                    borderRadius: 999,
                    background: "rgba(139, 92, 246, 0.1)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ✓ {e.text}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(139, 92, 246, 0.2)",
                  }}
                />
              </div>
            );
          }
          const isAgent = e.kind === "agent";
          return (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `all 0.4s ease ${i * 0.05}s`,
                display: "flex",
                flexDirection: isAgent ? "row-reverse" : "row",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: isAgent
                    ? "var(--purple)"
                    : "rgba(139, 92, 246, 0.18)",
                  color: isAgent ? "#050d12" : "rgba(234, 246, 243, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                  border: "1px solid var(--border)",
                }}
              >
                {isAgent ? "M" : e.name?.[0]}
              </div>
              <div style={{ maxWidth: "72%" }}>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(139, 92, 246, 0.6)",
                    textAlign: isAgent ? "right" : "left",
                    marginBottom: 2,
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {e.ch} · {e.t}
                </div>
                <div
                  style={{
                    background: isAgent
                      ? "var(--purple)"
                      : "rgba(11, 26, 34, 0.85)",
                    color: isAgent ? "#050d12" : "var(--white)",
                    padding: "8px 12px",
                    borderRadius: 14,
                    borderTopRightRadius: isAgent ? 4 : 14,
                    borderTopLeftRadius: isAgent ? 14 : 4,
                    fontSize: 13,
                    lineHeight: 1.35,
                    border: isAgent ? "none" : "1px solid var(--border)",
                    fontWeight: isAgent ? 500 : 400,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {e.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom stat strip */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          background: "rgba(11, 26, 34, 0.85)",
        }}
      >
        {[
          ["WORKFLOWS ANALYSED", "47%", "automatable"],
          ["TIME TO IMPLEMENT", "6-8w", "deployment"],
          ["ANNUAL ROI", "$2.1M", "projected"],
        ].map(([k, v, sub]) => (
          <div
            key={k}
            style={{
              padding: "12px 16px",
              borderRight: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "rgba(234, 246, 243, 0.5)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 3,
                fontFamily: "var(--font-mono)",
              }}
            >
              {k}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--white)",
              }}
            >
              {v}{" "}
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(234, 246, 243, 0.5)",
                  fontWeight: 400,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutMeeraxu() {
  const stats = [
    { n: 500, l: "Clients Served", suffix: "+" },
    { n: 99.8, l: "Uptime SLA", suffix: "%", decimals: 1 },
    { n: 50, l: "Awards Won", suffix: "+" },
  ];

  return (
    <section
      className="about-meeraxu-section"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Blob
        style={{
          width: 620,
          height: 620,
          background: "rgba(139,92,246,0.08)",
          top: -180,
          right: -220,
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="about-meeraxu-grid"
        >
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <span
              className="tag"
              style={{ marginBottom: 18, display: "inline-flex" }}
            >
              <Sparkles size={12} style={{ marginRight: 6 }} />
              About Meeraxu
            </span>
            <h2
              style={{
                fontSize: "clamp(2.5rem,5vw,4.2rem)",
                fontWeight: 800,
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                marginBottom: 22,
                fontFamily: "var(--font-display)",
              }}
            >
              Intelligent AI systems for{" "}
              <span className="gradient-text">modern businesses</span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                maxWidth: 560,
                marginBottom: 34,
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
              }}
            >
              Meeraxu transforms organisations with AI-powered automation,
              intelligent workflows, scalable AI agents, and advanced language
              models designed to accelerate innovation and growth.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: 14,
                maxWidth: 560,
                marginBottom: 40,
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="glass"
                  style={{
                    padding: "18px 14px",
                    borderRadius: 16,
                    textAlign: "center",
                  }}
                >
                  <div
                    className="gradient-text"
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <CountUp
                      end={stat.n}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2.5}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {stat.l}
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <motion.div whileHover="hover" whileTap="tap" style={{ position: "relative" }}>
                  <button
                    className="btn-primary"
                    style={{
                      padding: "14px 28px",
                      borderRadius: 12,
                      fontWeight: 800,
                      background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.25)",
                      border: "none",
                      overflow: "hidden",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    Get Started
                    <motion.span
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 4 },
                      }}
                    >
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </motion.span>
                    <motion.div
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "100%" },
                      }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        zIndex: -1,
                      }}
                    />
                  </button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AboutVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services({ services = [], loading = false }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Blob
        style={{
          width: 520,
          height: 520,
          background: "rgba(139,92,246,0.06)",
          top: -140,
          left: -180,
        }}
      />
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="services-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "var(--purple)",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              What We Build
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-display)",
              }}
            >
              Six powerful.{" "}
              <span
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  color: "var(--purple)",
                }}
              >
                AI solutions.
              </span>
            </h2>
          </div>
          
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={scrollLeft}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Services Slider */}
        <div
          className="services-grid"
          ref={scrollContainerRef}
        >
          {services.length > 0 ? (
            services.map((service, i) => {
            // Get initials from service name (or use shortCode if available)
            const initials =
              service.shortCode ||
              service.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="hover-glow service-card"
                style={{
                  padding: 12,
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--card-bg)",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                {/* Avatar — shows uploaded image or gradient card with initials */}
                {(() => {
                  const imgUrl = getServiceImageUrl(service.icon);
                  return imgUrl ? (
                    <div
                      style={{
                        width: "80%",
                        aspectRatio: 1,
                        borderRadius: 12,
                        overflow: "hidden",
                        margin: "9px auto 0",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={service.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          // Fallback to gradient div if image fails
                          e.target.parentElement.style.background = "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)";
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "80%",
                        aspectRatio: 1,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)`,
                        position: "relative",
                        overflow: "hidden",
                        margin: "9px auto 0",
                      }}
                    >
                      {/* Diagonal stripe pattern overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)`,
                        }}
                      />
                      {/* Initials text */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          fontFamily: "var(--font-display)",
                          fontSize: 40,
                          color: "rgba(5, 13, 18, 0.85)",
                          fontWeight: 500,
                          letterSpacing: "-0.04em",
                          lineHeight: 0.85,
                          opacity: 0.85,
                        }}
                      >
                        {initials}
                      </div>
                    </div>
                  );
                })()}

                {/* Service info */}
                <div>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      marginBottom: 2,
                      color: "var(--white)",
                    }}
                  >
                    {service.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(234, 246, 243, 0.7)",
                      lineHeight: 1.5,
                    }}
                  >
                    {service.description}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
              No services published yet.
            </p>
          </div>
        )}
      </div>
    </div>

      <style>{`
        .hover-glow { 
          transition: box-shadow 0.3s ease, transform 0.3s ease; 
        }

        .hover-glow:hover { 
          box-shadow: 0 0 0 2px var(--purple), 0 20px 60px rgba(139, 92, 246, 0.35); 
          transform: translateY(-4px); 
        }

        .about-meeraxu-section {
          padding: 90px 60px 120px;
        }

        .about-meeraxu-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 50px;
          align-items: center;
        }

        .services-grid {
          display: flex;
          gap: 28px;
          margin-left: 30px;
          margin-right: 30px;
          padding: 10px 20px 80px 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }

        .services-grid::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        .service-card {
          flex: 0 0 calc(25% - 21px);
        }

        .services-header {
          margin-left: 50px;
        }

        .why-ai-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .cta-inner {
          padding: 72px 56px;
        }

        @media (max-width: 1024px) {
          .services-grid {
            margin-left: 0;
            margin-right: 0;
          }

          .service-card {
            flex: 0 0 calc(50% - 14px);
          }

          .services-header {
            margin-left: 0;
          }

          .why-ai-grid {
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .about-meeraxu-section {
            padding: 60px 24px 80px;
          }

          .about-meeraxu-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .services-grid {
            margin-left: 0;
            margin-right: 0;
            gap: 16px;
          }

          .service-card {
            flex: 0 0 85%;
          }

          .why-ai-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .cta-inner {
            padding: 48px 24px;
          }
        }

        }
      `}</style>
    </section>
  );
}

function WhyAI() {
  return (
    <section
      id="why-ai"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <Blob
        style={{
          width: 600,
          height: 400,
          background: "rgba(139,92,246,0.05)",
          top: "10%",
          left: "40%",
        }}
      />
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div
          className="why-ai-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="tag"
              style={{ marginBottom: 20, display: "inline-flex" }}
            >
              <Zap size={12} style={{ marginRight: 6 }} /> The Urgency
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginTop: 12,
                lineHeight: 1.1,
              }}
            >
              Why <span className="gradient-text">AI Now</span>?
            </h2>
            <p
              style={{
                marginTop: 18,
                color: "var(--muted)",
                lineHeight: 1.75,
                fontSize: "0.95rem",
              }}
            >
              The window for first-mover advantage is closing fast.
              Organisations that embed AI into their core operations today are
              building structural advantages that compound every year — in cost,
              speed, talent retention, and customer loyalty.
            </p>
            <p
              style={{
                marginTop: 14,
                color: "var(--muted)",
                lineHeight: 1.75,
                fontSize: "0.95rem",
              }}
            >
              At Meeraxu, we don't just implement AI tools — we redesign how
              your business thinks, operates, and scales in an
              intelligence-first world.
            </p>
            <motion.div whileHover="hover" whileTap="tap" style={{ position: "relative", width: "fit-content", marginTop: 36 }}>
              <button
                className="btn-primary"
                style={{
                  padding: "16px 32px",
                  borderRadius: 14,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.25)",
                  border: "none",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Link to="/about" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, color: "white" }}>
                  Learn Our Approach
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 4 },
                    }}
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </motion.span>
                </Link>
                <motion.div
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: "100%" },
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    zIndex: -1,
                  }}
                />
              </button>
            </motion.div>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {HOME_WHY_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="glass"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  whileHover={{
                    x: -4,
                    boxShadow: "0 16px 48px rgba(139,92,246,0.12)",
                  }}
                  style={{
                    borderRadius: 14,
                    padding: "24px 28px",
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "var(--purple-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color="var(--purple)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "Space Grotesk",
                          fontWeight: 700,
                          fontSize: "0.98rem",
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          textAlign: "right",
                          flexShrink: 0,
                          marginLeft: 16,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "Space Grotesk",
                            fontWeight: 800,
                            fontSize: "1.3rem",
                          }}
                          className="gradient-text"
                        >
                          {item.stat}
                        </div>
                        <div
                          style={{ fontSize: "0.66rem", color: "var(--muted)" }}
                        >
                          {item.statLabel}
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        color: "var(--muted)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section id="contact" style={{ padding: "80px 24px 100px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: 24,
            background:
              "linear-gradient(135deg, var(--purple-glow), transparent 60%)",
            filter: "blur(30px)",
            zIndex: -1,
          }}
        />
        <div
          className="glass cta-inner"
          style={{
            borderRadius: 22,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[280, 420, 560].map((size, index) => (
            <motion.div
              key={index}
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.6,
              }}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid var(--purple)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                pointerEvents: "none",
              }}
            />
          ))}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 32,
              right: 48,
              color: "var(--purple-glow)",
              opacity: 0.5,
            }}
          >
            <Sparkles size={28} />
          </motion.div>

          <span
            className="tag"
            style={{ marginBottom: 24, display: "inline-flex" }}
          >
            <ArrowRight size={12} style={{ marginRight: 6 }} /> Start Today
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 18,
            }}
          >
            Ready to Transform
            <br />
            <span className="gradient-text">Your Business with AI?</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.75,
              fontSize: "0.95rem",
            }}
          >
            Let's co-design the AI strategy your organisation deserves. From
            first consultation to full deployment — Meeraxu is your end-to-end
            partner.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <motion.div whileHover="hover" whileTap="tap" style={{ position: "relative" }}>
                <button
                  className="btn-primary"
                  style={{
                    padding: "16px 36px",
                    borderRadius: 14,
                    fontWeight: 800,
                    background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                    border: "none",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Start Your AI Journey
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 5 },
                    }}
                  >
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </motion.span>
                  <motion.div
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: "100%" },
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      zIndex: -1,
                    }}
                  />
                </button>
              </motion.div> onClick={(e) => { e.preventDefault(); window.location.href = '/contact#contact-form'; }}
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "var(--purple-dim)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
                style={{
                  padding: "16px 36px",
                  borderRadius: 14,
                  fontWeight: 800,
                  border: "2px solid var(--purple)",
                  color: "var(--purple)",
                }}
              >
                Schedule a Demo
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/services`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main style={{ paddingTop: 0 }}>
      <Hero />
      <TrustedByMarquee />
      <AboutMeeraxu />
      <Services services={services} loading={loading} />
      <WhyAI />
      <CTABanner />
      <Footer />
    </main>
  );
}
