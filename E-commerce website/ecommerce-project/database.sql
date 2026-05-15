-- ============================================================
-- ShopEase E-Commerce Database Script (MySQL)
-- Run this script to set up the database for production use
-- ============================================================

CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0
);

INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES
('Wireless Bluetooth Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality for music lovers and professionals.', 79.99, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 45),
('Smart Watch Pro', 'Feature-rich smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 50+ sport modes. Water-resistant up to 50 meters.', 199.99, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', 30),
('Classic Leather Backpack', 'Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and adjustable straps. Perfect for work and travel.', 89.99, 'Fashion', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', 25),
('Running Shoes Ultra', 'Lightweight performance running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.', 129.99, 'Sports', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 60),
('Organic Coffee Beans', 'Single-origin Arabica coffee beans, medium roast, ethically sourced from Colombian highlands. Rich and smooth flavor.', 24.99, 'Food', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop', 100),
('Stainless Steel Water Bottle', 'Insulated 32oz water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.', 34.99, 'Home', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', 80),
('Mechanical Keyboard RGB', 'Gaming mechanical keyboard with Cherry MX switches, per-key RGB lighting, and aluminum frame for durability.', 149.99, 'Electronics', 'https://images.unsplash.com/photo-1511467653076-7e46f7a52760?w=400&h=400&fit=crop', 20),
('Yoga Mat Premium', 'Extra thick 6mm yoga mat with non-slip surface, alignment lines, and carrying strap. Eco-friendly TPE material.', 39.99, 'Sports', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', 55),
('Denim Jacket Classic', 'Timeless denim jacket with button closure, chest pockets, and comfortable fit. 100% cotton, machine washable.', 69.99, 'Fashion', 'https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=400&h=400&fit=crop', 35),
('Portable Bluetooth Speaker', 'Compact waterproof speaker with 360° sound, 12-hour playtime, and built-in microphone for hands-free calls.', 59.99, 'Electronics', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', 40),
('Ceramic Plant Pot Set', 'Set of 3 minimalist ceramic plant pots with drainage holes and bamboo trays. Ideal for succulents and herbs.', 29.99, 'Home', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', 70),
('Fitness Resistance Bands', 'Set of 5 resistance bands with varying tension levels, door anchor, and exercise guide. Great for home workouts.', 19.99, 'Sports', 'https://images.unsplash.com/photo-1598289431512-b763b6a2b0b0?w=400&h=400&fit=crop', 90);
