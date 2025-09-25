-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS dinelocal;

-- Use the database
USE dinelocal;

-- Grant privileges to the application user
GRANT ALL PRIVILEGES ON dinelocal.* TO 'dinelocal_user'@'%';
FLUSH PRIVILEGES;