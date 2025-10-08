import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Nouveau formulaire utilisateur
  const [newUser, setNewUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    departement: '',
    role: 'etudiant'
  });

  useEffect(() => {
    // Vérifier les permissions
    if (user?.role !== 'directeur_departement') {
      navigate('/dashboard');
      return;
    }

    loadUsers();
  }, [user, navigate]);

  const loadUsers = async () => {
    // Simulation du chargement des utilisateurs depuis l'API
    setTimeout(() => {
      // Liste vide au départ - les utilisateurs seront ajoutés via l'interface
      setUsers([]);
      setLoading(false);
    }, 500);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.prenom} ${user.nom} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = async () => {
    if (!newUser.prenom || !newUser.nom || !newUser.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Simulation d'ajout d'utilisateur
      const userToAdd = {
        ...newUser,
        id: users.length + 1
      };

      setUsers([...users, userToAdd]);
      setNewUser({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        departement: '',
        role: 'etudiant'
      });
      setShowAddUser(false);
      alert('Utilisateur ajouté avec succès!');
    } catch (error) {
      alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      telephone: user.telephone || '',
      departement: user.departement || '',
      role: user.role
    });
  };

  const handleUpdateUser = async () => {
    if (!newUser.prenom || !newUser.nom || !newUser.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Simulation de mise à jour
      const updatedUsers = users.map(u =>
        u.id === editingUser.id ? { ...u, ...newUser } : u
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setNewUser({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        departement: '',
        role: 'etudiant'
      });
      alert('Utilisateur modifié avec succès!');
    } catch (error) {
      alert('Erreur lors de la modification de l\'utilisateur');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        // Simulation de suppression
        setUsers(users.filter(u => u.id !== userId));
        alert('Utilisateur supprimé avec succès!');
      } catch (error) {
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLabel = (role) => {
    const labels = {
      etudiant: 'Étudiant',
      enseignant: 'Enseignant',
      directeur_departement: 'Directeur de Département',
      administratif: 'Administratif'
    };
    return labels[role] || role;
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du panneau d'administration...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-left">
          <h1>Panneau d'Administration</h1>
          <p>Gestion des utilisateurs</p>
        </div>
        <div className="header-right">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            Retour au tableau de bord
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les rôles</option>
              <option value="etudiant">Étudiants</option>
              <option value="enseignant">Enseignants</option>
              <option value="administratif">Administratifs</option>
              <option value="directeur_departement">Directeurs</option>
            </select>
          </div>
          <button
            className="add-user-btn"
            onClick={() => setShowAddUser(true)}
          >
            Ajouter un utilisateur
          </button>
        </div>

        {(showAddUser || editingUser) && (
          <div className="user-modal">
            <div className="modal-content">
              <h3>{editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</h3>
              <div className="user-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      value={newUser.prenom}
                      onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      value={newUser.nom}
                      onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={newUser.telephone}
                      onChange={(e) => setNewUser({...newUser, telephone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Département</label>
                    <input
                      type="text"
                      value={newUser.departement}
                      onChange={(e) => setNewUser({...newUser, departement: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Rôle</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="etudiant">Étudiant</option>
                    <option value="enseignant">Enseignant</option>
                    <option value="administratif">Administratif</option>
                    <option value="directeur_departement">Directeur de Département</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button
                    onClick={editingUser ? handleUpdateUser : handleAddUser}
                    className="save-btn"
                  >
                    {editingUser ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddUser(false);
                      setEditingUser(null);
                      setNewUser({
                        prenom: '',
                        nom: '',
                        email: '',
                        telephone: '',
                        departement: '',
                        role: 'etudiant'
                      });
                    }}
                    className="cancel-btn"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Département</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.prenom} {user.nom}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone || '-'}</td>
                  <td>{user.departement || '-'}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="edit-btn"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete-btn"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="no-results">
              <p>Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
