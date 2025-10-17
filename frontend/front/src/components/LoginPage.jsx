import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Redirect to role-specific dashboard
        const userRole = result.user?.role || user?.role;
        switch (userRole) {
          case 'etudiant':
            navigate('/student-dashboard');
            break;
          case 'enseignant':
            navigate('/teacher-dashboard');
            break;
          case 'directeur_departement':
            navigate('/director-dashboard');
            break;
          case 'administratif':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/dashboard'); // fallback
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    // Ici on pourrait ouvrir une modal ou naviguer vers une page dédiée
    alert(`Réinitialisation par email pour: ${email}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="back-link">
            ← Retour à l'accueil
          </Link>
          <div className="logo">🔐</div>
          <h2>Connexion</h2>
          <p>Accédez à votre espace personnel</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre.email@univ.tn"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Votre mot de passe"
              disabled={loading}
            />
          </div>

          <div className="button-container">
            <button type="submit" className="btn btn-primary btn-centered" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="forgot-password-section">
          <button 
            type="button" 
            className="forgot-password-link"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Mot de passe oublié ?
          </button>
          
          {showForgotPassword && (
            <div className="reset-info">
              <p>Un email de réinitialisation sera envoyé à : <strong>{email}</strong></p>
              <button 
                type="button"
                className="btn btn-primary btn-small"
                onClick={() => setShowForgotPassword(false)}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;