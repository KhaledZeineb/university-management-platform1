import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const AdministrativeDashboard = () => {
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
    departement: user?.departement || '',
    specialite: user?.specialite || ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulate API call for dashboard data
    setTimeout(() => {
      const data = {
        title: 'Espace Administratif',
        stats: [
          { label: 'Inscriptions traitées', value: '89', icon: '📝' },
          { label: 'Documents validés', value: '234', icon: '📄' },
          { label: 'Paiements en attente', value: '12', icon: '💳' },
          { label: 'Demandes en cours', value: '45', icon: '📋' }
        ],
        actions: [
          { label: 'Gérer inscriptions', icon: '📝', action: 'manageRegistrations' },
          { label: 'Valider documents', icon: '📄', action: 'validateDocuments' },
          { label: 'Traiter paiements', icon: '💳', action: 'processPayments' },
          { label: 'Gérer demandes', icon: '📋', action: 'manageRequests' },
          { label: 'Rapports administratifs', icon: '📊', action: 'adminReports' },
          { label: 'Archiver dossiers', icon: '📦', action: 'archiveFiles' }
        ]
      };
      setDashboardData(data);
      setLoading(false);
    }, 1000);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'manageRegistrations':
        alert('Ouverture de la gestion des inscriptions...');
        break;
      case 'validateDocuments':
        alert('Ouverture de la validation des documents...');
        break;
      case 'processPayments':
        alert('Ouverture du traitement des paiements...');
        break;
      case 'manageRequests':
        alert('Ouverture de la gestion des demandes...');
        break;
      case 'adminReports':
        alert('Ouverture des rapports administratifs...');
        break;
      case 'archiveFiles':
        alert('Ouverture de l\'archivage des dossiers...');
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
        <p>Chargement de l'espace administratif...</p>
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
                <span className="user-role">Administratif</span>
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
                <div className="form-group">
                  <label>Spécialité:</label>
                  <input
                    type="text"
                    value={profileData.specialite}
                    onChange={(e) => setProfileData({...profileData, specialite: e.target.value})}
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
                <p><strong>Spécialité:</strong> {user?.specialite || 'Non spécifiée'}</p>
                <p><strong>Rôle:</strong> Administratif</p>
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

export default AdministrativeDashboard;