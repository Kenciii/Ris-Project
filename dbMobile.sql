CREATE SCHEMA `dbMobile`;
USE `dbMobile`;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(500) NOT NULL,
    role NVARCHAR(20) NOT NULL,
    status NVARCHAR(15) NOT NULL
);

CREATE TABLE mobiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(100) NOT NULL,
    price NVARCHAR(100) not null,
    description NVARCHAR(5000) NOT NULL,
    imageURL NVARCHAR(1500) NOT NULL
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    mobile_model VARCHAR(255) NOT NULL,
    issue_description TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    comment NVARCHAR(1000) NOT NULL,
    mobilesId INT,
    CONSTRAINT FK_CommentMobiles FOREIGN KEY (mobilesId) REFERENCES mobiles (id), 
    userId INT,
    CONSTRAINT FK_CommentUser FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO users (username, password, role, status) VALUE('admin', 'admin', 'admin', 'aktivan');