-- Creating the database
CREATE DATABASE job_management;

-- Connect to the database
\c job_management

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create JobSites table
CREATE TABLE JobSites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobsite_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_jobsite_name CHECK (TRIM(jobsite_name) <> '')
);

-- Create Categories table
CREATE TABLE Categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_category_name CHECK (TRIM(name) <> '')
);

-- Insert the three predefined categories automatically
INSERT INTO Categories (name) VALUES
  ('Sidewalk Shed'),
  ('Scaffold'),
  ('Shoring');

-- Create JobSiteCategories join table (many-to-many)
CREATE TABLE JobSiteCategories (
    jobsite_id UUID REFERENCES JobSites(id) ON DELETE CASCADE,
    category_id UUID REFERENCES Categories(id) ON DELETE CASCADE,
    PRIMARY KEY (jobsite_id, category_id)
);

-- Create CategoryItems table (items belonging to each category)
CREATE TABLE CategoryItems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES Categories(id) ON DELETE CASCADE,
    item VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_jobsite_status ON JobSites(status);
CREATE INDEX idx_category_name ON Categories(name);
CREATE INDEX idx_categoryitem_category ON CategoryItems(category_id);

-- Permissions (optional)
GRANT ALL ON JobSites, Categories, JobSiteCategories, CategoryItems TO PUBLIC;
