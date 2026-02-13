import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// Load font (safe check)
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.load("1em 'Playwrite CU Guides'");
}

export default function PerfumeLanding() {
  const { scrollY } = useScroll();

  // --- SEAMLESS PARALLAX TRANSFORMS ---
  // Text moves left to right perfectly across any screen size
  const x = useTransform(scrollY, [0, 500], ["100vw", "-100vw"]);
  
  // Parallax for Hero Text (Moves up faster than user scrolls to create depth)
  const heroTextY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // --- REFS & POSITIONS ---
  const titleRef = useRef(null);
  const wrapperRef = useRef(null);
  const collectionRef = useRef(null);
  
  const [positions, setPositions] = useState({
    wrapperTop: 180,
    collectionTop: 1400,
  });

  // Calculate positions only once on load and resize (Performance boost)
  useEffect(() => {
    const update = () => {
      setPositions({
        wrapperTop: wrapperRef.current?.getBoundingClientRect().top + window.scrollY || 180,
        collectionTop: collectionRef.current?.getBoundingClientRect().top + window.scrollY || 1400,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const moveStart = 480;
  const moveEnd = positions.collectionTop || 900;
  const targetY = (positions.collectionTop - positions.wrapperTop) + 20;

  // --- ANIMATION VALUES ---
  const heroCollectiveY = useTransform(scrollY, [0, moveStart, moveEnd], [0, 0, targetY]);
  const imageScale = useTransform(scrollY, [moveStart, moveEnd], [1, 0.52]);
  
  // Parallax Layer 1: Bottom Image (Moves slower)
  const bgImageY = useTransform(scrollY, [0, moveStart], [0, 60]); 
  
  // Parallax Layer 2: Top Image (Moves faster + lift effect)
  const combined22Y = useTransform(scrollY, [0, 120, moveStart, moveEnd], [0, -48, -48, targetY]);
  const img22Scale = useTransform(scrollY, [0, 120, moveStart, moveEnd], [1, 0.98, 0.92, 0.52]);

  // Fades
  const fadeOutTop = useTransform(scrollY, [150, 300], [1, 0]);
  const fadeOutBottom = useTransform(scrollY, [150, 300], [0.6, 0]);
  // Show IMG12 only after text is fully gone
  const fadeInNew = useTransform(scrollY, [300, 350], [0, 1]);

  // --- OPTIMIZED SCROLL TRACKING (No laggy re-renders) ---
  const [isSticky, setIsSticky] = useState(false);
  const [docked, setDocked] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [stickyTopPx, setStickyTopPx] = useState(120);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= moveEnd - 8) {
      if (!isSticky) setIsSticky(true);

      if (collectionRef.current) {
        const rect = collectionRef.current.getBoundingClientRect();
        if (!docked) setStickyTopPx(Math.max(20, rect.top + 20));

        const shouldPin = rect.bottom <= 140;
        if (shouldPin && !pinned) setPinned(true);
        else if (!shouldPin && pinned) setPinned(false);
      }

      if (!docked) {
        window.clearTimeout(window.__dockTimeout);
        window.__dockTimeout = window.setTimeout(() => setDocked(true), 140);
      }
    } else {
      if (isSticky) setIsSticky(false);
      if (docked) setDocked(false);
      if (pinned) setPinned(false);
      window.clearTimeout(window.__dockTimeout);
    }
  });

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          
          {/* Parallax Script Text */}
          <motion.div 
            style={{ ...styles.scriptText, y: heroTextY, opacity: heroTextOpacity }}
          >
            Your Fragrance Your Life
          </motion.div>

          {/* Image stack */}
          <div ref={wrapperRef} style={styles.imageWrapper}>
            
            {/* 1. Back image (IMG21) */}
            <motion.img
              src="/src/assets/images/IMAGES/img/CUTIMG/IMG21.png"
              alt="Background scent"
              style={isSticky ? {
                position: 'fixed', top: stickyTopPx, left: '50%', transform: 'translateX(-140px)', width: (docked || pinned) ? 0 : 140, borderRadius: 20, zIndex: 60, opacity: (docked || pinned) ? 0 : fadeOutBottom, scale: imageScale
              } : pinned ? { display: 'none' } : { 
                ...styles.bottomImage, y: bgImageY, scale: imageScale, zIndex: 4, opacity: fadeOutBottom 
              }}
            />

            {/* Moving overlay text */}
            <motion.div style={{ ...styles.overlayText, x }}>
              A SCENT THAT LINGERS.
            </motion.div>

            {/* 2. Top floating image (IMG22) */}
            <motion.img
              src="/src/assets/images/IMAGES/img/CUTIMG/IMG22.png"
              alt="Floating scent"
              style={isSticky ? {
                position: 'fixed', top: stickyTopPx, left: '50%', transform: 'translateX(20px)', width: (docked || pinned) ? 0 : 96, borderRadius: 20, zIndex: 61, opacity: (docked || pinned) ? 0 : fadeOutTop, scale: img22Scale
              } : pinned ? { display: 'none' } : { 
                ...styles.topImage, y: combined22Y, scale: img22Scale, zIndex: 5, opacity: fadeOutTop 
              }}
            />

            {/* 3. NEW REPLACEMENT IMAGE (IMG12) - Only show after text is gone */}
            <motion.img
              src="/src/assets/images/IMAGES/img/IMG12.png"
              alt="New Scent"
              style={isSticky ? {
                position: 'fixed', top: stickyTopPx, left: '50%', transform: 'translateX(-50%)', width: (docked || pinned) ? 0 : 140, borderRadius: 20, zIndex: 65, opacity: (docked || pinned) ? 0 : fadeInNew, scale: imageScale, display: undefined
              } : pinned ? { display: 'none' } : { 
                ...styles.topImage, left: '20%', y: combined22Y, scale: img22Scale, zIndex: 62, opacity: fadeInNew, display: undefined
              }}
              // Hide IMG12 completely until text is gone
              initial={{ opacity: 0, display: 'none' }}
              animate={scrollY && scrollY.get() < 300 ? { opacity: 0, display: 'none' } : { opacity: 1, display: undefined }}
            />
          </div>

          {/* Parallax Main Title & Subtitle */}
          <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }}>
            <h1 ref={titleRef} style={styles.heroTitle}>
              Premium <span style={styles.gold}>Scent</span>
            </h1>
            <p style={styles.tagline}>
              Crafted for elegance. Designed for memory.
            </p>
            <button style={styles.cta}>Explore Collection</button>
          </motion.div>
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
      <section ref={collectionRef} style={styles.collection}>
        <h2 style={styles.sectionTitle}>The Collection</h2>
        <div style={styles.grid}>
          {/* Card 1 */}
          <div style={styles.card}>
            <div style={styles.imageContainer}>
              <img src="/src/assets/images/IMAGES/img/IMG1.png" alt="Noir Absolu" style={styles.cardImg} />
            </div>
            <h3 style={styles.cardTitle}>Noir Absolu</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
          
          {/* Center card — IMG12 appears when hero docks */}
          <div style={styles.card}>
            <motion.div style={styles.imageContainer}>
              <motion.img
                src="/src/assets/images/IMAGES/img/IMG12.png"
                alt="Rose Obscure (docked)"
                initial={{ opacity: 0, scale: 1.18, y: -80 }}
                animate={docked && !pinned ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.18, y: -80 }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
                style={styles.cardImg}
              />
            </motion.div>

            {pinned && (
              <motion.img
                src="/src/assets/images/IMAGES/img/IMG12.png"
                alt="Rose Obscure (pinned)"
                initial={{ opacity: 0, top: -160 }}
                animate={{ opacity: 1, top: 12 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
                style={styles.pinnedImg}
              />
            )}
            <h3 style={styles.cardTitle}>Rose Obscure</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
          
          {/* Card 3 */}
          <div style={styles.card}>
            <div style={styles.imageContainer}>
              <img src="/src/assets/images/IMAGES/img/IMG2.png" alt="Ambre Nocturne" style={styles.cardImg} />
            </div>
            <h3 style={styles.cardTitle}>Ambre Nocturne</h3>
            <p style={styles.cardText}>Luxury fragrance</p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}></footer>
    </div>
  );
}

