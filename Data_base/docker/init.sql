-- Table: company
CREATE TABLE company (
    company_id      SERIAL PRIMARY KEY,
    company_name    VARCHAR(255) NOT NULL,
    company_email   VARCHAR(255) NOT NULL UNIQUE
);



-- Table: game
CREATE TABLE game (
    game_id         VARCHAR(255) PRIMARY KEY,
    game_name       VARCHAR(255) NOT NULL,
    game_type       VARCHAR(255),
    icon            VARCHAR(255),
    company_id      INT NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- Table: library
CREATE TABLE library (
    library_id      SERIAL PRIMARY KEY,
    game_id         VARCHAR(1000),
    downloaded      VARCHAR(1000),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);


-- Table: app_user
CREATE TABLE app_user (
    user_id         SERIAL PRIMARY KEY,
    library_id      INT NOT NULL,
    user_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    payment_date    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    islogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (library_id) REFERENCES library(library_id) ON DELETE CASCADE
);


-- Table: admin
CREATE TABLE admin (
    admin_id        SERIAL PRIMARY KEY,
    admin_name      VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    islogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);




-- Table: bill
CREATE TABLE bill (
    bill_id         SERIAL PRIMARY KEY,
    user_id         INT NOT NULL,
    price           FLOAT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE CASCADE
);

---------------------------------------------------------
-- Insert data
---------------------------------------------------------

INSERT INTO company (company_name, company_email) VALUES
('Rockstar Games', 'rockstar@example.com'),
('Mojang Studios (Microsoft)', 'mojang@example.com'),
('Epic Games', 'epic@example.com'),
('Riot Games', 'riot@example.com'),
('Infinity Ward / Activision', 'activision@example.com'),
('Nintendo', 'nintendo@example.com'),
('Santa Monica Studio (Sony)', 'santamonica@example.com'),
('CD Projekt Red', 'cdpr@example.com'),
('FromSoftware', 'fromsoftware@example.com'),
('Krafton / PUBG Studios', 'krafton@example.com'),
('Respawn Entertainment', 'respawn@example.com'),
('Blizzard Entertainment', 'blizzard@example.com'),
('Valve Corporation', 'valve@example.com'),
('Guerrilla Games', 'guerrilla@example.com'),
('Ubisoft Montreal', 'ubisoftmontreal@example.com'),
('Ubisoft Toronto', 'ubisofttoronto@example.com'),
('HoYoverse (miHoYo)', 'hoyoverse@example.com'),
('DICE (EA)', 'dice@example.com'),
('Naughty Dog', 'naughtydog@example.com'),
('Capcom', 'capcom@example.com'),
('Innersloth', 'innersloth@example.com'),
('343 Industries (Xbox)', 'xbox343@example.com'),
('Eidos-Montréal', 'eidos@example.com'),
('Kojima Productions', 'kojima@example.com');


INSERT INTO game (game_id, game_name, game_type, icon, company_id) VALUES
('1','Grand Theft Auto V (GTA V)', 'Action', 'https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Grand_Theft_Auto_V_Cover.png/250px-Grand_Theft_Auto_V_Cover.png', 1),
('2','Minecraft', 'Sandbox', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png', 2),
('3','Fortnite', 'Battle Royale', 'https://cdn2.unrealengine.com/fneco-2025-keyart-thumb-1920x1080-de84aedabf4d.jpg', 3),
('4','League of Legends (LoL)', 'MOBA', 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab', 4),
('5','Call of Duty: Modern Warfare II / Warzone', 'Shooter', 'https://xboxwire.thesourcemediaassets.com/sites/2/2022/11/PC_WZ_S01_KA_16x9_WEAPONS_101022_BRANDED-2a3c61782ce3e1efd5ed.jpg', 5),
('6','The Legend of Zelda: Breath of the Wild', 'Adventure', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg', 6),
('7','God of War (2018)', 'Action', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg', 7),
('8','Cyberpunk 2077', 'RPG', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg', 8),
('9','Elden Ring', 'RPG', 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/UAnLUUMdxA9cow8TEe8IfhuC.png', 9),
('10','PUBG: Battlegrounds', 'Battle Royale', 'https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-19vwb.jpg', 10),
('11','Apex Legends', 'Battle Royale', 'https://upload.wikimedia.org/wikipedia/th/d/db/Apex_legends_cover.jpg', 11),
('12','Overwatch 2', 'Shooter', 'https://upload.wikimedia.org/wikipedia/en/8/89/Overwatch_2_Steam_artwork.jpg', 12),
('13','Dota 2', 'MOBA', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg?t=1762820658', 13),
('14','Counter-Strike 2 (CS2)', 'Shooter', 'https://cdn.fastly.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg', 13),
('15','The Witcher 3: Wild Hunt', 'RPG', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/250px-Witcher_3_cover_art.jpg', 8),
('16','Red Dead Redemption 2', 'Action Adventure', 'https://upload.wikimedia.org/wikipedia/th/4/44/Red_Dead_Redemption_II.jpg', 1),
('17','Horizon Forbidden West', 'Action RPG', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Horizon_Forbidden_West_cover_art.jpg/250px-Horizon_Forbidden_West_cover_art.jpg', 14),
('18','Assassin’s Creed Valhalla', 'Action RPG', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Assassins_Creed_Valhalla_cover.jpg/250px-Assassins_Creed_Valhalla_cover.jpg', 15),
('19','Far Cry 6', 'Shooter', 'https://upload.wikimedia.org/wikipedia/en/3/35/Far_cry_6_cover.jpg', 16),
('20','Genshin Impact', 'Action RPG', 'https://fastcdn.hoyoverse.com/content-v2/plat/124031/5d2ba4371115d26de4c574b28311aed8_3908500551050520494.jpeg', 17),
('21','Battlefield 2042', 'Shooter', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Battlefield_2042_cover_art.jpg/250px-Battlefield_2042_cover_art.jpg', 18),
('22','The Last of Us Part II', 'Action Adventure', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png', 19),
('23','Resident Evil Village', 'Horror', 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png', 20),
('24','Monster Hunter: World', 'Action RPG', 'https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg', 20),
('25','Among Us', 'Party / Social Deduction', 'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg', 21),
('26','Halo Infinite', 'Shooter', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Halo_Infinite.png/250px-Halo_Infinite.png', 22),
('27','Shadow of the Tomb Raider', 'Action Adventure', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Shadow_of_the_Tomb_Raider_cover.png/250px-Shadow_of_the_Tomb_Raider_cover.png', 23),
('28','Death Stranding', 'Action', 'https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding.jpg', 24),
('29','Sekiro: Shadows Die Twice', 'Action Adventure', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Sekiro_art.jpg/250px-Sekiro_art.jpg', 9),
('30','Diablo IV', 'Action RPG', 'https://image.api.playstation.com/vulcan/ap/rnd/202211/3017/Oo1B84A7BLCT157YFSxjtwG0.png', 12);



INSERT INTO library (game_id, downloaded) VALUES
    ('1-2-3-5','2-3-5'),
    ('1-2-9-10','1-2-9-10');

INSERT INTO app_user (user_name, email, password, payment_date, library_id, phone) VALUES
    ('chai','somchai@gmail.com','123', '2025-03-15' , 1,'321321'),
    ('yain','somyain@gmail.com','456', '2025-05-25' ,2,'123123');

INSERT INTO admin (admin_name, email, phone, password) VALUES
    ('mon','mon@gmail.com','1234567890','321'),
    ('nee','nee@gmail.com','9876543210','654');


INSERT INTO bill (user_id, price) VALUES
    (1,100),
    (2,100);