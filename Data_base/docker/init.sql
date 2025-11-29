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
    payment_date    DATE,
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
    ('xgo','xgo@gmail.com'),
    ('zgo','zgo@gmail.com');

INSERT INTO game (game_id, game_name, game_type, icon, company_id) VALUES
    ('1','AAA','fps, co-op', 'http', 1),
    ('2','Biohazee','fps, horror', 'http', 1);

INSERT INTO library (game_id, downloaded) VALUES
    ('1','2'),
    ('1-2','1');

INSERT INTO app_user (user_name, email, password, payment_date, library_id, phone) VALUES
    ('chai','somchai@gmail.com','123', '2025-03-15' , 1,'321321'),
    ('yain','somyain@gmail.com','456', '2025-05-25' ,2,'123123');

INSERT INTO admin (admin_name, email, phone, password) VALUES
    ('mon','mon@gmail.com','1234567890','321'),
    ('nee','nee@gmail.com','9876543210','654');


INSERT INTO bill (user_id, price) VALUES
    (1,100),
    (2,100);