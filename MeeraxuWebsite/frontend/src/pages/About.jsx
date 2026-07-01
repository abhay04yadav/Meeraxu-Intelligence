import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { projectsAPI } from "../api/client";

const ABOUT_PILLARS = [
  {
    icon: Target,
    title: "Mission",
    text: "Deliver practical AI systems that improve speed, quality, and decision-making for modern teams.",
  },
  {
    icon: Lightbulb,
    title: "Vision",
    text: "Shape an intelligence-first future where automation feels natural, responsible, and deeply human.",
  },
];

const ABOUT_VALUES = [
  "Build for real outcomes",
  "Design with clarity",
  "Move fast with care",
  "Grow through partnership",
];



function AboutHero() {
  return (
    <section
      style={{
        padding: "112px 24px 88px",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ x: [0, 32, -18, 0], y: [0, -28, 22, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -80,
          left: -110,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.08)",
          filter: "blur(46px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -25, 20, 0], y: [0, 30, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: -120,
          bottom: -160,
          width: 430,
          height: 430,
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.08)",
          filter: "blur(54px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="about-hero-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            style={{ marginBottom: 22 }}
          >
            <span className="tag">
              <Sparkles size={12} style={{ marginRight: 6 }} /> About Meeraxu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.72 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            We build AI that turns complexity into{" "}
            <span className="gradient-text">clear momentum</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.66 }}
            style={{
              color: "var(--muted)",
              fontSize: "1.02rem",
              lineHeight: 1.82,
              maxWidth: 640,
              marginBottom: 30,
            }}
          >
            Meeraxu helps teams design, launch, and scale AI systems that are
            useful on day one and stronger over time. We combine strategic
            thinking, deep engineering, and focused execution.
          </motion.p>
        </div>

        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.24, duration: 0.76 }}
          style={{
            borderRadius: 26,
            padding: 16,
            position: "relative",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(139,92,246,0.12), rgba(14,165,233,0.06))",
              pointerEvents: "none",
              borderRadius: 26,
            }}
          />

          {/* Organic top-left flowing shape with dotted pattern */}
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: -35,
              left: -35,
              width: 100,
              height: 100,
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)",
              borderRadius: "50% 45% 52% 48%",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 120,
              height: 120,
              backgroundImage:
                "radial-gradient(circle, rgba(139, 92, 246, 0.25) 2px, transparent 2px)",
              backgroundSize: "12px 12px",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.6,
            }}
          />

          {/* Bottom-right organic flowing shape */}
          <motion.div
            animate={{ rotate: [360, 0], scale: [1, 1.08, 1] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            style={{
              position: "absolute",
              bottom: -40,
              right: -40,
              width: 110,
              height: 110,
              background:
                "linear-gradient(135deg, rgba(109, 40, 217, 0.12), rgba(139, 92, 246, 0.08))",
              borderRadius: "45% 55% 50% 48%",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -28,
              right: -28,
              width: 95,
              height: 95,
              border: "3px solid rgba(139, 92, 246, 0.5)",
              borderRadius: "40% 60% 50% 48%",
              zIndex: 0,
            }}
          />

          {/* Right side flowing accent with animation */}
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: "absolute",
              right: -25,
              top: "40%",
              width: 70,
              height: 70,
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)",
              borderRadius: "50% 48% 52% 50%",
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              right: -15,
              top: "42%",
              width: 50,
              height: 50,
              backgroundImage:
                "radial-gradient(circle, rgba(196, 181, 253, 0.4) 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />

          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              overflow: "hidden",
              padding: "4px",
              background:
                "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 50%, var(--purple-light) 100%)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
            }}
          >
            <div
              style={{
                borderRadius: "28% 68% 68% 28% / 28% 28% 68% 68%",
                overflow: "hidden",
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "16/10",
                  objectFit: "cover",
                }}
              >
                <source
                  src="https://videos.pexels.com/video-files/6804104/6804104-sd_960_506_25fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              marginTop: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              {
                title: "Strategy-led",
                text: "From business goal to AI roadmap",
              },
              {
                title: "Execution-ready",
                text: "Designed for real production teams",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  borderRadius: 14,
                  padding: "13px 12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutStoryAndVision() {
  return (
    <section style={{ padding: "48px 24px 84px", position: "relative" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          className="story-grid"
        >
          {/* Left: Title Section */}
          <div className="story-sticky">
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
              Who We Are
            </div>
            <h2
              style={{
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-display)",
              }}
            >
              We build{" "}
              <span
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  color: "var(--purple)",
                }}
              >
                practical
              </span>{" "}
              AI.
            </h2>
          </div>

          {/* Right: Scrollable Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Supporting Intro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(234, 246, 243, 0.75)",
                  margin: 0,
                }}
              >
                We partner with visionary leaders who understand that true transformation requires more than tooling. It requires expertise, commitment, and a relentless focus on outcomes that matter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(234, 246, 243, 0.75)",
                  margin: 0,
                }}
              >
                Every system we build is custom. Every integration is purposeful. Every decision traces back to your business impact. We don't optimize for metrics—we optimize for results that compound.
              </p>
            </motion.div>

            {/* Blockquote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                padding: "20px 24px",
                borderLeft: "3px solid var(--purple)",
                background: "rgba(139, 92, 246, 0.08)",
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "rgba(234, 246, 243, 0.9)",
                lineHeight: 1.6,
                marginTop: 16,
              }}
            >
              "We're not here to build features. We're here to build competitive
              advantages. Your intelligence should feel like an unfair
              advantage, not a technology purchase."
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "rgba(234, 246, 243, 0.5)",
                  fontStyle: "normal",
                  marginTop: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                — Our founding principle
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isActive, onHover, isSlider, isMobile }) {
  const navigate = useNavigate();
  const contentItem = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onClick={() => navigate(`/project/${project._id}`)}
      transition={{
        layout: {
          type: "spring",
          stiffness: 58,
          damping: 28,
          mass: 1,
        },
      }}
      animate={{
        flex: isSlider ? "0 0 auto" : (isActive ? 3 : 1.08),
        width: isSlider ? (isActive ? (isMobile ? 280 : 450) : (isMobile ? 160 : 240)) : "auto",
      }}
      style={{
        position: "relative",
        height: "100%",
        minWidth: isSlider ? "auto" : "94px",
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        background: "#09090f",
        border: "1px solid rgba(139,92,246,0.12)",
        flexShrink: isSlider ? 0 : 1,
      }}
      className="project-card"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        animate={{
          scale: isActive ? 1.035 : 1,
        }}
        transition={{
          duration: 1.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.58) saturate(0.82) contrast(0.94)",
        }}
      />

      <motion.div
        animate={{
          background: isActive
            ? "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(8,5,25,0.9) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.94))",
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.9,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(8,5,25,0.24) 52%, rgba(8,5,25,0.94) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.9) 100%)",
          mixBlendMode: "normal",
        }}
      />

      <motion.div
        animate={{
          opacity: isActive ? 0 : 1,
          y: isActive ? 8 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            maxWidth: "100%",
            padding: "9px 14px",
            borderRadius: 999,
            background: "rgba(10, 8, 24, 0.58)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            color: "white",
            fontWeight: 800,
            fontSize: "0.82rem",
            letterSpacing: "0.06em",
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
          }}
        >
          {project.title}
        </span>
      </motion.div>

      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 18,
        }}
        transition={{
          duration: 0.62,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "28px",
          zIndex: 10,
          pointerEvents: isActive ? "auto" : "none",
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          variants={contentItem}
          animate={isActive ? "visible" : "hidden"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            padding: "8px 14px",
            borderRadius: 999,
            marginBottom: 16,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            willChange: "transform, opacity",
          }}
        >
          <span
            style={{
              color: "var(--purple-light)",
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {project.category.toUpperCase()}
          </span>
        </motion.div>

        <motion.h3
          variants={contentItem}
          animate={isActive ? "visible" : "hidden"}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: isActive ? 0.06 : 0,
          }}
          style={{
            fontSize: "clamp(1.45rem, 2.2vw, 2rem)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            marginBottom: 20, // Increased margin since description is removed
            maxWidth: 440,
            willChange: "transform, opacity",
          }}
        >
          {project.title}
        </motion.h3>

        <motion.div
          variants={contentItem}
          animate={isActive ? "visible" : "hidden"}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: isActive ? 0.12 : 0, // Adjusted delay
          }}
          style={{
            width: "fit-content",
            position: "relative",
            overflow: "hidden",
            borderRadius: 14,
          }}
        >
          <motion.div
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            className="explore-btn-wrapper"
          >
            <div
              style={{
                padding: "14px 26px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
                color: "white",
                fontWeight: 800,
                fontSize: "0.92rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              Explore Project
              <motion.span
                variants={{
                  initial: { x: 0 },
                  hover: { x: 5 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </motion.span>
            </div>

            {/* Glossy/Shimmer effect */}
            <motion.div
              variants={{
                initial: { x: "-100%", opacity: 0 },
                hover: { x: "100%", opacity: 0.6 },
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 94,
        borderRadius: 24,
        background: "rgba(139,92,246,0.06)",
        border: "1px solid rgba(139,92,246,0.12)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(14,165,233,0.04))",
        }}
      />
    </div>
  );
}

