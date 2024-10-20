-- Create the necessary database roles
CREATE ROLE admin WITH LOGIN PASSWORD 'password';

-- Create the database
CREATE DATABASE todoapp;
GRANT ALL PRIVILEGES ON DATABASE todoapp TO admin;

-- Connect to the database to set up schema
\c todoapp

-- Drop the table if it already exists
DROP TABLE IF EXISTS todos;

-- Create the 'todos' table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);
