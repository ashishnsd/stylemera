import React from "react";

// Import Playwrite CU Guides font in JS (for Vite/React projects, best to add in index.html or CSS, but can be loaded here for demo)
const playwriteFont = document && document.fonts ? document.fonts.load("1em 'Playwrite CU Guides'") : null;
import { motion, useScroll, useTransform } from "framer-motion";

export default function PerfumeLanding() {
  const { scrollY } = useScroll();

  // IMG22 scroll animation (fast up, delayed down)
  // 0-60: moves up fast, 60-120: stays, 120-500: returns slowly
  const imageY = useTransform(scrollY, [0, 60, 120, 500], [0, -48, -48, 0]);

  // moving overlay text: starts off-screen right, comes in on scroll, then exits left
  // 0: 1200px (off-screen right), 300: -1200px (off-screen left)
  const x = useTransform(scrollY, [0, 300], [1200, -1200]);

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.scriptText}>
            Your Fragrance Your Life
          </div>

          {/* Image stack */}
          <div style={styles.imageWrapper}>
            {/* Back image */}
            <img
              src="/src/assets/images/IMAGES/img/CUTIMG/IMG21.png"
              alt="Background scent"
              style={styles.bottomImage}
            />

            {/* Moving overlay text (below images) */}
            <motion.div style={{ ...styles.overlayText, x }}>
              A SCENT THAT LINGERS LIKE A SECRET, IMPOSSIBLE TO FORGET.
            </motion.div>

            {/* Front image (moves on scroll, now on top) */}
            <motion.img
              src="/src/assets/images/IMAGES/img/CUTIMG/IMG22.png"
              alt="Fragrance"
              style={{ ...styles.topImage, y: imageY, zIndex: 3 }}
            />
          </div>

          <h1 style={styles.heroTitle}>
            Premium <span style={styles.gold}>Scent</span>
          </h1>

          <p style={styles.tagline}>
            Crafted for elegance. Designed for memory.
          </p>

          <button style={styles.cta}>Explore Collection</button>
        </div>
      </section>

      {/* STORY */}
      <section style={styles.story}>
        <div style={styles.storyInner}>
          <img src="/src/assets/images/IMAGES/img/IMG7.png" alt="IMG7" style={{ display: 'block', margin: '0 auto 0px', marginTop: 0, borderRadius: 28 }} />
          <h2 style={styles.sectionTitle}>The Scent Story</h2>
          <p style={styles.storyText}>
            A whisper of midnight rose, dancing with amber shadows.
            Each note unfolds like a secret crafted in Grasse.
          </p>
        </div>
      </section>

      {/* COLLECTION */}
      <section style={styles.collection}>
        <h2 style={styles.sectionTitle}>The Collection</h2>

        <div style={styles.grid}>
          {/* Left card with IMG1 */}
          <div style={styles.card}>
            <img src="/src/assets/images/IMAGES/img/IMG1.png" alt="IMG1" style={{ borderRadius: 24, marginBottom: 8 }} />
            <h3 style={styles.cardTitle}>Noir Absolu</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
          {/* Center card with IMG13 */}
          <div style={styles.card}>
            <img src="/src/assets/images/IMAGES/img/IMG13.png" alt="IMG13" style={{ borderRadius: 24, marginBottom: 8 }} />
            <h3 style={styles.cardTitle}>Rose Obscure</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
          {/* Right card with IMG2 */}
          <div style={styles.card}>
            <img src="/src/assets/images/IMAGES/img/IMG2.png" alt="IMG2" style={{ borderRadius: 24, marginBottom: 8 }} />
            <h3 style={styles.cardTitle}>Ambre Nocturne</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 NOIR LUXURY PARFUM
      </footer>
    </div>
  );
}

const styles = {
  page: {
    background: "#0a0a0a",
    color: "#f8f8f8",
    fontFamily: "sans-serif",
    minHeight: "100vh",
    padding: 0,
    overflowX: "hidden",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background:
      "radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 60%)",
    padding: "12px 8px 0 8px",
    boxSizing: "border-box",
  },

  heroContent: {
    maxWidth: 400,
    width: "100%",
    margin: "0 auto",
    padding: "0 8px",
    boxSizing: "border-box",
  },

  scriptText: {
    color: "#d4af37",
    fontSize: "clamp(32px,8vw,60px)",
    fontFamily: "'Playwrite CU Guides', cursive",
    marginBottom: 12
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 320,
    height: 320,
    marginTop: 12,
    marginBottom: 12,
    boxSizing: "border-box",
  },

  overlayText: {
    position: "absolute",
      top: 20,
      left: "10%",
    right: 0,
    margin: '0 auto',
    width: "100%",
    maxWidth: 320,
    textAlign: "center",
    fontWeight: 700,
    letterSpacing: "0.08em",
      fontSize: "clamp(22px,5vw,36px)",
    textTransform: "uppercase",
      whiteSpace: "nowrap",
    zIndex: 3
  },

  topImage: {
    position: "absolute",
    top: 0,
    left: "25%",
    width: "60%",
    borderRadius: 24,
    zIndex: 2
  },

  bottomImage: {
    position: "absolute",
    top: 60,
    left: "25%",
    width: "60%",
    borderRadius: 24,
    opacity: 0.6,
    transform: "scale(0.92)",
    zIndex: 1
  },

  heroTitle: {
    fontSize: 'clamp(24px, 8vw, 48px)', // More mobile friendly
    letterSpacing: "0.2em",
    marginBottom: 12,
    fontFamily: 'sans-serif',
    fontWeight: 300
  },

  gold: {
    color: "#d4af37"
  },

  tagline: {
    fontSize: 'clamp(14px, 3vw, 18px)',
    opacity: 0.8,
    marginBottom: 16
  },

  cta: {
    padding: "12px 24px",
    background: "transparent",
    border: "1px solid #d4af37",
    color: "#d4af37",
    borderRadius: 40,
    cursor: "pointer",
    letterSpacing: "0.15em",
    transition: "0.3s",
    fontSize: 'clamp(14px, 3vw, 18px)'
  },

  story: {
    padding: "0 8px 24px 8px",
    textAlign: "center"
  },

  storyInner: {
    maxWidth: 400,
    margin: "auto"
  },

  sectionTitle: {
    fontSize: 'clamp(20px, 6vw, 36px)',
    fontWeight: 700,
    marginBottom: 8,
    color: '#d4af37',
    letterSpacing: '0.1em',
  },

  storyText: {
    opacity: 0.75,
    lineHeight: 1.8
  },

  collection: {
    padding: "20px 8px",
    textAlign: "center"
  },

  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    width: "100%",
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto"
  },

  card: {
    background: "#181818",
    borderRadius: 18,
    padding: 12,
    color: "#fff",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  cardTitle: {
    fontSize: 'clamp(12px, 2vw, 16px)',
    fontWeight: 600,
    margin: "6px 0 2px 0"
  },

  cardText: {
    fontSize: 'clamp(10px, 2vw, 13px)',
    opacity: 0.8
  },

  bottlePlaceholder: {
    width: 48,
    height: 48,
    background: "#333",
    borderRadius: 12,
    marginBottom: 6
  },

  campaign: {
    padding: "20px 8px",
    textAlign: "center"
  },

  campaignContent: {
    maxWidth: 400,
    margin: "auto"
  },

  footer: {
    padding: "16px 8px 8px 8px",
    textAlign: "center",
    fontSize: 'clamp(12px, 3vw, 16px)',
    color: '#d4af37',
    background: 'transparent',
  }
};
