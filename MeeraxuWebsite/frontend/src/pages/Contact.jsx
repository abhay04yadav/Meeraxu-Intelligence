import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { contactFormsAPI } from "../api/client";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    title: "General Inquiries",
    info: "hello@meeraxu.ai",
    text: "Best for partnership, onboarding, and project discussions.",
  },
  {
    icon: Phone,
    title: "Phone Line",
    info: "+1 (800) 000-0000",
    text: "Monday to Friday, 9:00 AM to 6:00 PM EST.",
  },
  {
    icon: MapPin,
    title: "Base Location",
    info: "San Francisco, CA",
    text: "Remote-first with global delivery support.",
  },
];

const CONTACT_FAQS = [
  {
    question: "How quickly do you reply after form submission?",
    answer:
      "Most messages receive a response within one business day, often earlier for active project requests.",
  },
  {
    question: "What should I include in the message?",
    answer:
      "Share your current challenge, target outcome, timeline, and any tools or systems involved.",
  },
  {
    question: "Do you support startups and small teams?",
    answer:
      "Yes. We work with early-stage startups, growth teams, and enterprise organizations.",
  },
  {
    question: "Can we start with a discovery session?",
    answer:
      "Absolutely. We can begin with a focused discovery call to scope priorities and quick wins.",
  },
];

function ContactHero() {
  return (
    <section
      style={{
        padding: "112px 24px 0px",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ x: [0, 30, -18, 0], y: [0, -26, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -90,
          left: -130,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.08)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -24, 18, 0], y: [0, 30, -12, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: -120,
          bottom: -160,
          width: 430,
          height: 430,
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.07)",
          filter: "blur(56px)",
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
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 20 }}
        >
          <span className="tag">
            <Sparkles size={12} style={{ marginRight: 6 }} /> Contact Meeraxu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.72 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.2rem)",
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            maxWidth: 1100,
          }}
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.64 }}
          style={{
            color: "var(--muted)",
            lineHeight: 1.8,
            maxWidth: 1000,
            marginBottom: 40,
            fontSize: "1.05rem",
          }}
        >
          Have a question or ready to start your AI journey? We'd love to hear
          from you.
        </motion.p>
      </div>
    </section>
  );
}

