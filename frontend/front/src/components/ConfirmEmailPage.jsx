import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.post('/auth/confirm-email', { email, token });
        alert('Email validé avec succès !');
        navigate('/change-password', { state: { email } });
      } catch (error) {
        alert('Erreur lors de la validation : ' + (error.response?.data?.message || 'Erreur inconnue'));
        navigate('/login');
      }
    };
    if (email && token) {
      confirmEmail();
    }
  }, [email, token, navigate]);

  return <div>Validation en cours...</div>;
};

export default ConfirmEmailPage;