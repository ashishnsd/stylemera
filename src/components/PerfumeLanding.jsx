import React from "react";

// This component renders the HTML content from luxury_perfume_website.html
// You may need to adjust styles or scripts for React compatibility.

const PerfumeLanding = () => {
  return (
    <div className="perfume-landing-html">
      {/* Navigation */}
      <nav className="logo-nav">
        <div className="logo">NOIR <span style={{ color: '#d4af37', fontWeight: 400, fontSize: 18, marginLeft: 8 }}>Luxury</span></div>
        <div className="nav-links">
          <a href="#collection">Collection</a>
          <a href="#story">Story</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-sticky">
          <div className="hero-bg"></div>
          <div className="hero-bottle">
            <div className="bottle-shine"></div>
          </div>
          <div className="hero-content">
            <h1>NOIR <span style={{ color: '#d4af37', fontWeight: 400, fontSize: 48, marginLeft: 12 }}>Luxury</span></h1>
            <p className="tagline">Where mystery becomes essence</p>
          </div>
        </div>
      </section>

      {/* Scent Story */}
      <section className="scent-story">
        <div className="parallax-bg">
          <div className="smoke-layer"></div>
          <div className="petals-layer">
            <div className="petal" style={{left: '20%', top: '10%'}}></div>
            <div className="petal" style={{left: '60%', top: '30%'}}></div>
            <div className="petal" style={{left: '80%', top: '60%'}}></div>
            <div className="petal" style={{left: '30%', top: '70%'}}></div>
            <div className="petal" style={{left: '70%', top: '85%'}}></div>
          </div>
        </div>
        <div className="scent-content">
          <div className="scent-quote">
            "A whisper of midnight rose,<br />dancing with amber shadows"
          </div>
          <div className="scent-detail">
            Each note unfolds like a secret. Top notes of bergamot and blackcurrant surrender to a heart of damask rose and jasmine, settling into a base of vanilla and sandalwood.
          </div>
          <div className="scent-quote">
            "Luxury is not seen.<br />It is felt."
          </div>
          <div className="scent-detail">
            Crafted in Grasse, France, using methods passed through generations. Each bottle contains 100ml of pure parfum, concentrated to tell your story.
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="collection" id="collection">
        <h2 style={{textAlign: 'center', fontSize: '48px', letterSpacing: '0.15em'}}>The Collection</h2>
        <div className="collection-grid">
          <div className="bottle-card">
            <h3>Noir Absolu</h3>
            <p>The signature scent</p>
          </div>
          <div className="bottle-card">
            <h3>Rose Obscure</h3>
            <p>Dark floral elegance</p>
          </div>

          import React, { useEffect, useRef } from "react";

          export default function PerfumeLanding() {
            const containerRef = useRef(null);

            useEffect(() => {
              document.body.style.background = "#0a0a0a";
              let gsapScript, scrollScript;
              const loadScripts = async () => {
                if (!window.gsap) {
                  gsapScript = document.createElement("script");
                  gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
                  document.body.appendChild(gsapScript);
                  await new Promise(res => { gsapScript.onload = res; });
                }
                if (!window.ScrollTrigger) {
                  scrollScript = document.createElement("script");
                  scrollScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
                  document.body.appendChild(scrollScript);
                  await new Promise(res => { scrollScript.onload = res; });
                }
                if (window.gsap && window.ScrollTrigger) {
                  window.gsap.registerPlugin(window.ScrollTrigger);
                  const gsap = window.gsap;
                  const ScrollTrigger = window.ScrollTrigger;

                  gsap.to('.scroll-progress-fill', {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                      trigger: 'body',
                      start: 'top top',
                      end: 'bottom bottom',
                      scrub: true
                    }
                  });

                  const heroTimeline = gsap.timeline({
                    scrollTrigger: {
                      trigger: '.hero-section',
                      start: 'top top',
                      end: 'bottom top',
                      scrub: 1
                    }
                  });
                  heroTimeline
                    .to('.hero-bottle', {
                      rotateY: 360,
                      rotateZ: 15,
                      scale: 0.8,
                      ease: 'none'
                    })
                    .to('.hero-bg', {
                      opacity: 0.3,
                      ease: 'none'
                    }, 0);

                  gsap.to('.hero-content', {
                    opacity: 1,
                    y: -50,
                    duration: 1.5,
                    delay: 0.5,
                    ease: 'power2.out'
                  });

                  gsap.to('.smoke-layer', {
                    y: -300,
                    opacity: 0.5,
                    scrollTrigger: {
                      trigger: '.scent-story',
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 1
                    }
                  });

                  gsap.utils.toArray('.petal').forEach((petal, i) => {
                    gsap.to(petal, {
                      y: -200 - (i * 50),
                      x: (i % 2 === 0 ? 50 : -50),
                      rotation: 360,
                      opacity: 0,
                      scrollTrigger: {
                        trigger: '.scent-story',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                      }
                    });
                  });

                  gsap.utils.toArray('.scent-quote').forEach(quote => {
                    gsap.to(quote, {
                      opacity: 1,
                      y: -30,
                      scrollTrigger: {
                        trigger: quote,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1
                      }
                    });
                  });

                  gsap.utils.toArray('.scent-detail').forEach(detail => {
                    gsap.to(detail, {
                      opacity: 1,
                      y: -20,
                      scrollTrigger: {
                        trigger: detail,
                        start: 'top 85%',
                        end: 'top 40%',
                        scrub: 1
                      }
                    });
                  });

                  gsap.utils.toArray('.bottle-card').forEach((card, i) => {
                    gsap.from(card, {
                      opacity: 0,
                      x: i % 2 === 0 ? -100 : 100,
                      scale: 0.9,
                      scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        end: 'top 60%',
                        scrub: 1
                      }
                    });
                  });

                  document.querySelectorAll('.bottle-card').forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 20;
                      const rotateY = (centerX - x) / 20;
                      gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: 'power2.out',
                        transformPerspective: 1000
                      });
                    });
                    card.addEventListener('mouseleave', () => {
                      gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                      });
                    });
                  });

                  gsap.to('.campaign-content', {
                    opacity: 1,
                    y: -30,
                    scrollTrigger: {
                      trigger: '.campaign',
                      start: 'top 70%',
                      end: 'top 30%',
                      scrub: 1
                    }
                  });

                  gsap.to('.about-text', {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                      trigger: '.about',
                      start: 'top 70%',
                      end: 'top 30%',
                      scrub: 1
                    }
                  });

                  gsap.to('.about-visual', {
                    opacity: 1,
                    scrollTrigger: {
                      trigger: '.about',
                      start: 'top 70%',
                      end: 'top 30%',
                      scrub: 1
                    }
                  });

                  gsap.utils.toArray('.about-shape').forEach((shape, i) => {
                    gsap.to(shape, {
                      y: -50 - (i * 20),
                      rotation: 180,
                      scrollTrigger: {
                        trigger: '.about',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                      }
                    });
                  });

                  gsap.to('.footer-content', {
                    opacity: 1,
                    y: -20,
                    scrollTrigger: {
                      trigger: '.footer',
                      start: 'top 80%',
                      end: 'top 50%',
                      scrub: 1
                    }
                  });

                  gsap.utils.toArray('.floating-cap').forEach((cap, i) => {
                    gsap.to(cap, {
                      y: -100 - (i * 30),
                      x: (i % 2 === 0 ? 30 : -30),
                      scrollTrigger: {
                        trigger: '.footer',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 3
                      }
                    });
                  });

                  document.querySelectorAll('.cta-button').forEach(btn => {
                    btn.addEventListener('mouseenter', () => {
                      gsap.to(btn, {
                        x: 2,
                        duration: 0.1,
                        repeat: 3,
                        yoyo: true,
                        ease: 'power1.inOut'
                      });
                    });
                  });
                }
              };
              loadScripts();
              return () => {
                document.body.style.background = "";
                if (gsapScript) document.body.removeChild(gsapScript);
                if (scrollScript) document.body.removeChild(scrollScript);
              };
            }, []);

            return (
              <div ref={containerRef} style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f8f8f8" }}>
                <style>{`
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  :root { --black: #0a0a0a; --charcoal: #1a1a1a; --gold: #d4af37; --rose: #d4a5a5; --white: #f8f8f8; }
                  body { font-family: 'Inter', sans-serif; background: var(--black); color: var(--white); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
                  h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; }
                  p { font-weight: 300; line-height: 1.8; letter-spacing: 0.05em; }
                  /* ...rest of the CSS from luxury_perfume_website.html... */
                `}</style>
                {/* Scroll Progress */}
                <div className="scroll-progress">
                  <div className="scroll-progress-fill"></div>
                </div>
                {/* Navigation */}
                <nav>
                  <div className="logo">NOIR</div>
                  <div className="nav-links">
                    <a href="#collection">Collection</a>
                    <a href="#story">Story</a>
                    <a href="#contact">Contact</a>
                  </div>
                </nav>
                {/* Hero Section */}
                <section className="hero-section">
                  <div className="hero-sticky">
                    <div className="hero-bg"></div>
                    <div className="hero-bottle">
                      <div className="bottle-shine"></div>
                    </div>
                    <div className="hero-content">
                      <h1>NOIR</h1>
                      <p className="tagline">Where mystery becomes essence</p>
                    </div>
                  </div>
                </section>
                {/* Scent Story */}
                <section className="scent-story">
                  <div className="parallax-bg">
                    <div className="smoke-layer"></div>
                    <div className="petals-layer">
                      <div className="petal" style={{ left: '20%', top: '10%' }}></div>
                      <div className="petal" style={{ left: '60%', top: '30%' }}></div>
                      <div className="petal" style={{ left: '80%', top: '60%' }}></div>
                      <div className="petal" style={{ left: '30%', top: '70%' }}></div>
                      <div className="petal" style={{ left: '70%', top: '85%' }}></div>
                    </div>
                  </div>
                  <div className="scent-content">
                    <div className="scent-quote">
                      "A whisper of midnight rose,<br />dancing with amber shadows"
                    </div>
                    <div className="scent-detail">
                      Each note unfolds like a secret. Top notes of bergamot and blackcurrant surrender to a heart of damask rose and jasmine, settling into a base of vanilla and sandalwood.
                    </div>
                    <div className="scent-quote">
                      "Luxury is not seen.<br />It is felt."
                    </div>
                    <div className="scent-detail">
                      Crafted in Grasse, France, using methods passed through generations. Each bottle contains 100ml of pure parfum, concentrated to tell your story.
                    </div>
                  </div>
                </section>
                {/* Collection */}
                <section className="collection" id="collection">
                  <h2 style={{ textAlign: 'center', fontSize: 48, letterSpacing: '0.15em' }}>The Collection</h2>
                  <div className="collection-grid">
                    <div className="bottle-card"><h3>Noir Absolu</h3><p>The signature scent</p></div>
                    <div className="bottle-card"><h3>Rose Obscure</h3><p>Dark floral elegance</p></div>
                    <div className="bottle-card"><h3>Ambre Nocturne</h3><p>Warm, mysterious depth</p></div>
                    <div className="bottle-card"><h3>Velvet Oud</h3><p>Exotic richness</p></div>
                    <div className="bottle-card"><h3>Iris Lunaire</h3><p>Powdery moonlight</p></div>
                    <div className="bottle-card"><h3>Muse Divine</h3><p>Ethereal femininity</p></div>
                  </div>
                </section>
                {/* Campaign */}
                <section className="campaign">
                  <div className="campaign-bg"></div>
                  <div className="campaign-overlay"></div>
                  <div className="campaign-content">
                    <h2>The New Chapter</h2>
                    <a href="#" className="cta-button">Discover More</a>
                  </div>
                </section>
                {/* About */}
                <section className="about" id="story">
                  <div className="about-grid">
                    <div className="about-text">
                      <h2>Crafted in Darkness</h2>
                      <p>NOIR was born from the belief that true luxury whispers rather than shouts. Each fragrance is composed in absolute darkness, allowing the perfumer to rely purely on scent memory and intuition.</p>
                      <p>Our bottles are hand-blown glass, each one unique. The fragrance within ages for six months before release, developing complexity and character.</p>
                      <p>This is perfume as art. Intimate, personal, unforgettable.</p>
                    </div>
                    <div className="about-visual">
                      <div className="about-shape" style={{ top: 0, left: 0 }}></div>
                      <div className="about-shape" style={{ top: '50%', left: '50%', width: 150, height: 150 }}></div>
                      <div className="about-shape" style={{ bottom: 0, right: 0, width: 100, height: 100 }}></div>
                    </div>
                  </div>
                </section>
                {/* Footer */}
                <footer className="footer" id="contact">
                  <div className="footer-caps">
                    <div className="floating-cap" style={{ left: '10%', top: '20%' }}></div>
                    <div className="floating-cap" style={{ left: '70%', top: '40%' }}></div>
                    <div className="floating-cap" style={{ left: '30%', top: '70%' }}></div>
                    <div className="floating-cap" style={{ left: '80%', top: '80%' }}></div>
                  </div>
                  <div className="footer-content">
                    <div className="social-links">
                      <a href="#">Instagram</a>
                      <a href="#">Facebook</a>
                      <a href="#">Email</a>
                    </div>
                    <p className="copyright">© 2026 NOIR PARFUM. ALL RIGHTS RESERVED.</p>
                  </div>
                </footer>
              </div>
            );
          }