const PROJECT_TYPES = [
  "AI-Powered Analytics Platform",
  "Automation Workflow Engine",
  "ML Model Optimization",
  "Enterprise Integration Suite",
  "Custom AI Chatbot / Agent",
  "Data Pipeline & ETL",
  "Other / Not Sure Yet",
];

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    project: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (data) => {
    const errs = {};
    // Mandatory fields
    if (!data.name.trim()) errs.name = "Full name is required.";
    else if (data.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (!data.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Enter a valid email address.";
    // Optional field soft validation (only if filled)
    if (data.subject.trim() && data.subject.trim().length < 4)
      errs.subject = "Subject must be at least 4 characters.";
    if (data.message.trim() && data.message.trim().length < 20)
      errs.message = "Message should be at least 20 characters.";
    return errs;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setFieldErrors(validate(updated));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors(validate(formData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      subject: true,
      project: true,
      message: true,
    };
    setTouched(allTouched);
    const errs = validate(formData);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await contactFormsAPI.submit({
        name: formData.name,
        email: formData.email,
        subject: formData.project
          ? `[${formData.project}] ${formData.subject || "No subject"}`
          : formData.subject || "No subject",
        message: formData.message || "(No message provided)",
      });

      setSuccessMessage(
        "Thank you! Your message has been sent successfully. Our team will contact you soon.",
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        project: "",
        message: "",
      });
      setTouched({});
      setFieldErrors({});

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrorMessage(
        "Error sending message. Please try again later or contact us directly.",
      );
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        padding: "48px 24px 24px",
        background: "rgba(139, 92, 246, 0.04)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          style={{ textAlign: "center", marginBottom: 40, marginTop: 0 }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Contact <span className="gradient-text">Details + Info</span>
          </h2>
        </motion.div>

        <div
          className="contact-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "stretch",
            minHeight: 10,
          }}
        >
          {/* Left Side - Image with Overlay Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62 }}
            style={{
              position: "relative",
              borderRadius: 28,
              overflow: "hidden",
              minHeight: 0,
            }}
            // Slightly reduce visual height so it's a bit shorter than the form
            // cap the max height relative to the available height and add vertical margin
            style={{
              position: "relative",
              borderRadius: 28,
              overflow: "hidden",
              minHeight: 0,
              maxHeight: "calc(100% - 40px)",
              margin: "20px 0",
            }}
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=700&q=90"
              alt="Contact and communication"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.55) 100%)",
                zIndex: 1,
              }}
            />

            {/* Content overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                padding: 24,
                justifyContent: "space-between",
                gap: 20,
                zIndex: 2,
              }}
            >
              {/* Top section - Heading */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 24,
                    paddingX: 12,
                    paddingY: 6,
                    borderRadius: 20,
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.08em",
                      color: "var(--purple)",
                    }}
                  >
                    Reach Out
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "2.1rem",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginTop: 12,
                    maxWidth: 260,
                  }}
                >
                  Need More Information?
                </h3>
              </div>

              {/* Bottom section - Contact details */}
              <div style={{ display: "grid", gap: 16 }}>
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: "rgba(139, 92, 246, 0.3)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color="var(--purple)" />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--purple)",
                            marginBottom: 3,
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {item.info}
                        </p>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "rgba(234, 246, 243, 0.8)",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62, delay: 0.08 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignSelf: "start",
              border: "none",
              borderRadius: 28,
              padding: 24,
            }}
          >
            {/* Form header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Start a Conversation
              </p>
              <h2
                style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2 }}
              >
                Send Message
              </h2>
            </motion.div>

            {/* Success/Error Messages */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                  borderRadius: 8,
                  color: "#4CAF50",
                  fontSize: "0.9rem",
                }}
              >
                {successMessage}
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 87, 34, 0.1)",
                  border: "1px solid rgba(255, 87, 34, 0.3)",
                  borderRadius: 8,
                  color: "#FF5722",
                  fontSize: "0.9rem",
                }}
              >
                {errorMessage}
              </motion.div>
            )}

            {/* Form content */}
            <motion.form
              id="contact-form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass"
              style={{
                borderRadius: 22,
                padding: "28px 24px",
                display: "grid",
                gap: 20,
              }}
            >
              <div className="contact-input-grid">
                <label className="contact-label">
                  <span style={{ display: "inline" }}>
                    Full Name <span style={{ color: "var(--purple)" }}>*</span>
                  </span>
                  <input
                    className="contact-input"
                    style={
                      fieldErrors.name && touched.name
                        ? { borderColor: "#ef4444" }
                        : {}
                    }
                    type="text"
                    name="name"
                    placeholder="e.g. Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                  {fieldErrors.name && touched.name && (
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: "0.78rem",
                        marginTop: 4,
                        display: "block",
                      }}
                    >
                      ⚠ {fieldErrors.name}
                    </span>
                  )}
                </label>
                <label className="contact-label">
                  <span style={{ display: "inline" }}>
                    Email <span style={{ color: "var(--purple)" }}>*</span>
                  </span>
                  <input
                    className="contact-input"
                    style={
                      fieldErrors.email && touched.email
                        ? { borderColor: "#ef4444" }
                        : {}
                    }
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                  {fieldErrors.email && touched.email && (
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: "0.78rem",
                        marginTop: 4,
                        display: "block",
                      }}
                    >
                      ⚠ {fieldErrors.email}
                    </span>
                  )}
                </label>
              </div>

              <label className="contact-label">
                Project Type
                <div style={{ position: "relative" }}>
                  <select
                    className="contact-input"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    style={{
                      appearance: "none",
                      paddingRight: 40,
                      cursor: "pointer",
                      ...(fieldErrors.project && touched.project
                        ? { borderColor: "#ef4444" }
                        : {}),
                    }}
                  >
                    <option value="">— Select a project type —</option>
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "var(--purple)",
                    }}
                  >
                    ▾
                  </span>
                </div>
                {fieldErrors.project && touched.project && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "0.78rem",
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    ⚠ {fieldErrors.project}
                  </span>
                )}
              </label>

              <label className="contact-label">
                Subject
                <input
                  className="contact-input"
                  style={
                    fieldErrors.subject && touched.subject
                      ? { borderColor: "#ef4444" }
                      : {}
                  }
                  type="text"
                  name="subject"
                  placeholder="Brief description of your inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                {fieldErrors.subject && touched.subject && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "0.78rem",
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    ⚠ {fieldErrors.subject}
                  </span>
                )}
              </label>

              <label className="contact-label">
                Message
                <textarea
                  className="contact-input"
                  style={
                    fieldErrors.message && touched.message
                      ? { borderColor: "#ef4444" }
                      : {}
                  }
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  {fieldErrors.message && touched.message ? (
                    <span style={{ color: "#ef4444", fontSize: "0.78rem" }}>
                      ⚠ {fieldErrors.message}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color:
                        formData.message.length < 20
                          ? "var(--muted)"
                          : "var(--purple)",
                    }}
                  >
                    {formData.message.length} / 20 min chars
                  </span>
                </div>
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--muted)",
                    fontSize: "0.8rem",
                  }}
                >
                  <ShieldCheck size={15} color="var(--purple)" /> Private and
                  secure handling
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Inquiry"} <Send size={16} />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section style={{ padding: "84px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          <span className="tag" style={{ marginBottom: 12 }}>
            <Sparkles size={12} style={{ marginRight: 6 }} /> FAQ
          </span>
          <h2
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: 12 }}
          >
            Answers to common <span className="gradient-text">questions</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            If your question is not listed here, contact us and we will guide
            you personally.
          </p>
        </motion.div>

        <div style={{ display: "grid", gap: 12 }}>
          {CONTACT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                className="glass"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                style={{ borderRadius: 16, overflow: "hidden" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    color: "var(--white)",
                    padding: "18px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} color="var(--purple)" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 18px 18px",
                          color: "var(--muted)",
                          lineHeight: 1.75,
                          fontSize: "0.92rem",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  useEffect(() => {
    if (window.location.hash) {
      const elementId = window.location.hash.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactFAQ />
      <Footer />

      <style>{`
        .contact-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 44px;
          align-items: center;
        }

        .contact-highlight-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
          gap: 20px;
          align-items: stretch;
        }

        .contact-steps-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .contact-input-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .contact-label {
          display: grid;
          gap: 8px;
          color: var(--muted);
          font-size: 0.84rem;
          font-weight: 600;
        }

        .contact-input {
          width: 100%;
          border: 1px solid var(--border);
          background: rgba(11, 26, 34, 0.9);
          color: var(--white);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .contact-input:focus {
          border-color: var(--purple);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.16);
        }

        .contact-input[type="textarea"],
        textarea.contact-input {
          resize: vertical;
          min-height: 130px;
        }

        @media (max-width: 1024px) {
          .contact-hero-grid,
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .contact-highlight-grid,
          .contact-input-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .contact-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
