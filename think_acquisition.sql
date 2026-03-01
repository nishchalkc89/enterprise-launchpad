-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2026 at 12:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `think_acquisition`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@think.com', '$2b$12$VSGe3.qcEGjHAgwvRNsW3O9i3ToVxa7rqgjA7wjlWuQBnKy3Q.fwm', '2026-02-26 15:17:21', '2026-02-26 15:17:21');

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int(11) NOT NULL,
  `sectionId` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT '',
  `subtitle` varchar(255) DEFAULT '',
  `body` text DEFAULT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `metadata` longtext DEFAULT '{}',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contents`
--

INSERT INTO `contents` (`id`, `sectionId`, `title`, `subtitle`, `body`, `visible`, `metadata`, `createdAt`, `updatedAt`) VALUES
(1, 'services', 'services', '', '', 1, '{}', '2026-02-26 08:01:47', '2026-02-26 08:01:47'),
(2, 'hero', 'hero', '', '', 1, '{}', '2026-02-26 08:01:47', '2026-02-26 08:01:47'),
(3, 'about', 'About', '', '', 1, '{}', '2026-02-26 08:01:47', '2026-02-26 15:49:07'),
(4, 'contact', 'contact', '', '', 1, '{}', '2026-02-26 08:01:47', '2026-02-26 08:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `url`, `createdAt`, `updatedAt`) VALUES
(2, '/uploads/1772121528674-cs.png', '2026-02-26 15:58:48', '2026-02-26 15:58:48');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT 'Briefcase',
  `order` int(11) DEFAULT 0,
  `visible` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `companyName` varchar(255) DEFAULT '',
  `pocName` varchar(255) DEFAULT '',
  `phone` varchar(255) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `companyName`, `pocName`, `phone`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'THINK Acquisition LLC', 'William Randolph', '(703) 819-6192', 'william@thinkacquisition.net', '2026-02-26 14:39:23', '2026-02-26 14:39:23');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT '',
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `name`, `email`, `phone`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 'Nishchal Kc', 'nirmalkc370@gmail.com', '', 'For Testing', '2026-02-26 08:02:36', '2026-02-26 08:02:36'),
(2, 'Nishchal Kc ', 'nishchalkc370@gmail.com', '', 'Hello ', '2026-02-26 14:36:04', '2026-02-26 14:36:04'),
(3, 'Ashim Khadka ', 'ashimkhadka12@gmail.com', '', 'Hello ', '2026-02-26 14:42:39', '2026-02-26 14:42:39'),
(4, 'Nishchal kc ', 'nirmalkc370@gmail.com', '', 'For testing', '2026-02-26 14:45:24', '2026-02-26 14:45:24'),
(5, 'Nishchal Kc ', 'nirmalkc370@gmail.com', '', 'Hello Think acquisition Team', '2026-02-26 15:04:11', '2026-02-26 15:04:11'),
(6, 'Nishchal Kc ', 'nirmalkc370@gmail.com', '', 'Hello Think acquisition Team', '2026-02-26 15:06:06', '2026-02-26 15:06:06'),
(7, 'Nishchal Kc', 'nirmalkc370@gmail.com', '', 'Hey team ', '2026-02-26 15:11:10', '2026-02-26 15:11:10'),
(8, 'NIrmal kc', 'nirmalkc370@gmail.com', '', 'Hey team \n', '2026-02-26 15:11:58', '2026-02-26 15:11:58'),
(9, 'Nishchal Kc ', 'nirmalkc370@gmail.com', '', 'Hey Team !', '2026-02-26 15:13:49', '2026-02-26 15:13:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sectionId` (`sectionId`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
