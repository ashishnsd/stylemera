import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxPerfume() {
  const containerRef = useRef(null);

  const { scrollYProgress: scroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // 🔥 MASTER BOTTLE (THE MAGIC LANDING EFFECT) 🔥
  // ==========================================
  // X-Axis: Center -> Left -> Back to Center (for Grid)
  const bottleX = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 1], 
    ["0vw", "0vw", "-25vw", "-25vw", "0vw", "0vw", "0vw", "0vw"]
  );
  
  // Rotate: 0 -> Tilt Right (15) -> Straighten out (0) for the card
  const bottleRotate = useTransform(scroll,
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 1],
    [0, 0, 15, 15, 0, 0, 0, 0] 
  );

  // Scale: 1 -> 0.9 -> Drops to 0.35 (Fits inside the card!) -> Scales back to 1
  const bottleScale = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 0.6, 0.9, 1], 
    [1, 1, 0.9, 0.9, 0.80, 0.80, 1.1, 0.85, 0.85, 0.5] 
  );

  // Y-Axis: 0 -> -8vh (Aligned with text) -> 15vh (Lands perfectly inside the middle card) -> 0vh
  const bottleY = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 0.6, 0.9, 1], 
    ["0vh", "0vh", "-2vh", "-2vh", "20vh", "21vh", "0vh", "0vh", "0vh", "-10vh"] 
  );

  // ==========================================
  // SCENE 1: WE BELIEVE
  // ==========================================
  const s1Y = useTransform(scroll, [0, 0.15], ["0vh", "-20vh"]);
  const s1Scale = useTransform(scroll, [0, 0.15], [1, 1.5]);
  const s1Opacity = useTransform(scroll, [0.05, 0.15], [1, 0]);
  const textLeftX = useTransform(scroll, [0, 0.1], ["0%", "-50%"]);
  const textRightX = useTransform(scroll, [0, 0.1], ["0%", "50%"]);

  // ==========================================
  // SCENE 2: CRAFTING Style | MERAS
  // ==========================================
  const s2Y = useTransform(scroll, [0.1, 0.2, 0.3, 0.35], ["30vh", "0vh", "0vh", "-30vh"]);
  const s2Opacity = useTransform(scroll, [0.1, 0.18, 0.3, 0.35], [0, 1, 1, 0]);

  // ==========================================
  // SCENE 3: THE COLLECTION GRID (Modified for Landing)
  // ==========================================
  const s3Y = useTransform(scroll, [0.3, 0.4, 0.45, 0.5], ["50vh", "0vh", "0vh", "-50vh"]);
  const s3Opacity = useTransform(scroll, [0.32, 0.4, 0.45, 0.5], [0, 1, 1, 0]);
  
  // ==========================================
  // SCENE 4: WHY CHOOSE Style | MERA
  // ==========================================
  const s4Y = useTransform(scroll, [0.45, 0.55, 0.6], ["20vh", "0vh", "-20vh"]);
  const s4Opacity = useTransform(scroll, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);
  const s4Scale = useTransform(scroll, [0.45, 0.6], [0.8, 1.2]); 

  // ==========================================
  // SCENE 5: CIRCLES & FEATURES
  // ==========================================
  const s5Opacity = useTransform(scroll, [0.55, 0.6, 0.85, 0.9], [0, 1, 1, 0]);
  const circleScale = useTransform(scroll, [0.55, 0.6], [0, 1]);
  const circleColor = useTransform(scroll, [0.6, 0.7, 0.8], ["#6b4c8a", "#4a7c59", "#b56576"]);

  const purityY = useTransform(scroll, [0.55, 0.6, 0.65], ["10vh", "0vh", "-10vh"]);
  const purityOp = useTransform(scroll, [0.55, 0.6, 0.65], [0, 1, 0]);

  const craftY = useTransform(scroll, [0.65, 0.7, 0.75], ["10vh", "0vh", "-10vh"]);
  const craftOp = useTransform(scroll, [0.65, 0.7, 0.75], [0, 1, 0]);

  const rarityY = useTransform(scroll, [0.75, 0.8, 0.85], ["10vh", "0vh", "-10vh"]);
  const rarityOp = useTransform(scroll, [0.75, 0.8, 0.85], [0, 1, 0]);

  // ==========================================
  // SCENE 6: OUTRO
  // ==========================================
  const s6Y = useTransform(scroll, [0.85, 0.95], ["30vh", "0vh"]);
  const s6Opacity = useTransform(scroll, [0.85, 0.95], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: "1200vh", background: "#d1d1d1" }}>
      
      <div style={styles.stickyFrame}>
        <div style={styles.cardContainer}>
          
          <div style={styles.logo}>Style | MERA</div>

          <motion.div style={{ ...styles.sceneWrapper, y: s1Y, scale: s1Scale, opacity: s1Opacity }}>
            <motion.div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "0 10%" }}>
              <motion.h1 style={{ ...styles.massiveText, x: textLeftX }}>WE BELIEVE</motion.h1>
              <motion.h1 style={{ ...styles.massiveText, x: textRightX }}>IN SIGNATURES</motion.h1>
            </motion.div>
          </motion.div>

          <motion.div style={{ ...styles.sceneWrapper, y: s2Y, opacity: s2Opacity }}>
            <div style={{ position: "absolute", right: "5%", width: "40%", maxWidth: "400px" }}>
              <h2 style={styles.heading}>CRAFTED IN SILENCE</h2>
              <p style={styles.paragraph}>
                Every bottle begins as a whisper of rare oils, aged to perfection and blended with precision.
              </p>
            </div>
          </motion.div>

          {/* 🔥 MODIFIED SCENE 3: THE COLLECTION GRID 🔥 */}
          <motion.div style={{ ...styles.sceneWrapper, y: s3Y, opacity: s3Opacity, background: "#0a0a0a", zIndex: 5 }}>
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ color: "#d4af37", marginBottom: "10px", letterSpacing: "2px" }}>Our Signature Collection</p>
              <h2 style={{ ...styles.heading, marginBottom: "40px" }}>CHOOSE YOUR ESSENCE</h2>
              <div style={styles.gridRow}>
                
                {/* Left Card */}
                <div style={styles.gridCard}>
                  <img src="/src/assets/images/IMAGES/img/IMG1.png" alt="Scent 1" style={styles.gridImage} />
                  <button style={styles.btn}>Add to Cart</button>
                </div>

                {/* Center Card - EMPTY PLACEHOLDER for the Hero Bottle to land in */}
                <div style={styles.gridCard}>
                  <img src="/src/assets/images/IMAGES/img/IMG2.png" alt="Scent 3" style={styles.gridImage} />
                  <button style={styles.btnGreen}>Add to Cart</button>
                </div>

                {/* Right Card */}
                <div style={styles.gridCard}>
                  
                  <div style={styles.emptyPlaceholder}></div>
                  <button style={styles.btn}>Add to Cart</button>
                </div>

              </div>
            </div>
          </motion.div>

          <motion.div style={{ ...styles.sceneWrapper, y: s4Y, opacity: s4Opacity, scale: s4Scale, zIndex: 1 }}>
            <h1 style={styles.bgHugeText}>WHY<br/>CHOOSE<br/>STYLE | MERA</h1>
          </motion.div>

          <motion.div style={{ ...styles.sceneWrapper, opacity: s5Opacity, zIndex: 2 }}>
            <motion.div 
              style={{
                width: "clamp(250px, 40vw, 400px)", height: "clamp(250px, 40vw, 400px)",
                borderRadius: "50%", background: circleColor, scale: circleScale,
                position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%"
              }}
            />
            <motion.h2 style={{ ...styles.featureWord, left: "10%", y: purityY, opacity: purityOp }}>DISTINCTION</motion.h2>
            <motion.h2 style={{ ...styles.featureWord, right: "10%", y: craftY, opacity: craftOp }}>MASTERY</motion.h2>
            <motion.h2 style={{ ...styles.featureWord, left: "10%", y: rarityY, opacity: rarityOp }}>LEGACY</motion.h2>
          </motion.div>

          <motion.div style={{ ...styles.sceneWrapper, y: s6Y, opacity: s6Opacity, zIndex: 20 }}>
            <div style={{ textAlign: "center", width: "100%", marginTop: "20vh" }}>
              <h2 style={{ ...styles.heading, fontSize: "clamp(30px, 5vw, 60px)" }}>EMBRACE YOUR<br/>SIGNATURE</h2>
              <div style={styles.footerLine}>
                <span>Style | MERA</span>
                <span style={{ fontSize: "12px", color: "#666" }}>© 2026 Style | MERA </span>
              </div>
            </div>
          </motion.div>

          {/* 🔥 THE HERO BOTTLE - NEVER HIDES, IT MORPHS! 🔥 */}
          <motion.img
            src="/src/assets/images/IMAGES/img/IMG12.png" 
            alt="Hero Bottle"
            style={{
              position: "absolute",
              width: "clamp(120px, 20vw, 250px)",
              x: bottleX,
              y: bottleY,        /* Moves to 15vh to land in card */
              scale: bottleScale, /* Shrinks to 0.35 to fit card */
              rotate: bottleRotate,
              zIndex: 10,
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.8))",
              transformOrigin: "bottom center"
            }}
          />

        </div>
      </div>
    </div>
  );
}

