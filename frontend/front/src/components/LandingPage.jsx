import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import heroVideo from '../assets/1.mp4';
import { Info, Menu, X, ChevronDown } from 'lucide-react';

const translations = {
  fr: {
    instituteTitle: "Institut Supérieur des Études Technologiques de Tozeur",
    platformTitle: "Plateforme Universitaire",
    platformHighlight: "ISET Tozeur",
    platformSubtitle: "Système de gestion académique moderne et intégré pour l'Institut Supérieur des Études Technologiques de Tozeur",
    connect: "Se connecter",
    learnMore: "En savoir plus",
    aboutTitle: "À propos de l'ISET Tozeur",
    ourHistory: "📚 Notre Histoire",
    historyText: "L'Institut Supérieur des Études Technologiques de Tozeur a été créé par le décret 2004-2204 du 14 septembre 2004. Les cours ont démarré le 16 septembre 2004. Il fait partie d'un réseau d'établissements.",
    ourMission: "🎯 Notre Mission",
    missionText: "Il s'agit du premier établissement d'enseignement supérieur dans la région, il a donc pour mission de répondre aux besoins en formation continue et d'ouvrir les horizons aux travailleurs.",
    statsTitle: "ISET TOZEUR EN CHIFFRES",
    addressTitle: "📍 Adresse",
    address: "Institut Supérieur des Études Technologiques de Tozeur, Route Nefta, Tozeur, Tunisie",
    contactTitle: "📞 Contact",
    phone: "Tél: +216 76 473 777",
    email: "Email: contact@isettozeur.tn",
    followTitle: "🌐 Suivez-nous",
    rights: "Tous droits réservés.",
    extranet: "Espace Extranet",
  },
  en: {
    instituteTitle: "Higher Institute of Technological Studies of Tozeur",
    platformTitle: "University Platform",
    platformHighlight: "ISET Tozeur",
    platformSubtitle: "A modern and integrated academic management system for the Higher Institute of Technological Studies of Tozeur",
    connect: "Login",
    learnMore: "Learn more",
    aboutTitle: "About ISET Tozeur",
    ourHistory: "📚 Our History",
    historyText: "The Higher Institute of Technological Studies of Tozeur was created by decree 2004-2204 of September 14, 2004. Classes started on September 16, 2004. It is part of a network of institutions.",
    ourMission: "🎯 Our Mission",
    missionText: "As the first higher education institution in the region, it aims to meet continuous training needs and open up opportunities for workers.",
    statsTitle: "ISET TOZEUR IN NUMBERS",
    addressTitle: "📍 Address",
    address: "Higher Institute of Technological Studies of Tozeur, Nefta Road, Tozeur, Tunisia",
    contactTitle: "📞 Contact",
    phone: "Phone: +216 76 473 777",
    email: "Email: contact@isettozeur.tn",
    followTitle: "🌐 Follow us",
    rights: "All rights reserved.",
    extranet: "Extranet Space",
  }
};

const LandingPage = () => {
  const [language, setLanguage] = useState('fr');
  const [videoError, setVideoError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef(null);

  const t = translations[language];

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
      title: language === 'fr' ? "Notre Institut" : "Our Institute",
      submenu: language === 'fr'
        ? ["Loi de création", "Organigramme", "En Chiffres", "Conseil scientifique"]
        : ["Creation Law", "Organization Chart", "In Numbers", "Scientific Council"]
    },
    {
      title: language === 'fr' ? "Nos Départements" : "Our Departments",
      submenu: language === 'fr'
        ? ["Technologies de l'Informatique", "Génie Électrique", "Gestion"]
        : ["Information Technology", "Electrical Engineering", "Management"]
    },
    {
      title: language === 'fr' ? "Formation" : "Training",
      submenu: language === 'fr'
        ? ["Organigramme", "Déroulement de stages", "Meilleurs projets", "Lauréats"]
        : ["Organization Chart", "Internship Process", "Best Projects", "Graduates"]
    },
    {
      title: language === 'fr' ? "Vie Étudiantine" : "Student Life",
      submenu: language === 'fr'
        ? ["Clubs", "Manifestations", "Activités sportives", "Activités culturelles"]
        : ["Clubs", "Events", "Sports Activities", "Cultural Activities"]
    },
    {
      title: language === 'fr' ? "Projets" : "Projects",
      submenu: language === 'fr'
        ? ["Projets en cours", "Projets réalisés"]
        : ["Ongoing Projects", "Completed Projects"]
    },
    {
      title: language === 'fr' ? "Entreprise" : "Business",
      submenu: language === 'fr'
        ? ["Stages", "Partenariats"]
        : ["Internships", "Partnerships"]
    },
    {
      title: language === 'fr' ? "Espace Centres" : "Centers Space",
      submenu: language === 'fr'
        ? ["Excellence", "Certification"]
        : ["Excellence", "Certification"]
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
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
                  <div className="nav-title">{t.instituteTitle}</div>
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
                {t.extranet}
              </Link>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Menu */}
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

      {/* Hero */}
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
              {t.platformTitle}
              <span className="hero-title-highlight"> {t.platformHighlight}</span>
            </h1>
            <p className="hero-subtitle">{t.platformSubtitle}</p>

            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">
                {t.connect}
              </Link>
              <a href="#about" className="btn btn-secondary">
                {t.learnMore}
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About */}
      <section id="about" className="features-section">
        <div className="container">
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="section-divider"></div>

          <div className="about-card">
            <div className="about-icon">
              <Info size={80} />
            </div>
            <div className="about-content">
              <div className="about-block">
                <h3 className="about-subtitle">{t.ourHistory}</h3>
                <p className="about-text">{t.historyText}</p>
              </div>
              <div className="about-block">
                <h3 className="about-subtitle">{t.ourMission}</h3>
                <p className="about-text">{t.missionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics-section">
        <div className="container">
          <h2 className="section-title">{t.statsTitle}</h2>
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
              <h3 className="footer-title">{t.addressTitle}</h3>
              <p className="footer-text">{t.address}</p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">{t.contactTitle}</h3>
              <p className="footer-text">
                {t.phone}
                <br />
                {t.email}
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">{t.followTitle}</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">YouTube</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} {t.platformHighlight}. {t.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const STATISTICS = [
  {
    icon: '🎓',
    number: '600',
    label: 'ÉTUDIANTS / STUDENTS',
    sublabel: "Année Universitaire / Academic Year 2021/2022"
  },
  {
    icon: '👨‍🏫',
    number: '60',
    label: 'ENSEIGNANTS / TEACHERS',
    sublabel: "Année Universitaire / Academic Year 2021/2022"
  },
  {
    icon: '🏛️',
    number: '12',
    label: 'CLUBS',
    sublabel: null
  },
  {
    icon: '📜',
    number: '1500',
    label: 'DIPLÔMÉS / GRADUATES',
    sublabel: '(Depuis / Since 2004)'
  }
];

export default LandingPage;
