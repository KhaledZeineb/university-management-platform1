import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const StudentDashboard = () => {
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
    departement: user?.departement || "",
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simulate API call for dashboard data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const data = {
        title: "Espace Étudiant",
        stats: [
          { 
            label: "Mes cours", 
            value: "6", 
            color: "primary",
            description: "Cours actifs"
          },
          
          { 
            label: "Absences", 
            value: "2", 
            color: "yellow",
            description: "Jours d'absence"
          },
          { 
            label: "Crédits validés", 
            value: "45/180", 
            color: "primary",
            description: "Progression"
          },
        ],
        actions: [
          { 
            label: "Mon emploi du temps", 
            action: "viewSchedule",
            description: "Consulter mon planning"
          },
          { 
            label: "Mes notes", 
            action: "viewGrades",
            description: "Résultats et bulletins"
          },
          { 
            label: "Statistiques", 
            action: "statistics",
            description: "Analyse de performance"
          },
          { 
            label: "Messagerie", 
            action: "messaging",
            description: "Messages et notifications"
          },
          { 
            label: "Bibliothèque", 
            action: "library",
            description: "Ressources pédagogiques"
          },
          { 
            label: "Scolarité", 
            action: "scolarite",
            description: "Documents administratifs"
          },
        ],
      };
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setLoading(false);
    }
  };

  const handleAction = (action) => {
    const actions = {
      viewSchedule: () => navigate("/my-schedule"),
      viewGrades: () => navigate("/notes"),
      statistics: () => navigate("/statistiques"),
      messaging: () => navigate("/messagerie"),
      library: () => navigate("/bibliotheque"),
      scolarite: () => navigate("/scolarite"),
    };

    if (actions[action]) {
      actions[action]();
    } else {
      console.warn(`Action ${action} non implémentée`);
      alert(`La fonctionnalité "${action}" sera bientôt disponible`);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.prenom || !profileData.nom || !profileData.email) {
      alert("Veuillez remplir tous les champs obligatoires (Prénom, Nom, Email)");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      alert("Veuillez entrer une adresse email valide");
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
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      navigate("/");
    }
  };

  const closeProfileModal = () => {
    setShowProfile(false);
    setEditingProfile(false);
    // Reset profile data if editing was cancelled
    setProfileData({
      prenom: user?.prenom || "",
      nom: user?.nom || "",
      email: user?.email || "",
      telephone: user?.telephone || "",
      departement: user?.departement || "",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'espace étudiant...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-info">
              <h1>{dashboardData?.title}</h1>
              <div className="user-info">
                <span className="user-name">
                  {user?.prenom} {user?.nom}
                </span>
                <span className="user-role">Étudiant</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Ouvrir le profil"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profil</span>
            </button>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              aria-label="Se déconnecter"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {showProfile && (
        <div className="profile-modal" onClick={closeProfileModal}>
          <div className="profile-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-profile"
              onClick={closeProfileModal}
              aria-label="Fermer"
            >
              ×
            </button>
            <h3>Informations du profil</h3>
            {editingProfile ? (
              <div className="profile-edit">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom <span className="required">*</span></label>
                  <input
                    id="prenom"
                    type="text"
                    value={profileData.prenom}
                    onChange={(e) =>
                      setProfileData({ ...profileData, prenom: e.target.value })
                    }
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom <span className="required">*</span></label>
                  <input
                    id="nom"
                    type="text"
                    value={profileData.nom}
                    onChange={(e) =>
                      setProfileData({ ...profileData, nom: e.target.value })
                    }
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone</label>
                  <input
                    id="telephone"
                    type="tel"
                    value={profileData.telephone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        telephone: e.target.value,
                      })
                    }
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departement">Département</label>
                  <input
                    id="departement"
                    type="text"
                    value={profileData.departement}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        departement: e.target.value,
                      })
                    }
                    placeholder="Votre département"
                  />
                </div>
                <div className="profile-actions">
                  <button className="btn-primary" onClick={handleProfileUpdate}>
                    Sauvegarder
                  </button>
                  <button className="btn-secondary" onClick={() => setEditingProfile(false)}>
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-view">
                <div className="profile-item">
                  <span className="profile-label">Prénom:</span>
                  <span className="profile-value">{user?.prenom}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Nom:</span>
                  <span className="profile-value">{user?.nom}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">{user?.email}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Téléphone:</span>
                  <span className="profile-value">
                    {user?.telephone || "Non spécifié"}
                  </span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Département:</span>
                  <span className="profile-value">
                    {user?.departement || "Non spécifié"}
                  </span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Rôle:</span>
                  <span className="profile-value badge-role">Étudiant</span>
                </div>
                <button className="btn-primary" onClick={() => setEditingProfile(true)}>
                  Modifier le profil
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <section className="stats-section">
          <h2 className="section-title">Vue d'ensemble</h2>
          <div className="stats-grid">
            {dashboardData?.stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-${stat.color}`}>
                <div className="stat-header">
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="stat-body">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-description">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="actions-section">
          <h2 className="section-title">Services disponibles</h2>
          <div className="actions-grid">
            {dashboardData?.actions.map((action, index) => (
              <button
                key={index}
                className="action-btn"
                onClick={() => handleAction(action.action)}
              >
                <span className="action-label">{action.label}</span>
                <span className="action-description">{action.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;