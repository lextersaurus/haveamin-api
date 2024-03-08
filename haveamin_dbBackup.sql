-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: haveamin_db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sports'),(2,'Pets'),(3,'VideoGames'),(4,'TableGames'),(5,'Foods'),(6,'Dancing'),(7,'Tecnology'),(8,'Travels'),(9,'Art'),(10,'Music'),(11,'Otros');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_categories`
--

DROP TABLE IF EXISTS `event_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_categories` (
  `eventId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`eventId`,`categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `event_categories_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `event_categories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_categories`
--

LOCK TABLES `event_categories` WRITE;
/*!40000 ALTER TABLE `event_categories` DISABLE KEYS */;
INSERT INTO `event_categories` VALUES (1,1),(2,1),(3,1),(3,2),(4,4),(8,5),(5,6),(7,11);
/*!40000 ALTER TABLE `event_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `ageMin` int NOT NULL,
  `ageMax` int NOT NULL,
  `isAccessible` tinyint(1) DEFAULT NULL,
  `isFree` tinyint(1) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Football','Polideportivo Manuel Naranjo Sosa, El rincón','2023-04-29 14:30:00',18,25,1,1,3),(2,'Tennis','La minilla','2023-05-10 16:30:00',18,40,1,1,3),(3,'Hiking with dogs','Barranco de los cernicalos','2023-11-15 10:30:00',18,50,0,1,3),(4,'Rol D&D','Mesa y lopez 15','2023-06-12 15:00:00',18,50,1,1,3),(5,'Zumba Latin Dance','Av. Pintor Felo Monzon 12','2023-07-01 15:00:00',16,50,1,1,3),(7,'Cinema: Dune 2','OCine - cc 7 Palmas','2023-03-08 20:00:00',18,99,1,0,3),(8,'Dinner','Goiko - CC 7 Palmas','2023-03-08 23:00:00',18,99,1,0,3);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_events`
--

DROP TABLE IF EXISTS `user_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_events` (
  `status` varchar(255) NOT NULL DEFAULT 'Accepted',
  `rating` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `eventId` int NOT NULL,
  PRIMARY KEY (`userId`,`eventId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `user_events_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_events_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_events`
--

LOCK TABLES `user_events` WRITE;
/*!40000 ALTER TABLE `user_events` DISABLE KEYS */;
INSERT INTO `user_events` VALUES ('Accepted',NULL,NULL,2,3),('Accepted',NULL,NULL,2,5),('Accepted',NULL,NULL,2,7),('Accepted',NULL,NULL,2,8),('Accepted',NULL,NULL,3,3),('Accepted',NULL,NULL,3,4),('Accepted',NULL,NULL,3,7),('Accepted',NULL,NULL,3,8),('Accepted',NULL,NULL,4,1),('Accepted',NULL,NULL,4,2),('Accepted',NULL,NULL,4,7),('Accepted',NULL,NULL,4,8),('Accepted',NULL,NULL,6,1),('Accepted',NULL,NULL,9,7),('Accepted',NULL,NULL,9,8),('Accepted',NULL,NULL,11,8);
/*!40000 ALTER TABLE `user_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `age` int NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickName` (`nickName`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Pepito','De los Palotes','pepPal','PepPal@gmail.com','$2b$10$p8yKXKGKA.2fIytUIu7LQ.3eiNL4AumPj1T74ZwM3M71.SIx4MSSG','user',48,'España'),(2,'Esther','Mesa','estherminio','esther@gmail.com','$2b$10$FzxUfuF8mhaN7lmSmsZiVOH5bO3r4vFd5Uh7qNKhwheZMisapX5BG','admin',25,'Checoslovaquia'),(3,'Sherezade','Santana','sheresan','sherezade@gmail.com','$2b$10$525GDAbcZLWwxsQCkmUmlu2ky7bhDL7eUTTaUfnT9IdZI4AMtMeP2','admin',35,'Japón'),(4,'Fabio','Herrera','fabrizzio','fabio@gmail.com','$2b$10$/O1SbCoZDDnWJO9AuX/7A.YsxTpSrSkYM5hWR3oXlsobTuNofwtEO','admin',30,'Italia'),(5,'Ana','Perez','Anita','ana@gmail.com','$2b$10$UPzAcSN.qtXZkjOtEXXPfuv0W8URpWNN5NP8nJjOpXn0FKE7RSKT6','user',40,'suecia'),(6,'Raul','suarez','Raulazo','raul@gmail.com','$2b$10$nUzDTdtWvb3iez6sAonHle2atuRGR86SwnGtVxf8I6qwrnZd4TaYe','user',40,'Rumania'),(7,'Alvaro','li','alvarosolopati','alvaro@gmail.com','$2b$10$V4RPjPHNetbkLA84mEWb1O1uxTuUkKsU0KTJp1Gd.o1hcjMXaWRbC','user',20,'Chino'),(8,'Yoel','Tirma','tucaramelito','yoel@gmail.com','$2b$10$dsNkYLcXlck7gWcu5BM/bOTpqcuQ8vkTQJzOsnqsa7Nu2CgWmLL9u','user',27,'España'),(9,'Atteneri','Suarez','latempestad','atteneri@gmail.com','$2b$10$G9WF5vrYcphUI/UCL79W.uyJOlUpKw07OLeh7/h4Lg/IdypCrJeWi','user',34,'portugal'),(10,'Aythami','Suarez','tulolipop','aythami@gmail.com','$2b$10$2C7aGtE/P4IZoFX93FaZkeeF.so9Dd3/x78OiPrVUxgGt4ZQJpo0a','user',36,'Etiopia'),(11,'Alexandra','Mendez','AlexMen','AlexMen@gmail.com','$2b$10$VIzWiYZ6emhJhJwV.4jVv.ttBUUetqgsmuZSbfFZXX7Ly/bz4RGcW','user',48,'España'),(13,'Jose','Robaina','JoseRob','jose@gmail.com','$2b$10$OwlmkUmf/qRskDkf7jsU/uAj50Out0IJkMK5aOQk91Dzomk030jvW','user',36,'Japon'),(14,'Pedro','Escobar','ElOtroPatron','Pedro@gmail.com','$2b$10$ourWtcW8PTqi/kHhsPrh4.Aj45NGwYeg.ZK7MC/RauVJS7ymrDIiG','user',40,'Colombia');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-07 11:39:24
