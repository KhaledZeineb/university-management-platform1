import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ChangePasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const email = location.state?.email || '';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await changePassword(email, currentPassword, newPassword);
      if (result.success) {
        alert('Mot de passe changé avec succès !');
        // Redirige vers dashboard selon rôle
        const role = result.user?.role;
        if (role === 'etudiant') navigate('/student-dashboard');
        else if (role === 'enseignant') navigate('/teacher-dashboard');
        else if (role === 'directeur_departement') navigate('/director-dashboard');
        else if (role === 'administratif') navigate('/admin-dashboard');
        else navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <h2>Changer votre mot de passe</h2>
        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currentPassword">Ancien mot de passe</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Votre ancien mot de passe"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Votre nouveau mot de passe"
              disabled={loading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Changement...' : 'Changer le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;