// Extracted a few inline styles for cleanliness
const styles = {
  page: { background: "#0a0a0a", color: "#f8f8f8", fontFamily: "sans-serif", minHeight: "100vh", padding: 0, overflowX: "hidden" },
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 60%)", padding: "24px 8px 0 8px", boxSizing: "border-box" },
  heroContent: { maxWidth: 400, width: "100%", margin: "0 auto", padding: "0 8px", boxSizing: "border-box" },
  scriptText: { color: "#d4af37", fontSize: "clamp(32px,8vw,60px)", fontFamily: "'Playwrite CU Guides', cursive", marginBottom: 20 },
  imageWrapper: { position: "relative", width: "100%", maxWidth: 320, height: 320, marginTop: 40, marginBottom: 30, boxSizing: "border-box" },
  overlayText: { position: "absolute", top: 40, left: 0, margin: '0 auto', textAlign: "center", fontWeight: 700, letterSpacing: "0.08em", fontSize: "clamp(22px,5vw,36px)", textTransform: "uppercase", whiteSpace: "nowrap", zIndex: 3 },
  topImage: { position: "absolute", top: 0, left: "25%", width: "60%", borderRadius: 24, zIndex: 2 },
  bottomImage: { position: "absolute", top: 80, left: "25%", width: "60%", borderRadius: 24, opacity: 0.6, transform: "scale(0.92)", zIndex: 1 },
  heroTitle: { fontSize: 'clamp(24px, 8vw, 48px)', letterSpacing: "0.2em", marginBottom: 20, fontFamily: 'sans-serif', fontWeight: 300 },
  gold: { color: "#d4af37" },
  tagline: { fontSize: 'clamp(14px, 3vw, 18px)', opacity: 0.8, marginBottom: 32 },
  cta: { padding: "12px 24px", background: "transparent", border: "1px solid #d4af37", color: "#d4af37", borderRadius: 40, cursor: "pointer", letterSpacing: "0.15em", transition: "0.3s", fontSize: 'clamp(14px, 3vw, 18px)' },
  story: { padding: "0 8px 40px 8px", textAlign: "center", position: "relative", zIndex: 10 },
  storyInner: { maxWidth: 400, margin: "auto" },
  sectionTitle: { fontSize: 'clamp(20px, 6vw, 36px)', fontWeight: 700, marginBottom: 16, color: '#d4af37', letterSpacing: '0.1em' },
  storyText: { opacity: 0.75, lineHeight: 1.8 },
  collection: { padding: "40px 8px", textAlign: "center", position: "relative", zIndex: 10 },
  grid: { display: "flex", flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 24, width: "100%", maxWidth: 600, marginLeft: "auto", marginRight: "auto" },
  card: { background: "#181818", borderRadius: 18, padding: 16, color: "#fff", minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  imageContainer: { width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden' },
  cardImg: { width: 140, height: 140, objectFit: 'cover', borderRadius: 20, boxShadow: '0 8px 24px rgba(0,0,0,0.45)' },
  pinnedImg: { position: 'fixed', left: '50%', transform: 'translateX(-50%)', width: 140, maxWidth: '36vw', height: 140, borderRadius: 20, objectFit: 'cover', zIndex: 2200, boxShadow: '0 12px 32px rgba(0,0,0,0.55)' },
  cardTitle: { fontSize: 'clamp(12px, 2vw, 16px)', fontWeight: 600, margin: "8px 0 2px 0" },
  cardText: { fontSize: 'clamp(10px, 2vw, 13px)', opacity: 0.8 },
  footer: { padding: "32px 8px 16px 8px", textAlign: "center", fontSize: 'clamp(12px, 3vw, 16px)', color: '#d4af37', background: 'transparent' }
};