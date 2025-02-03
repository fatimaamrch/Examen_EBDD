USE gestion_stock;

-- Insérer des catégories de produits
INSERT INTO categories (nom) VALUES
('Avions de collection'),
('Modèles de compétition'),
('Avions pour débutants');

-- Insérer des produits 
INSERT INTO produits (nom, description, prix_unitaire, quantite_stock, categorie_id) VALUES
('Avion Mirage', 'Réplique en papier du Mirage 2000', 12.99, 50, 1),
('Boeing 747', 'Grand modèle détaillé', 19.99, 30, 2),
('Planeur léger', 'Parfait pour les débutants', 9.99, 100, 3),
('F-16 Fighting Falcon', 'Maquette de haute précision', 17.50, 20, 2),
('Avion Supersonique', 'Modèle inspiré du Concorde', 14.99, 40, 1);

-- Insérer des fournisseurs
INSERT INTO fournisseurs (nom, contact, adresse) VALUES
('PaperPlanes Ltd', 'contact@paperplanes.com', '123 Rue des Ailes, Paris'),
('AéroModèles', 'info@aeromodeles.com', '45 Avenue des Pilotes, Toulouse'),
('Origami Air', 'sales@origamiair.com', '78 Boulevard du Ciel, Lyon');

-- Associer des produits à des fournisseurs
INSERT INTO produits_fournisseurs (produit_id, fournisseur_id, prix_achat, delai_livraison) VALUES
(1, 1, 8.50, 5),
(2, 2, 14.00, 7),
(3, 3, 6.50, 3),
(4, 1, 12.00, 6),
(5, 2, 10.50, 4);

-- Insérer des clients
INSERT INTO clients (nom, prenom, email, telephone, adresse) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '0601020304', '10 Rue des Aviateurs, Paris'),
('Martin', 'Sophie', 'sophie.martin@example.com', '0611121314', '22 Avenue des Maquettes, Lyon'),
('Durand', 'Paul', 'paul.durand@example.com', '0622232425', '33 Boulevard du Papier, Marseille'),
('Bernard', 'Elise', 'elise.bernard@example.com', '0633343536', '44 Impasse du Vol, Toulouse'),
('Morel', 'Lucas', 'lucas.morel@example.com', '0644454647', '55 Chemin des Pilotes, Bordeaux');

-- Insérer des commandes
INSERT INTO commandes (client_id, date_commande, statut) VALUES
(1, '2024-02-01 10:30:00', 'validée'),
(2, '2024-02-03 14:45:00', 'en attente'),
(3, '2024-02-05 09:15:00', 'expédiée'),
(4, '2024-02-08 16:00:00', 'validée'),
(5, '2024-02-10 11:20:00', 'annulée');

-- Insérer des lignes de commande 
INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES
(1, 2, 1, 19.99),
(1, 4, 2, 17.50),
(2, 3, 3, 9.99),
(3, 1, 1, 12.99),
(3, 5, 2, 14.99),
(4, 2, 1, 19.99),
(4, 3, 5, 9.99),
(5, 1, 2, 12.99);

