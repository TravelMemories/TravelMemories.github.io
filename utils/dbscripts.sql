CREATE DATABASE IF NOT EXISTS travel_memories;
USE travel_memories;

-- Allow truncating and deleting referenced tables

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS travel;
DROP TABLE IF EXISTS stage;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS likes;

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(60) NOT NULL,
  role varchar(20) NOT NULL
);

CREATE TABLE travel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    location_name VARCHAR(100),
    description VARCHAR(300),
    latitude DECIMAL(11,8),
    longitude DECIMAL(11,8),
    travel_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attraction VARCHAR(100),
    attraction_link VARCHAR(100)
);



CREATE TABLE stage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    travel_id INT,
    location_name VARCHAR(100),
    description VARCHAR(300),
	latitude DECIMAL(11,8),
    longitude DECIMAL(11,8),
    stage_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (travel_id) REFERENCES travel(id) ON DELETE CASCADE ON UPDATE CASCADE,
    attraction VARCHAR(100),
    attraction_link VARCHAR(100)
);


CREATE TABLE photo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stage_id INT,
    location_name VARCHAR(100),
    description VARCHAR(300),
    photo_data MEDIUMBLOB,
    privacy VARCHAR(20),
    latitude DECIMAL(11,8),
    longitude DECIMAL(11,8),
    photo_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stage_id) REFERENCES stage(id) ON DELETE CASCADE ON UPDATE CASCADE,
    attraction VARCHAR(100),
    attraction_link VARCHAR(100)
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    photo_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (photo_id) REFERENCES photo(id),
    UNIQUE KEY unique_like (user_id, photo_id)
);

INSERT INTO travel (email, location_name, description, travel_date, latitude, longitude)
VALUES
('user1@useremail.com', 'Paris, France', 'Explored the iconic Eiffel Tower and indulged in delicious French pastries.', '2023-03-15', 48.8566, 2.3522),
('user2@useremail.com', 'Kyoto, Japan', 'Visited serene temples, enjoyed cherry blossoms, and experienced traditional tea ceremonies.', '2022-09-25', 35.0116, 135.7681),
('user3@useremail.com', 'New York City, USA', 'Explored Times Square, walked through Central Park, and saw a Broadway show.', '2022-05-10', 40.7128, -74.0060),
('user4@useremail.com', 'Rome, Italy', 'Visited the Colosseum, threw a coin in the Trevi Fountain, and savored authentic Italian pasta.', '2022-07-20', 41.9028, 12.4964),
('user5@useremail.com', 'Cape Town, South Africa', 'Enjoyed breathtaking views from Table Mountain and went on a safari in Kruger National Park.', '2023-01-05', -33.918861, 18.423300),
('user6@useremail.com', 'Barcelona, Spain', 'Strolled down La Rambla, admired Gaudi\'s architecture, and savored paella by the beach.', '2022-11-08', 41.3851, 2.1734),
('user7@useremail.com', 'Tokyo, Japan', 'Explored the bustling districts of Shibuya and Shinjuku, and tasted delicious ramen.', '2022-12-15', 35.6895, 139.6917),
('user8@useremail.com', 'London, UK', 'Visited the British Museum, walked along the River Thames, and experienced London\'s rich history.', '2022-06-02', 51.5074, -0.1278),
('user9@useremail.com', 'Rio de Janeiro, Brazil', 'Relaxed on Copacabana Beach, hiked up Sugarloaf Mountain, and celebrated Carnival.', '2022-03-04', -22.9068, -43.1729),
('user10@useremail.com', 'Dubai, UAE', 'Spectacular views from the Burj Khalifa, shopping at the Dubai Mall, and desert safari adventures.', '2022-08-19', 25.276987, 55.296249),
('user11@useremail.com', 'Marrakech, Morocco', 'Explored the vibrant souks, visited the Jardin Majorelle, and enjoyed traditional Moroccan cuisine.', '2022-04-12', 31.6348, -7.9896),
('user12@useremail.com', 'Sydney, Australia', 'Explored the Sydney Opera House, Bondi Beach, and the historic Rocks district.', '2022-10-30', -33.8688, 151.2093),
('user13@useremail.com', 'Istanbul, Turkey', 'Visited the Hagia Sophia, explored the Grand Bazaar, and cruised the Bosphorus.', '2022-07-25', 41.0082, 28.9784),
('user14@useremail.com', 'Prague, Czech Republic', 'Walked through Old Town Square, admired Prague Castle, and enjoyed Czech beer.', '2022-09-08', 50.0755, 14.4378),
('user15@useremail.com', 'Seoul, South Korea', 'Explored vibrant street markets, visited Gyeongbokgung Palace, and tried Korean BBQ.', '2022-11-27', 37.5665, 126.9780),
('user16@useremail.com', 'Vienna, Austria', 'Attended a classical concert, explored Schönbrunn Palace, and enjoyed Viennese coffee.', '2022-12-03', 48.8566, 2.3522),
('user17@useremail.com', 'Cairo, Egypt', 'Explored the Pyramids of Giza, visited the Sphinx, and cruised the Nile River.', '2022-02-18', 30.0444, 31.2357),
('user18@useremail.com', 'Amsterdam, Netherlands', 'Cycled along picturesque canals, visited Anne Frank House, and explored the Van Gogh Museum.', '2022-05-22', 52.3676, 4.9041),
('user19@useremail.com', 'Buenos Aires, Argentina', 'Danced the tango, explored Recoleta Cemetery, and enjoyed Argentine steak.', '2023-02-09', -34.6118, -58.4173),
('user20@useremail.com', 'Bangkok, Thailand', 'Visited Wat Pho, explored the Grand Palace, and experienced the vibrant street life.', '2022-07-01', 13.7563, 100.5018),
('user21@useremail.com', 'Istanbul, Turkey', 'Explored the Hagia Sophia, explored the Grand Bazaar, and cruised the Bosphorus.', '2022-08-12', 41.0082, 28.9784),
('user22@useremail.com', 'Bangkok, Thailand', 'Visited Wat Pho, explored the Grand Palace, and experienced the vibrant street life.', '2022-06-29', 13.7563, 100.5018),
('user23@useremail.com', 'Sydney, Australia', 'Explored the Sydney Opera House, Bondi Beach, and the historic Rocks district.', '2023-02-10', -33.8688, 151.2093),
('user24@useremail.com', 'Vienna, Austria', 'Attended a classical concert, explored Schönbrunn Palace, and enjoyed Viennese coffee.', '2022-10-18', 48.8566, 2.3522);