const styles = {
  stickyFrame: { position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  cardContainer: { position: "relative", width: "95vw", maxWidth: "1200px", height: "90vh", background: "#050505", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" },
  sceneWrapper: { position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  logo: { position: "absolute", top: "30px", width: "100%", textAlign: "center", color: "#fff", fontSize: "16px", letterSpacing: "0.2em", fontWeight: "bold", zIndex: 50 },
  massiveText: { color: "#fff", fontSize: "clamp(30px, 6vw, 80px)", fontWeight: "300", letterSpacing: "0.1em", whiteSpace: "nowrap" },
  heading: { color: "#fff", fontSize: "clamp(24px, 4vw, 48px)", fontWeight: "600", letterSpacing: "0.1em", marginBottom: "15px" },
  paragraph: { color: "#aaa", fontSize: "clamp(14px, 1.5vw, 18px)", lineHeight: "1.6" },
  bgHugeText: { color: "rgba(255,255,255,0.04)", fontSize: "clamp(60px, 15vw, 180px)", fontWeight: "900", lineHeight: "0.9", letterSpacing: "-0.02em", textAlign: "center" },
  featureWord: { position: "absolute", color: "#fff", fontSize: "clamp(40px, 8vw, 90px)", fontWeight: "700", letterSpacing: "0.1em", zIndex: 5 },
  gridRow: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", zIndex: 6 },
  gridCard: { background: "#111", padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", width: "clamp(150px, 25%, 300px)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", position: "relative" },
  gridImage: { width: "100%", height: "200px", objectFit: "contain", marginBottom: "20px" },
  emptyPlaceholder: { 
    width: "100%", 
    minHeight: "180px", 
    marginBottom: "20px" 
  }, /* THIS IS WHERE BOTTLE LANDS */
  btn: { background: "#333", color: "#fff", border: "none", padding: "12px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", width: "100%" },
  btnGreen: { background: "#4a7c59", color: "#fff", border: "none", padding: "12px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", width: "100%" },
  footerLine: { display: "flex", justifyContent: "space-between", width: "80%", margin: "80px auto 0", paddingTop: "20px", borderTop: "1px solid #333", color: "#fff", fontSize: "14px" }
};