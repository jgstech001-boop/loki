-- Run this file with: mysql -u root -p < sql/database.sql

CREATE DATABASE IF NOT EXISTS ecommerce_demo;

USE ecommerce_demo;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, image)
VALUES
('Laptop', 'Powerful laptop for work and entertainment', 55000.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'),
('Smartphone', 'Modern smartphone with excellent camera', 25000.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
('Headphones', 'Wireless headphones with clear sound', 3500.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
('Smart Watch', 'Smart watch with fitness tracking', 5000.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'),
('Keyboard', 'Mechanical keyboard for developers', 2500.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'),
('Mouse', 'Wireless ergonomic mouse', 1200.00, 'https://images.unsplash.com/photo-1527814050087-3793815479db');
