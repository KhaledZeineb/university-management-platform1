import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkServerStatus();
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
      setServerStatus({
        online: false,
        message: 'Serveur non disponible'
      });
    }
    setLoading(false);
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="logo-container">
              <div className="iset-logo">
                <img 
                  src="/iset-logo.png" 
                  alt="" 
                  className="iset-logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="iset-text-fallback" style={{display: 'none'}}>
                  <span className="iset-main">ISET</span>
                  <span className="iset-city">Tozeur</span>
                </div>
                <div className="iset-badge">🎓</div>
              </div>
            </div>
            <h1 className="hero-title">
              Plateforme Universitaire ISET Tozeur
            </h1>
            <p className="hero-subtitle">
              Système de gestion académique moderne et intégré pour l'Institut Supérieur des Études Technologiques de Tozeur
            </p>
            
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">
                Se connecter
              </Link>
            </div>

            {/* Server Status */}
            <div className={`server-status ${serverStatus?.online ? 'online' : 'offline'}`}>
              <div className="status-indicator">
                {loading ? (
                  <span>🔄 Vérification...</span>
                ) : serverStatus?.online ? (
                  <span>✅ Serveur actif</span>
                ) : (
                  <span>❌ Serveur hors ligne</span>
                )}
              </div>
              {serverStatus?.timestamp && (
                <div className="timestamp">
                  Dernière vérification: {new Date(serverStatus.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Gestion des utilisateurs</h3>
              <p>Administration complète des étudiants, enseignants et directeurs de département</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Gestion des cours</h3>
              <p>Création et suivi des cours, programmes et matières</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Statistiques</h3>
              <p>Tableaux de bord et rapports détaillés sur les performances</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Sécurité</h3>
              <p>Authentification sécurisée avec gestion des rôles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="roles-section">
        <div className="container">
          <h2 className="section-title">Accès par rôle</h2>
          <div className="roles-grid">
            <div className="role-card student">
              <div className="role-icon">🎓</div>
              <h3>Étudiants</h3>
              <ul>
                <li>Consultation des cours</li>
                <li>Suivi des notes</li>
                <li>Planning personnel</li>
                <li>Historique des absences</li>
              </ul>
            </div>
            <div className="role-card teacher">
              <div className="role-icon">👩‍🏫</div>
              <h3>Enseignants</h3>
              <ul>
                <li>Gestion des cours</li>
                <li>Saisie des notes</li>
                <li>Suivi des étudiants</li>
                <li>Planning d'enseignement</li>
              </ul>
            </div>
            <div className="role-card admin">
              <div className="role-icon">👨‍💼</div>
              <h3>Directeurs de Département</h3>
              <ul>
                <li>Gestion des utilisateurs</li>
                <li>Configuration du système</li>
                <li>Rapports et statistiques</li>
                <li>Administration générale</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <p>&copy; 2025 Plateforme Universitaire. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;