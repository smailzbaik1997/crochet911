-- Migration to fix VARCHAR length constraints
-- This fixes the "value too long for type character varying(20)" error

-- Increase hook_size field length from 20 to 50 characters
-- This accommodates longer hook size descriptions like "5.0mm (H) or 3.75mm (F)"
ALTER TABLE patterns 
ALTER COLUMN hook_size TYPE VARCHAR(50);

-- Optional: Also increase other potentially restrictive fields for future-proofing

-- Increase time_to_complete from 100 to 150 characters
-- This accommodates longer time descriptions like "4-6 hours for beginners, 2-3 hours for experienced crocheters"
ALTER TABLE patterns 
ALTER COLUMN time_to_complete TYPE VARCHAR(150);

-- Increase gauge_info from 200 to 300 characters
-- This accommodates detailed gauge information
ALTER TABLE patterns 
ALTER COLUMN gauge_info TYPE VARCHAR(300);

-- Increase finished_size from 200 to 300 characters
-- This accommodates detailed size descriptions with multiple measurements
ALTER TABLE patterns 
ALTER COLUMN finished_size TYPE VARCHAR(300);

-- Update the template comments to reflect new limits
-- Note: This migration is safe and won't affect existing data