import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxPerfume() {
  // Main container reference jiske scroll par sab animations depend karte hain
  const containerRef = useRef(null);

  // Scroll tracking setup: 0 se 1 tak ki value deta hai scroll ke hisaab se
  const { scrollYProgress: scroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // MASTER BOTTLE (THE HERO ELEMENT) 
  // Kaam: Ye main bottle hai jo pure page par scroll ke sath move aur transform hoti hai.
  // ==========================================
  
  // 1. Horizontal Movement (X-Axis): Center -> Left move hoti hai -> Wapas Center aati hai card me land hone ke liye
  const bottleX = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 1], 
    ["0vw", "0vw", "-25vw", "-25vw", "0vw", "0vw", "0vw", "0vw"]
  );
  
  // 2. Rotation Effect: Pehle seedhi (0) -> Phir thodi tilt hoti hai (15deg) -> Grid me land hone par wapas seedhi (0)
  const bottleRotate = useTransform(scroll,
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 1],
    [0, 0, 15, 15, 0, 0, 0, 0] 
  );

  // 3. Scaling (Size): Original size (1) -> Thodi choti (0.9) -> Card me fit hone ke liye choti (0.5)
  const bottleScale = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 0.6, 0.9, 1], 
    [1, 1, 0.9, 0.9, 0.80, 0.80, 1.1, 0.85, 0.85, 0.5] 
  );

  // 4. Vertical Movement (Y-Axis): Text ke sath align -> Phir neeche aakar middle card me drop hoti hai -> Last me upar
  const bottleY = useTransform(scroll, 
    [0, 0.1, 0.2, 0.3, 0.38, 0.48, 0.55, 0.6, 0.9, 1], 
    ["0vh", "0vh", "-2vh", "-2vh", "20vh", "21vh", "0vh", "0vh", "0vh", "-10vh"] 
  );

  // ==========================================
  // 🎬 SCENE 1: "WE BELIEVE IN SIGNATURES" (Opening Screen)
  // Kaam: Scroll karne par dono text alag-alag direction me move hote hain
  // ==========================================
  const s1Y = useTransform(scroll, [0, 0.15], ["0vh", "-20vh"]); // Upar ki taraf fade out
  const s1Scale = useTransform(scroll, [0, 0.15], [1, 1.5]); // Text ka bada hona
  const s1Opacity = useTransform(scroll, [0.05, 0.15], [1, 0]); // Gayab hona
  const textLeftX = useTransform(scroll, [0, 0.1], ["0%", "-50%"]); // 'WE BELIEVE' left jayega
  const textRightX = useTransform(scroll, [0, 0.1], ["0%", "50%"]); // 'IN SIGNATURES' right jayega

  // ==========================================
  // 🎬 SCENE 2: "CRAFTED IN SILENCE" (Information Text)
  // Kaam: Right side se text upar aata hai aur phir gayab ho jata hai
  // ==========================================
  const s2Y = useTransform(scroll, [0.1, 0.2, 0.3, 0.35], ["30vh", "0vh", "0vh", "-30vh"]);
  const s2Opacity = useTransform(scroll, [0.1, 0.18, 0.3, 0.35], [0, 1, 1, 0]);

  // ==========================================
  // 🎬 SCENE 3: THE COLLECTION GRID (Product Cards)
  // Kaam: 3 Cards ka layout aata hai jahan Hero bottle middle empty card me land karti hai
  // ==========================================
  const s3Y = useTransform(scroll, [0.3, 0.4, 0.45, 0.5], ["50vh", "0vh", "0vh", "-50vh"]);
  const s3Opacity = useTransform(scroll, [0.32, 0.4, 0.45, 0.5], [0, 1, 1, 0]);
  
  // ==========================================
  // 🎬 SCENE 4: "WHY CHOOSE STYLE | MERA" (Big Background Text)
  // Kaam: Piche bada aur transparent text aata hai zoom hote hue
  // ==========================================
  const s4Y = useTransform(scroll, [0.45, 0.55, 0.6], ["20vh", "0vh", "-20vh"]);
  const s4Opacity = useTransform(scroll, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);
  const s4Scale = useTransform(scroll, [0.45, 0.6], [0.8, 1.2]); 

  // ==========================================
  // 🎬 SCENE 5: CIRCLES & FEATURES (Floating Words & Colors)
  // Kaam: Background me circle ka color change hota hai aur words upar-neeche hote hain
  // ==========================================
  const s5Opacity = useTransform(scroll, [0.55, 0.6, 0.85, 0.9], [0, 1, 1, 0]);
  const circleScale = useTransform(scroll, [0.55, 0.6], [0, 1]); // Circle zoom in
  const circleColor = useTransform(scroll, [0.6, 0.7, 0.8], ["#6b4c8a", "#4a7c59", "#b56576"]); // Color morphing

  // Feature Words Floating Animations
  const purityY = useTransform(scroll, [0.55, 0.6, 0.65], ["10vh", "0vh", "-10vh"]);
  const purityOp = useTransform(scroll, [0.55, 0.6, 0.65], [0, 1, 0]);

  const craftY = useTransform(scroll, [0.65, 0.7, 0.75], ["10vh", "0vh", "-10vh"]);
  const craftOp = useTransform(scroll, [0.65, 0.7, 0.75], [0, 1, 0]);

  const rarityY = useTransform(scroll, [0.75, 0.8, 0.85], ["10vh", "0vh", "-10vh"]);
  const rarityOp = useTransform(scroll, [0.75, 0.8, 0.85], [0, 1, 0]);

  // ==========================================
  // 🎬 SCENE 6: OUTRO / FOOTER
  // Kaam: Page ka end jisme footer aur final message dikhta hai
  // ==========================================
  const s6Y = useTransform(scroll, [0.85, 0.95], ["30vh", "0vh"]);
  const s6Opacity = useTransform(scroll, [0.85, 0.95], [0, 1]);

  return (
    // MAIN SCROLL CONTAINER: Iski height jyada hai taaki lamba scroll mil sake (1200vh)
    <div ref={containerRef} style={{ height: "1200vh", background: "#d1d1d1" }}>
      
      {/* STICKY FRAME: Ye screen par ruka rehta hai jab hum scroll karte hain */}
      <div style={styles.stickyFrame}>
        
        {/* INNER CONTAINER: Jisme sab scenes aur bottle rehti hai (Black Card look) */}
        <div style={styles.cardContainer}>
          
          {/* BRAND LOGO - Top par fixed */}
          <div style={styles.logo}>Style | MERA</div>

          {/* ----- RENDER SCENE 1: OPENING TEXT ----- */}
          <motion.div style={{ ...styles.sceneWrapper, y: s1Y, scale: s1Scale, opacity: s1Opacity }}>
            <motion.div 
              style={{ 
                display: "flex", 
                width: "100%", 
                justifyContent: "center", 
                alignItems: "center",
                gap: "0.3em"
              }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                }
              }}
            >
              {/* Staggered letter animation for "WE BELIEVE IN Style | MERA" */}
              {"Style | MERA".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 50,
                      rotate: -10,
                      scale: 0.8
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                        mass: 0.5
                      }
                    }
                  }}
                  style={{
                    ...styles.massiveText,
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ----- RENDER SCENE 2: INFO TEXT ----- */}
          <motion.div style={{ ...styles.sceneWrapper, y: s2Y, opacity: s2Opacity }}>
            <div style={{ position: "absolute", right: "5%", width: "40%", maxWidth: "400px" }}>
              <h2 style={styles.heading}>CRAFTED IN SILENCE</h2>
              <p style={styles.paragraph}>
                Every bottle begins as a whisper of rare oils, aged to perfection and blended with precision.
              </p>
            </div>
          </motion.div>

          {/* ----- RENDER SCENE 3: THE COLLECTION GRID ----- */}
          <motion.div style={{ ...styles.sceneWrapper, y: s3Y, opacity: s3Opacity, background: "#0a0a0a", zIndex: 5 }}>
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ color: "#d4af37", marginBottom: "10px", letterSpacing: "2px" }}>Our Signature Collection</p>
              <h2 style={{ ...styles.heading, marginBottom: "40px" }}>CHOOSE YOUR ESSENCE</h2>
              
              <div style={styles.gridRow}>
                {/* Left Product Card */}
                <div style={styles.gridCard}>
                  <img src="/src/assets/images/IMAGES/img/IMG1.png" alt="Scent 1" style={styles.gridImage} />
                  <button style={styles.btn}>Add to Cart</button>
                </div>

                {/* Center Product Card (Different Button Color) */}
                <div style={styles.gridCard}>
                  <img src="/src/assets/images/IMAGES/img/IMG2.png" alt="Scent 3" style={styles.gridImage} />
                  <button style={styles.btnGreen}>Add to Cart</button>
                </div>

                {/* Right Product Card (EMPTY - BOTTLE WILL LAND HERE) */}
                <div style={styles.gridCard}>
                  <div style={styles.emptyPlaceholder}></div>
                  <button style={styles.btn}>Add to Cart</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ----- RENDER SCENE 4: BIG BACKGROUND TEXT ----- */}
          <motion.div style={{ ...styles.sceneWrapper, y: s4Y, opacity: s4Opacity, scale: s4Scale, zIndex: 1 }}>
            <h1 style={styles.bgHugeText}>WHY<br/>CHOOSE<br/>STYLE | MERA</h1>
          </motion.div>

          {/* ----- RENDER SCENE 5: COLOR CIRCLES & FLOATING WORDS ----- */}
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

          {/* ----- RENDER SCENE 6: FOOTER ----- */}
          <motion.div style={{ ...styles.sceneWrapper, y: s6Y, opacity: s6Opacity, zIndex: 20 }}>
            <div style={{ textAlign: "center", width: "100%", marginTop: "20vh" }}>
              <h2 style={{ ...styles.heading, fontSize: "clamp(30px, 5vw, 60px)" }}>EMBRACE YOUR<br/>SIGNATURE</h2>
              <div style={styles.footerLine}>
                <span>Style | MERA</span>
                <span style={{ fontSize: "12px", color: "#666" }}>© 2026 Style | MERA </span>
              </div>
            </div>
          </motion.div>

          {/* ==========================================
              🔥 THE HERO BOTTLE ELEMENT 🔥
              NOTE: Ye image hamesha upar (zIndex:10) rehti hai aur hide nahi hoti, sirf move/scale hoti hai
              ========================================== */}
          <motion.img
            src="/src/assets/images/IMAGES/img/IMG12.png" 
            alt="Hero Bottle"
            style={{
              position: "absolute",
              width: "clamp(120px, 20vw, 250px)",
              x: bottleX,               // Horizontal movements
              y: bottleY,               // Vertical drops (lands in card)
              scale: bottleScale,       // Size changes to fit inside the empty card
              rotate: bottleRotate,     // Tilting effect
              zIndex: 10,               // Keeps it on top of mostly everything
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.8))", // Shadow effect
              transformOrigin: "bottom center" // Shrink bottom se start ho taaki realistic lage
            }}
          />

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🎨 STYLES OBJECT (All CSS rules with descriptions)
// ==========================================
const styles = {
  // stickyFrame: Screen ko rok kar rakhta hai taaki andar ka content scroll events pe animate ho sake
  stickyFrame: { position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  
  // cardContainer: Main black wrapper jiske andar saare scenes hote hain (rounded corners ke sath)
  cardContainer: { position: "relative", width: "95vw", maxWidth: "1200px", height: "90vh", background: "#050505", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" },
  
  // sceneWrapper: Har ek scene (Scene 1 to 6) ko full width/height lene aur center karne ka wrapper
  sceneWrapper: { position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  
  // logo: Top bar brand name positioning
  logo: { position: "absolute", top: "30px", width: "100%", textAlign: "center", color: "#fff", fontSize: "16px", letterSpacing: "0.2em", fontWeight: "bold", zIndex: 50 },
  
  // massiveText: Scene 1 ka bada text ("WE BELIEVE")
  massiveText: { color: "#fff", fontSize: "clamp(30px, 6vw, 80px)", fontWeight: "300", letterSpacing: "0.1em", whiteSpace: "nowrap" },
  
  // heading: Regular headings ke liye styling (White color, bold)
  heading: { color: "#fff", fontSize: "clamp(24px, 4vw, 48px)", fontWeight: "600", letterSpacing: "0.1em", marginBottom: "15px" },
  
  // paragraph: Regular description text (Light gray)
  paragraph: { color: "#aaa", fontSize: "clamp(14px, 1.5vw, 18px)", lineHeight: "1.6" },
  
  // bgHugeText: Scene 4 ka faded/transparent background text ("WHY CHOOSE")
  bgHugeText: { color: "rgba(255,255,255,0.04)", fontSize: "clamp(60px, 15vw, 180px)", fontWeight: "900", lineHeight: "0.9", letterSpacing: "-0.02em", textAlign: "center" },
  
  // featureWord: Scene 5 ke floating keywords ("DISTINCTION", "MASTERY")
  featureWord: { position: "absolute", color: "#fff", fontSize: "clamp(40px, 8vw, 90px)", fontWeight: "700", letterSpacing: "0.1em", zIndex: 5 },
  
  // gridRow: Scene 3 me 3 cards ko flex me set karne ke liye
  gridRow: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", zIndex: 6 },
  
  // gridCard: Scene 3 ke individual product boxes ka dark grey background aur padding
  gridCard: { background: "#111", padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", width: "clamp(150px, 25%, 300px)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", position: "relative" },
  
  // gridImage: Cards ke andar ki product images (IMG1.png, IMG2.png)
  gridImage: { width: "100%", height: "200px", objectFit: "contain", marginBottom: "20px" },
  
  // emptyPlaceholder: Scene 3 ka teesra card jo khali choda hai "Hero Bottle" ke land hone ke liye
  emptyPlaceholder: { width: "100%", minHeight: "180px", marginBottom: "20px" }, 
  
  // btn: Default Add to Cart button (Dark grey)
  btn: { background: "#333", color: "#fff", border: "none", padding: "12px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", width: "100%" },
  
  // btnGreen: Middle card ka highlight button (Green)
  btnGreen: { background: "#4a7c59", color: "#fff", border: "none", padding: "12px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", width: "100%" },
  
  // footerLine: Sabse end screen me copyright ke liye upar ki border line
  footerLine: { display: "flex", justifyContent: "space-between", width: "80%", margin: "80px auto 0", paddingTop: "20px", borderTop: "1px solid #333", color: "#fff", fontSize: "14px" }
};