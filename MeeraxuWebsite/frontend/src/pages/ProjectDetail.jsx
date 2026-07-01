import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Code, Play, Image as ImageIcon } from "lucide-react";
import { Footer } from "../components/Footer";
import { projectsAPI } from "../api/client";

function ProjectHero({ project }) {
  return (
    <section
      style={{
        padding: "112px 24px 88px",
        minHeight: "85vh",
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
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6 }}
          style={{ marginBottom: 24 }}
        >
          <span className="tag">
            <span style={{ fontSize: 12 }}>📊</span> {project.category}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.72 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.66 }}
          style={{
            color: "var(--muted)",
            fontSize: "1.05rem",
            lineHeight: 1.82,
            maxWidth: 720,
            marginBottom: 40,
          }}
        >
          {project.description}
        </motion.p>
      </div>
    </section>
  );
}

function ProjectGallery({ gallery, projectTitle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [gallery.length]);

  if (!gallery || gallery.length === 0) return null;
  const total = gallery.length;

  const cardWidth = isMobile ? 280 : 380;
  const cardHeight = isMobile ? 240 : 330;
  const shiftAmount = isMobile ? 310 : 410;

  return (
    <section style={{ padding: "80px 24px 120px", background: "rgba(5, 13, 18, 0.5)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          <span className="tag" style={{ marginBottom: 16 }}>Project Showcase</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>Visual Deep Dive</h2>
        </motion.div>

        {/* 3D Stacked Carousel Container */}
        <div 
          style={{
            position: "relative",
            height: cardHeight + 60,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            overflow: "visible",
          }}
        >
          {gallery.map((item, i) => {
            let diff = i - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isVisible = isCenter || isLeft || isRight || (total === 2);

            return (
              <motion.div
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{
                  scale: isCenter ? 1.08 : 0.86,
                  x: isCenter ? 0 : (isLeft ? -shiftAmount : shiftAmount),
                  zIndex: isCenter ? 10 : 5,
                  opacity: isVisible ? (isCenter ? 1 : (isMobile ? 0 : 0.55)) : 0,
                  filter: isCenter ? "brightness(1) blur(0px)" : "brightness(0.4) blur(1.5px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
                className="gallery-card glass"
                style={{
                  position: "absolute",
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  border: isCenter ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isCenter 
                    ? "0 20px 40px rgba(139, 92, 246, 0.22)" 
                    : "0 8px 20px rgba(0, 0, 0, 0.4)",
                  pointerEvents: isVisible && (isCenter || !isMobile) ? "auto" : "none",
                  userSelect: "none",
                }}
              >
                <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "rgba(0,0,0,0.2)" }}>
                  {item.mediaType === "image" && (
                    <img
                      src={item.url}
                      alt={`${projectTitle} - Preview ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      draggable="false"
                    />
                  )}
                  {item.mediaType === "video" && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.url?.includes("youtube.com") || item.url?.includes("youtu.be") ? (
                        <iframe
                          src={item.url.replace("watch?v=", "embed/").split("&")[0]}
                          style={{ width: "100%", height: "100%", border: "none" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      )}
                    </div>
                  )}
                  {item.mediaType === "code" && (
                    <div style={{ padding: 18, height: "100%", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--purple)", background: "#050d12" }}>
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                        <code>{item.content}</code>
                      </pre>
                    </div>
                  )}
                  
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <div className="glass" style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                      {item.mediaType === "image" && <ImageIcon size={14} color="var(--purple)" />}
                      {item.mediaType === "video" && <Play size={14} color="var(--purple)" />}
                      {item.mediaType === "code" && <Code size={14} color="var(--purple)" />}
                    </div>
                  </div>
                </div>

                <div className="card-glow" />
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        .gallery-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .gallery-card:hover {
          border-color: rgba(139, 92, 246, 0.5) !important;
        }
        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .gallery-card:hover .card-glow {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

export function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getOne(projectId);
        
        // Map API data to the format expected by the component
        const mappedProject = {
          ...data,
          image: data.imageUrl,
          stats: data.stats || data.technologies?.join(" | ") || "Innovation | Excellence",
          phases: data.phases || [],
          gallery: data.gallery || []
        };
        
        setProject(mappedProject);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        navigate("/about");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    window.scrollTo(0, 0);
    setActive(0);
  }, [projectId, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-purple-primary/30 border-t-purple-primary rounded-full animate-spin"></div>
          <div className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
            Loading Project...
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const hasPhases = project.phases && project.phases.length > 0;
  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <>
      <ProjectHero project={project} />

      {hasPhases ? (
        <section style={{ padding: "64px 24px 86px", position: "relative" }}>
          {/* ... existing content ... */}
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* Phase picker */}
            <div
              style={{
                position: "sticky",
                top: 120,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {project.phases.map((phase, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  style={{
                    textAlign: "left",
                    padding: "20px 20px",
                    borderRadius: 16,
                    background: active === i ? "var(--purple)" : "transparent",
                    color: active === i ? "white" : "var(--muted)",
                    border:
                      active === i ? "none" : "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "var(--font-body)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      opacity: 0.7,
                    }}
                  >
                    {phase.n}
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}
                    >
                      {phase.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        opacity: 0.75,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {phase.sub}
                    </div>
                  </div>
                </motion.button>
              ))}

              <div style={{ margin: "16px 0 0" }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "0 4px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    animate={{
                      width: `${((active + 1) / project.phases.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: "var(--purple)",
                      boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  {active + 1} / {project.phases.length}
                </div>
              </div>
            </div>

            {/* Active phase */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ minHeight: 540 }}
            >
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 140,
                      lineHeight: 0.8,
                      fontWeight: 500,
                      letterSpacing: "-0.05em",
                      color: "var(--purple)",
                      textShadow: "0 0 40px rgba(139, 92, 246, 0.4)",
                    }}
                  >
                    {project.phases[active].n}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {project.phases[active].sub}
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3.2rem)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                      }}
                    >
                      {project.phases[active].title}
                    </h2>
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 18,
                    maxWidth: 640,
                    marginBottom: 32,
                    lineHeight: 1.6,
                  }}
                >
                  {project.phases[active].body}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 32,
                  }}
                >
                  {(project.phases[active].bullets || []).map((bullet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        padding: "14px 16px",
                        borderRadius: 12,
                        background: "rgba(139, 92, 246, 0.08)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "var(--purple)",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        ✓
                      </div>
                      {bullet}
                    </motion.div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 48,
                    gap: 16,
                  }}
                >
                  <motion.button
                    onClick={() => setActive(Math.max(0, active - 1))}
                    disabled={active === 0}
                    whileHover={active > 0 ? { x: -4 } : {}}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: active === 0 ? "rgba(255,255,255,0.3)" : "white",
                      cursor: active === 0 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </motion.button>

                  <motion.button
                    onClick={() =>
                      setActive(Math.min(project.phases.length - 1, active + 1))
                    }
                    disabled={active === project.phases.length - 1}
                    whileHover={
                      active < project.phases.length - 1 ? { x: 4 } : {}
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      background:
                        active === project.phases.length - 1
                          ? "rgba(139, 92, 246, 0.3)"
                          : "var(--purple)",
                      border: "none",
                      color: "white",
                      cursor:
                        active === project.phases.length - 1
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                    }}
                  >
                    Next phase
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          </div>
        </section>
      ) : (
        <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--muted)" }}>
          <p>No implementation phases added for this project.</p>
        </div>
      )}

      <ProjectGallery gallery={project.gallery} projectTitle={project.title} />

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          section > div > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          div[style*="position: sticky"] {
            position: static !important;
            top: auto !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            gap: 8px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          div[style*="position: sticky"]::-webkit-scrollbar {
            display: none;
          }

          div[style*="position: sticky"] > button {
            flex-shrink: 0 !important;
            min-width: 160px !important;
          }
        }

        @media (max-width: 560px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
