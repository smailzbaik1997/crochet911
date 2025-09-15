-- Crochet911 Database Schema
-- This file contains the complete database schema for the crochet patterns website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table for organizing patterns
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Designers table for pattern creators
CREATE TABLE designers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  bio TEXT,
  website_url VARCHAR(500),
  social_media JSONB,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Yarn weights enum
CREATE TYPE yarn_weight AS ENUM (
  'lace',
  'super_fine', 
  'fine', 
  'light', 
  'medium', 
  'bulky', 
  'super_bulky', 
  'jumbo',
  'lace (0)',
  'super fine (1)',
  'fine (2)',
  'light (3)',
  'medium (4)',
  'bulky (5)',
  'super bulky (6)',
  'jumbo (7)'
);

-- Difficulty levels enum
CREATE TYPE difficulty_level AS ENUM (
  'beginner', 'easy', 'intermediate', 'advanced', 'expert'
);

-- Patterns table - main table for crochet patterns
CREATE TABLE patterns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  designer_id UUID REFERENCES designers(id),
  category_id UUID REFERENCES categories(id),
  
  -- Pattern details
  difficulty difficulty_level NOT NULL,
  yarn_weight yarn_weight,
  yarn_details TEXT,
  hook_size VARCHAR(20),
  finished_size VARCHAR(200),
  gauge_info VARCHAR(200),
  time_to_complete VARCHAR(100),
  
  -- Links and resources
  pattern_source_url VARCHAR(500) NOT NULL,
  pattern_source_name VARCHAR(200),
  is_free BOOLEAN DEFAULT true,
  price DECIMAL(10,2),
  
  -- Images
  featured_image_url VARCHAR(500),
  image_alt_text VARCHAR(300),
  gallery_images JSONB,
  
  -- SEO fields
  meta_title VARCHAR(200),
  meta_description VARCHAR(500),
  keywords TEXT[],
  
  -- Statistics
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- Status and timestamps
  is_published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pattern tags for flexible categorization
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7), -- Hex color code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many relationship between patterns and tags
CREATE TABLE pattern_tags (
  pattern_id UUID REFERENCES patterns(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (pattern_id, tag_id)
);

-- User favorites (for future user system)
CREATE TABLE user_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID, -- Will reference users table when implemented
  pattern_id UUID REFERENCES patterns(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pattern_id)
);

-- Indexes for performance
CREATE INDEX idx_patterns_category ON patterns(category_id);
CREATE INDEX idx_patterns_designer ON patterns(designer_id);
CREATE INDEX idx_patterns_published ON patterns(is_published);
CREATE INDEX idx_patterns_featured ON patterns(featured);
CREATE INDEX idx_patterns_difficulty ON patterns(difficulty);
CREATE INDEX idx_patterns_yarn_weight ON patterns(yarn_weight);
CREATE INDEX idx_patterns_slug ON patterns(slug);
CREATE INDEX idx_patterns_created_at ON patterns(created_at DESC);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_designers_slug ON designers(slug);
CREATE INDEX idx_pattern_tags_pattern ON pattern_tags(pattern_id);
CREATE INDEX idx_pattern_tags_tag ON pattern_tags(tag_id);

-- Full-text search index
CREATE INDEX idx_patterns_search ON patterns USING gin(
  to_tsvector('english', title || ' ' || description || ' ' || COALESCE(yarn_details, ''))
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_patterns_updated_at BEFORE UPDATE ON patterns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_designers_updated_at BEFORE UPDATE ON designers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE pattern_tags ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Allow public read access on patterns" ON patterns
    FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on designers" ON designers
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on tags" ON tags
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on pattern_tags" ON pattern_tags
    FOR SELECT USING (true);