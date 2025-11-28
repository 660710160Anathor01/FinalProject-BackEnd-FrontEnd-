-- Table: user
CREATE TABLE user (
    user_id         VARCHAR(255) NOT NULL PRIMARY KEY,
    libray_id       int,
    user_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL PRIMARY KEY,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
   
    islogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

    FOREIGN KEY (libray_id) REFERENCES librays(libray_id) ON DELETE CASCADE
);

-- Table: amdin
CREATE TABLE amdin (
    amdin_id        SERIAL PRIMARY KEY,
    admin_name      VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    islogin         BOOLEAN DEFAULT FALSE,
    
);

-- Table: company
CREATE TABLE company (
    company_id          SERIAL PRIMARY KEY,
    company_name        VARCHAR(255) NOT NULL,
    company_email       VARCHAR(255) NOT NULL UNIQUE
);

-- Table: librays
CREATE TABLE librays (
    libray_id       SERIAL PRIMARY KEY,
    game_id         VARCHAR(100) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE
    
);

-- Table: game
CREATE TABLE game (
    game_id         SERIAL PRIMARY KEY,
    game_name       VARCHAR(255) NOT NULL,
    game_type       VARCHAR(255),
    company_id      VARCHAR(255) NOT NULL UNIQUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- Table: bill
CREATE TABLE bill (
    bill_id         SERIAL PRIMARY KEY,
    user_id         VARCHAR(255) NOT NULL,
    price           float,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);
--------------------------------------------------------------------------------------------------------------------------------------------------------------------


-- Insert user
INSERT INTO user (user_name, email, password, libray_id, phone) VALUES
    ('chai', 'somchai@gmail.com', '123', '3', '1'),
    ('yain',, 'somyain@gmail.com', '456', '4', '1');

        amdin_id        SERIAL PRIMARY KEY,
    
    admin_name      VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    islogin         BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (libray_id) REFERENCES librays(libray_id) ON DELETE CASCADE

-- Insert admin
INSERT INTO admin (first_name, last_name, birth_day, email, history) VALUES
    ('mon', 'monnie@gmail.com', '321', '1'),
    ('nee', 'nnnn@gmail.com', '654', '1');

-- Insert HR
INSERT INTO hr (first_name, last_name, email, phone) VALUES
    ('ม่อน', 'รวยป่าว', 'monnie@gmail.com', '0926325624'),
    ('หนึ่ง', 'ไม้รวย', 'nnnn@gmail.com', '0957468742');

-- Insert Applicants (แปลงวันที่ + แก้วันผิด เช่น 30 ก.พ.)
INSERT INTO applicants (first_name, last_name, birth_day, email, phone) VALUES
    ('สมชาย', 'รวยน้อย', '1997-12-12', 'somchai@gmail.com', '0922145624'),
    ('สมหญิง', 'รวยมาก', '1987-02-28', 'somyain@gmail.com', '0957464567');

-- Insert Applications
INSERT INTO apply (position, file, stage, applicant_id) VALUES
    ('พนักงานล้างรถ', decode('U29tZSBkYXRh', 'base64'), 'สมัครแล้ว', 1),
    ('พนักงานบริการ', decode('U29tZSBvdGhlciBkYXRh', 'base64'), 'ผ่านสัมภาษณ์', 2);

-- Insert Schedule
INSERT INTO schedule (first_name, last_name, time_s, applicant_id) VALUES
    ('สมชาย', 'รวยน้อย', '10:00', 1),
    ('สมหญิง', 'รวยมาก', '11:30', 2);
