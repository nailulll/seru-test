-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 04, 2024 at 06:28 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_database_seru`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_student_class_teacher` ()   BEGIN
    SELECT s.name AS student_name,
           c.name AS class_name,
           t.name AS teacher_name
    FROM students AS s
             JOIN
         classes c ON s.class_id = c.id
             JOIN
         teachers t ON c.teacher_id = t.id;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_class` (IN `class_name` VARCHAR(50), IN `class_teacher_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SELECT 'Error: Duplicate entry detected for class';
        END;

    INSERT INTO classes (name, teacher_id) VALUES (class_name, class_teacher_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student` (IN `student_name` VARCHAR(100), IN `student_age` INT, IN `student_class_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SELECT 'Error: Duplicate entry detected';
        END;

    INSERT INTO students (name, age, class_id) VALUES (student_name, student_age, student_class_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_teacher` (IN `teacher_name` VARCHAR(100), IN `teacher_subject` VARCHAR(50))   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SELECT 'Error: Duplicate entry detected for teacher';
        END;

    INSERT INTO teachers (name, subject) VALUES (teacher_name, teacher_subject);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `teacher_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `teacher_id`) VALUES
(1, 'Kelas 10A', 1),
(2, 'Kelas 11B', 2),
(3, 'Kelas 12C', 3),
(8, 'Kelas 10B', 2);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `class_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `age`, `class_id`) VALUES
(1, 'Budi', 16, 1),
(2, 'Ani', 17, 2),
(3, 'Candra', 18, 3);

-- --------------------------------------------------------

--
-- Stand-in structure for view `student_class_teacher`
-- (See below for the actual view)
--
CREATE TABLE `student_class_teacher` (
`student_name` varchar(100)
,`class_name` varchar(50)
,`teacher_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `subject`) VALUES
(1, 'Pak Anton', 'Matematika'),
(2, 'Bu Dina', 'Bahasa Indonesia'),
(3, 'Pak Eko', 'Biologi');

-- --------------------------------------------------------

--
-- Structure for view `student_class_teacher`
--
DROP TABLE IF EXISTS `student_class_teacher`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_class_teacher`  AS SELECT `s`.`name` AS `student_name`, `c`.`name` AS `class_name`, `t`.`name` AS `teacher_name` FROM ((`students` `s` join `classes` `c` on((`s`.`class_id` = `c`.`id`))) join `teachers` `t` on((`c`.`teacher_id` = `t`.`id`)))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name` (`name`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name` (`name`),
  ADD UNIQUE KEY `unique_age` (`age`) USING BTREE,
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name` (`name`),
  ADD UNIQUE KEY `unique_subject` (`subject`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
