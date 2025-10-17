import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Info, Menu, X, ChevronDown } from 'lucide-react';
import './LandingPage.css';
import heroVideo from '../assets/1.mp4';

const LandingPage = () => {
  const [videoError, setVideoError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('fr');
  const videoRef = useRef(null);

  useEffect(() => {
    handleVideoPlayback();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoPlayback = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
  };

  const handleVideoError = () => setVideoError(true);

  const navigationItems = [
    {
      title: language === 'fr' ? "Notre Institut" : "Our Institute",
      submenu: language === 'fr'
        ? ["Loi de création", "Organigramme", "En Chiffres", "Conseil scientifique"]
        : ["Creation Law", "Organization Chart", "In Numbers", "Scientific Council"]
    },
    {
      title: language === 'fr' ? "Nos Départements" : "Our Departments",
      submenu: language === 'fr'
        ? ["Technologies de l'Informatique", "Génie Électrique", "Génie civil", "Génie mécanique"]
        : ["Information Technology", "Electrical Engineering", "Management"]
    },
    
    {
      title: language === 'fr' ? "Vie Étudiantine" : "Student Life",
      submenu: language === 'fr'
        ? ["Clubs", "Manifestations", "Activités sportives", "Activités culturelles"]
        : ["Clubs", "Events", "Sports Activities", "Cultural Activities"]
    },
    
   
    
  ];

  const STATISTICS = [
    {
      icon: '🎓',
      number: '600',
      label: language === 'fr' ? 'ÉTUDIANTS' : 'STUDENTS',
      sublabel: language === 'fr'
        ? "L'ANNÉE UNIVERSITAIRE 2021/2022"
        : "ACADEMIC YEAR 2021/2022"
    },
    {
      icon: '👨‍🏫',
      number: '60',
      label: language === 'fr' ? 'ENSEIGNANTS' : 'TEACHERS',
      sublabel: language === 'fr'
        ? "L'ANNÉE UNIVERSITAIRE 2021/2022"
        : "ACADEMIC YEAR 2021/2022"
    },
    {
      icon: '🏛️',
      number: '12',
      label: language === 'fr' ? 'CLUBS' : 'CLUBS',
      sublabel: null
    },
    {
      icon: '📜',
      number: '1500',
      label: language === 'fr' ? 'DIPLÔMÉS' : 'GRADUATES',
      sublabel: language === 'fr' ? '(DEPUIS 2004)' : '(SINCE 2004)'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-top">
            <div className="nav-logo-section">
              <Link to="/" className="nav-logo">
                <img
                  src="/iset-logo.png"
                  alt="Logo ISET Tozeur"
                  className="nav-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="nav-logo-fallback" style={{ display: 'none' }}>
                  <span className="logo-main">ISET</span>
                </div>
                <div className="nav-logo-text">
                  <div className="nav-title">
                    {language === 'fr'
                      ? "Institut Supérieur des Études"
                      : "Higher Institute of Technological Studies"}
                  </div>
                  <div className="nav-subtitle">
                    {language === 'fr'
                      ? "Technologiques de Tozeur"
                      : "of Tozeur"}
                  </div>
                </div>
              </Link>
            </div>

            <div className="nav-actions">
              <button
                className={`btn-language ${language === 'fr' ? 'active' : ''}`}
                onClick={() => setLanguage('fr')}
              >
                Français FR
              </button>
              <button
                className={`btn-language ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                English EN
              </button>

              <Link to="/login" className="btn-extranet">
                {language === 'fr' ? 'Se Connecter' : 'Login'}
              </Link>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {navigationItems.map((item, index) => (
                <li
                  key={index}
                  className="nav-item"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="nav-link">
                    {item.title}
                    <ChevronDown size={16} />
                  </button>
                  <div
                    className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <a key={subIndex} href="#" className="dropdown-item">
                        {subItem}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {!videoError && (
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {language === 'fr'
                ? 'Plateforme Universitaire'
                : 'University Platform'}{' '}
              <span className="hero-title-highlight">ISET Tozeur</span>
            </h1>

            <p className="hero-subtitle">
              {language === 'fr'
                ? "Système de gestion académique moderne et intégré pour l'Institut Supérieur des Études Technologiques de Tozeur"
                : "A modern and integrated academic management system for the Higher Institute of Technological Studies of Tozeur"}
            </p>

            <div className="cta-buttons">
              <a href="#about" className="btn btn-secondary">
                {language === 'fr' ? 'En savoir plus' : 'Learn more'}
              </a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="features-section">
        <div className="container">
          <h2 className="section-title">
            {language === 'fr' ? "À propos de l'ISET Tozeur" : "About ISET Tozeur"}
          </h2>
          <div className="section-divider"></div>

          <div className="about-card">
            <div className="about-icon">
              <Info size={80} />
            </div>
            <div className="about-content">
              <div className="about-block">
                <h3 className="about-subtitle">
                  {language === 'fr' ? '📚 Notre Histoire' : '📚 Our History'}
                </h3>
                <p className="about-text">
                  {language === 'fr'
                    ? "L'ISET Tozeur a été créé par le décret 2004-2204 du 14 septembre 2004. Les cours ont démarré le 16 septembre 2004."
                    : "ISET Tozeur was created by decree 2004-2204 on September 14, 2004. Classes began on September 16, 2004."}
                </p>
              </div>

              <div className="about-block">
                <h3 className="about-subtitle">
                  {language === 'fr' ? '🎯 Notre Mission' : '🎯 Our Mission'}
                </h3>
                <p className="about-text">
                  {language === 'fr'
                    ? "Premier établissement d'enseignement supérieur dans la région, il vise à répondre aux besoins en formation continue."
                    : "As the first higher education institution in the region, it aims to meet the needs of continuous education."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics-section">
        <div className="container">
          <h2 className="section-title">
            {language === 'fr' ? 'ISET TOZEUR EN CHIFFRES' : 'ISET TOZEUR IN NUMBERS'}
          </h2>
          <div className="section-divider"></div>

          <div className="stats-grid">
            {STATISTICS.map((stat, index) => (
              <article key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  {stat.sublabel && (
                    <div className="stat-sublabel">{stat.sublabel}</div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">📍 {language === 'fr' ? 'Adresse' : 'Address'}</h3>
              <p className="footer-text">
                Institut Supérieur des Études<br />
                Technologiques de Tozeur, Route Nefta<br />
                Tozeur, Tunisie
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">📞 {language === 'fr' ? 'Contact' : 'Contact'}</h3>
              <p className="footer-text">
                Tél: +216 76 473 777<br />
                Email: contact@isettozeur.tn
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">🌐 {language === 'fr' ? 'Suivez-nous' : 'Follow us'}</h3>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/iset.tozeur.officielle/?locale=fr_FR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/@isettozeurofficielle1619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} {language === 'fr'
                ? 'Plateforme Universitaire ISET Tozeur. Tous droits réservés.'
                : 'ISET Tozeur University Platform. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
