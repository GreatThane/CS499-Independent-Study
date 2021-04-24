SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `Posts`;
DROP TABLE IF EXISTS `Comments`;
DROP TABLE IF EXISTS `Votes`;
SET foreign_key_checks = 1;

CREATE TABLE `Posts`
(
    `id`          int unsigned NOT NULL AUTO_INCREMENT,
    `title`       varchar(255) NULL DEFAULT NULL,
    `content`     text         NOT NULL,
    `time_stamp`  timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `author`      varchar(100) NOT NULL,
    `question_id` int unsigned NULL DEFAULT NULL,

    PRIMARY KEY (`id`),
    KEY `fkIdx_36` (`question_id`),
    CONSTRAINT `FK_35` FOREIGN KEY `fkIdx_36` (`question_id`) REFERENCES `Posts` (`id`)
);

CREATE TABLE `Votes`
(
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `post_id` int unsigned NOT NULL,
    `user` varchar(100) NOT NULL,
    `value` int NOT NULL CHECK ( `value` IN (1, 0, -1)),

    PRIMARY KEY (`id`),
    KEY `fkIdx_44` (`post_id`),
    CONSTRAINT `FK_43` FOREIGN KEY `fkIdx_44` (`post_id`) REFERENCES `Posts` (`id`),
    UNIQUE `unique_entry`(`post_id`, `user`)
);

CREATE TABLE `Comments`
(
    `id`         int unsigned NOT NULL AUTO_INCREMENT,
    `content`    text         NOT NULL,
    `time_stamp` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `author`     varchar(100) NOT NULL,
    `post_id`    int unsigned NOT NULL,

    PRIMARY KEY (`id`),
    KEY `fkIdx_24` (`post_id`),
    CONSTRAINT `FK_23` FOREIGN KEY `fkIdx_24` (`post_id`) REFERENCES `Posts` (`id`)
);