INSERT INTO stage (travel_id, description, stage_date, latitude, longitude) VALUES
-- Travel 1
(1, 'Initial Research and Planning', '2023-01-01', 48.8566, 2.3522),
(1, 'Booking Flights and Accommodation', '2023-01-15', 48.8566, 2.3522),

-- Travel 2
(2, 'Researching Kyoto Attractions', '2023-02-01', 35.0116, 135.7681),
(2, 'Finalizing Itinerary and Packing', '2023-02-15', 35.0116, 135.7681),

-- Travel 3
(3, 'Booking Flights to NYC', '2023-03-01', 40.7128, -74.0060),
(3, 'Exploring Activities and Broadway Shows', '2023-03-15', 40.7128, -74.0060),

-- Travel 4
(4, 'Planning Rome Itinerary', '2023-04-01', 41.9028, 12.4964),
(4, 'Visa Application and Packing', '2023-04-15', 41.9028, 12.4964),

-- Travel 5
(5, 'Researching Cape Town Adventures', '2023-05-01', -33.918861, 18.423300),
(5, 'Packing for Safari and Mountain Hike', '2023-05-15', -33.918861, 18.423300),

-- Travel 6
(6, 'Booking Barcelona Accommodation', '2023-06-01', 41.3851, 2.1734),
(6, 'Finalizing Travel Essentials', '2023-06-15', 41.3851, 2.1734),

-- Travel 7
(7, 'Exploring Tokyo Districts', '2023-07-01', 35.6895, 139.6917),
(7, 'Trying Ramen and Packing', '2023-07-15', 35.6895, 139.6917),

-- Travel 8
(8, 'Researching London Attractions', '2023-08-01', 51.5074, -0.1278),
(8, 'Packing and Health Checkup', '2023-08-15', 51.5074, -0.1278),

-- Travel 9
(9, 'Planning Rio de Janeiro Stay', '2023-09-01', -22.9068, -43.1729),
(9, 'Beach Relaxation and Carnival Prep', '2023-09-15', -22.9068, -43.1729),

-- Travel 10
(10, 'Booking Dubai Adventures', '2023-10-01', 25.276987, 55.296249),
(10, 'Shopping for Desert Safari and Views', '2023-10-15', 25.276987, 55.296249),

-- Travel 11
(11, 'Exploring Marrakech Markets', '2023-11-01', 31.6348, -7.9896),
(11, 'Finalizing Travel Itinerary and Cuisine', '2023-11-15', 31.6348, -7.9896),

-- Travel 12
(12, 'Sydney Opera House Tickets', '2023-12-01', -33.8688, 151.2093),
(12, 'Beach Day and Historic District Exploration', '2023-12-15', -33.8688, 151.2093),

