CREATE DATABASE IF NOT EXISTS travel_memories;
USE travel_memories;


DROP TABLE IF EXISTS travel;
DROP TABLE IF EXISTS stage;
DROP TABLE IF EXISTS photo;


CREATE TABLE travel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(100),
    place VARCHAR(100),
    description VARCHAR(300)
);


CREATE TABLE stage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    travel_id INT,
    description VARCHAR(300),
    FOREIGN KEY (travel_id) REFERENCES travel(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE photo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stage_id INT,
    description VARCHAR(300),
    photo_data MEDIUMBLOB,
    privacy BOOLEAN,
    FOREIGN KEY (stage_id) REFERENCES stage(id) ON DELETE CASCADE ON UPDATE CASCADE
);
