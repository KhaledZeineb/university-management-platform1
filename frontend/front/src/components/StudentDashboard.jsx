import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    prenom: user?.prenom || '',
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    departement: user?.departement || ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulate API call for dashboard data
    setTimeout(() => {
      const data = {
        title: 'Espace Étudiant',
        stats: [
          { label: 'Mes cours', value: '6', icon: '📚' },
          { label: 'Notes moyennes', value: '14.5', icon: '📊' },
          { label: 'Absences', value: '2', icon: '⚠️' },
          { label: 'Crédits validés', value: '45/180', icon: '🎓' }
        ],
        actions: [
          { label: 'Mon emploi du temps', icon: '📅', action: 'viewSchedule' },
          { label: 'Mes notes', icon: '📝', action: 'viewGrades' },
          { label: 'Statistiques', icon: '📊', action: 'statistics' },
          { label: 'Messagerie', icon: '💬', action: 'messaging' },
          { label: 'Bibliothèque', icon: '📖', action: 'library' }
        ]
      };
      setDashboardData(data);
      setLoading(false);
    }, 1000);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'viewSchedule':
        alert('Ouverture de l\'emploi du temps...');
        break;
      case 'viewGrades':
        alert('Ouverture des notes...');
        break;
      case 'statistics':
        alert('Ouverture des statistiques...');
        break;
      case 'messaging':
        alert('Ouverture de la messagerie...');
        break;
      case 'library':
        alert('Ouverture de la bibliothèque...');
        break;
      default:
        alert(`Action ${action} non implémentée`);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.prenom || !profileData.nom || !profileData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profil mis à jour avec succès!');
      setEditingProfile(false);
    } catch (error) {
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <span className="user-name">{user?.prenom} {user?.nom}</span>
                <span className="user-role">Étudiant</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              👤 Profil
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {showProfile && (
        <div className="profile-modal">
          <div className="profile-content">
            <h3>Informations du profil</h3>
            {editingProfile ? (
              <div className="profile-edit">
                <div className="form-group">
                  <label>Prénom:</label>
                  <input
                    type="text"
                    value={profileData.prenom}
                    onChange={(e) => setProfileData({...profileData, prenom: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom:</label>
                  <input
                    type="text"
                    value={profileData.nom}
                    onChange={(e) => setProfileData({...profileData, nom: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone:</label>
                  <input
                    type="tel"
                    value={profileData.telephone}
                    onChange={(e) => setProfileData({...profileData, telephone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Département:</label>
                  <input
                    type="text"
                    value={profileData.departement}
                    onChange={(e) => setProfileData({...profileData, departement: e.target.value})}
                  />
                </div>
                <div className="profile-actions">
                  <button onClick={handleProfileUpdate}>Sauvegarder</button>
                  <button onClick={() => setEditingProfile(false)}>Annuler</button>
                </div>
              </div>
            ) : (
              <div className="profile-view">
                <p><strong>Prénom:</strong> {user?.prenom}</p>
                <p><strong>Nom:</strong> {user?.nom}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Téléphone:</strong> {user?.telephone || 'Non spécifié'}</p>
                <p><strong>Département:</strong> {user?.departement || 'Non spécifié'}</p>
                <p><strong>Rôle:</strong> Étudiant</p>
                <button onClick={() => setEditingProfile(true)}>Modifier</button>
              </div>
            )}
            <button className="close-profile" onClick={() => setShowProfile(false)}>×</button>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="stats-grid">
          {dashboardData?.stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="actions-section">
          <h2>Actions disponibles</h2>
          <div className="actions-grid">
            {dashboardData?.actions.map((action, index) => (
              <button
                key={index}
                className="action-btn"
                onClick={() => handleAction(action.action)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;