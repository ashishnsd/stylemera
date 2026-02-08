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
          <div className="bottle-card">
            <h3>Ambre Nocturne</h3>
            <p>Warm, mysterious depth</p>
          </div>
          <div className="bottle-card">
            <h3>Velvet Oud</h3>
            <p>Exotic richness</p>
          </div>
          <div className="bottle-card">
            <h3>Iris Lunaire</h3>
            <p>Powdery moonlight</p>
          </div>
          <div className="bottle-card">
            <h3>Muse Divine</h3>
            <p>Ethereal femininity</p>
          </div>
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
            <p>NOIR <span style={{ color: '#d4af37', fontWeight: 400 }}>Luxury</span> was born from the belief that true luxury whispers rather than shouts. Each fragrance is composed in absolute darkness, allowing the perfumer to rely purely on scent memory and intuition.</p>
            <p>Our bottles are hand-blown glass, each one unique. The fragrance within ages for six months before release, developing complexity and character.</p>
            <p>This is perfume as art. Intimate, personal, unforgettable.</p>
          </div>
          <div className="about-visual">
            <div className="about-shape" style={{top: 0, left: 0}}></div>
            <div className="about-shape" style={{top: '50%', left: '50%', width: '150px', height: '150px'}}></div>
            <div className="about-shape" style={{bottom: 0, right: 0, width: '100px', height: '100px'}}></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-caps">
          <div className="floating-cap" style={{left: '10%', top: '20%'}}></div>
          <div className="floating-cap" style={{left: '70%', top: '40%'}}></div>
          <div className="floating-cap" style={{left: '30%', top: '70%'}}></div>
          <div className="floating-cap" style={{left: '80%', top: '80%'}}></div>
        </div>
        <div className="footer-content">
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Email</a>
          </div>
          <p className="copyright">© 2026 NOIR <span style={{ color: '#d4af37', fontWeight: 400 }}>LUXURY</span> PARFUM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default PerfumeLanding;
