import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulate API call for dashboard data
    setTimeout(() => {
      const data = getDashboardDataByRole(user.role);
      setDashboardData(data);
      setLoading(false);
    }, 1000);
  };

  const getDashboardDataByRole = (role) => {
    switch (role) {
      case 'etudiant':
        return {
          title: 'Espace Étudiant',
          stats: [
            { label: 'Mes cours', value: '6', icon: '📚' },
            { label: 'Notes moyennes', value: '14.5', icon: '📊' },
            { label: 'Absences', value: '2', icon: '⚠️' },
            { label: 'Crédits validés', value: '45/180', icon: '🎓' }
          ],
          actions: [
            { label: 'Mon emploi du temps', icon: '📅', action: 'viewSchedule' },
            { label: 'Mes notes', icon: '📈', action: 'viewGrades' },
            { label: 'Statistiques', icon: '📊', action: 'statistics' },
            { label: 'Messagerie', icon: '💬', action: 'messaging' },
            { label: 'Bibliothèque', icon: '📖', action: 'library' }
          ]
        };
      case 'enseignant':
        return {
          title: 'Espace Enseignant',
          stats: [
            { label: 'Cours enseignés', value: '5', icon: '📚' },
            { label: 'Étudiants', value: '147', icon: '👥' },
            { label: 'Devoirs à corriger', value: '23', icon: '📝' },
            { label: 'Heures/semaine', value: '18', icon: '⏰' }
          ],
          actions: [
            { label: 'Mon emploi du temps', icon: '📅', action: 'viewSchedule' },
            { label: 'Emploi cours', icon: '📋', action: 'viewCourseSchedule' },
            { label: 'Signaler absence', icon: '🚫', action: 'reportAbsence' },
            { label: 'Proposer rattrapage', icon: '🔄', action: 'proposeCatchup' },
            { label: 'Valider absences', icon: '✅', action: 'validateAbsences' },
            { label: 'Saisir notes', icon: '📝', action: 'enterGrades' },
            { label: 'Messagerie', icon: '💬', action: 'messaging' },
            { label: 'Mes cours', icon: '📚', action: 'manageCourses' }
          ]
        };
      case 'directeur_departement':
        return {
          title: 'Espace Directeur de Département',
          stats: [
            { label: 'Enseignants', value: '23', icon: '' },
            { label: 'Étudiants', value: '456', icon: '' },
            { label: 'Cours actifs', value: '34', icon: '' },
            { label: 'Conflits détectés', value: '2', icon: '' }
          ],
          actions: [
            { label: 'Créer emplois du temps', icon: '', action: 'createSchedule' },
            { label: 'Modifier emplois', icon: '', action: 'editSchedule' },
            { label: 'Valider emplois', icon: '', action: 'validateSchedule' },
            { label: 'Résoudre conflits', icon: '', action: 'resolveConflicts' },
            { label: 'Tableau de bord', icon: '', action: 'departmentDashboard' },
            { label: 'Gérer rattrapages', icon: '', action: 'manageCatchups' },
            { label: 'Administrer matières', icon: '', action: 'manageSubjects' },
            { label: 'Gérer groupes', icon: '', action: 'manageGroups' },
            { label: 'Gérer membres', icon: '', action: 'manageMembers' },
            { label: 'Rapports', icon: '', action: 'reports' }
          ]
        };
      case 'administratif':
        return {
          title: 'Panneau Administratif',
          stats: [
            { label: 'Étudiants total', value: '1,247', icon: '🎓' },
            { label: 'Enseignants total', value: '89', icon: '👩‍🏫' },
            { label: 'Départements', value: '12', icon: '🏢' },
            { label: 'Taux de présence', value: '87%', icon: '📊' }
          ],
          actions: [
            { label: 'Configuration système', icon: '⚙️', action: 'systemConfig' },
            { label: 'Statistiques globales', icon: '📊', action: 'globalStats' },
            { label: 'Logs système', icon: '📋', action: 'systemLogs' },
            { label: 'Sauvegarde', icon: '💾', action: 'backup' },
            { label: 'Sécurité', icon: '🔒', action: 'security' },
            { label: 'Maintenance', icon: '🛠️', action: 'maintenance' }
          ]
        };
      default:
        return {
          title: 'Tableau de bord',
          stats: [],
          actions: []
        };
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'manageMembers':
        if (user.role === 'directeur_departement') {
          navigate('/admin');
        } else {
          alert('Seul le directeur de département peut gérer les membres');
        }
        break;
      case 'manageUsers':
        navigate('/admin');
        break;
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
      case 'viewCourseSchedule':
        alert('Ouverture de l\'emploi du temps des cours...');
        break;
      case 'reportAbsence':
        alert('Signalement d\'absence...');
        break;
      case 'proposeCatchup':
        alert('Proposition de rattrapage...');
        break;
      case 'validateAbsences':
        alert('Validation des absences...');
        break;
      case 'enterGrades':
        alert('Saisie des notes...');
        break;
      case 'manageCourses':
        alert('Gestion des cours...');
        break;
      case 'createSchedule':
        alert('Création d\'emploi du temps...');
        break;
      case 'editSchedule':
        alert('Modification d\'emploi du temps...');
        break;
      case 'validateSchedule':
        alert('Validation d\'emploi du temps...');
        break;
      case 'resolveConflicts':
        alert('Résolution des conflits...');
        break;
      case 'departmentDashboard':
        alert('Ouverture du tableau de bord département...');
        break;
      case 'manageCatchups':
        alert('Gestion des rattrapages...');
        break;
      case 'manageSubjects':
        alert('Gestion des matières...');
        break;
      case 'manageGroups':
        alert('Gestion des groupes...');
        break;
      case 'reports':
        alert('Ouverture des rapports...');
        break;
      case 'manageReferences':
        alert('Gestion des référentiels...');
        break;
      case 'manageDepartments':
        alert('Gestion des départements...');
        break;
      case 'manageSpecialties':
        alert('Gestion des spécialités...');
        break;
      case 'manageTeachers':
        alert('Gestion des enseignants...');
        break;
      case 'manageStudents':
        alert('Gestion des étudiants...');
        break;
      case 'manageRooms':
        alert('Gestion des salles...');
        break;
      case 'superviseSchedules':
        alert('Supervision des emplois du temps...');
        break;
      case 'manageConflicts':
        alert('Gestion des conflits...');
        break;
      case 'institutionalReports':
        alert('Rapports institutionnels...');
        break;
      case 'manageEvents':
        alert('Gestion des événements...');
        break;
      case 'manageClosures':
        alert('Gestion des fermetures/conférences...');
        break;
      case 'systemConfig':
        alert('Configuration système...');
        break;
      case 'globalStats':
        alert('Statistiques globales...');
        break;
      case 'systemLogs':
        alert('Logs système...');
        break;
      case 'backup':
        alert('Sauvegarde...');
        break;
      case 'security':
        alert('Sécurité...');
        break;
      case 'maintenance':
        alert('Maintenance...');
        break;
      default:
        alert(`Action ${action} non implémentée`);
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
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>{dashboardData?.title}</h1>
          <div className="user-info">
            <span className="user-name">{user?.prenom} {user?.nom}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

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

export default Dashboard;
