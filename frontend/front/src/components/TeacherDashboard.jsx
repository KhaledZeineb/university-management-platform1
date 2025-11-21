import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    prenom: user?.prenom || "",
    nom: user?.nom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    departement: user?.departement?.nom || "",
    specialite: user?.specialite || "",
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setTimeout(() => {
      const data = {
        title: "Espace Enseignant",
        stats: [
          { 
            label: "Mes cours", 
            value: "4", 
            icon: "📚",
            color: "#1e5ba8",
            description: "Cours actifs"
          },
          { 
            label: "Étudiants", 
            value: "156", 
            icon: "👥",
            color: "#48bb78",
            description: "Total inscrits"
          },
          { 
            label: "Évaluations", 
            value: "12", 
            icon: "📝",
            color: "#ed8936",
            description: "En attente"
          },
          { 
            label: "Réussite", 
            value: "87%", 
            icon: "📊",
            color: "#5eb3b7",
            description: "Taux moyen"
          },
        ],
        quickActions: [
          { 
            title: "Mon Emploi du Temps", 
            description: "Consulter mon planning hebdomadaire",
            icon: "📅", 
            action: "viewSchedule",
            color: "#1e5ba8"
          },
          { 
            title: "Évaluer les Étudiants", 
            description: "Saisir les notes et évaluations",
            icon: "📝", 
            action: "gradeStudents",
            color: "#ed8936"
          },
          { 
            title: "Mes Statistiques", 
            description: "Analyser les performances",
            icon: "📊", 
            action: "statistics",
            color: "#5eb3b7"
          },
        ],
        otherActions: [
          { label: "Gérer mes cours", icon: "📚", action: "manageCourses" },
          { label: "Messagerie", icon: "💬", action: "messaging" },
          { label: "Ressources pédagogiques", icon: "📖", action: "resources" },
          { label: "Mon profil", icon: "👤", action: "profile" },
        ],
      };
      setDashboardData(data);
      setLoading(false);
    }, 800);
  };

  const handleAction = (action) => {
    switch (action) {
      case "manageCourses":
        alert("Ouverture de la gestion des cours...");
        break;
      case "gradeStudents":
        alert("Ouverture des évaluations...");
        break;
      case "viewSchedule":
        navigate("/my-schedule");
        break;
      case "statistics":
        alert("Ouverture des statistiques...");
        break;
      case "messaging":
        alert("Ouverture de la messagerie...");
        break;
      case "resources":
        alert("Ouverture des ressources pédagogiques...");
        break;
      case "profile":
        setShowProfile(true);
        break;
      default:
        alert(`Action ${action} non implémentée`);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.prenom || !profileData.nom || !profileData.email) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const response = await updateUser({
        nom: profileData.nom,
        prenom: profileData.prenom,
        cin: user.cin, // CIN ne peut pas être modifié
      });

      if (response.success) {
        alert("Profil mis à jour avec succès!");
        setEditingProfile(false);
        // Mettre à jour les données du profil avec les nouvelles valeurs
        setProfileData({
          ...profileData,
          prenom: response.user.prenom,
          nom: response.user.nom,
        });
      } else {
        alert(response.message || "Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="teacher-dashboard-loading">
        <div className="elegant-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <header className="teacher-header">
        <div className="header-container">
          <div className="header-left">
            <div className="welcome-section">
              <h1 className="greeting">Bonjour, {user?.prenom}</h1>
              <p className="subtitle">Bienvenue dans votre espace enseignant</p>
            </div>
          </div>
          <div className="header-right">
            <button className="header-btn profile-btn" onClick={() => setShowProfile(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profil</span>
            </button>
            <button className="header-btn logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <div className="elegant-modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="elegant-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProfile(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="profile-avatar">
                {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
              </div>
              <h3>Informations du profil</h3>
            </div>

            {editingProfile ? (
              <div className="modal-body">
                <div className="elegant-form">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      value={profileData.prenom}
                      onChange={(e) => setProfileData({ ...profileData, prenom: e.target.value })}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) => setProfileData({ ...profileData, nom: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={profileData.telephone}
                      onChange={(e) => setProfileData({ ...profileData, telephone: e.target.value })}
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn-primary" onClick={handleProfileUpdate}>
                    Enregistrer
                  </button>
                  <button className="btn-secondary" onClick={() => setEditingProfile(false)}>
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Nom complet</span>
                    <span className="info-value">{user?.prenom} {user?.nom}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rôle</span>
                    <span className="info-value badge-teacher">Enseignant</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Département</span>
                    <span className="info-value">{user?.departement?.nom || "Non spécifié"}</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn-primary" onClick={() => setEditingProfile(true)}>
                    Modifier le profil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="teacher-content">
        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            {dashboardData?.stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Actions Rapides</h2>
          <div className="quick-actions-grid">
            {dashboardData?.quickActions.map((action, index) => (
              <div 
                key={index} 
                className="quick-action-card"
                onClick={() => handleAction(action.action)}
                style={{ '--card-color': action.color }}
              >
                <div className="action-icon-wrapper" style={{ backgroundColor: action.color }}>
                  <span className="action-icon">{action.icon}</span>
                </div>
                <div className="action-content">
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Actions */}
        <section className="other-actions-section">
          <h2 className="section-title">Autres Services</h2>
          <div className="other-actions-grid">
            {dashboardData?.otherActions.map((action, index) => (
              <button
                key={index}
                className="other-action-btn"
                onClick={() => handleAction(action.action)}
              >
                <span className="btn-icon">{action.icon}</span>
                <span className="btn-label">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;
