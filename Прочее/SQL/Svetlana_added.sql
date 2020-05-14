-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: EdgePoint
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `deadline` date NOT NULL,
  `global` tinyint(1) NOT NULL,
  `description` mediumtext,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (3,'Молодежный карьерный форум — 2020','2020-05-15',1,'Карьерный форум для молодежи!','НИК, Политехническая ул., 29АФ, СПБ'),(4,'Карьерный форум Fresh Business в Москве','2020-05-13',1,'Fresh Business в Москве!','Лиговский пр-т, д. 74, про-во \"Синий пол\", СПб'),(5,'Фестиваль науки, технологий и искусства Geek Picnic','2020-05-29',1,'Фестиваль науки, технологий и искусства!','Большой Знаменский пер., д.2 стр.3., Мск'),(6,'Ежегодная конференция для HR и ИТ-рекрутеров TechRec 2020','2020-06-01',1,'Конференция для HR и ИТ-рекрутеров TechRec 2020.Проходит каждый год!','ул. 50 лет Октября, 94, Курск'),(7,'Авиахакатон-2020 онлайн','2020-05-26',1,'Это самый масштабный хакатон в России в авиаиндустрии с международным участием!','Проспект Медиков, дом 3, СПБ'),(8,'Онлайн-конференция «Время возможностей»','2020-05-05',0,'Наша локальная конференция,участие по желанию!','НИК, Политехническая ул., 29АФ, СПБ');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_task`
--

DROP TABLE IF EXISTS `tag_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(20) NOT NULL,
  `id_task` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_task` (`id_task`),
  CONSTRAINT `tag_task_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_task`
--

LOCK TABLES `tag_task` WRITE;
/*!40000 ALTER TABLE `tag_task` DISABLE KEYS */;
INSERT INTO `tag_task` VALUES (18,'Важно',22),(19,'Прочее',22),(20,'Срочно',23),(21,'Прочее',23),(22,'Без метки',24),(23,'Форум',24),(24,'Внимание',25),(25,'Прочее',25),(26,'Без метки',26),(27,'Прочее',26),(28,'Внимание',27),(29,'Форум',27),(30,'Важно',28),(31,'Форум',28),(32,'Без метки',29),(33,'Прочее',29),(34,'Срочно',30),(35,'Прочее',30),(36,'Внимание',31),(37,'Прочее',31),(38,'Без метки',32),(39,'Фестиваль',32),(40,'Срочно',33),(41,'Конференция',33),(42,'Без метки',34),(43,'Форум',34),(46,'Внимание',35),(47,'Прочее',35),(48,'Без метки',36),(49,'Прочее',36),(50,'Важно',37),(51,'Конференция',37),(52,'Срочно',38),(53,'Прочее',38);
/*!40000 ALTER TABLE `tag_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_project`
--

DROP TABLE IF EXISTS `task_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_task` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_task` (`id_task`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `task_project_ibfk_1` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_project_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_project`
--

LOCK TABLES `task_project` WRITE;
/*!40000 ALTER TABLE `task_project` DISABLE KEYS */;
INSERT INTO `task_project` VALUES (7,22,3),(8,23,3),(9,24,3),(10,25,3),(11,26,3),(12,27,4),(13,28,4),(14,29,4),(15,30,5),(16,31,5),(17,32,5),(18,33,6),(20,34,7),(21,35,7),(22,36,7),(23,37,8),(24,38,8);
/*!40000 ALTER TABLE `task_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `deadline` date NOT NULL,
  `notification` date DEFAULT NULL,
  `color` varchar(6) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (22,'Обсудить спонсирование с руководством','2020-05-05',NULL,'ff00ff','Нужно обусдить спонсирование проекта с руководством'),(23,'Составить ТЗ для программистов','2020-05-05',NULL,'ff00ff','Программистам нужно Техническое задание для проекта'),(24,'Разослать приглашения партнерам форума','2020-05-02',NULL,'ff00ff','Андрею нужно разослать приглашения партнерам форума'),(25,'Создать группу ВКонтакте','2020-05-01',NULL,'ff00ff','Форуму обязательно нужна группа в вк до 1 мая'),(26,'Обсудить рекламную кампанию','2020-05-06',NULL,'ff00ff','Нужно обсудить как будем рекламировать форум'),(27,'Пригласить работодателей и составить список','2020-05-08',NULL,'ff00ff','Нужно обязательно пригласить работодателей и составить список'),(28,'Договориться об аренде места проведения','2020-05-12',NULL,'ff00ff','Ваня,тебе нужно найти нам место проведения'),(29,'Распространить объявления о поиске волонтеров','2020-05-06',NULL,'ff00ff','Обьявления нужно еще предварительно сверстать'),(30,'Связаться с типографией для обсуждения работ','2020-05-19',NULL,'ff00ff','Телефон типографии спроси у Данила'),(31,'Забрать договор с рестораном','2020-05-20',NULL,'ff00ff','Нужно оформить и забрать договор с рестораном'),(32,'Уточнить дату проведения','2020-05-15',NULL,'ff00ff','Нужно уточнить дату,там возникла некоторая неясность'),(33,'Составить расписание мероприятия','2020-05-27',NULL,'ff00ff','Конференции срочно нужно расписание,до него всего 11 дней!'),(34,'Обсудить максимальное число команд-участников','2020-05-12',NULL,'ff00ff','Нужно определится с количеством команд'),(35,'Утвердить форму заявки','2020-05-18',NULL,'ff00ff','Нужно проверить и утутвердить форму заявки'),(36,'Заказать стенд','2020-05-20',NULL,'ff00ff','Нужно заказать стенд,без этого никак'),(37,'Разослать участникам приглашения по email','2020-05-01',NULL,'ff00ff','Нужно пригласть участникова,иначе как они будут участниками?'),(38,'Протестировать платформу для видеосвязи','2020-05-01',NULL,'ff00ff','Нужно срочно проверить видеосвязь для мероприятия');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_project` (`id_project`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_project_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_project_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES (6,6,3,1),(11,7,3,0),(12,8,3,0),(13,9,3,0),(14,10,3,0),(15,6,4,1),(16,9,4,0),(17,9,5,0),(18,10,5,1),(19,6,6,1),(20,9,7,1),(21,10,7,0),(22,9,8,1),(23,7,8,0);
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_task`
--

DROP TABLE IF EXISTS `user_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_task` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`id_task`),
  KEY `fk_user_task_1_idx` (`id_user`),
  CONSTRAINT `fk_user_task_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `id` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_task`
--

LOCK TABLES `user_task` WRITE;
/*!40000 ALTER TABLE `user_task` DISABLE KEYS */;
INSERT INTO `user_task` VALUES (13,6,22),(14,7,23),(15,8,24),(16,9,25),(17,10,26),(18,6,27),(19,9,28),(20,9,29),(21,9,30),(22,9,31),(23,10,32),(24,6,33),(25,9,34),(26,10,35),(27,9,36),(28,9,37),(29,7,38);
/*!40000 ALTER TABLE `user_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `email` varchar(32) NOT NULL,
  `vk` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Анастасия','Шредер','anastasia123','Отдел 1','anastasia.shreder@hh.ru','vk.com/tuladragon'),(7,'Марк','Шерман','mark123','Отдел 1','mark.sherman@hh.ru','vk.com/mark20'),(8,'Андрей','Тагиев','andrey123','Отдел 1','andrey.tagiev@hh.ru','vk.com/andreytagiev'),(9,'Светлана','Конкова','svetlana123','Отдел 1','svetlana.konkova@hh.ru',''),(10,'Данил','Лялин','danil123','Отдел 1','lyalin.danil@hh.ru','vk.com/esrr247');
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

-- Dump completed on 2020-05-14 17:12:48
