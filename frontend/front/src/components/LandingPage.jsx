import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';
import heroVideo from '../assets/1.mp4';
import { Info, Menu, X, ChevronDown } from 'lucide-react';

const LandingPage = () => {
  const [videoError, setVideoError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    handleVideoPlayback();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoPlayback = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setVideoError(true);
      });
    }
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoError(true);
  };

  const navigationItems = [
    {
      title: "Notre Institut",
      submenu: ["Loi de création", "Organigramme", "En Chiffres", "Conseil scientifique"]
    },
    {
      title: "Nos Départements",
      submenu: ["Technologies de l'Informatique", "Génie Électrique", "Gestion"]
    },
    {
      title: "Formation",
      submenu: ["Organigramme", "Déroulement de stages", "Meilleurs projets", "Lauréats"]
    },
    {
      title: "Vie Étudiantine",
      submenu: ["Clubs", "Manifestations", "Activités sportives", "Activités culturelles"]
    },
    {
      title: "Projets",
      submenu: ["Projets en cours", "Projets réalisés"]
    },
    {
      title: "Entreprise",
      submenu: ["Stages", "Partenariats"]
    },
    {
      title: "Espace Centres",
      submenu: ["Excellence", "Certification"]
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation Professionnelle */}
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Top Bar */}
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
                  <div className="nav-title">Institut Supérieur des Études</div>
                  <div className="nav-subtitle">Technologiques de Tozeur</div>
                </div>
              </Link>
            </div>
            
            <div className="nav-actions">
              <button className="btn-french">Français 🇫🇷</button>
              <button className="btn-extranet">Espace Extranet</button>
              <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Main Navigation */}
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
                  
                  <div className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
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
              Plateforme Universitaire
              <span className="hero-title-highlight">ISET Tozeur</span>
            </h1>
            
            <p className="hero-subtitle">
              Système de gestion académique moderne et intégré pour l'Institut Supérieur des Études Technologiques de Tozeur
            </p>
            
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">
                Se connecter
              </Link>
              <a href="#about" className="btn btn-secondary">
                En savoir plus
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
          <h2 className="section-title">À propos de l'ISET Tozeur</h2>
          <div className="section-divider"></div>
          
          <div className="about-card">
            <div className="about-icon">
              <Info size={80} />
            </div>
            <div className="about-content">
              <div className="about-block">
                <h3 className="about-subtitle">📚 Notre Histoire</h3>
                <p className="about-text">
                  L'Institut Supérieur des Etudes Technologiques de Tozeur a été créé par le décret 2004-2204 du 14 septembre 2004. Les cours ont démarré le 16 septembre 2004. Il fait partie d'un réseau d'établissements.
                </p>
              </div>
              <div className="about-block">
                <h3 className="about-subtitle">🎯 Notre Mission</h3>
                <p className="about-text">
                  Il s'agit du premier établissement d'enseignement supérieur dans la région, il a donc pour mission et pour responsabilité de répondre aux besoins en formation continue et d'ouvrir les horizons aux travailleurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="container">
          <h2 className="section-title">ISET TOZEUR EN CHIFFRES</h2>
          <div className="section-divider"></div>
          
          <div className="stats-grid">
            {STATISTICS.map((stat, index) => (
              <article key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
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
              <h3 className="footer-title">📍 Adresse</h3>
              <p className="footer-text">
                Institut Supérieur des Études<br />
                Technologiques de Tozeur, route de Nefta <br />
                Tozeur, Tunisie
              </p>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">📞 Contact</h3>
              <p className="footer-text">
                Tél: +216 76 473 777<br />
                Email: contact@isettozeur.tn
              </p>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">🌐 Suivez-nous</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">YouTube</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Plateforme Universitaire ISET Tozeur. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const STATISTICS = [
  {
    icon: '🎓',
    number: '1400',
    label: 'ÉTUDIANTS',
    sublabel: "L'ANNÉE UNIVERSITAIRE 2021/2022"
  },
  {
    icon: '👨‍🏫',
    number: '70',
    label: 'ENSEIGNANTS',
    sublabel: "L'ANNÉE UNIVERSITAIRE 2021/2022"
  },
  {
    icon: '🏛️',
    number: '12',
    label: 'CLUBS',
    sublabel: null
  },
  {
    icon: '📜',
    number: '2700',
    label: 'DIPLÔMÉS',
    sublabel: '(DEPUIS 2004)'
  }
];

export default LandingPage;