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

      {/* Roles Section */}
      <section className="roles-section" aria-labelledby="roles-title">
        <div className="container">
          <h2 id="roles-title" className="section-title">Accès par rôle</h2>
          <div className="roles-grid">
            {ROLES.map((role, index) => (
              <article key={index} className={`role-card ${role.className}`}>
                <div className="role-icon" aria-hidden="true">
                  {role.icon}
                </div>
                <h3>{role.title}</h3>
                <ul>
                  {role.features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
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

const ROLES = [
  {
    icon: '🎓',
    title: 'Étudiants',
    className: 'student',
    features: [
      'Consultation des cours',
      'Suivi des notes',
      'Planning personnel',
      'Historique des absences'
    ]
  },
  {
    icon: '👩‍🏫',
    title: 'Enseignants',
    className: 'teacher',
    features: [
      'Gestion des cours',
      'Saisie des notes',
      'Suivi des étudiants',
      'Planning d\'enseignement'
    ]
  },
  {
    icon: '👨‍💼',
    title: 'Directeurs de Département',
    className: 'admin',
    features: [
      'Gestion des utilisateurs',
      'Configuration du système',
      'Rapports et statistiques',
      'Administration générale'
    ]
  }
];

export default LandingPage;