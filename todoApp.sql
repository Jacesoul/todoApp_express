-- MySQL dump 10.13  Distrib 8.0.25, for macos11.3 (x86_64)
--
-- Host: localhost    Database: todoApp
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1628065915624,'createSchema1628065915624');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'e6ba99f2-1d80-4605-b89b-809b41bfdbc8','2021-08-04 08:40:07.865506','2021-08-04 17:40:07.865506',NULL,'home'),(2,'8fa25876-afd0-41af-9a8a-914bfddd49be','2021-08-04 08:40:21.525765','2021-08-04 17:40:21.525765',NULL,'work'),(3,'95b9e85b-dbd1-4de8-a3bd-c95b764a7aa5','2021-08-04 08:40:27.381110','2021-08-04 17:40:27.381110',NULL,'urgent');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isCompleted` tinyint NOT NULL DEFAULT '0',
  `tagId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9ab1a77aa7cac06a37c65f3860f` (`tagId`),
  CONSTRAINT `FK_9ab1a77aa7cac06a37c65f3860f` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (1,'33fb9ffc-1fb5-4be9-8222-437f780c19d9','2021-08-04 08:44:16.272993','2021-08-05 19:33:38.000000','2021-08-05 19:33:38.000000','alone',0,NULL),(2,'682153fc-9fa9-44f8-815b-71861f5e1fd1','2021-08-04 08:45:14.040489','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','workout',0,NULL),(3,'533b9072-8643-4741-af96-977e9dcb00c5','2021-08-04 08:46:16.685447','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','it\'s updated',0,NULL),(4,'b46b978e-7ead-4d78-824d-7fe537f4e4a9','2021-08-04 08:51:19.777441','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','why not working ',0,NULL),(5,'6fcd93cf-415e-4070-b939-363df5333f12','2021-08-04 08:52:11.605051','2021-08-04 18:05:03.000000','2021-08-04 18:05:03.000000','please',0,1),(6,'763652d1-082d-4d18-9718-551da6adb5e6','2021-08-04 08:59:45.091974','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','shopping',0,1),(7,'56e747ff-7163-4c94-a300-4a3ea93f0360','2021-08-04 09:02:11.971810','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','shopping',1,1),(8,'a2cdb0b2-d405-4f95-9b8b-51330864fd2f','2021-08-05 10:26:40.281869','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','it\'s great tool!',0,NULL),(9,'0d98d4ab-c8f9-448e-8ca5-257f8f49b979','2021-08-05 10:27:24.285862','2021-08-05 19:31:13.000000','2021-08-05 19:31:13.000000','it\'s great tool!2',0,NULL),(10,'3f0437c4-6e8b-479b-90dc-9a310df937fd','2021-08-05 10:27:45.672248','2021-08-05 19:50:02.000000','2021-08-05 19:50:02.000000','it\'s new one',1,3),(11,'67582aac-c7d1-4eb7-ac53-c0cdb416e9dd','2021-08-05 11:36:27.775439','2021-08-05 20:42:34.000000','2021-08-05 20:42:34.000000','wow',1,3),(12,'0493c629-75fb-4eeb-a085-f50ce5810c25','2021-08-05 11:43:02.823575','2021-08-05 20:43:14.000000','2021-08-05 20:43:14.000000','awesome',0,3),(13,'7f66471e-5e80-4cba-ad19-eaabcb8c8cbc','2021-08-05 11:43:05.314758','2021-08-05 20:43:14.000000','2021-08-05 20:43:14.000000','awesome2',0,3),(14,'f9ad1445-f2c0-4208-b6bb-f258121d19a0','2021-08-05 11:55:42.636259','2021-08-05 20:55:42.636259',NULL,'awesome1',0,3),(15,'c0cf11e1-db37-40b0-afee-7cb10f6f994b','2021-08-05 11:57:34.035048','2021-08-05 20:57:34.035048',NULL,'awesome2',0,3),(16,'e5d35bc2-b59d-4e2b-9976-aa75785dfefa','2021-08-05 12:28:17.288108','2021-08-05 21:28:17.288108',NULL,'awesome2',0,3),(17,'624b656a-b69b-488e-a1ec-fe673264a714','2021-08-05 12:37:41.076334','2021-08-05 21:37:41.076334',NULL,'awesome3',0,3);
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-06 10:26:11