-- Travel 13
(13, 'Planning Istanbul Sightseeing', '2024-01-01', 41.0082, 28.9784),
(13, 'Grand Bazaar Shopping and Bosphorus Cruise', '2024-01-15', 41.0082, 28.9784),

-- Travel 14
(14, 'Prague Castle Visit', '2024-02-01', 50.0755, 14.4378),
(14, 'Old Town Walk and Beer Tasting', '2024-02-15', 50.0755, 14.4378),

-- Travel 15
(15, 'Researching Seoul Street Markets', '2024-03-01', 37.5665, 126.9780),
(15, 'Palace Visit and Korean BBQ Night', '2024-03-15', 37.5665, 126.9780),

-- Travel 16
(16, 'Vienna Classical Concert Tickets', '2024-04-01', 48.8566, 2.3522),
(16, 'Schönbrunn Palace Exploration and Coffee Tasting', '2024-04-15', 48.8566, 2.3522),

-- Travel 17
(17, 'Exploring Pyramids of Giza', '2024-05-01', 30.0444, 31.2357),
(17, 'Sphinx Visit and Nile River Cruise', '2024-05-15', 30.0444, 31.2357),

-- Travel 18
(18, 'Cycling in Amsterdam', '2024-06-01', 52.3676, 4.9041),
(18, 'Museum Day and Canals Exploration', '2024-06-15', 52.3676, 4.9041),

-- Travel 19
(19, 'Tango Dance Lessons in Buenos Aires', '2024-07-01', -34.6118, -58.4173),
(19, 'Cemetery Visit and Steak Dinner', '2024-07-15', -34.6118, -58.4173),

-- Travel 20
(20, 'Wat Pho and Grand Palace Tickets', '2024-08-01', 13.7563, 100.5018),
(20, 'Street Life Experience and Thai Cuisine', '2024-08-15', 13.7563, 100.5018),

-- Travel 21
(21, 'Acropolis and Parthenon Exploration', '2024-09-01', 37.5665, 126.9780),
(21, 'Greek Cuisine Night', '2024-09-15', 37.5665, 126.9780),

-- Travel 22
(22, 'Exploring Hanoi Old Quarter', '2024-10-01', 21.0285, 105.8542),
(22, 'Ho Chi Minh Mausoleum Visit and Pho Tasting', '2024-10-15', 21.0285, 105.8542),

-- Travel 23
(23, 'Edinburgh Castle Tickets', '2024-11-01', 55.9533, -3.1883),
(23, 'Arthur\'s Seat Hike and Military Tattoo Night', '2024-11-15', 55.9533, -3.1883),

-- Travel 24
(24, 'Machu Picchu Exploration', '2024-12-01', -13.1631, -72.5450),
(24, 'Inca Trail Hike and Peruvian Cuisine', '2024-12-15', -13.1631, -72.5450);



INSERT INTO user (email, password_hash, role) VALUES
('user1@useremail.com', 'hashed_password_1', 'USER'),
('user2@useremail.com', 'hashed_password_2', 'USER'),
('user3@useremail.com', 'hashed_password_3', 'USER'),
('user4@useremail.com', 'hashed_password_4', 'USER'),
('user5@useremail.com', 'hashed_password_5', 'USER'),
('user6@useremail.com', 'hashed_password_6', 'USER'),
('user7@useremail.com', 'hashed_password_7', 'USER'),
('user8@useremail.com', 'hashed_password_8', 'USER'),
('user9@useremail.com', 'hashed_password_9', 'USER'),
('user10@useremail.com', 'hashed_password_10', 'USER'),
('user11@useremail.com', 'hashed_password_11', 'USER'),
('user12@useremail.com', 'hashed_password_12', 'USER'),
('user13@useremail.com', 'hashed_password_13', 'USER'),
('user14@useremail.com', 'hashed_password_14', 'USER'),
('user15@useremail.com', 'hashed_password_15', 'USER'),
('user16@useremail.com', 'hashed_password_16', 'USER'),
('user17@useremail.com', 'hashed_password_17', 'USER'),
('user18@useremail.com', 'hashed_password_18', 'USER'),
('user19@useremail.com', 'hashed_password_19', 'USER'),
('user20@useremail.com', 'hashed_password_20', 'USER'),
('user21@useremail.com', 'hashed_password_21', 'USER'),
('user22@useremail.com', 'hashed_password_22', 'USER'),
('user23@useremail.com', 'hashed_password_23', 'USER'),
('user24@useremail.com', 'hashed_password_24', 'USER');