function AboutProjects({ projects = [], loading = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSlider = projects.length > 4;

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
      style={{
        padding: "84px 24px",
        background: "rgba(139,92,246,0.02)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isSlider ? "row" : "column",
            justifyContent: isSlider ? "space-between" : "center",
            alignItems: isSlider ? "flex-end" : "center",
            textAlign: isSlider ? "left" : "center",
            marginBottom: 46,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <span className="projects-tag">OUR PROJECTS</span>

            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginTop: 18,
                marginBottom: 16,
              }}
            >
              Built for <span className="gradient-text">real impact</span>
            </h2>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: 700,
                margin: isSlider ? "0" : "0 auto",
              }}
            >
              A showcase of intelligent systems, automation platforms, and
              AI-driven experiences crafted for modern businesses.
            </p>
          </div>

          {isSlider && (
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
          )}
        </div>

        {loading ? (
          <div className="projects-wrapper">
            {[0, 1, 2, 3].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "64px 24px",
              border: "1px dashed rgba(139,92,246,0.2)",
              borderRadius: 24,
              color: "var(--muted)",
            }}
          >
            <p style={{ fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
              No projects yet. New projects will appear here soon.
            </p>
          </motion.div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className={`projects-wrapper ${isSlider ? "projects-slider" : ""}`}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={{
                  ...project,
                  image: project.imageUrl,
                  stats: project.technologies?.join(" | ") || "",
                }}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                isSlider={isSlider}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function AboutCTA() {
  return (
    <section style={{ padding: "90px 24px 100px" }}>
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.72 }}
        style={{
          maxWidth: 980,
          margin: "0 auto",
          borderRadius: 24,
          padding: "58px 34px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 5.5, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: "50%",
            border: "1px solid var(--purple)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
            marginBottom: 16,
            position: "relative",
            zIndex: 1,
          }}
        >
          Ready to build with <span className="gradient-text">Meeraxu</span>?
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            color: "var(--muted)",
            lineHeight: 1.8,
            marginBottom: 30,
            position: "relative",
            zIndex: 1,
          }}
        >
          If you are exploring automation, AI products, or end-to-end
          transformation, we can help you map the next step with clarity.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: "relative", zIndex: 1, display: "inline-block" }}
        >
          <Link
            to="/contact#contact-form"
            className="btn-primary"
            style={{ 
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: "1rem",
              background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%)",
              color: "white",
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>Enquire Now</span>
            <motion.span
              style={{ position: "relative", zIndex: 2 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.span>

            {/* Shine effect */}
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                zIndex: 1,
              }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function About() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getAll();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <AboutHero />
      <AboutStoryAndVision />
      <AboutProjects projects={projects} loading={loading} />
      <AboutCTA />
      <Footer />

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
          gap: 46px;
          align-items: center;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
        }

        .story-sticky {
          position: sticky;
          top: 120px;
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .about-purpose-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(280px, 0.94fr);
          gap: 24px;
          align-items: start;
        }

        .projects-tag {
          color: var(--purple);
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .projects-wrapper {
          display: flex;
          gap: 12px;
          height: 390px;
          overflow: hidden;
        }

        .projects-slider {
          overflow-x: auto !important;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
          padding: 10px 10px 40px 10px;
          margin-bottom: -30px;
        }
        
        .projects-slider::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        .project-card {
          transition:
            box-shadow 1s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            flex 1s cubic-bezier(0.22, 1, 0.36, 1);

          box-shadow:
            0 8px 30px rgba(0,0,0,0.28),
            0 0 0 1px rgba(139,92,246,0.06);
        }

        .project-card:hover {
          box-shadow:
            0 18px 50px rgba(139,92,246,0.18),
            0 0 0 1px rgba(139,92,246,0.14);
        }

        @media (max-width: 980px) {
          .about-hero-grid,
          .about-purpose-grid {
            grid-template-columns: 1fr;
          }

          .about-pillars-grid {
            grid-template-columns: 1fr;
          }

          .story-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .story-sticky {
            position: static;
            top: auto;
          }

          .projects-wrapper:not(.projects-slider) {
            display: grid;
            grid-template-columns: 1fr;
            height: auto;
            gap: 18px;
          }

          .projects-slider {
            height: 390px !important;
          }

          .projects-wrapper:not(.projects-slider) .project-card {
            min-width: 100% !important;
            height: 320px !important;
          }
        }

        @media (max-width: 640px) {
          .about-hero-grid {
            gap: 28px;
          }
        }
      `}</style>
    </>
  );
}
