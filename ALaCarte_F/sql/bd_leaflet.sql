-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Lun 09 Janvier 2023 à 05:13
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bd_leaflet`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Commentaire` varchar(500) NOT NULL,
  `Note` decimal(5,0) NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `idUtilisateur`, `idRestaurant`, `Nom`, `Commentaire`, `Note`, `Date`) VALUES
(1, 2, 11, 'Taverne Grecque', 'Restaurant très éxotique !', '5', '2023-01-08 00:39:37'),
(2, 2, 12, 'Georges Café', 'Très chill !', '5', '2023-01-08 01:06:07'),
(3, 3, 15, 'Acropolis', 'J\'ai apprécié !', '4', '2023-01-08 01:37:31'),
(5, 3, 24, 'Taverne Grecque', 'Cela me rappelle la Grèce !', '3', '2023-01-08 17:54:57');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `idExpediteur` int(11) NOT NULL,
  `idDestinataire` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Message` varchar(50) NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `restaurants`
--

CREATE TABLE `restaurants` (
  `idUtilisateur` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `Nom` varchar(300) NOT NULL,
  `Adresse` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `restaurants`
--

INSERT INTO `restaurants` (`idUtilisateur`, `id`, `Nom`, `Adresse`) VALUES
(2, 11, 'Taverne Grecque', '8 Rue de la Huchette, 75005 Paris'),
(2, 12, 'Georges Café', '4 Rue de la Huchette, 75005 Paris'),
(2, 13, 'Ristorante Il Gigolo', '11 Rue de la Huchette, 75005 Paris'),
(2, 14, 'La Maison de Gyros', '26 Rue de la Huchette, 75005 Paris'),
(2, 15, 'Acropolis', '12 Rue Xavier Privas, 75005 Paris'),
(2, 16, 'Le Latin', '22 Rue Xavier Privas, 75005 Paris'),
(2, 17, 'Ceni', '26 Rue Saint-Séverin, 75005 Paris'),
(2, 18, 'La Demi-Lune', '34 Rue Saint-Séverin, 75005 Paris'),
(2, 19, 'Pan Asie', '13 Rue Saint-Séverin, 75005 Paris'),
(3, 21, 'Twenty Twenty', '12 Rue de la Harpe, 75005 Paris'),
(3, 24, 'Taverne Grecque', '8 Rue de la Huchette, 75005 Paris'),
(3, 25, 'Primo Épicerie Fine', '1 Rue Tiron, 75004 Paris'),
(3, 26, 'Au Bourguignon du Marais', '52 Rue François Miron, 75004 Paris'),
(3, 27, 'Le Pick Clops', '56 Rue du Roi de Sicile, 75004 Paris'),
(3, 28, 'Pizza Service 93', '66 Avenue Émile Cossonneau, 93160 Marne-la-Vallée');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `Pseudo` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `MotDePasse` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `Pseudo`, `Mail`, `MotDePasse`) VALUES
(2, 'toto267', 'toto@exemple.com', '123456789'),
(3, 'Teniol0', 'Teniol@exemple.com', '123456789');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUtilisateur` (`idUtilisateur`),
  ADD KEY `idRestaurant` (`idRestaurant`),
  ADD KEY `Nom` (`Nom`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idExpediteur` (`idExpediteur`),
  ADD KEY `idDestinataire` (`idDestinataire`),
  ADD KEY `idRestaurant` (`idRestaurant`);

--
-- Index pour la table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUtilisateur` (`idUtilisateur`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Mail` (`Mail`),
  ADD UNIQUE KEY `Pseudo` (`Pseudo`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurants` (`id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`idExpediteur`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`idDestinataire`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurants` (`id`);

--
-- Contraintes pour la table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
