import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';
import heroVideo from '../assets/1.mp4';
import { Info } from "lucide-react";

const LandingPage = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    checkServerStatus();
    handleVideoPlayback();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await axios.get('/health');
      setServerStatus({
        online: true,
        message: response.data.message,
        timestamp: response.data.timestamp
      });
    } catch (error) {
      console.error('Server health check failed:', error.message);
      setServerStatus({
        online: false,
        message: 'Serveur non disponible'
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="landing-page">
      {/* Fixed Logo */}
      <header className="logo-container">
        <Link to="/" className="iset-logo" aria-label="ISET Tozeur Accueil">
          <img 
            src="/iset-logo.png" 
            alt="Logo ISET Tozeur" 
            className="iset-logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.nextElementSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="iset-text-fallback" style={{ display: 'none' }}>
            <span className="iset-main">ISET</span>
            <span className="iset-city">Tozeur</span>
          </div>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="hero-section" aria-label="Section d'accueil">
        {/* Video Background */}
        {!videoError && (
          <video 
            ref={videoRef}
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
            onError={handleVideoError}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Plateforme Universitaire ISET Tozeur
            </h1>
            <p className="hero-subtitle">
              Système de gestion académique moderne et intégré pour l'Institut Supérieur des Études Technologiques de Tozeur
            </p>
            
            <div className="cta-buttons">
              <Link 
                to="/login" 
                className="btn btn-primary"
                aria-label="Accéder à la page de connexion"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title">À propos</h2>
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <article key={index} className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section" aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title" className="section-title">ISET TOZEUR EN CHIFFRES</h2>
          <div className="stats-grid">
            {STATISTICS.map((stat, index) => (
              <article key={index} className="stat-card">
                <div className="stat-icon" aria-hidden="true">
                  {stat.icon}
                </div>
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
          <p>&copy; {new Date().getFullYear()} Plateforme Universitaire ISET Tozeur. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

// Constants
const FEATURES = [
  {
    icon: <Info className="w-6 h-6 text-blue-600" />,
    description: "L'Institut Supérieur des Etudes Technologiques de Tozeur a été créé par le décret 2004-2204 du 14 septembre 2004. Les cours ont démarré le 16 septembre 2004. Il fait partie d'un réseau d'établissements. Il s'agit du premier établissement d'enseignement supérieur dans la région, il a donc pour mission et pour responsabilité de répondre aux besoins en formation continue et d'ouvrir les horizons aux travailleurs."
  }
];

const STATISTICS = [
  {
    icon: '🎓',
    number: '600',
    label: 'ÉTUDIANTS',
    sublabel: "L'ANNÉE UNIVERSITAIRE 2021/2022"
  },
  {
    icon: '👨‍🏫',
    number: '60',
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
    number: '1500',
    label: 'DIPLÔMÉS',
    sublabel: '(DEPUIS 2004)'
  }
];

export default LandingPage;