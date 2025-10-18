-- Insertion des nouveaux utilisateurs
-- Admin : devra changer son mot de passe à la première connexion
-- Étudiant : mot de passe déjà défini

INSERT INTO utilisateur (nom, prenom, email, cin, mdp_hash, role, doit_changer_mdp, "emailConfirmed")
VALUES
('Admin', 'System', 'admin@university.com', 'ADMIN001',
 '$2b$12$2lvKI.yTUqQgkSennY0r4.w6tQsYoEN01h04RWkbR1uEVMkb5FUa6',
 'administratif', true, true),

('Dupont', 'Jean', 'jean.dupont@example.com', '12345678',
 '$2b$12$2lvKI.yTUqQgkSennY0r4.w6tQsYoEN01h04RWkbR1uEVMkb5FUa6',
 'etudiant', false, true);