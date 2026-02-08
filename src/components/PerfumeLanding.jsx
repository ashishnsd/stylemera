import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PerfumeLanding() {
  const { scrollY } = useScroll();

  // IMG22 scroll animation
  const imageY = useTransform(scrollY, [0, 300], [0, -120]);

  // moving overlay text
  const x = useTransform(scrollY, [0, 300], [200, -200]);

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
          {[
            "Noir Absolu",
            "Rose Obscure",
            "Ambre Nocturne",
            "Velvet Oud",
            "Iris Lunaire",
            "Muse Divine"
          ].map((name, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.bottle}></div>
              <h3 style={styles.cardTitle}>{name}</h3>
              <p style={styles.cardText}>Luxury fragrance</p>
            </div>
          ))}
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
    padding: "24px 8px 0 8px",
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
    fontFamily: "cursive",
    marginBottom: 20
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 320,
    height: 320,
    marginTop: 40,
    marginBottom: 30,
    boxSizing: "border-box",
  },

  overlayText: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: "100%",
    maxWidth: 320,
    textAlign: "center",
    fontWeight: 700,
    letterSpacing: "0.08em",
    fontSize: "clamp(14px,3vw,20px)",
    textTransform: "uppercase",
    whiteSpace: "normal",
    zIndex: 3
  },

  topImage: {
    position: "absolute",
    top: 0,
    left: "20%",
    width: "60%",
    borderRadius: 24,
    zIndex: 2
  },

  bottomImage: {
    position: "absolute",
    top: 80,
    left: "20%",
    width: "60%",
    borderRadius: 24,
    opacity: 0.6,
    transform: "scale(0.92)",
    zIndex: 1
  },

  heroTitle: {
    fontSize: 'clamp(24px, 8vw, 48px)', // More mobile friendly
    letterSpacing: "0.2em",
    marginBottom: 20,
    fontFamily: 'sans-serif',
    fontWeight: 300
  },

  gold: {
    color: "#d4af37"
  },

  tagline: {
    fontSize: 'clamp(14px, 3vw, 18px)',
    opacity: 0.8,
    marginBottom: 32
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
    padding: "80px 8px 40px 8px",
    textAlign: "center"
  },

  storyInner: {
    maxWidth: 400,
    margin: "auto"
  },

  sectionTitle: {
    fontSize: 'clamp(20px, 6vw, 36px)',
    fontWeight: 700,
    marginBottom: 16,
    color: '#d4af37',
    letterSpacing: '0.1em',
  },

  storyText: {
    opacity: 0.75,
    lineHeight: 1.8
  },

  collection: {
    padding: "40px 8px",
    textAlign: "center"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
    marginTop: 24,
    width: "100%",
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto"
  },

  card: {
    background: "#181818",
    borderRadius: 18,
    padding: 16,
    color: "#fff",
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  cardTitle: {
    fontSize: 'clamp(16px, 4vw, 22px)',
    fontWeight: 600,
    margin: "12px 0 4px 0"
  },

  cardText: {
    fontSize: 'clamp(12px, 3vw, 16px)',
    opacity: 0.8
  },

  bottlePlaceholder: {
    width: 48,
    height: 48,
    background: "#333",
    borderRadius: 12,
    marginBottom: 8
  },

  campaign: {
    padding: "40px 8px",
    textAlign: "center"
  },

  campaignContent: {
    maxWidth: 400,
    margin: "auto"
  },

  footer: {
    padding: "32px 8px 16px 8px",
    textAlign: "center",
    fontSize: 'clamp(12px, 3vw, 16px)',
    color: '#d4af37',
    background: 'transparent',
  }
};
